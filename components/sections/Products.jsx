import Image from 'next/image'
import { motion } from 'framer-motion'
import SectionHeader from '../ui/SectionHeader'

const cards = [
  {
    title: 'Sports Cards',
    desc: 'NBA and NFL focused inventory including rookies, parallels, autographs, and top-tier graded slabs.',
    img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=85',
    tag: 'Most Popular',
    span: 'lg:col-span-2 lg:row-span-2',
    imgH: 'h-64 lg:h-full',
    featured: true,
  },
  {
    title: 'Pokémon TCG',
    desc: 'Sealed booster boxes, ETBs, singles, and ultra-rare holographics for every trainer.',
    img: 'https://images.unsplash.com/photo-1613771404784-9f5ab427fd67?w=600&q=85',
    span: '',
    imgH: 'h-44',
  },
  {
    title: 'One Piece TCG',
    desc: 'Full inventory of One Piece sets, booster packs, and hard-to-find singles.',
    img: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=600&q=85',
    span: '',
    imgH: 'h-44',
  },
  {
    title: 'Graded Cards',
    desc: 'PSA, BGS, and SGC graded slabs across all categories. Investment-grade collectibles.',
    img: 'https://images.unsplash.com/photo-1605870445919-838d190e8e1b?w=600&q=85',
    span: '',
    imgH: 'h-44',
  },
  {
    title: 'Sealed Product',
    desc: 'Fresh sealed boxes and packs straight from the case — the original pull experience.',
    img: 'https://images.unsplash.com/photo-1611532736597-de2d4265fba3?w=600&q=85',
    span: '',
    imgH: 'h-44',
  },
]

const service = {
  title: 'Buy · Sell · Trade',
  desc: 'We buy your collection at fair prices, trade for what you need, or help you find a buyer. No hassle — just cards.',
}

const cardVariants = {
  hidden: { opacity: 0, y: 28, scale: 0.97 },
  visible: { opacity: 1, y: 0, scale: 1 },
}

export default function Products() {
  return (
    <section id="products" className="py-24 lg:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="mb-14">
          <SectionHeader
            eyebrow="What We Carry"
            title="Our Products & Services"
            description="From the newest sealed product to vintage singles — we carry the cards you're looking for."
          />
        </div>

        {/* Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
          transition={{ staggerChildren: 0.08 }}
        >
          {/* Featured + regulars */}
          {cards.map((card) => (
            <motion.div
              key={card.title}
              variants={cardVariants}
              transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative bg-white rounded-3xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-brand-navy/10 hover:-translate-y-1.5 transition-all duration-300 ${card.span}`}
            >
              {/* Image */}
              <div className={`relative ${card.imgH} overflow-hidden`}>
                <Image
                  src={card.img}
                  alt={card.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                {card.tag && (
                  <span className="absolute top-4 left-4 bg-brand-yellow text-brand-navy-dark text-[11px] font-black tracking-wide uppercase px-3 py-1.5 rounded-full">
                    {card.tag}
                  </span>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="font-bebas text-2xl text-brand-navy-dark tracking-wide mb-2">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-4">{card.desc}</p>
                <span className="text-xs font-bold text-brand-navy tracking-wide group-hover:text-brand-navy-mid transition-colors duration-200">
                  View Collection →
                </span>
              </div>
            </motion.div>
          ))}

          {/* Service card (dark) */}
          <motion.div
            variants={cardVariants}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="group relative bg-brand-navy-dark rounded-3xl overflow-hidden border border-white/5 shadow-sm hover:shadow-2xl hover:shadow-brand-navy/30 hover:-translate-y-1.5 transition-all duration-300"
          >
            {/* Glow bg */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-navy-mid/40 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-grid opacity-60 pointer-events-none" />

            <div className="relative p-8 flex flex-col justify-between h-full min-h-[260px]">
              <div className="w-12 h-12 rounded-2xl bg-brand-yellow/12 border border-brand-yellow/20 flex items-center justify-center mb-6">
                <span className="text-brand-yellow text-2xl font-bold">⇄</span>
              </div>
              <div>
                <h3 className="font-bebas text-3xl text-white tracking-wide mb-3">{service.title}</h3>
                <p className="text-sm text-white/55 leading-relaxed mb-5">{service.desc}</p>
                <span className="text-xs font-bold text-brand-yellow tracking-wide">
                  Get a Quote →
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
