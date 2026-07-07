import { getAccessToken, hasPayPalCredentials, PAYPAL_API } from '../../../lib/paypal'
import { priceOrder } from '../../../lib/pricing'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  try {
    const { items, fulfillment } = req.body || {}

    // Recompute the price on the server — the client only sends ids + quantities.
    const { lineItems, subtotal, deliveryFee, total } = priceOrder(items, fulfillment)

    if (!hasPayPalCredentials()) {
      return res.status(503).json({ error: 'Checkout is not configured yet. Please try again later.' })
    }

    const token = await getAccessToken()
    const r = await fetch(`${PAYPAL_API}/v2/checkout/orders`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        intent: 'CAPTURE',
        purchase_units: [{
          description: 'Momintum Cards & Collectibles order',
          amount: {
            currency_code: 'USD',
            value: total.toFixed(2),
            breakdown: {
              item_total: { currency_code: 'USD', value: subtotal.toFixed(2) },
              shipping: { currency_code: 'USD', value: deliveryFee.toFixed(2) },
            },
          },
          items: lineItems.map(li => ({
            name: li.name.slice(0, 127),
            quantity: String(li.qty),
            unit_amount: { currency_code: 'USD', value: li.price.toFixed(2) },
            category: 'PHYSICAL_GOODS',
          })),
        }],
      }),
    })

    const data = await r.json()
    if (!r.ok || !data.id) {
      return res.status(502).json({ error: 'Could not start PayPal checkout.', detail: data })
    }
    return res.status(200).json({ id: data.id })
  } catch (e) {
    // Pricing/stock validation errors are safe to show the customer.
    return res.status(400).json({ error: e.message || 'Could not create order.' })
  }
}
