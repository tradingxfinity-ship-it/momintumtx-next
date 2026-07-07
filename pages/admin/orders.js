import { useEffect, useState } from 'react'
import Head from 'next/head'
import AdminLayout from '../../components/admin/AdminLayout'
import { fetchOrders, updateOrderStatus, ORDER_STATUSES } from '../../lib/db/orders'

const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const when = (d) => new Date(d).toLocaleString('en-US', { month: 'short', day: 'numeric', hour: 'numeric', minute: '2-digit' })

const STATUS_COLORS = {
  paid: 'bg-blue-500/20 text-blue-300',
  packed: 'bg-amber-500/20 text-amber-300',
  ready: 'bg-purple-500/20 text-purple-300',
  shipped: 'bg-cyan-500/20 text-cyan-300',
  completed: 'bg-green-500/20 text-green-300',
  cancelled: 'bg-red-500/20 text-red-300',
}

export default function AdminOrders() {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)
  const [open, setOpen] = useState(null)

  const load = () => { setLoading(true); fetchOrders().then(o => { setOrders(o); setLoading(false) }) }
  useEffect(load, [])

  const changeStatus = async (id, status) => {
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    setOpen(prev => prev && prev.id === id ? { ...prev, status } : prev)
    try { await updateOrderStatus(id, status) } catch (e) { alert(e.message); load() }
  }

  return (
    <>
      <Head><title>Orders — Momintum Admin</title></Head>
      <AdminLayout title="Orders">
        {loading ? (
          <p className="text-white/40 text-sm">Loading…</p>
        ) : orders.length === 0 ? (
          <div className="text-center py-20 text-white/40">No orders yet. They’ll appear here as customers check out.</div>
        ) : (
          <div className="bg-brand-navy-dark border border-white/10 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[1fr_120px_110px_110px_120px] gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white/40 border-b border-white/10">
              <span>Customer</span><span>Date</span><span>Fulfillment</span><span>Total</span><span>Status</span>
            </div>
            <div className="divide-y divide-white/5">
              {orders.map(o => (
                <button
                  key={o.id}
                  onClick={() => setOpen(o)}
                  className="w-full text-left grid grid-cols-[1fr_auto] md:grid-cols-[1fr_120px_110px_110px_120px] gap-4 px-5 py-4 items-center hover:bg-white/5 transition-colors"
                >
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{o.customer_name}</p>
                    <p className="text-xs text-white/40 truncate">{o.email}</p>
                  </div>
                  <span className="hidden md:block text-xs text-white/50">{when(o.created_at)}</span>
                  <span className="hidden md:block text-xs text-white/60 capitalize">{o.fulfillment}</span>
                  <span className="hidden md:block text-sm font-bold text-white">{fmt(o.total)}</span>
                  <span className={`justify-self-start md:justify-self-auto inline-block px-2.5 py-1 rounded-full text-[11px] font-bold capitalize ${STATUS_COLORS[o.status] || 'bg-white/10 text-white/60'}`}>{o.status}</span>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Order detail drawer */}
        {open && (
          <div className="fixed inset-0 z-50 flex justify-end bg-black/60" onClick={() => setOpen(null)}>
            <div className="w-full max-w-md bg-brand-navy-dark border-l border-white/10 h-full overflow-y-auto p-6" onClick={e => e.stopPropagation()}>
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bebas text-2xl tracking-wide">Order Details</h2>
                <button onClick={() => setOpen(null)} className="text-white/40 hover:text-white text-xl">✕</button>
              </div>

              <div className="flex flex-col gap-1 mb-6">
                <p className="text-lg font-bold text-white">{open.customer_name}</p>
                <p className="text-sm text-white/60">{open.email}</p>
                {open.phone && <p className="text-sm text-white/60">{open.phone}</p>}
                <p className="text-xs text-white/40 mt-1">{when(open.created_at)}</p>
              </div>

              {/* Status control */}
              <div className="mb-6">
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Status</p>
                <div className="flex flex-wrap gap-2">
                  {ORDER_STATUSES.map(s => (
                    <button
                      key={s}
                      onClick={() => changeStatus(open.id, s)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold capitalize transition-colors ${open.status === s ? 'bg-brand-yellow text-brand-navy-dark' : 'bg-white/10 text-white/60 hover:bg-white/20'}`}
                    >{s}</button>
                  ))}
                </div>
              </div>

              {/* Fulfillment */}
              <div className="mb-6 p-4 rounded-xl bg-white/5 border border-white/10">
                <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">{open.fulfillment === 'delivery' ? 'Deliver to' : 'Pickup'}</p>
                <p className="text-sm text-white/80">{open.address}</p>
              </div>

              {/* Items */}
              <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-2">Items</p>
              <div className="flex flex-col gap-2 mb-4">
                {(open.items || []).map((it, i) => (
                  <div key={i} className="flex justify-between text-sm">
                    <span className="text-white/80">{it.qty}× {it.name}</span>
                    <span className="text-white font-semibold">{fmt(Number(it.price) * Number(it.qty))}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-white/10 pt-3 flex flex-col gap-1 text-sm">
                <div className="flex justify-between text-white/60"><span>Subtotal</span><span>{fmt(open.subtotal)}</span></div>
                <div className="flex justify-between text-white/60"><span>Delivery</span><span>{Number(open.delivery_fee) > 0 ? fmt(open.delivery_fee) : 'Free'}</span></div>
                <div className="flex justify-between text-white font-bold text-lg pt-1"><span>Total</span><span>{fmt(open.total)}</span></div>
              </div>
              {open.paypal_capture_id && <p className="text-[11px] text-white/30 mt-4">PayPal capture: {open.paypal_capture_id}</p>}
            </div>
          </div>
        )}
      </AdminLayout>
    </>
  )
}
