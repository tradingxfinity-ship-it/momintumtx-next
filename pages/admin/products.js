import { useEffect, useState } from 'react'
import Head from 'next/head'
import AdminLayout from '../../components/admin/AdminLayout'
import { fetchProducts, saveProduct, deleteProduct } from '../../lib/db/products'
import { supabase } from '../../lib/supabase'
import { CATEGORIES } from '../../data/products'

const fmt = (n) => Number(n).toLocaleString('en-US', { style: 'currency', currency: 'USD' })
const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 40)

const BLANK = { id: '', name: '', price: '', category: CATEGORIES[0], image: '', stock: '', featured: false, description: '' }

async function uploadImage(file) {
  const ext = (file.name.split('.').pop() || 'jpg').toLowerCase()
  const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
  const { error } = await supabase.storage.from('cards').upload(path, file, { upsert: false })
  if (error) throw new Error(error.message)
  return supabase.storage.from('cards').getPublicUrl(path).data.publicUrl
}

export default function AdminProducts() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [editing, setEditing] = useState(null) // product object or null
  const [form, setForm] = useState(BLANK)
  const [isNew, setIsNew] = useState(false)
  const [busy, setBusy] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  const load = () => { setLoading(true); fetchProducts().then(p => { setProducts(p); setLoading(false) }) }
  useEffect(load, [])

  const openNew = () => { setForm(BLANK); setIsNew(true); setEditing({}); setError('') }
  const openEdit = (p) => { setForm({ ...p, price: String(p.price), stock: String(p.stock) }); setIsNew(false); setEditing(p); setError('') }
  const close = () => { setEditing(null); setError('') }
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }))

  const onFile = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    setUploading(true); setError('')
    try {
      const url = await uploadImage(file)
      setForm(f => ({ ...f, image: url }))
    } catch (err) { setError(err.message) }
    finally { setUploading(false) }
  }

  const submit = async (e) => {
    e.preventDefault()
    setError(''); setBusy(true)
    try {
      const payload = {
        id: isNew ? `${slugify(form.name)}-${Math.random().toString(36).slice(2, 6)}` : form.id,
        name: form.name.trim(),
        price: Number(form.price),
        category: form.category,
        image: form.image.trim(),
        stock: parseInt(form.stock, 10) || 0,
        featured: !!form.featured,
        description: form.description.trim(),
      }
      await saveProduct(payload)
      close(); load()
    } catch (err) { setError(err.message) }
    finally { setBusy(false) }
  }

  const remove = async (p) => {
    if (!confirm(`Delete "${p.name}"? This can't be undone.`)) return
    try { await deleteProduct(p.id); load() } catch (err) { alert(err.message) }
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/50 transition-all'

  return (
    <>
      <Head><title>Products — Momintum Admin</title></Head>
      <AdminLayout
        title="Products"
        actions={
          <button onClick={openNew} className="px-5 py-2.5 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors">
            + Add Card
          </button>
        }
      >
        {loading ? (
          <p className="text-white/40 text-sm">Loading…</p>
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-white/40">
            <p className="mb-4">No cards yet.</p>
            <button onClick={openNew} className="px-5 py-2.5 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full">Add your first card</button>
          </div>
        ) : (
          <div className="bg-brand-navy-dark border border-white/10 rounded-2xl overflow-hidden">
            <div className="hidden md:grid grid-cols-[60px_1fr_140px_100px_90px_110px] gap-4 px-5 py-3 text-[11px] font-bold uppercase tracking-wider text-white/40 border-b border-white/10">
              <span></span><span>Name</span><span>Category</span><span>Price</span><span>Stock</span><span className="text-right">Actions</span>
            </div>
            <div className="divide-y divide-white/5">
              {products.map(p => (
                <div key={p.id} className="grid grid-cols-[60px_1fr_auto] md:grid-cols-[60px_1fr_140px_100px_90px_110px] gap-4 px-5 py-3 items-center">
                  <div className="w-12 h-12 rounded-lg bg-white/10 flex items-center justify-center overflow-hidden p-1">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    {p.image ? <img src={p.image} alt="" className="w-full h-full object-contain" /> : <span className="text-white/20 text-xs">—</span>}
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-semibold text-white truncate">{p.name} {p.featured && <span className="text-brand-yellow text-[10px]">★</span>}</p>
                    <p className="text-xs text-white/40 md:hidden">{p.category} · {fmt(p.price)} · {p.stock <= 0 ? 'Sold out' : `${p.stock} in stock`}</p>
                  </div>
                  <span className="hidden md:block text-sm text-white/60">{p.category}</span>
                  <span className="hidden md:block text-sm text-white/80">{fmt(p.price)}</span>
                  <span className={`hidden md:block text-sm ${p.stock <= 0 ? 'text-red-400' : p.stock <= 2 ? 'text-amber-400' : 'text-white/80'}`}>{p.stock}</span>
                  <div className="flex items-center justify-end gap-2">
                    <button onClick={() => openEdit(p)} className="px-3 py-1.5 text-xs font-semibold rounded-full bg-white/10 text-white hover:bg-white/20">Edit</button>
                    <button onClick={() => remove(p)} aria-label="Delete" className="w-7 h-7 flex items-center justify-center rounded-full text-white/40 hover:text-white hover:bg-red-500/70">
                      <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="12" height="12"><path d="M3 3l10 10M13 3L3 13" /></svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Add / edit modal */}
        {editing && (
          <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4 py-10" onClick={close}>
            <form
              onClick={e => e.stopPropagation()}
              onSubmit={submit}
              className="w-full max-w-lg bg-brand-navy-dark border border-white/10 rounded-2xl p-6 flex flex-col gap-4"
            >
              <div className="flex items-center justify-between">
                <h2 className="font-bebas text-2xl tracking-wide">{isNew ? 'Add Card' : 'Edit Card'}</h2>
                <button type="button" onClick={close} className="text-white/40 hover:text-white text-xl leading-none">✕</button>
              </div>

              {/* Image */}
              <div className="flex items-center gap-4">
                <div className="w-20 h-20 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center overflow-hidden p-1 flex-shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  {form.image ? <img src={form.image} alt="" className="w-full h-full object-contain" /> : <span className="text-white/20 text-[10px]">No image</span>}
                </div>
                <div className="flex-1">
                  <label className="inline-flex items-center px-4 py-2 bg-white/10 text-white text-xs font-semibold rounded-full cursor-pointer hover:bg-white/20">
                    {uploading ? 'Uploading…' : 'Upload photo'}
                    <input type="file" accept="image/*" className="hidden" onChange={onFile} disabled={uploading} />
                  </label>
                  <input placeholder="…or paste an image URL" value={form.image} onChange={set('image')} className={`${inputCls} mt-2`} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Name</label>
                <input required value={form.name} onChange={set('name')} className={inputCls} placeholder="Charizard Base Set — PSA 9" />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Price ($)</label>
                  <input required type="number" step="0.01" min="0" value={form.price} onChange={set('price')} className={inputCls} placeholder="899.00" />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Stock</label>
                  <input required type="number" min="0" value={form.stock} onChange={set('stock')} className={inputCls} placeholder="1" />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Category</label>
                <select value={form.category} onChange={set('category')} className={inputCls}>
                  {CATEGORIES.map(c => <option key={c} value={c} className="bg-brand-navy-dark">{c}</option>)}
                </select>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Description</label>
                <textarea rows={3} value={form.description} onChange={set('description')} className={`${inputCls} resize-none`} placeholder="Short blurb shown on the card." />
              </div>

              <label className="flex items-center gap-3 text-sm text-white/70 cursor-pointer">
                <input type="checkbox" checked={form.featured} onChange={set('featured')} className="w-4 h-4 accent-brand-yellow" />
                Feature this card (highlighted near the top)
              </label>

              {error && <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">{error}</div>}

              <div className="flex gap-3 mt-2">
                <button type="button" onClick={close} className="flex-1 py-3 rounded-full bg-white/10 text-white text-sm font-bold hover:bg-white/20">Cancel</button>
                <button type="submit" disabled={busy || uploading} className="flex-1 py-3 rounded-full bg-brand-yellow text-brand-navy-dark text-sm font-bold hover:bg-brand-yellow-dark disabled:opacity-60">
                  {busy ? 'Saving…' : isNew ? 'Add Card' : 'Save Changes'}
                </button>
              </div>
            </form>
          </div>
        )}
      </AdminLayout>
    </>
  )
}
