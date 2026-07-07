import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

const GridIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <rect x="3" y="3" width="7" height="7" /><rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" /><rect x="3" y="14" width="7" height="7" />
  </svg>
)
const BoxIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z" />
    <polyline points="3.27 6.96 12 12.01 20.73 6.96" /><line x1="12" y1="22.08" x2="12" y2="12" />
  </svg>
)
const ReceiptIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
    <path d="M4 2v20l2-1 2 1 2-1 2 1 2-1 2 1 2-1 2 1V2l-2 1-2-1-2 1-2-1-2 1-2-1-2 1z" />
    <line x1="8" y1="7" x2="16" y2="7" /><line x1="8" y1="11" x2="16" y2="11" />
  </svg>
)

const NAV = [
  { label: 'Dashboard', href: '/admin', Icon: GridIcon },
  { label: 'Products', href: '/admin/products', Icon: BoxIcon },
  { label: 'Orders', href: '/admin/orders', Icon: ReceiptIcon },
]

export default function AdminLayout({ title, children, actions }) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [ready, setReady] = useState(false)
  const configured = isSupabaseConfigured()

  // Auth guard — only enforced once Supabase is connected.
  useEffect(() => {
    if (!configured) { setReady(true); return }
    let active = true
    supabase.auth.getSession().then(({ data }) => {
      if (!active) return
      if (!data.session) {
        router.replace('/admin/login')
      } else {
        setEmail(data.session.user.email || '')
        setReady(true)
      }
    })
    const { data: sub } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) router.replace('/admin/login')
    })
    return () => { active = false; sub?.subscription?.unsubscribe() }
  }, [configured, router])

  const logout = async () => {
    if (supabase) await supabase.auth.signOut()
    router.replace('/admin/login')
  }

  if (!ready) {
    return (
      <div className="min-h-screen bg-brand-navy-dark flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-brand-yellow border-t-transparent rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#01151f] text-white font-inter flex">
      {/* Sidebar */}
      <aside className={`fixed lg:static inset-y-0 left-0 z-40 w-64 bg-brand-navy-dark border-r border-white/10 flex flex-col transition-transform duration-300 ${open ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="h-20 flex items-center px-6 border-b border-white/10">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo-white.png" alt="Momintum" className="h-7 w-auto" />
          <span className="ml-3 text-[10px] font-bold tracking-[0.2em] uppercase text-brand-yellow">Admin</span>
        </div>
        <nav className="flex-1 p-4 flex flex-col gap-1">
          {NAV.map(({ label, href, Icon }) => {
            const active = router.pathname === href
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold transition-colors ${
                  active ? 'bg-brand-yellow text-brand-navy-dark' : 'text-white/60 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon />{label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-white/10">
          {email && <p className="px-4 pb-3 text-xs text-white/40 truncate">{email}</p>}
          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-semibold text-white/60 hover:text-white hover:bg-white/5 transition-colors"
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
              <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><polyline points="16 17 21 12 16 7" /><line x1="21" y1="12" x2="9" y2="12" />
            </svg>
            Log out
          </button>
          <Link href="/" className="block mt-1 px-4 py-2 text-xs text-white/30 hover:text-white/60 transition-colors">← Back to site</Link>
        </div>
      </aside>

      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={() => setOpen(false)} />}

      {/* Main */}
      <div className="flex-1 min-w-0 flex flex-col">
        <header className="h-20 flex items-center justify-between px-6 lg:px-10 border-b border-white/10 bg-brand-navy-dark/50 sticky top-0 z-20 backdrop-blur">
          <div className="flex items-center gap-4">
            <button onClick={() => setOpen(true)} className="lg:hidden text-white" aria-label="Menu">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><line x1="3" y1="6" x2="21" y2="6" /><line x1="3" y1="12" x2="21" y2="12" /><line x1="3" y1="18" x2="21" y2="18" /></svg>
            </button>
            <h1 className="font-bebas text-3xl tracking-wide text-white leading-none">{title}</h1>
          </div>
          {actions}
        </header>

        {!configured && (
          <div className="mx-6 lg:mx-10 mt-6 rounded-xl border border-brand-yellow/40 bg-brand-yellow/10 px-4 py-3 text-sm text-brand-yellow">
            Preview mode — connect Supabase (add the keys + redeploy) to load live data and enable login.
          </div>
        )}

        <main className="flex-1 p-6 lg:p-10">{children}</main>
      </div>
    </div>
  )
}
