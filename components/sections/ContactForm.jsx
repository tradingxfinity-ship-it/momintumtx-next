import { useState } from 'react'
import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const contactDetails = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
        <circle cx="12" cy="9" r="2.5" />
      </svg>
    ),
    label: 'Address',
    value: '7121 W US Hwy 90 #214\nSan Antonio, TX 78227',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6A19.79 19.79 0 012.12 4.18 2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
      </svg>
    ),
    label: 'Phone',
    value: '+1 (210) 614-9425',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: 'Email',
    value: 'info@momintumtx.com',
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="18" height="18">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: 'Hours',
    value: 'Mon–Sat: 11AM – 8PM\nSun: 12PM – 6PM',
  },
]

export default function ContactForm() {
  const [form, setForm] = useState({ name: '', email: '', message: '' })
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  const inputCls = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none focus:border-brand-yellow/50 transition-all duration-200'

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise(r => setTimeout(r, 1000))
    setLoading(false)
    setSent(true)
  }

  return (
    <section id="contact-form" className="py-24 lg:py-32 relative overflow-hidden">

      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/store-1.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover pointer-events-none select-none"
      />

      {/* Linear gradient overlay — left to right, solid blue to transparent */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(to right, #021e33 40%, #021e3399 70%, #021e3366 100%)',
        }}
      />

      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        <div className="grid lg:grid-cols-2 gap-12 items-center">

        {/* ── Left: heading + contact details ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-4">Get In Touch</p>
          <h2
            className="font-bebas text-white leading-none tracking-wide mb-6"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Contact <span className="text-brand-yellow">Us</span>
          </h2>
          <p className="text-white/45 text-base leading-relaxed mb-10 max-w-md">
            Questions, inquiries, or just want to say hi — we'd love to hear from you.
          </p>

          <div className="flex flex-col gap-6">
            {contactDetails.map(({ icon, label, value }) => (
              <div key={label} className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-white/8 border border-white/10 flex items-center justify-center text-brand-yellow flex-shrink-0">
                  {icon}
                </div>
                <div>
                  <p className="text-xs font-bold text-white/40 uppercase tracking-wider mb-1">{label}</p>
                  {value.split('\n').map(line => (
                    <p key={line} className="text-sm text-white/70">{line}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* ── Right: form ── */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
          className="bg-brand-navy-dark rounded-3xl p-8 border border-white/10"
        >
          {sent ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 rounded-full bg-brand-yellow/15 border border-brand-yellow/30 flex items-center justify-center mx-auto mb-6">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffe100" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="font-bebas text-4xl text-white tracking-wide mb-3">Message Sent!</h3>
              <p className="text-white/50 mb-8">We'll get back to you as soon as possible.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', email: '', message: '' }) }}
                className="text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors"
              >
                Send another →
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
              <div className="grid sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Name *</label>
                  <input type="text" required placeholder="Your name" value={form.name}
                    onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className={inputCls} />
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Email *</label>
                  <input type="email" required placeholder="your@email.com" value={form.email}
                    onChange={e => setForm(f => ({ ...f, email: e.target.value }))} className={inputCls} />
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold text-white/40 uppercase tracking-wider">Message *</label>
                <textarea required rows={5} placeholder="How can we help?"
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className={`${inputCls} resize-none`} />
              </div>

              <button type="submit" disabled={loading}
                className="w-full py-4 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors duration-200 disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14">
                      <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" strokeLinecap="round" />
                    </svg>
                    Sending...
                  </>
                ) : 'Send Message →'}
              </button>
            </form>
          )}
        </motion.div>

        </div>{/* end grid */}
      </div>
    </section>
  )
}
