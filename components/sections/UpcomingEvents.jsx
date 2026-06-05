import { motion } from 'framer-motion'
import Button from '../ui/Button'

const ease = [0.22, 1, 0.36, 1]

const events = [
  {
    id: 1,
    tag: 'Weekly · Every Friday',
    title: 'Friday Night Pokémon Tournament',
    date: 'Every Friday',
    time: '7:00 PM CST',
    location: 'Momintum — In Store',
    entry: '$10 Entry',
    prize: 'Box Split Prizes',
    desc: 'Compete against San Antonio\'s best players. All skill levels welcome — from first-timers to seasoned veterans.',
    cardImg: 'https://images.pokemontcg.io/base1/4.png',
    accentFrom: '#7c2d12',
    accentTo: '#021e33',
    tagColor: 'bg-orange-500/20 text-orange-300 border-orange-500/30',
    btnHref: '#contact',
  },
  {
    id: 2,
    tag: 'Special Event',
    title: 'One Piece TCG Showdown',
    date: 'Sat, May 3',
    time: '6:00 PM CST',
    location: 'Momintum — In Store',
    entry: '$15 Entry',
    prize: 'Promo Card Prizes',
    desc: 'Show off your best One Piece deck in our monthly Showdown. Exclusive promo prizes for top finishers.',
    cardImg: 'https://images.pokemontcg.io/fossil/5.png',
    accentFrom: '#7f1d1d',
    accentTo: '#021e33',
    tagColor: 'bg-red-500/20 text-red-300 border-red-500/30',
    btnHref: '#contact',
  },
  {
    id: 3,
    tag: 'Community Night',
    title: 'Card Collectors Trade Night',
    date: 'Sat, May 10',
    time: '5:00 PM CST',
    location: 'Momintum — In Store',
    entry: 'Free Entry',
    prize: 'Raffle Prizes',
    desc: 'Bring your binders and trade with fellow collectors. Sports cards, Pokémon, One Piece — all welcome.',
    cardImg: 'https://images.pokemontcg.io/base1/10.png',
    accentFrom: '#3b0764',
    accentTo: '#021e33',
    tagColor: 'bg-purple-500/20 text-purple-300 border-purple-500/30',
    btnHref: '#contact',
  },
  {
    id: 4,
    tag: 'Live Break',
    title: 'Sealed Product Break Event',
    date: 'Sat, May 17',
    time: '4:00 PM CST',
    location: 'In Store + Whatnot Live',
    entry: 'Slots Available',
    prize: 'Big Hits',
    desc: 'Grab a slot in our massive sealed product break. Random packs, guaranteed hits, and live reactions.',
    cardImg: 'https://images.pokemontcg.io/base1/2.png',
    accentFrom: '#1e3a5f',
    accentTo: '#021e33',
    tagColor: 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    btnHref: '#contact',
  },
]

function CalIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <rect x="2" y="3" width="12" height="11" rx="2" />
      <path d="M5 1v4M11 1v4M2 7h12" />
    </svg>
  )
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <circle cx="8" cy="8" r="6" />
      <path d="M8 5v3.5l2.5 1.5" />
    </svg>
  )
}

function PinIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <path d="M8 1.5C5.79 1.5 4 3.29 4 5.5c0 3.5 4 9 4 9s4-5.5 4-9c0-2.21-1.79-4-4-4z" />
      <circle cx="8" cy="5.5" r="1.5" />
    </svg>
  )
}

function TicketIcon() {
  return (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" width="12" height="12">
      <path d="M1 5.5A1.5 1.5 0 002.5 7v2A1.5 1.5 0 001 10.5V12h14v-1.5A1.5 1.5 0 0013.5 9V7A1.5 1.5 0 0015 5.5V4H1v1.5z" />
    </svg>
  )
}

const cardVar = {
  hidden: { opacity: 0, y: 32 },
  visible: { opacity: 1, y: 0 },
}

export default function UpcomingEvents() {
  return (
    <section id="events" className="py-24 lg:py-32 bg-brand-navy-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">

        {/* Header */}
        <motion.div
          className="mb-14 text-center"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
        >
          <p className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-4">
            Mark Your Calendar
          </p>
          <h2
            className="font-bebas text-white leading-none tracking-wide"
            style={{ fontSize: 'clamp(2.5rem, 5vw, 5rem)' }}
          >
            Upcoming{' '}
            <span className="text-brand-yellow">Events</span>
          </h2>
          <p className="mt-4 text-white/45 text-base max-w-lg mx-auto">
            From weekly tournaments to special trade nights — there&apos;s always something happening at Momintum.
          </p>
        </motion.div>

        {/* Event cards grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-40px' }}
          transition={{ staggerChildren: 0.1 }}
        >
          {events.map((ev) => (
            <motion.div
              key={ev.id}
              variants={cardVar}
              transition={{ duration: 0.65, ease }}
              className="group relative rounded-2xl overflow-hidden border border-white/5 hover:border-white/12 transition-all duration-300 hover:-translate-y-1 flex"
            >
              {/* ── Left accent bar ── */}
              <div
                className="w-1 flex-shrink-0"
                style={{ background: `linear-gradient(to bottom, ${ev.accentFrom}, ${ev.accentTo})` }}
              />

              {/* ── Card content ── */}
              <div
                className="flex-1 relative overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${ev.accentFrom}22 0%, transparent 60%)` }}
              >
                <div className="absolute inset-0 bg-grid opacity-5 pointer-events-none" />

                <div className="relative z-10 px-5 py-5 flex gap-4 items-center">

                  {/* Floating card art — compact */}
                  <div className="relative flex-shrink-0 w-16 h-22 hidden sm:block">
                    <motion.img
                      src={ev.cardImg}
                      alt=""
                      aria-hidden="true"
                      className="w-16 rounded-md pointer-events-none select-none"
                      style={{ boxShadow: '0 8px 24px rgba(0,0,0,0.5)', rotate: '-6deg' }}
                      animate={{ y: [0, -4, 0], rotate: ['-6deg', '-4deg', '-6deg'] }}
                      transition={{ duration: 4, repeat: Infinity, repeatType: 'mirror', ease: 'easeInOut' }}
                    />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    {/* Tag + title row */}
                    <div className="flex items-center gap-2 mb-1.5 flex-wrap">
                      <span className={`text-[9px] font-bold tracking-[0.15em] uppercase px-2 py-0.5 rounded-full border ${ev.tagColor}`}>
                        {ev.tag}
                      </span>
                    </div>
                    <h3 className="font-bebas text-xl text-white tracking-wide leading-tight mb-3">
                      {ev.title}
                    </h3>

                    {/* Details — single row */}
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-4">
                      {[
                        { svg: <CalIcon />, value: ev.date },
                        { svg: <ClockIcon />, value: ev.time },
                        { svg: <PinIcon />, value: ev.location },
                        { svg: <TicketIcon />, value: ev.entry },
                      ].map(({ svg, value }) => (
                        <div key={value} className="flex items-center gap-1.5">
                          <span className="text-white/35 w-3 h-3 flex-shrink-0">{svg}</span>
                          <span className="text-xs text-white/55 font-medium whitespace-nowrap">{value}</span>
                        </div>
                      ))}
                    </div>

                    <Button
                      href={ev.btnHref}
                      variant="primary"
                      size="sm"
                      className=""
                    >
                      Register Now →
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
