import { useEffect, useMemo, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import AdminLayout from '../../components/admin/AdminLayout'
import { fetchOrders } from '../../lib/db/orders'
import { fetchProducts } from '../../lib/db/products'

const fmt = (n) => n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

function StatCard({ label, value, sub, accent }) {
  return (
    <div className="bg-brand-navy-dark border border-white/10 rounded-2xl p-6">
      <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-3">{label}</p>
      <p className={`font-bebas text-4xl tracking-wide leading-none ${accent ? 'text-brand-yellow' : 'text-white'}`}>{value}</p>
      {sub && <p className="text-white/40 text-xs mt-2">{sub}</p>}
    </div>
  )
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState([])
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchOrders().then(setOrders)
    fetchProducts().then(setProducts)
  }, [])

  const stats = useMemo(() => {
    const paid = orders.filter(o => o.status !== 'cancelled')
    const revenue = paid.reduce((s, o) => s + Number(o.total || 0), 0)
    const openOrders = orders.filter(o => ['paid', 'packed', 'ready'].includes(o.status)).length
    const lowStock = products.filter(p => p.stock > 0 && p.stock <= 2)
    const soldOut = products.filter(p => p.stock <= 0).length

    // best sellers by qty across order items
    const counts = {}
    for (const o of paid) {
      for (const it of (o.items || [])) {
        counts[it.name] = (counts[it.name] || 0) + Number(it.qty || 0)
      }
    }
    const best = Object.entries(counts).sort((a, b) => b[1] - a[1]).slice(0, 5)
    return { revenue, orderCount: paid.length, openOrders, lowStock, soldOut, best }
  }, [orders, products])

  const recent = orders.slice(0, 6)

  return (
    <>
      <Head><title>Dashboard — Momintum Admin</title></Head>
      <AdminLayout title="Dashboard">
        {/* Stat cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard label="Revenue" value={fmt(stats.revenue)} sub={`${stats.orderCount} paid orders`} accent />
          <StatCard label="Open Orders" value={stats.openOrders} sub="Awaiting fulfillment" />
          <StatCard label="Products" value={products.length} sub={`${stats.soldOut} sold out`} />
          <StatCard label="Low Stock" value={stats.lowStock.length} sub="≤ 2 left" />
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Recent orders */}
          <div className="bg-brand-navy-dark border border-white/10 rounded-2xl p-6">
            <div className="flex items-center justify-between mb-5">
              <h2 className="font-bebas text-2xl tracking-wide">Recent Orders</h2>
              <Link href="/admin/orders" className="text-xs font-semibold text-brand-yellow hover:text-brand-yellow-dark">View all →</Link>
            </div>
            {recent.length === 0 ? (
              <p className="text-white/40 text-sm py-8 text-center">No orders yet.</p>
            ) : (
              <div className="flex flex-col divide-y divide-white/5">
                {recent.map(o => (
                  <div key={o.id} className="flex items-center justify-between py-3">
                    <div className="min-w-0">
                      <p className="text-sm font-semibold text-white truncate">{o.customer_name}</p>
                      <p className="text-xs text-white/40 capitalize">{o.fulfillment} · {o.status}</p>
                    </div>
                    <span className="text-sm font-bold text-white">{fmt(Number(o.total || 0))}</span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Best sellers + low stock */}
          <div className="flex flex-col gap-6">
            <div className="bg-brand-navy-dark border border-white/10 rounded-2xl p-6">
              <h2 className="font-bebas text-2xl tracking-wide mb-5">Best Sellers</h2>
              {stats.best.length === 0 ? (
                <p className="text-white/40 text-sm py-4 text-center">No sales yet.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {stats.best.map(([name, qty]) => (
                    <div key={name} className="flex items-center justify-between">
                      <span className="text-sm text-white/80 truncate mr-4">{name}</span>
                      <span className="text-xs font-bold text-brand-yellow whitespace-nowrap">{qty} sold</span>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="bg-brand-navy-dark border border-white/10 rounded-2xl p-6">
              <h2 className="font-bebas text-2xl tracking-wide mb-5">Low Stock Alerts</h2>
              {stats.lowStock.length === 0 ? (
                <p className="text-white/40 text-sm py-4 text-center">Everything's well stocked.</p>
              ) : (
                <div className="flex flex-col gap-3">
                  {stats.lowStock.map(p => (
                    <div key={p.id} className="flex items-center justify-between">
                      <span className="text-sm text-white/80 truncate mr-4">{p.name}</span>
                      <span className="text-xs font-bold text-red-400 whitespace-nowrap">{p.stock} left</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </AdminLayout>
    </>
  )
}
