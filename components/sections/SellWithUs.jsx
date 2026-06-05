import { motion } from 'framer-motion'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0 },
}

const categories = [
  {
    label: 'Sports Cards',
    icon: '🏀',
    img: 'https://images.pokemontcg.io/base1/58.png', // Pikachu — vibrant yellow
  },
  {
    label: 'Pokémon TCG',
    icon: '⚡',
    img: 'https://images.pokemontcg.io/base1/4.png',  // Charizard — iconic fire art
  },
  {
    label: 'One Piece TCG',
    icon: '☠️',
    img: 'https://images.pokemontcg.io/fossil/5.png', // Gengar — dark/dramatic
  },
  {
    label: 'Graded Slabs',
    icon: '🏆',
    img: 'https://images.pokemontcg.io/base1/10.png', // Mewtwo — prestige feel
  },
  {
    label: 'Sealed Product',
    icon: '📦',
    img: 'https://images.pokemontcg.io/base1/2.png',  // Blastoise — cool blue
  },
  {
    label: 'Collectibles',
    icon: '💎',
    img: 'https://images.pokemontcg.io/base1/15.png', // Venusaur — lush art
  },
]

// Left-side card fan: back → front, all within the hero banner (above white line)
const leftCards = [
  {
    src: 'https://images.pokemontcg.io/base1/15.png', // Venusaur — back of fan
    pos: { left: -30, top: 80 },
    rotate: -50,
    width: 96,
    zIndex: 1,
    glow: null,
    floatY: [0, -6, 0],
    floatDur: 5.2,
    delay: 0,
  },
  {
    src: 'https://images.pokemontcg.io/base1/58.png', // Pikachu — mid fan
    pos: { left: -20, top: 180 },
    rotate: -26,
    width: 108,
    zIndex: 2,
    glow: null,
    floatY: [0, -8, 0],
    floatDur: 4.3,
    delay: 0.35,
  },
  {
    src: 'https://images.pokemontcg.io/base1/4.png', // Charizard — front, fire glow
    pos: { left: -10, top: 300 },
    rotate: -7,
    width: 118,
    zIndex: 3,
    glow: '0 0 50px rgba(255,120,0,0.4), 0 0 100px rgba(255,60,0,0.18)',
    floatY: [0, -10, 0],
    floatDur: 6.1,
    delay: 0.7,
  },
]

// Right-side card fan: back → front
const rightCards = [
  {
    src: 'https://images.pokemontcg.io/base1/10.png', // Mewtwo — back of fan
    pos: { right: -30, top: 80 },
    rotate: 48,
    width: 96,
    zIndex: 1,
    glow: null,
    floatY: [0, -6, 0],
    floatDur: 5.0,
    delay: 0.15,
  },
  {
    src: 'https://images.pokemontcg.io/base1/2.png', // Blastoise — mid fan
    pos: { right: -20, top: 180 },
    rotate: 24,
    width: 108,
    zIndex: 2,
    glow: null,
    floatY: [0, -8, 0],
    floatDur: 3.9,
    delay: 0.5,
  },
  {
    src: 'https://images.pokemontcg.io/fossil/5.png', // Gengar — front, purple glow
    pos: { right: -10, top: 300 },
    rotate: 7,
    width: 118,
    zIndex: 3,
    glow: '0 0 50px rgba(160,0,220,0.4), 0 0 100px rgba(100,0,180,0.18)',
    floatY: [0, -10, 0],
    floatDur: 5.8,
    delay: 0.9,
  },
]

function PokeCard({ src, pos, rotate, width, zIndex, glow, floatY, floatDur, delay, side }) {
  const swingIn = side === 'left' ? rotate - 28 : rotate + 28
  const shadow = ['0 20px 60px rgba(0,0,0,0.75)', '0 8px 24px rgba(0,0,0,0.5)', glow]
    .filter(Boolean).join(', ')

  return (
    <div
      className="absolute pointer-events-none select-none hidden xl:block"
      style={{ width, ...pos, zIndex }}
    >
      <motion.img
        src={src}
        alt=""
        role="presentation"
        aria-hidden="true"
        draggable={false}
        style={{ width: '100%', borderRadius: 10, boxShadow: shadow }}
        // Entrance: invisible + swung away, fades in and swings upright
        initial={{ opacity: 0, scale: 0.6, rotate: swingIn }}
        whileInView={{ opacity: 1, scale: 1, rotate }}
        viewport={{ once: true, margin: '0px' }}
        // Continuous y-float runs independently via animate
        animate={{ y: floatY }}
        transition={{
          // Per-property: entrance props use ease-in curve
          opacity:  { duration: 0.9, ease: 'easeOut',  delay: delay + 0.2 },
          scale:    { duration: 1.0, ease,              delay: delay + 0.2 },
          rotate:   { duration: 1.1, ease,              delay: delay + 0.1 },
          // Float prop: infinite mirror
          y: {
            duration:   floatDur,
            repeat:     Infinity,
            repeatType: 'mirror',
            ease:       'easeInOut',
            delay,
          },
        }}
      />
    </div>
  )
}

