// Authoritative order pricing — runs on the server so cart totals can't be
// tampered with in the browser. Prices come from the database, never the client.
import { getServiceClient } from './supabase'
import { SHOP_CONFIG } from '../data/products'

const round = (n) => Math.round(n * 100) / 100

export async function priceOrder(cart = [], fulfillment = 'pickup') {
  if (!Array.isArray(cart) || cart.length === 0) {
    throw new Error('Your cart is empty.')
  }

  const db = getServiceClient()
  if (!db) throw new Error('Store is not configured.')

  const ids = cart.map(c => c.id)
  const { data: products, error } = await db.from('products').select('*').in('id', ids)
  if (error) throw new Error('Could not load products.')

  const lineItems = cart.map(({ id, qty }) => {
    const p = (products || []).find(x => x.id === id)
    if (!p) throw new Error('One of your items is no longer available.')
    const price = Number(p.price)
    const q = Math.floor(Number(qty))
    if (!q || q < 1) throw new Error(`Invalid quantity for ${p.name}.`)
    if (q > p.stock) throw new Error(`Only ${p.stock} of "${p.name}" left in stock.`)
    return { id: p.id, name: p.name, price, qty: q, lineTotal: round(price * q) }
  })

  const subtotal = round(lineItems.reduce((s, li) => s + li.lineTotal, 0))
  const freeDelivery =
    SHOP_CONFIG.freeDeliveryOver != null && subtotal >= SHOP_CONFIG.freeDeliveryOver
  const deliveryFee =
    fulfillment === 'delivery' && !freeDelivery ? SHOP_CONFIG.deliveryFee : 0
  const total = round(subtotal + deliveryFee)

  return { lineItems, subtotal, deliveryFee, total }
}
