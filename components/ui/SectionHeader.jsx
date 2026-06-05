import { motion } from 'framer-motion'

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
}

export default function SectionHeader({ eyebrow, title, description, light = false, center = true }) {
  return (
    <motion.div
      className={center ? 'text-center' : ''}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-60px' }}
      transition={{ staggerChildren: 0.1 }}
    >
      {eyebrow && (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.5 }}
          className={`inline-block text-xs font-bold tracking-[0.2em] uppercase mb-3 ${
            light ? 'text-brand-yellow' : 'text-brand-yellow'
          }`}
        >
          {eyebrow}
        </motion.p>
      )}
      <motion.h2
        variants={fadeUp}
        transition={{ duration: 0.55 }}
        className={`font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-none tracking-wide mb-5 ${
          light ? 'text-white' : 'text-brand-navy-dark'
        }`}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          variants={fadeUp}
          transition={{ duration: 0.55 }}
          className={`text-base md:text-lg leading-relaxed max-w-xl ${center ? 'mx-auto' : ''} ${
            light ? 'text-white/60' : 'text-slate-500'
          }`}
        >
          {description}
        </motion.p>
      )}
    </motion.div>
  )
}
