import { motion } from 'framer-motion'
import Button from '../ui/Button'
import SectionHeader from '../ui/SectionHeader'

const details = [
  { icon: '📅', label: 'Every Friday', sub: 'Doors open & registration at 6:30 PM CST' },
  { icon: '⏰', label: '7:00 PM CST',  sub: "Tournament begins — don't be late!" },
  { icon: '💵', label: '$10 Entry Fee', sub: 'Affordable competition for everyone' },
  { icon: '🎁', label: 'Box Split Prizes', sub: 'Top 3 finishers take home box splits' },
]

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function Events() {
  return (
    <section
      id="tournaments"
      className="relative py-24 lg:py-32 overflow-hidden bg-brand-navy-dark"
    >
      {/* BG layers */}
      <div className="absolute inset-0 bg-grid pointer-events-none" />
      <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-dark via-brand-navy to-brand-navy-mid/60 pointer-events-none" />
      <div className="absolute top-0 right-0 w-96 h-96 bg-brand-yellow/4 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Left: copy ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-60px' }}
            transition={{ staggerChildren: 0.1 }}
          >
            <SectionHeader
              eyebrow="Weekly Events"
              title="Friday Night Tournaments"
              center={false}
              light
            />
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-white/55 text-base leading-relaxed mb-10"
            >
              Prove your skills every Friday night at Momintum. Whether you&apos;re a
              seasoned competitor or just getting started, our weekly tournaments
              offer great competition, prizes, and community.
            </motion.p>

            <motion.ul
              variants={{ hidden: {}, visible: { transition: { staggerChildren: 0.09 } } }}
              className="space-y-6 mb-10"
            >
              {details.map(({ icon, label, sub }) => (
                <motion.li
                  key={label}
                  variants={fadeUp}
                  transition={{ duration: 0.5 }}
                  className="flex items-start gap-4"
                >
                  <div className="w-11 h-11 rounded-xl bg-white/6 border border-white/10 flex items-center justify-center text-xl flex-shrink-0">
                    {icon}
                  </div>
                  <div>
                    <p className="text-white font-semibold text-sm">{label}</p>
                    <p className="text-white/45 text-sm">{sub}</p>
                  </div>
                </motion.li>
              ))}
            </motion.ul>

            <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
              <Button href="#contact" variant="primary" size="lg">Get Directions</Button>
            </motion.div>
          </motion.div>

          {/* ── Right: event card ── */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-5"
          >
            {/* Main card */}
            <div className="bg-white rounded-3xl p-8 shadow-2xl shadow-black/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-brand-yellow/8 rounded-full blur-3xl pointer-events-none" />
              <p className="text-[10px] font-bold tracking-[0.25em] uppercase text-slate-400 mb-3">
                Next Tournament
              </p>
              <p className="font-bebas text-7xl text-brand-navy-dark tracking-wide leading-none mb-1">
                Friday
              </p>
              <p className="text-brand-navy-mid font-bold text-lg mb-7">7:00 PM CST</p>
              <div className="h-px bg-slate-100 mb-6" />
              <div className="grid grid-cols-2 gap-4 mb-7">
                {[
                  { label: 'Prize Pool', value: 'Box Splits' },
                  { label: 'Entry Fee',  value: '$10' },
                ].map(({ label, value }) => (
                  <div key={label} className="bg-slate-50 rounded-2xl p-4">
                    <p className="text-xs text-slate-400 mb-1">{label}</p>
                    <p className="font-bold text-brand-navy-dark text-base">{value}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Mini info pill */}
            <div className="flex items-center gap-4 bg-white/6 border border-white/10 rounded-2xl p-5">
              <div className="w-10 h-10 rounded-xl bg-brand-yellow/15 flex items-center justify-center text-lg">
                🎮
              </div>
              <div>
                <p className="text-white font-semibold text-sm">All skill levels welcome</p>
                <p className="text-white/45 text-xs">From first-timers to seasoned veterans</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
