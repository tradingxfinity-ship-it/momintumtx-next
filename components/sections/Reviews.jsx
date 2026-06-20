import { useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'

const ease = [0.22, 1, 0.36, 1]

const photoRow1 = [
  '/store-1.jpg',
  '/store-2.jpg',
  '/store-3.jpg',
  '/store-4.jpg',
  '/store-5.jpg',
]

const photoRow2 = [
  '/store-6.jpg',
  '/store-7.jpg',
  '/store-8.jpg',
  '/store-9.jpg',
  '/store-10.jpg',
]

const reviews = [
  {
    id: 1,
    name: 'Marcus T.',
    avatar: 'MT',
    rating: 5,
    date: 'March 2025',
    text: 'Best card shop in San Antonio by far. Huge selection, fair prices, and the Friday tournaments are a blast. Staff really knows their stuff.',
  },
  {
    id: 2,
    name: 'Jessica R.',
    avatar: 'JR',
    rating: 5,
    date: 'February 2025',
    text: 'Sold a collection here and got a really fair offer. Quick, easy process and they were super friendly. Will definitely be back!',
  },
  {
    id: 3,
    name: 'Daniel K.',
    avatar: 'DK',
    rating: 5,
    date: 'January 2025',
    text: 'Brought my kids to the Pokémon tournament and they had an amazing time. Great atmosphere, well-organized, and love the store setup.',
  },
  {
    id: 4,
    name: 'Sofia M.',
    avatar: 'SM',
    rating: 5,
    date: 'March 2025',
    text: 'Amazing spot for collectors. They have graded cards, sealed product and singles all in one place. Clean store with knowledgeable staff.',
  },
  {
    id: 5,
    name: 'Chris V.',
    avatar: 'CV',
    rating: 5,
    date: 'April 2025',
    text: 'Came in to sell some old sports cards and walked out with cash the same day. No hassle, fair deal. Momintum is the real deal.',
  },
  {
    id: 6,
    name: 'Alicia H.',
    avatar: 'AH',
    rating: 5,
    date: 'February 2025',
    text: 'Love this place! The One Piece TCG nights are so much fun and the community is super welcoming. Highly recommend for any card collector.',
  },
  {
    id: 7,
    name: 'Ryan O.',
    avatar: 'RO',
    rating: 5,
    date: 'April 2025',
    text: 'Found a PSA 10 Charizard here at a great price. They know exactly what they have and price everything fairly. My go-to shop in SA.',
  },
  {
    id: 8,
    name: 'Vanessa L.',
    avatar: 'VL',
    rating: 5,
    date: 'March 2025',
    text: 'Super clean store, great vibes. Picked up a few sealed boxes and some singles. Staff helped me find exactly what I was looking for.',
  },
  {
    id: 9,
    name: 'Jordan P.',
    avatar: 'JP',
    rating: 5,
    date: 'January 2025',
    text: 'The Friday night tournaments are legendary. Been coming every week for months. Great competition and even better people.',
  },
  {
    id: 10,
    name: 'Tommy N.',
    avatar: 'TN',
    rating: 5,
    date: 'February 2025',
    text: 'Walked in with a binder full of old cards and they gave me a fair offer on the spot. No drama, no lowballing. Honest people.',
  },
  {
    id: 11,
    name: 'Brianna W.',
    avatar: 'BW',
    rating: 5,
    date: 'March 2025',
    text: 'I was new to collecting and the staff took their time explaining everything. Never felt pressured. Left with some awesome Pokémon singles!',
  },
  {
    id: 12,
    name: 'Eduardo S.',
    avatar: 'ES',
    rating: 5,
    date: 'April 2025',
    text: 'One Piece TCG selection is incredible. Best stock I have seen in San Antonio. The trade nights are awesome too — met a lot of great collectors.',
  },
  {
    id: 13,
    name: 'Kayla F.',
    avatar: 'KF',
    rating: 5,
    date: 'January 2025',
    text: 'Momintum has become my weekend spot. The staff remembers your name, the prices are fair, and the tournament scene keeps growing.',
  },
  {
    id: 14,
    name: 'Andre B.',
    avatar: 'AB',
    rating: 5,
    date: 'February 2025',
    text: 'Brought in a whole collection I inherited and they handled everything professionally. Got a great payout and learned a ton about the cards.',
  },
  {
    id: 15,
    name: 'Natalie C.',
    avatar: 'NC',
    rating: 5,
    date: 'March 2025',
    text: 'Best LGS in the city hands down. Love the display cases, the staff is passionate, and the events always have a great turnout.',
  },
  {
    id: 16,
    name: 'Kevin M.',
    avatar: 'KM',
    rating: 5,
    date: 'April 2025',
    text: 'Grabbed some NBA prizm boxes here and pulled a monster hit. The Whatnot breaks are super fun too. Always a great experience.',
  },
  {
    id: 17,
    name: 'Priya D.',
    avatar: 'PD',
    rating: 5,
    date: 'February 2025',
    text: 'Took my brother here for his birthday and we both had a blast at the tournament. Super welcoming to newcomers. We will be back every week.',
  },
  {
    id: 18,
    name: 'Luis G.',
    avatar: 'LG',
    rating: 5,
    date: 'March 2025',
    text: 'The graded card selection alone is worth the visit. They stock everything from Base Set holos to modern slabs. Genuinely impressive shop.',
  },
]

function Stars({ count = 5 }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} viewBox="0 0 20 20" fill="#FBBC04" width="14" height="14">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

const GoogleLogo = () => (
  <svg viewBox="0 0 24 24" width="20" height="20">
    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
  </svg>
)

function TiltCard({ children, className }) {
  const ref = useRef(null)
  const rotX = useMotionValue(0)
  const rotY = useMotionValue(0)
  const springX = useSpring(rotX, { stiffness: 200, damping: 20 })
  const springY = useSpring(rotY, { stiffness: 200, damping: 20 })

  const handleMouseMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) / (rect.width / 2)
    const dy = (e.clientY - (rect.top + rect.height / 2)) / (rect.height / 2)
    rotX.set(-dy * 7)
    rotY.set(dx * 7)
  }

  const handleMouseLeave = () => {
    rotX.set(0)
    rotY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX: springX, rotateY: springY, transformPerspective: 800 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const PER_PAGE = 3

export default function Reviews() {
  const [page, setPage] = useState(0)
  const totalPages = Math.ceil(reviews.length / PER_PAGE)
  const visible = reviews.slice(page * PER_PAGE, page * PER_PAGE + PER_PAGE)

  const prev = () => setPage(p => Math.max(0, p - 1))
  const next = () => setPage(p => Math.min(totalPages - 1, p + 1))

  return (
    <section id="reviews" className="py-24 lg:py-32 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          {/* Google badge */}
          <div className="inline-flex items-center gap-2 bg-white border border-slate-200 rounded-full px-4 py-2 shadow-sm mb-6">
            <GoogleLogo />
            <span className="text-sm font-semibold text-slate-700">Google Reviews</span>
          </div>

          <h2
            className="font-bebas text-brand-navy-dark leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            What Our{' '}
            <span className="text-brand-navy">Customers Say</span>
          </h2>

          <a
            href="https://share.google/KqPuj9aNYwZwv93Jh"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 mt-6 px-6 py-2.5 bg-brand-navy-dark text-white text-sm font-semibold rounded-full hover:bg-brand-navy transition-colors duration-200"
          >
            <GoogleLogo />
            Write a Review
          </a>
        </motion.div>

        {/* Carousel */}
        <div className="relative">
          {/* Prev arrow */}
          <button
            onClick={prev}
            disabled={page === 0}
            aria-label="Previous reviews"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 z-10 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-brand-navy-dark hover:text-white hover:border-brand-navy-dark transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M10 3L5 8l5 5" />
            </svg>
          </button>

          {/* Cards */}
          <AnimatePresence mode="wait">
            <motion.div
              key={page}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.35, ease }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
            >
              {visible.map((review) => (
                <TiltCard
                  key={review.id}
                  className="bg-white border border-slate-100 rounded-2xl p-6 shadow-sm flex flex-col gap-4"
                >
                  {/* Top row */}
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-navy-dark flex items-center justify-center flex-shrink-0">
                      <span className="text-xs font-bold text-brand-yellow">{review.avatar}</span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-slate-800 truncate">{review.name}</p>
                      <p className="text-xs text-slate-400">{review.date}</p>
                    </div>
                    <GoogleLogo />
                  </div>
                  <Stars count={review.rating} />
                  <p className="text-sm text-slate-600 leading-relaxed flex-1">
                    &ldquo;{review.text}&rdquo;
                  </p>
                </TiltCard>
              ))}
            </motion.div>
          </AnimatePresence>

          {/* Next arrow */}
          <button
            onClick={next}
            disabled={page === totalPages - 1}
            aria-label="Next reviews"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 z-10 w-11 h-11 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:bg-brand-navy-dark hover:text-white hover:border-brand-navy-dark transition-all duration-200 disabled:opacity-30 disabled:cursor-not-allowed"
          >
            <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" width="16" height="16">
              <path d="M6 3l5 5-5 5" />
            </svg>
          </button>
        </div>

        {/* Dot indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i)}
              className={`h-2 rounded-full transition-all duration-300 ${i === page ? 'w-6 bg-brand-navy-dark' : 'w-2 bg-slate-300'}`}
              aria-label={`Go to page ${i + 1}`}
            />
          ))}
        </div>

      </div>

      {/* ── Photo carousel strip ── */}
      <div className="mt-20 -mx-0 overflow-hidden">
        {/* Row 1 — scrolls left */}
        <div className="flex animate-photo-strip w-max gap-3 mb-3">
          {[...photoRow1, ...photoRow1].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-64 h-44 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Row 2 — scrolls right */}
        <div className="flex animate-photo-strip-reverse w-max gap-3">
          {[...photoRow2, ...photoRow2].map((src, i) => (
            <div key={i} className="flex-shrink-0 w-64 h-44 rounded-2xl overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={src}
                alt=""
                aria-hidden="true"
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