export default function SellWithUs() {
  return (
    <section id="sell" className="bg-brand-navy-dark overflow-hidden relative">

      {/* ─── Pokémon card decorations (xl+ only) ─── */}
      {leftCards.map((c, i) => (
        <PokeCard key={`l${i}`} {...c} side="left" />
      ))}
      {rightCards.map((c, i) => (
        <PokeCard key={`r${i}`} {...c} side="right" />
      ))}

      {/* ── Top banner ── */}
      <div className="relative py-16 lg:py-20">
        {/* Grid overlay */}
        <div className="absolute inset-0 bg-grid opacity-10 pointer-events-none" />

        {/* Yellow accent line */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">

          {/* Eyebrow */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-4"
          >
            Turn Your Cards Into Cash
          </motion.p>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, ease, delay: 0.1 }}
            className="font-bebas text-white leading-none tracking-wide mb-6"
            style={{ fontSize: 'clamp(2.5rem, 6vw, 5.5rem)' }}
          >
            Sell Your Cards{' '}
            <span className="text-brand-yellow">With Us</span>
          </motion.h2>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-white/55 text-base md:text-lg leading-relaxed max-w-xl mx-auto mb-10"
          >
            We buy Sports Cards, Pokémon, One Piece, graded slabs, sealed product, and collectibles.
            Walk in, get a fair offer, walk out with cash.
          </motion.p>

          {/* CTA */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease, delay: 0.3 }}
          >
            <Button href="#sell-form" variant="primary" size="lg">
              Sell Now →
            </Button>
          </motion.div>
        </div>
      </div>

      {/* ── Categories we buy ── */}
      <div className="border-t border-white/8 py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center text-xs font-bold text-white/30 tracking-[0.25em] uppercase mb-8"
          >
            We Buy All Of These
          </motion.p>

          <motion.div
            className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.07 }}
          >
            {categories.map((cat) => (
              <motion.div
                key={cat.label}
                variants={fadeUp}
                transition={{ duration: 0.4, ease }}
                style={{ perspective: '600px' }}
                className="relative"
              >
                {/* Flip container */}
                <motion.div
                  style={{ transformStyle: 'preserve-3d' }}
                  whileHover={{ rotateY: 180 }}
                  transition={{ duration: 0.55, ease }}
                  className="relative rounded-2xl"
                >
                  {/* ── Front face ── */}
                  <div
                    style={{ backfaceVisibility: 'hidden' }}
                    className="relative overflow-hidden flex flex-col items-center gap-2 bg-white/5 border border-white/8 rounded-2xl px-4 py-5"
                  >
                    {/* Faded card art background */}
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img
                      src={cat.img}
                      alt=""
                      aria-hidden="true"
                      className="absolute inset-0 w-full h-full object-cover object-top scale-110 opacity-[0.13] pointer-events-none select-none"
                    />
                    {/* Dark vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/70 via-brand-navy-dark/30 to-transparent pointer-events-none" />
                    {/* Content */}
                    <span className="relative z-10 text-2xl">{cat.icon}</span>
                    <span className="relative z-10 text-xs font-bold text-white/65 tracking-wide text-center">
                      {cat.label}
                    </span>
                  </div>

                  {/* ── Back face ── */}
                  <div
                    style={{ backfaceVisibility: 'hidden', transform: 'rotateY(180deg)' }}
                    className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-brand-yellow rounded-2xl px-4 py-5"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#021e33" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" width="28" height="28">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                    <span className="text-[11px] font-bold text-brand-navy-dark tracking-wider text-center uppercase">
                      We Buy This
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom accent line */}
      <div className="h-1 bg-gradient-to-r from-transparent via-brand-yellow to-transparent opacity-30" />
    </section>
  )
}
