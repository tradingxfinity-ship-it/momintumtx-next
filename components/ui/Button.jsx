import { motion } from 'framer-motion'

const variants = {
  primary: 'bg-brand-yellow text-brand-navy-dark border-brand-yellow hover:bg-brand-yellow-dark hover:border-brand-yellow-dark',
  outline: 'bg-transparent text-white border-white/40 hover:bg-white/10 hover:border-white',
  'outline-dark': 'bg-transparent text-brand-navy border-brand-navy/30 hover:bg-brand-navy hover:text-white hover:border-brand-navy',
  ghost: 'bg-white/10 text-white border-white/10 hover:bg-white/20',
}

const sizes = {
  sm:  'px-5 py-2.5 text-xs',
  md:  'px-7 py-3.5 text-sm',
  lg:  'px-9 py-4 text-base',
}

export default function Button({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  href,
  ...props
}) {
  const base =
    'inline-flex items-center justify-center gap-2 font-bold tracking-wide rounded-full border-2 transition-all duration-200 cursor-pointer select-none whitespace-nowrap'
  const cls = `${base} ${variants[variant]} ${sizes[size]} ${className}`

  if (href) {
    return (
      <motion.a
        href={href}
        className={cls}
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.98 }}
        {...props}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      className={cls}
      whileHover={{ scale: 1.03, y: -1 }}
      whileTap={{ scale: 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}
