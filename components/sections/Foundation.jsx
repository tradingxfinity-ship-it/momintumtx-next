import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const GROUPS = [
  {
    label: 'Displaced Families',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M3 10.5L12 3l9 7.5" />
        <path d="M5 9.5V21h14V9.5" />
        <path d="M9 21v-6h6v6" />
      </svg>
    ),
  },
  {
    label: 'Children',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <circle cx="12" cy="7" r="3.5" />
        <path d="M5.5 21a6.5 6.5 0 0113 0" />
      </svg>
    ),
  },
  {
    label: 'Veterans',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M12 2l2.4 4.9 5.4.8-3.9 3.8.9 5.4L12 15.9 7.2 17.6l.9-5.4L4.2 8.4l5.4-.8z" />
      </svg>
    ),
  },
  {
    label: 'Underserved Communities',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="26" height="26">
        <path d="M20.8 6.6a5 5 0 00-7.1 0L12 8.3l-1.7-1.7a5 5 0 10-7.1 7.1L12 22.5l8.8-8.8a5 5 0 000-7.1z" />
      </svg>
    ),
  },
]

export default function Foundation() {
  return (
    <section id="foundation" className="relative bg-brand-navy-dark py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />
      <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[40rem] h-[40rem] bg-brand-yellow/5 rounded-full blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Give Back
          </p>
          <h2
            className="font-bebas text-white leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Join Our <span className="text-brand-yellow">Foundation</span>
          </h2>
          <p className="mt-5 text-white/55 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
            The Momintum Foundation helps displaced families, children, veterans, and
            underserved communities find support, opportunity, and a path toward a better future.
          </p>
        </motion.div>

        {/* Who we help */}
        <motion.div
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, ease, delay: 0.1 }}
        >
          {GROUPS.map(({ label, icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center gap-3 rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-6 hover:border-brand-yellow/30 hover:bg-white/[0.05] transition-all duration-200"
            >
              <span className="text-brand-yellow">{icon}</span>
              <span className="text-sm font-semibold text-white/75 leading-snug">{label}</span>
            </div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.2 }}
        >
          <a
            href="#contact"
            className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors duration-200"
          >
            Get Involved →
          </a>
          <p className="mt-4 text-white/40 text-xs">
            Donate, volunteer, or partner with us — every bit helps someone move forward.
          </p>
        </motion.div>

      </div>
    </section>
  )
}
