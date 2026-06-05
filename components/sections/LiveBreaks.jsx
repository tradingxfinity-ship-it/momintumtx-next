import { motion } from 'framer-motion'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

export default function LiveBreaks() {
  return (
    <section id="breaks" className="relative bg-brand-navy-dark overflow-hidden py-24 lg:py-32">

      {/* Background image */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/about-1.webp"
        alt=""
        aria-hidden="true"
        className="absolute inset-0 w-full h-full object-cover opacity-20 pointer-events-none select-none"
      />

      {/* Circular gradient overlay — darkens edges, keeps center readable */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 80% at 50% 50%, transparent 0%, #021e33 70%)',
        }}
      />

      {/* Extra top/bottom fade so it blends into adjacent sections */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-brand-navy-dark to-transparent pointer-events-none" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-brand-navy-dark to-transparent pointer-events-none" />

      {/* Grid texture */}
      <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

      {/* Glow blob */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#aaff00]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* ── Left: text ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.1 }}
          >
            <motion.p
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="text-[#aaff00] text-xs font-bold tracking-[0.25em] uppercase mb-4"
            >
              Stream With Us
            </motion.p>

            <motion.h2
              variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.65, ease }}
              className="font-bebas text-white leading-none tracking-wide mb-6"
              style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
            >
              Live Breaks{' '}
              <span className="text-[#aaff00]">on Whatnot</span>
            </motion.h2>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
              className="text-white/55 text-base md:text-lg leading-relaxed mb-4 max-w-lg"
            >
              Can't make it in store? Join our live break streams for a chance to pull big hits from home.
            </motion.p>

            <motion.p
              variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.6, ease }}
              className="text-white/45 text-sm leading-relaxed mb-10 max-w-lg"
            >
              Our main channel <span className="text-white/75 font-semibold">Hit Lab Breaks</span> features epic random team breaks with top-tier NBA and NFL cards. Our secondary channel <span className="text-white/75 font-semibold">Hit Lab Rips</span> covers Pokémon, One Piece, and fast-paced TCG rips.
            </motion.p>

            <motion.div
              variants={{ hidden: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="flex flex-wrap gap-3"
            >
              <Button href="https://www.whatnot.com" variant="primary" size="lg">
                Watch on Whatnot →
              </Button>
            </motion.div>

            {/* Channel tags */}
            <motion.div
              variants={{ hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 0.5, ease }}
              className="flex gap-3 mt-8"
            >
              {['Hit Lab Breaks', 'Hit Lab Rips'].map((name) => (
                <span
                  key={name}
                  className="text-xs font-semibold text-white/40 bg-white/5 border border-white/8 rounded-full px-3 py-1"
                >
                  {name}
                </span>
              ))}
            </motion.div>
          </motion.div>

          {/* ── Right: 3D spinning logo ── */}
          <motion.div
            className="flex items-center justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, ease }}
          >
            <div style={{ perspective: '900px' }}>
              {/* Outer glow ring */}
              <motion.div
                className="relative"
                animate={{ rotateY: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
                style={{ transformStyle: 'preserve-3d' }}
              >
                {/* Glow halo */}
                <div
                  className="absolute inset-0 rounded-full pointer-events-none"
                  style={{
                    boxShadow: '0 0 60px 20px rgba(170,255,0,0.18), 0 0 120px 40px rgba(170,255,0,0.08)',
                  }}
                />
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hitlab-logo.png"
                  alt="Hit Lab Breaks"
                  className="w-64 h-64 md:w-80 md:h-80 object-contain select-none"
                  draggable={false}
                />
              </motion.div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
