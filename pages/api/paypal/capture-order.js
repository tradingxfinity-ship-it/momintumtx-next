import { getAccessToken, hasPayPalCredentials, PAYPAL_API } from '../../../lib/paypal'
import { getServiceClient } from '../../../lib/supabase'
import { priceOrder } from '../../../lib/pricing'

// Record the order + reduce stock after a successful capture. Best-effort:
// never fail the customer's confirmation just because a DB write hiccuped.
async function persistOrder(order, capture) {
  const db = getServiceClient()
  if (!db || !order) return
  try {
    const priced = await priceOrder(order.items, order.fulfillment)
    await db.from('orders').insert({
      customer_name: order.name,
      email: order.email,
      phone: order.phone || null,
      fulfillment: order.fulfillment,
      address: order.address || null,
      items: priced.lineItems,
      subtotal: priced.subtotal,
      delivery_fee: priced.deliveryFee,
      total: priced.total,
      paypal_capture_id: capture?.id || null,
      status: 'paid',
    })
    // Decrement stock for each purchased item.
    for (const li of priced.lineItems) {
      const { data: prod } = await db.from('products').select('stock').eq('id', li.id).single()
      if (prod) {
        await db.from('products').update({ stock: Math.max(0, prod.stock - li.qty) }).eq('id', li.id)
      }
    }
  } catch (e) {
    console.error('persistOrder failed:', e.message)
  }
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderID, order } = req.body || {}
  if (!orderID) {
    return res.status(400).json({ error: 'Missing orderID' })
  }

  if (!hasPayPalCredentials()) {
    return res.status(503).json({ error: 'Checkout is not configured yet.' })
  }

  try {
    const token = await getAccessToken()
    const r = await fetch(`${PAYPAL_API}/v2/checkout/orders/${orderID}/capture`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    const data = await r.json()
    if (!r.ok || data.status !== 'COMPLETED') {
      return res.status(502).json({ error: 'Payment could not be captured.', detail: data })
    }

    const capture = data?.purchase_units?.[0]?.payments?.captures?.[0]
    await persistOrder(order, capture)

    return res.status(200).json({
      status: data.status,
      captureId: capture?.id || null,
      amount: capture?.amount?.value || null,
    })
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Capture failed.' })
  }
}
