import { useState, useRef } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const MAX_FILES = 10
const MAX_MB = 5

const CARD_TYPES = [
  'Pokémon TCG',
  'One Piece TCG',
  'Sports Cards',
  'Graded Slabs',
  'Sealed Product',
  'Singles',
  'Other',
]

const CONDITIONS = [
  { label: 'Mint', sub: 'Perfect, unplayed' },
  { label: 'Near Mint', sub: 'Minimal wear' },
  { label: 'Lightly Played', sub: 'Minor surface wear' },
  { label: 'Moderately Played', sub: 'Visible wear' },
  { label: 'Heavily Played', sub: 'Heavy wear/creases' },
  { label: 'Poor', sub: 'Damaged' },
]

function UploadIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="32" height="32">
      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" />
      <polyline points="17 8 12 3 7 8" />
      <line x1="12" y1="3" x2="12" y2="15" />
    </svg>
  )
}

function CloseIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" width="12" height="12">
      <path d="M3 3l10 10M13 3L3 13" />
    </svg>
  )
}

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY
const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit'
const IMGBB_API_KEY = process.env.NEXT_PUBLIC_IMGBB_API_KEY

// Uploads one image to ImgBB and returns its hosted URL.
async function uploadToImgbb(file) {
  const fd = new FormData()
  fd.append('image', file)
  const res = await fetch(`https://api.imgbb.com/1/upload?key=${IMGBB_API_KEY}`, {
    method: 'POST',
    body: fd,
  })
  const body = await res.json().catch(() => ({}))
  if (!res.ok || !body?.data?.url) {
    throw new Error(`Couldn't upload "${file.name}". Please try again.`)
  }
  return body.data.url
}

