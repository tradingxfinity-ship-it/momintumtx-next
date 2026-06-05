import { motion } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

export default function Contact() {
  return (
    <section id="contact" className="py-24 lg:py-32 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-brand-navy text-xs font-bold tracking-[0.25em] uppercase mb-4">Find Us</p>
          <h2
            className="font-bebas text-brand-navy-dark leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Visit <span className="text-brand-navy">Momintum</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm">7121 W US Hwy 90 #214 · San Antonio, TX 78227</p>
        </motion.div>

        {/* Map */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, ease }}
          className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/10 border border-slate-200"
        >
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3469.6!2d-98.624!3d29.426!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjnCsDI1JzMzLjYiTiA5OMKwMzcnMjYuNCJX!5e0!3m2!1sen!2sus!4v1"
            width="100%"
            height="500"
            style={{ border: 0, display: 'block' }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Momintum location"
          />

          {/* Floating directions button */}
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <a
              href="https://maps.google.com/?q=7121+W+US+Hwy+90+%23214,+San+Antonio,+TX+78227"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 bg-brand-navy-dark text-white text-sm font-bold rounded-full shadow-xl hover:bg-brand-navy transition-colors duration-200"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
                <polygon points="3 11 22 2 13 21 11 13 3 11" />
              </svg>
              Get Directions
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
