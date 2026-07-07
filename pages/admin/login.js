import { useState, useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { supabase, isSupabaseConfigured } from '../../lib/supabase'

export default function AdminLogin() {
  const router = useRouter()
  const [form, setForm] = useState({ email: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const configured = isSupabaseConfigured()

  useEffect(() => {
    if (!configured) return
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace('/admin')
    })
  }, [configured, router])

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    if (!configured) { setError('Supabase is not connected yet. Add the keys first.'); return }
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({ email: form.email, password: form.password })
    setLoading(false)
    if (error) { setError(error.message); return }
    router.replace('/admin')
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/50 transition-all'

  return (
    <>
      <Head><title>Admin Login — Momintum</title></Head>
      <div className="min-h-screen bg-brand-navy-dark flex items-center justify-center px-6 font-inter">
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
        <div className="relative w-full max-w-sm">
          <div className="text-center mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo-white.png" alt="Momintum" className="h-9 w-auto mx-auto mb-4" />
            <p className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase">Admin Portal</p>
          </div>

          <form onSubmit={submit} className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email</label>
              <input type="email" required placeholder="you@momintumtx.com" value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Password</label>
              <input type="password" required placeholder="••••••••" value={form.password}
                onChange={e => setForm(f => ({ ...f, password: e.target.value }))} className={inputCls} />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>
            )}

            <button type="submit" disabled={loading}
              className="mt-2 w-full py-3.5 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors disabled:opacity-60">
              {loading ? 'Signing in…' : 'Sign In'}
            </button>
          </form>
          <p className="text-center text-white/30 text-xs mt-6">Staff access only</p>
        </div>
      </div>
    </>
  )
}