export default function SellForm() {
  const fileRef = useRef(null)
  const [previews, setPreviews] = useState([])
  const [dragOver, setDragOver] = useState(false)
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [form, setForm] = useState({ name: '', email: '', phone: '', description: '' })
  const [cardTypes, setCardTypes] = useState([])
  const [conditions, setConditions] = useState([])

  const toggleItem = (setter, value) =>
    setter(prev => prev.includes(value) ? prev.filter(v => v !== value) : [...prev, value])

  const addFiles = (files) => {
    const valid = [...files]
      .filter(f => f.type.startsWith('image/'))
      .filter(f => f.size <= MAX_MB * 1024 * 1024)
      .slice(0, MAX_FILES - previews.length)

    valid.forEach(file => {
      const reader = new FileReader()
      reader.onload = (e) => {
        setPreviews(prev => {
          if (prev.length >= MAX_FILES) return prev
          return [...prev, { url: e.target.result, name: file.name, file }]
        })
      }
      reader.readAsDataURL(file)
    })
  }

  const removeFile = (i) => setPreviews(prev => prev.filter((_, idx) => idx !== i))

  const handleDrop = (e) => {
    e.preventDefault()
    setDragOver(false)
    addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!WEB3FORMS_ACCESS_KEY) {
      setLoading(false)
      setError('Form access key not configured. Set NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY in .env.local.')
      return
    }

    if (previews.length > 0 && !IMGBB_API_KEY) {
      setLoading(false)
      setError('Image host not configured. Set NEXT_PUBLIC_IMGBB_API_KEY in .env.local.')
      return
    }

    try {
      // Upload photos to ImgBB first, then pass the hosted links to Web3Forms.
      const photoUrls = await Promise.all(previews.map(p => uploadToImgbb(p.file)))

      const data = new FormData()
      data.append('access_key', WEB3FORMS_ACCESS_KEY)
      data.append('subject', `New sell-card submission from ${form.name}`)
      data.append('from_name', 'Momintum Sell Form')
      data.append('replyto', form.email)
      data.append('name', form.name)
      data.append('email', form.email)
      data.append('phone', form.phone)
      data.append('description', form.description)
      data.append('card_types', cardTypes.join(', ') || '—')
      data.append('conditions', conditions.join(', ') || '—')
      data.append('photos', photoUrls.length ? photoUrls.join('\n') : 'No photos uploaded')

      const res = await fetch(WEB3FORMS_ENDPOINT, {
        method: 'POST',
        body: data,
      })

      const body = await res.json().catch(() => ({}))
      if (!res.ok || !body.success) {
        throw new Error(body.message || `Submission failed (${res.status}).`)
      }

      setSubmitted(true)
    } catch (err) {
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/50 focus:bg-white/8 transition-all duration-200'

  if (submitted) {
    return (
      <section id="sell-form" className="relative bg-brand-navy-dark py-24 lg:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
        <div className="relative z-10 max-w-xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, ease }}
          >
            <div className="w-16 h-16 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center mx-auto mb-6">
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffe100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                <polyline points="20 6 9 17 4 12" />
              </svg>
            </div>
            <h3 className="font-bebas text-4xl text-white tracking-wide mb-3">Submission Received!</h3>
            <p className="text-white/55 text-base leading-relaxed mb-8">
              Thanks! We'll review your cards and get back to you within 24 hours with an offer.
            </p>
            <button
              onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', description: '' }); setPreviews([]); setCardTypes([]); setConditions([]); setError('') }}
              className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors duration-200"
            >
              Submit another collection →
            </button>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="sell-form" className="relative bg-white pt-8 pb-24 lg:pb-32 overflow-hidden">

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-brand-navy text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Get a Quote
          </p>
          <h2
            className="font-bebas text-brand-navy-dark leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Sell Your Cards <span className="text-brand-navy">Online</span>
          </h2>
          <p className="mt-4 text-slate-500 text-base max-w-lg mx-auto">
            Upload photos of your cards or collection. We'll review and send you a fair offer within 24 hours.
          </p>
        </motion.div>

        {/* Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="bg-brand-navy-dark border border-white/8 rounded-3xl p-8 lg:p-10 flex flex-col gap-5 shadow-sm"
        >

          {/* Name + Email */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Name *</label>
              <input
                type="text"
                required
                placeholder="Your name"
                value={form.name}
                onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                className={inputCls}
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Email *</label>
              <input
                type="email"
                required
                placeholder="your@email.com"
                value={form.email}
                onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                className={inputCls}
              />
            </div>
          </div>

          {/* Phone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Phone <span className="normal-case text-white/25">(optional)</span></label>
            <input
              type="tel"
              placeholder="(210) 000-0000"
              value={form.phone}
              onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
              className={inputCls}
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">What are you selling? *</label>
            <textarea
              required
              rows={3}
              placeholder="e.g. Pokémon Base Set collection, PSA graded slabs, sports card binder..."
              value={form.description}
              onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
              className={`${inputCls} resize-none`}
            />
          </div>

          {/* Card type */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Type of Card</label>
            <div className="flex flex-wrap gap-2">
              {CARD_TYPES.map(type => {
                const active = cardTypes.includes(type)
                return (
                  <button
                    key={type}
                    type="button"
                    onClick={() => toggleItem(setCardTypes, type)}
                    className={`px-4 py-2 rounded-full text-xs font-semibold border transition-all duration-150 ${
                      active
                        ? 'bg-brand-yellow text-brand-navy-dark border-brand-yellow'
                        : 'bg-white/5 text-white/60 border-white/10 hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/10'
                    }`}
                  >
                    {active && <span className="mr-1">✓</span>}{type}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Condition */}
          <div className="flex flex-col gap-2">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">Condition</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {CONDITIONS.map(({ label, sub }) => {
                const active = conditions.includes(label)
                return (
                  <button
                    key={label}
                    type="button"
                    onClick={() => toggleItem(setConditions, label)}
                    className={`flex flex-col items-start px-4 py-3 rounded-xl border text-left transition-all duration-150 ${
                      active
                        ? 'bg-brand-yellow text-brand-navy-dark border-brand-yellow'
                        : 'bg-white/5 text-white/70 border-white/10 hover:border-brand-yellow hover:text-brand-yellow hover:bg-brand-yellow/10'
                    }`}
                  >
                    <span className="text-xs font-bold flex items-center gap-1.5">
                      {active && '✓ '}{label}
                    </span>
                    <span className={`text-[10px] mt-0.5 ${active ? 'text-brand-navy-dark/60' : 'text-white/30'}`}>{sub}</span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Upload zone */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-white/50 uppercase tracking-wider">
              Photos <span className="normal-case text-white/25">(up to {MAX_FILES} images, {MAX_MB}MB each)</span>
            </label>

            <div
              onClick={() => fileRef.current?.click()}
              onDragOver={(e) => { e.preventDefault(); setDragOver(true) }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              className={`relative border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all duration-200 ${
                dragOver
                  ? 'border-brand-yellow/60 bg-brand-yellow/5'
                  : 'border-white/15 bg-white/3 hover:border-white/30 hover:bg-white/5'
              }`}
            >
              <span className="text-white/25">
                <UploadIcon />
              </span>
              <div className="text-center">
                <p className="text-sm font-semibold text-white/50">Drop images here or <span className="text-brand-yellow font-bold">browse</span></p>
                <p className="text-xs text-white/30 mt-1">JPG, PNG, HEIC — up to {MAX_FILES} photos</p>
              </div>
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={e => addFiles(e.target.files)}
              />
            </div>

            {/* Preview grid */}
            {previews.length > 0 && (
              <div className="grid grid-cols-4 sm:grid-cols-5 gap-2 mt-2">
                {previews.map((p, i) => (
                  <div key={i} className="relative group aspect-square rounded-xl overflow-hidden border border-white/10">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={p.url} alt={p.name} className="w-full h-full object-cover" />
                    <button
                      type="button"
                      onClick={() => removeFile(i)}
                      className="absolute top-1 right-1 w-5 h-5 rounded-full bg-black/70 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-150"
                    >
                      <CloseIcon />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Error */}
          {error && (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 px-4 py-3 text-sm text-red-200">
              {error}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="mt-2 w-full py-4 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                </svg>
                Sending...
              </>
            ) : (
              'Submit for Review →'
            )}
          </button>

        </motion.form>
      </div>
    </section>
  )
}
