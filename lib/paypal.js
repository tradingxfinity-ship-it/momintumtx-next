// PayPal REST helpers (server-side only — uses the secret, never exposed to the browser).

const MODE = process.env.PAYPAL_MODE === 'sandbox' ? 'sandbox' : 'live'

export const PAYPAL_API =
  MODE === 'sandbox'
    ? 'https://api-m.sandbox.paypal.com'
    : 'https://api-m.paypal.com'

export function hasPayPalCredentials() {
  return Boolean(process.env.PAYPAL_CLIENT_ID && process.env.PAYPAL_SECRET)
}

// Exchange client id + secret for a short-lived access token.
export async function getAccessToken() {
  const id = process.env.PAYPAL_CLIENT_ID
  const secret = process.env.PAYPAL_SECRET
  if (!id || !secret) {
    throw new Error('PayPal server credentials are not configured.')
  }
  const auth = Buffer.from(`${id}:${secret}`).toString('base64')
  const res = await fetch(`${PAYPAL_API}/v1/oauth2/token`, {
    method: 'POST',
    headers: {
      Authorization: `Basic ${auth}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: 'grant_type=client_credentials',
  })
  if (!res.ok) {
    throw new Error('PayPal authentication failed.')
  }
  const data = await res.json()
  return data.access_token
}
