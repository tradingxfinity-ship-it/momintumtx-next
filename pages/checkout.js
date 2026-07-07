import { useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { PayPalScriptProvider, PayPalButtons } from '@paypal/react-paypal-js'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import { formatPrice } from '../components/shop/ProductCard'
import { useCart } from '../context/CartContext'
import { SHOP_CONFIG } from '../data/products'

const ease = [0.22, 1, 0.36, 1]
const PAYPAL_CLIENT_ID = process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID
const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY

export default function Checkout() {
  const { items, subtotal, count, setQty, removeItem, clearCart, hydrated } = useCart()
  const [fulfillment, setFulfillment] = useState('pickup') // 'pickup' | 'delivery'
  const [info, setInfo] = useState({
    name: '', email: '', phone: '',
    address: '', city: '', state: 'TX', zip: '',
  })
  const [paid, setPaid] = useState(false)
  const [error, setError] = useState('')

  const isDelivery = fulfillment === 'delivery'
  const freeDelivery = SHOP_CONFIG.freeDeliveryOver != null && subtotal >= SHOP_CONFIG.freeDeliveryOver
  const deliveryFee = isDelivery && !freeDelivery ? SHOP_CONFIG.deliveryFee : 0
  const total = subtotal + deliveryFee

  const contactValid = info.name.trim() && /\S+@\S+\.\S+/.test(info.email) && info.phone.trim()
  const addressValid = !isDelivery || (info.address.trim() && info.city.trim() && info.state.trim() && info.zip.trim())
  const canPay = hydrated && count > 0 && contactValid && addressValid

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/50 transition-all duration-200'

  const set = (k) => (e) => setInfo(f => ({ ...f, [k]: e.target.value }))

  // Email the order to the shop after a successful PayPal capture.
  const notifyShop = async (paypalOrderId) => {
    if (!WEB3FORMS_ACCESS_KEY) return
    const lines = items.map(i => `• ${i.qty} × ${i.name} — ${formatPrice(i.price * i.qty)}`).join('\n')
    const address = isDelivery
      ? `${info.address}, ${info.city}, ${info.state} ${info.zip}`
      : `In-store pickup — ${SHOP_CONFIG.pickupLocation}`
    const data = new FormData()
    data.append('access_key', WEB3FORMS_ACCESS_KEY)
    data.append('subject', `🛒 New online order from ${info.name} (${formatPrice(total)})`)
    data.append('from_name', 'Momintum Shop')
    data.append('replyto', info.email)
    data.append('name', info.name)
    data.append('email', info.email)
    data.append('phone', info.phone)
    data.append('fulfillment', isDelivery ? 'Delivery' : 'Pickup')
    data.append('deliver_to', address)
    data.append('items', lines)
    data.append('subtotal', formatPrice(subtotal))
    data.append('delivery_fee', formatPrice(deliveryFee))
    data.append('total', formatPrice(total))
    data.append('paypal_order_id', paypalOrderId || 'n/a')
    try {
      await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    } catch {
      /* order already paid — don't block the confirmation on email failure */
    }
  }

  // ── Confirmation screen ──
  if (paid) {
    return (
      <>
        <Head><title>Order Confirmed — Momintum</title></Head>
        <Navbar />
        <section className="bg-brand-navy-dark min-h-screen flex items-center justify-center px-6 pt-24 pb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
            className="text-center max-w-md"
          >
            <div className="w-16 h-16 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffe100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h1 className="font-bebas text-4xl text-white tracking-wide mb-3">Order Confirmed!</h1>
            <p className="text-white/55 leading-relaxed mb-2">
              Thanks {info.name.split(' ')[0]} — your payment went through.
            </p>
            <p className="text-white/45 text-sm leading-relaxed mb-8">
              {isDelivery
                ? "We'll pack your order and ship it out. You'll get a confirmation at " + info.email + '.'
                : 'Your order will be ready for pickup at ' + SHOP_CONFIG.pickupLocation + '. We\'ll email you when it\'s ready.'}
            </p>
            <Link href="/shop" className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors">
              ← Back to shop
            </Link>
          </motion.div>
        </section>
        <Footer />
      </>
    )
  }

  // ── Empty cart ──
  if (hydrated && count === 0) {
    return (
      <>
        <Head><title>Checkout — Momintum</title></Head>
        <Navbar />
        <section className="bg-brand-navy-dark min-h-screen flex items-center justify-center px-6 pt-24 pb-16 text-center">
          <div>
            <h1 className="font-bebas text-4xl text-white tracking-wide mb-3">Your cart is empty</h1>
            <p className="text-white/50 mb-8">Add some cards to get started.</p>
            <Link href="/shop" className="inline-flex px-6 py-3 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors">
              Browse the shop →
            </Link>
          </div>
        </section>
        <Footer />
      </>
    )
  }

  return (
    <>
      <Head>
        <title>Checkout — Momintum Cards & Collectibles</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Navbar />

      <section className="bg-brand-navy-dark pt-28 pb-24 lg:pt-32 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h1 className="font-bebas text-white text-5xl tracking-wide mb-10">Checkout</h1>

          <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">

            {/* ── Left: details ── */}
            <div className="flex flex-col gap-8">

              {/* Fulfillment toggle */}
              <div>
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">How do you want it?</p>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { key: 'pickup', label: 'In-store Pickup', sub: 'Free · San Antonio' },
                    { key: 'delivery', label: 'Delivery', sub: freeDelivery ? 'Free over ' + formatPrice(SHOP_CONFIG.freeDeliveryOver) : formatPrice(SHOP_CONFIG.deliveryFee) + ' flat' },
                  ].map(opt => {
                    const active = fulfillment === opt.key
                    return (
                      <button
                        key={opt.key}
                        onClick={() => setFulfillment(opt.key)}
                        className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                          active ? 'bg-brand-yellow text-brand-navy-dark border-brand-yellow' : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-yellow/50'
                        }`}
                      >
                        <span className="text-sm font-bold">{opt.label}</span>
                        <span className={`text-[11px] mt-0.5 ${active ? 'text-brand-navy-dark/70' : 'text-white/40'}`}>{opt.sub}</span>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Contact */}
              <div className="flex flex-col gap-4">
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Your details</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <input placeholder="Full name *" value={info.name} onChange={set('name')} className={inputCls} />
                  <input type="email" placeholder="Email *" value={info.email} onChange={set('email')} className={inputCls} />
                </div>
                <input type="tel" placeholder="Phone *" value={info.phone} onChange={set('phone')} className={inputCls} />
              </div>

              {/* Delivery address */}
              {isDelivery && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                  className="flex flex-col gap-4 overflow-hidden"
                >
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider">Delivery address</p>
                  <input placeholder="Street address *" value={info.address} onChange={set('address')} className={inputCls} />
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <input placeholder="City *" value={info.city} onChange={set('city')} className={inputCls} />
                    <input placeholder="State *" value={info.state} onChange={set('state')} className={inputCls} />
                    <input placeholder="ZIP *" value={info.zip} onChange={set('zip')} className={inputCls} />
                  </div>
                </motion.div>
              )}
            </div>

            {/* ── Right: order summary ── */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 lg:sticky lg:top-28">
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-4">Order summary</p>

              <div className="flex flex-col gap-4 mb-5">
                {items.map(i => (
                  <div key={i.id} className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden flex-shrink-0 p-1">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={i.image} alt={i.name} className="w-full h-full object-contain" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-white text-sm font-semibold truncate">{i.name}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <button onClick={() => setQty(i.id, i.qty - 1)} className="w-5 h-5 rounded bg-white/10 text-white text-sm leading-none hover:bg-white/20">−</button>
                        <span className="text-white/70 text-xs w-5 text-center">{i.qty}</span>
                        <button onClick={() => setQty(i.id, i.qty + 1)} className="w-5 h-5 rounded bg-white/10 text-white text-sm leading-none hover:bg-white/20">+</button>
                        <button onClick={() => removeItem(i.id)} className="ml-2 text-white/30 text-xs hover:text-red-400">Remove</button>
                      </div>
                    </div>
                    <span className="text-white text-sm font-semibold">{formatPrice(i.price * i.qty)}</span>
                  </div>
                ))}
              </div>

              <div className="border-t border-white/10 pt-4 flex flex-col gap-2 text-sm">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{formatPrice(subtotal)}</span></div>
                <div className="flex justify-between text-white/60">
                  <span>{isDelivery ? 'Delivery' : 'Pickup'}</span>
                  <span>{deliveryFee > 0 ? formatPrice(deliveryFee) : 'Free'}</span>
                </div>
                <div className="flex justify-between text-white font-bold text-lg pt-2 border-t border-white/10 mt-1">
                  <span>Total</span><span>{formatPrice(total)}</span>
                </div>
              </div>

              {/* Payment */}
              <div className="mt-6">
                {error && (
                  <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200 mb-4">
                    {error}
                  </div>
                )}

                {!PAYPAL_CLIENT_ID ? (
                  <p className="text-xs text-amber-300/80 bg-amber-500/10 border border-amber-500/30 rounded-xl px-4 py-3">
                    PayPal isn’t configured yet. Set <code className="text-amber-200">NEXT_PUBLIC_PAYPAL_CLIENT_ID</code> to enable checkout.
                  </p>
                ) : (
                  <>
                    {!canPay && (
                      <p className="text-xs text-white/40 text-center mb-3">
                        Fill in your details {isDelivery ? 'and delivery address ' : ''}to pay.
                      </p>
                    )}
                    <div style={{ opacity: canPay ? 1 : 0.5, pointerEvents: canPay ? 'auto' : 'none' }}>
                      <PayPalScriptProvider options={{ clientId: PAYPAL_CLIENT_ID, currency: 'USD', intent: 'capture' }}>
                        <PayPalButtons
                          style={{ layout: 'vertical', color: 'gold', shape: 'pill', label: 'pay' }}
                          disabled={!canPay}
                          forceReRender={[total, fulfillment, canPay]}
                          createOrder={(data, actions) => actions.order.create({
                            purchase_units: [{
                              amount: { value: total.toFixed(2), currency_code: 'USD' },
                              description: `Momintum order (${count} item${count > 1 ? 's' : ''})`,
                            }],
                          })}
                          onApprove={async (data, actions) => {
                            const order = await actions.order.capture()
                            await notifyShop(order?.id || data.orderID)
                            clearCart()
                            setPaid(true)
                          }}
                          onError={() => setError('Payment could not be completed. Please try again.')}
                        />
                      </PayPalScriptProvider>
                    </div>
                  </>
                )}
                <p className="text-[11px] text-white/30 text-center mt-3">Secure checkout via PayPal</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
