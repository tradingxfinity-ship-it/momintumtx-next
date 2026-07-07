import { getAccessToken, hasPayPalCredentials, PAYPAL_API } from '../../../lib/paypal'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderID } = req.body || {}
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
    return res.status(200).json({
      status: data.status,
      captureId: capture?.id || null,
      amount: capture?.amount?.value || null,
    })
  } catch (e) {
    return res.status(500).json({ error: e.message || 'Capture failed.' })
  }
}
