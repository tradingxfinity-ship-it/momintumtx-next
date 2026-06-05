import { motion } from 'framer-motion'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 36 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.75, ease, delay },
})

const words = [
  { text: 'BUY.',   color: 'text-white' },
  { text: 'TRADE.', color: 'text-brand-yellow' },
  { text: 'SELL.',  color: 'text-white' },
]


export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[85vh] lg:h-screen flex flex-col items-center justify-center overflow-hidden"
    >
      {/* ── Background image ── */}
      <div className="absolute inset-0 z-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/hero-bg.webp"
          alt=""
          className="absolute inset-0 w-full h-full object-cover object-[center_60%]"
        />
        {/* Main dark overlay */}
        <div className="absolute inset-0 bg-brand-navy-dark/88" />
        {/* Gradient from bottom */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark via-brand-navy-dark/60 to-brand-navy-dark/70" />
      </div>

      {/* Subtle grid */}
      <div className="absolute inset-0 z-[1] bg-grid opacity-15 pointer-events-none" />

      {/* Yellow glow behind text */}
      <div
        className="absolute z-[1] pointer-events-none"
        style={{
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(255,225,0,0.04) 0%, transparent 70%)',
        }}
      />

      {/* ── Content ── */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 flex flex-col items-center text-center">

        {/* Badge */}
        <motion.div {...fadeUp(0.1)} className="mb-6 lg:mb-10">
          <span className="inline-flex items-center gap-2.5 bg-white/7 border border-white/12 text-brand-yellow text-[11px] font-bold tracking-[0.22em] uppercase px-5 py-2.5 rounded-full">
            <motion.span
              className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block"
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            San Antonio&apos;s #1 Card Shop
          </span>
        </motion.div>

        {/* Headline — BUY. TRADE. SELL. */}
        <div className="mb-6 select-none flex flex-col gap-2 lg:flex-row lg:items-center lg:gap-6">
          {words.map((word, i) => (
            <motion.p
              key={word.text}
              className={`font-bebas leading-[0.85] tracking-wide ${word.color}`}
              style={{ fontSize: 'clamp(3.5rem, 18vw, 7rem)' }}
              initial={{ opacity: 0, y: 40, skewY: 2 }}
              animate={{ opacity: 1, y: 0, skewY: 0 }}
              transition={{ duration: 0.7, ease, delay: 0.2 + i * 0.12 }}
            >
              {word.text}
            </motion.p>
          ))}
        </div>

        {/* Divider pill */}
        <motion.div {...fadeUp(0.58)} className="flex items-center gap-3 mb-6">
          <div className="h-px w-8 bg-white/20" />
          <span className="text-[11px] text-white/70 tracking-[0.2em] uppercase font-semibold">
            Sports · Pokémon · One Piece · Graded
          </span>
          <div className="h-px w-8 bg-white/20" />
        </motion.div>

        {/* CTAs */}
        <motion.div
          {...fadeUp(0.74)}
          className="flex gap-3 justify-center"
        >
          <Button href="#sell" variant="primary" size="md">
            Sell Your Cards
          </Button>
          <Button href="#contact" variant="outline" size="md">
            Find Us
          </Button>
        </motion.div>

      </div>

      {/* Scroll hint — desktop only */}
      <motion.div
        className="hidden lg:flex absolute bottom-6 left-1/2 -translate-x-1/2 flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.6 }}
      >
        <span className="text-[10px] text-white/25 tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/25 to-transparent"
          animate={{ scaleY: [1, 0.4, 1], opacity: [0.25, 0.7, 0.25] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
        />
      </motion.div>
    </section>
  )
}
