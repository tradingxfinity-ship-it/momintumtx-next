import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]
const AUTO_ADVANCE_MS = 4500

const images = [
  { src: '/store-1.jpg',  label: 'The Main Floor'    },
  { src: '/store-2.jpg',  label: 'Display Cases'      },
  { src: '/store-3.jpg',  label: 'Graded Slabs'       },
  { src: '/store-4.jpg',  label: 'Pokémon Singles'    },
  { src: '/store-5.jpg',  label: 'Sports Cards'       },
  { src: '/store-6.jpg',  label: 'Sealed Product'     },
  { src: '/store-7.jpg',  label: 'One Piece TCG'      },
  { src: '/store-8.jpg',  label: 'Tournament Area'    },
  { src: '/store-9.jpg',  label: 'The Collection'     },
  { src: '/store-10.jpg', label: 'Checkout Counter'   },
  { src: '/about-1.webp', label: 'Inside the Store'   },
  { src: '/about-2.webp', label: 'The Card Wall'      },
]

export default function Gallery() {
  const [active, setActive] = useState(0)
  const [paused, setPaused] = useState(false)

  const prev = () => setActive(i => (i - 1 + images.length) % images.length)
  const next = () => setActive(i => (i + 1) % images.length)

  useEffect(() => {
    if (paused) return
    const t = setTimeout(next, AUTO_ADVANCE_MS)
    return () => clearTimeout(t)
  }, [active, paused])

  return (
    <section id="gallery" className="bg-white py-24 lg:py-32 overflow-hidden relative">

      <div className="absolute inset-0 bg-grid opacity-[0.025] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">

        {/* ── Main layout ── */}
        <div className="grid lg:grid-cols-[340px_1fr] gap-8 items-stretch mb-5">

          {/* ── Left panel ── */}
          <div className="flex flex-col justify-between">
            <div>
              <motion.p
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease }}
                className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-5"
              >
                Take A Look Inside
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, ease, delay: 0.1 }}
                className="font-bebas text-brand-navy-dark leading-none tracking-wide mb-5"
                style={{ fontSize: 'clamp(4rem, 7vw, 7.5rem)' }}
              >
                Our<br />
                <span className="text-brand-navy">Shop</span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-slate-400 text-sm leading-relaxed mb-10"
              >
                Graded slabs, sealed product, singles and more — all under one roof in San Antonio, TX.
              </motion.p>

              {/* Active label */}
              <div className="border-t border-slate-100 pt-6">
                <p className="text-slate-300 text-[10px] font-bold tracking-[0.2em] uppercase mb-2">Now Viewing</p>
                <AnimatePresence mode="wait">
                  <motion.p
                    key={active}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 12 }}
                    transition={{ duration: 0.25 }}
                    className="text-brand-navy-dark font-semibold text-base flex items-center gap-2"
                  >
                    <motion.span
                      className="w-1.5 h-1.5 rounded-full bg-brand-yellow inline-block flex-shrink-0"
                      animate={{ scale: [1, 1.6, 1] }}
                      transition={{ duration: 0.4 }}
                    />
                    {images[active].label}
                  </motion.p>
                </AnimatePresence>
              </div>
            </div>

            {/* Counter + arrows */}
            <div className="flex items-center gap-3 mt-10">
              <span className="font-bebas text-3xl leading-none">
                <span className="text-brand-navy-dark">{String(active + 1).padStart(2, '0')}</span>
                <span className="text-slate-200"> / {String(images.length).padStart(2, '0')}</span>
              </span>

              <div className="flex gap-2 ml-auto">
                <button
                  onClick={prev}
                  aria-label="Previous photo"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-brand-navy-dark hover:text-white hover:border-brand-navy-dark transition-all duration-200"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <path d="M10 3L5 8l5 5" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  aria-label="Next photo"
                  className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-slate-400 hover:bg-brand-navy-dark hover:text-white hover:border-brand-navy-dark transition-all duration-200"
                >
                  <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="14" height="14">
                    <path d="M6 3l5 5-5 5" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ── Right column: image + thumbnails ── */}
          <div className="flex flex-col gap-4 min-w-0">

          {/* Featured image */}
          <motion.div
            className="relative rounded-3xl overflow-hidden h-[320px] lg:h-[500px] cursor-pointer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease, delay: 0.15 }}
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
          >
            <AnimatePresence mode="wait">
              <motion.img
                key={active}
                src={images[active].src}
                alt={images[active].label}
                initial={{ opacity: 0, scale: 1.06 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.55, ease }}
                className="w-full h-full object-cover"
              />
            </AnimatePresence>

            {/* Bottom vignette */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent pointer-events-none" />

            {/* Progress bar */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-black/10">
              <motion.div
                key={active}
                className="h-full bg-brand-yellow origin-left"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: paused ? undefined : 1 }}
                transition={{ duration: AUTO_ADVANCE_MS / 1000, ease: 'linear' }}
                style={{ transformOrigin: 'left' }}
              />
            </div>

            {/* Index badge */}
            <div className="absolute top-5 left-5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1">
              <span className="font-bebas text-brand-yellow text-sm tracking-widest">
                {String(active + 1).padStart(2, '0')} / {String(images.length).padStart(2, '0')}
              </span>
            </div>

            {/* Pause indicator */}
            <AnimatePresence>
              {paused && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.2 }}
                  className="absolute top-5 right-5 bg-black/50 backdrop-blur-sm border border-white/10 rounded-full px-3 py-1"
                >
                  <span className="text-white/70 text-[10px] font-bold tracking-widest uppercase">Paused</span>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* ── Thumbnail strip ── */}
          <motion.div
            className="flex gap-2.5 overflow-x-auto"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ staggerChildren: 0.04 }}
          >
            {images.map((img, i) => (
              <motion.button
                key={i}
                onClick={() => setActive(i)}
                variants={{
                  hidden: { opacity: 0, y: 12 },
                  visible: { opacity: 1, y: 0 },
                }}
                transition={{ duration: 0.35, ease }}
                className={`flex-shrink-0 rounded-xl overflow-hidden transition-all duration-200 ${
                  i === active
                    ? 'ring-2 ring-brand-yellow opacity-100 scale-[1.06]'
                    : 'opacity-40 hover:opacity-70'
                }`}
                style={{ width: 88, height: 58 }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={img.src} alt="" aria-hidden="true" className="w-full h-full object-cover" />
              </motion.button>
            ))}
          </motion.div>

          </div>{/* end right column */}
        </div>

      </div>
    </section>
  )
}
