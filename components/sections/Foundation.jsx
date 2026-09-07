import { motion } from 'framer-motion'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

const GROUPS = [
  {
    label: 'Displaced Families',
    sub: 'Rebuilding stability, one household at a time',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    label: 'Children',
    sub: 'Opportunity, mentorship and a fair start',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
      </svg>
    ),
  },
  {
    label: 'Veterans',
    sub: 'Support for those who served',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 17.6l.9-5.4L4.2 8.4l5.4-.8z" />
      </svg>
    ),
  },
  {
    label: 'Underserved Communities',
    sub: 'Resources where they’re needed most',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
        <path d="M20.8 6.6a5 5 0 00-7.1 0L12 8.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 22.5l8.8-8.8a5 5 0 000-7.1z" />
      </svg>
    ),
  },
]

export default function Foundation() {
  return (
    <section id="foundation" className="relative bg-brand-navy-dark overflow-hidden">
      {/* Top yellow accent line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow z-20" />
      {/* Faded background photo */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/foundation-hands.jpg"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12] pointer-events-none select-none"
      />
      {/* Navy wash to keep text readable over the photo */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/85 via-brand-navy-dark/70 to-brand-navy-dark/90 pointer-events-none" />
      {/* Grid + glow atmosphere */}
      <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />
      <div className="absolute -top-40 -right-24 w-[36rem] h-[36rem] bg-brand-yellow/[0.06] rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 py-24 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ─── Left: message ─── */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-5"
            >
              The Momintum Foundation
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.65, ease, delay: 0.1 }}
              className="font-bebas text-white leading-[0.95] tracking-wide mb-6"
              style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
            >
              Join Our <br className="hidden sm:block" />
              <span className="text-brand-yellow">Foundation</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease, delay: 0.2 }}
              className="text-white/60 text-base md:text-lg leading-relaxed max-w-xl mb-9"
            >
              The Momintum Foundation helps displaced families, children, veterans, and
              underserved communities find support, opportunity, and a path toward a better future.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, ease, delay: 0.3 }}
              className="flex flex-wrap items-center gap-3"
            >
              <Button href="#contact" variant="primary" size="lg">
                Get Involved →
              </Button>
              <Button href="#contact" variant="outline" size="lg">
                Partner With Us
              </Button>
            </motion.div>

            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="mt-6 text-white/35 text-xs tracking-wide"
            >
              Donate • Volunteer • Sponsor — every bit helps someone move forward.
            </motion.p>
          </div>

          {/* ─── Right: who we support ─── */}
          <motion.div
            className="relative"
            initial={{ opacity: 0, y: 32 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
          >
            {/* Panel header */}
            <div className="flex items-center gap-3 mb-5">
              <span className="h-px flex-1 bg-gradient-to-r from-transparent to-brand-yellow/40" />
              <span className="text-brand-yellow text-[11px] font-bold tracking-[0.25em] uppercase whitespace-nowrap">
                Who We Support
              </span>
              <span className="h-px flex-1 bg-gradient-to-l from-transparent to-brand-yellow/40" />
            </div>

            {/* 2×2 tile grid */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 gap-3.5"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
            >
              {GROUPS.map(({ label, sub, icon }, i) => (
                <motion.div
                  key={label}
                  variants={fadeUp}
                  transition={{ duration: 0.5, ease }}
                  whileHover={{ y: -4 }}
                  className="group relative overflow-hidden rounded-2xl border border-white/10 bg-gradient-to-b from-white/[0.06] to-white/[0.02] p-5 hover:border-brand-yellow/40 transition-colors duration-300"
                >
                  {/* Index watermark */}
                  <span className="absolute -top-2 -right-1 font-bebas text-white/[0.06] group-hover:text-brand-yellow/15 transition-colors duration-300 leading-none select-none" style={{ fontSize: '4.5rem' }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  {/* Hover glow */}
                  <span className="absolute inset-x-0 -bottom-16 h-24 bg-brand-yellow/20 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                  <span className="relative z-10 inline-grid place-items-center w-12 h-12 rounded-xl bg-brand-yellow/12 text-brand-yellow border border-brand-yellow/25 group-hover:bg-brand-yellow group-hover:text-brand-navy-dark group-hover:scale-105 transition-all duration-300">
                    {icon}
                  </span>
                  <p className="relative z-10 mt-4 text-white font-bold text-[15px] leading-tight">{label}</p>
                  <p className="relative z-10 mt-1.5 text-white/45 text-xs leading-snug">{sub}</p>
                </motion.div>
              ))}
            </motion.div>

            {/* Footer strip */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="mt-3.5 flex items-center gap-3 rounded-2xl border border-brand-yellow/20 bg-brand-yellow/[0.06] px-5 py-3.5"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="#ffe100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="20" height="20" className="shrink-0">
                <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 10-7.78 7.78L12 21.23l8.84-8.84a5.5 5.5 0 000-7.78z" />
              </svg>
              <p className="text-white/70 text-xs leading-snug">
                <span className="text-white font-semibold">100% community-focused.</span> Every contribution goes toward real support for the people who need it most.
              </p>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-30" />
    </section>
  )
}
