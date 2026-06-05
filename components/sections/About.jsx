import Image from 'next/image'
import { motion } from 'framer-motion'
import Button from '../ui/Button'
import SectionHeader from '../ui/SectionHeader'

const pills = ['NBA Cards', 'NFL Cards', 'Pokémon TCG', 'One Piece TCG', 'Graded Slabs', 'Card Singles']

const fadeUp  = { hidden: { opacity: 0, y: 32 }, visible: { opacity: 1, y: 0 } }
const fadeLeft = { hidden: { opacity: 0, x: -40 }, visible: { opacity: 1, x: 0 } }

export default function About() {
  return (
    <section id="about" className="py-24 lg:py-32 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

          {/* ── Images column ── */}
          <motion.div
            className="relative w-full overflow-hidden"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeLeft}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {/* Mobile/tablet: two images side by side */}
            <div className="flex gap-3 lg:hidden w-full">
              <div className="flex-1 min-w-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about-1.webp" alt="Momintum store interior" className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-lg" />
              </div>
              <div className="flex-1 min-w-0 mt-6">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/about-2.webp" alt="Card display cases" className="w-full h-56 sm:h-72 object-cover rounded-2xl shadow-lg" />
              </div>
            </div>

            {/* Desktop: overlapping layout */}
            <div className="hidden lg:block">
              {/* Main image */}
              <div className="relative w-[88%] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/15">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-1.webp"
                  alt="Momintum store interior"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-dark/30 to-transparent" />
              </div>

              {/* Floating secondary image */}
              <div className="absolute bottom-0 right-0 w-[48%] aspect-[4/3] rounded-2xl overflow-hidden border-4 border-white shadow-xl shadow-brand-navy/20">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/about-2.webp"
                  alt="Card display cases at Momintum"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              </div>

              {/* Badge card */}
              <motion.div
                className="absolute top-8 right-2 bg-brand-yellow rounded-2xl px-5 py-4 shadow-lg shadow-brand-yellow/25 flex items-center gap-3"
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <span className="text-2xl">🏆</span>
                <div>
                  <p className="text-brand-navy-dark font-bold text-sm leading-tight">Safe & Friendly</p>
                  <p className="text-brand-navy/70 text-xs leading-tight">For all collectors</p>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* ── Text column ── */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            transition={{ staggerChildren: 0.1 }}
          >
            <SectionHeader
              eyebrow="Who We Are"
              title="San Antonio's Premier Card Shop"
              center={false}
            />

            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-slate-500 text-base leading-relaxed mb-4"
            >
              Momintum Cards &amp; Collectibles is a premier card shop in San Antonio,
              Texas, specializing in Sports Cards, Pokémon Cards, and One Piece Cards.
              We&apos;re more than just a shop — we&apos;re a welcoming hub for collectors,
              players, and hobbyists of all ages.
            </motion.p>
            <motion.p
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="text-slate-500 text-base leading-relaxed mb-8"
            >
              Our store features a large selection of sealed product, singles, graded
              cards, and collectible treasures across sports and trading card games.
              Whether you&apos;re chasing your favorite athletes, building a Pokémon or
              One Piece collection, or looking to buy, sell, trade, and play in a safe
              and friendly environment — Momintum brings the San Antonio card community
              together through the passion of collecting.
            </motion.p>

            {/* Pills */}
            <motion.div
              variants={fadeUp}
              transition={{ duration: 0.55 }}
              className="flex flex-wrap gap-2.5 mb-10"
            >
              {pills.map(pill => (
                <span
                  key={pill}
                  className="text-xs font-semibold text-brand-navy border border-brand-navy/20 bg-white px-4 py-2 rounded-full hover:bg-brand-navy hover:text-white hover:border-brand-navy transition-all duration-200 cursor-default"
                >
                  {pill}
                </span>
              ))}
            </motion.div>

            <motion.div variants={fadeUp} transition={{ duration: 0.55 }}>
              <Button href="#contact" variant="primary" size="lg">
                Come Visit Us
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
