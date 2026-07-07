import Link from 'next/link'
import { AnimatePresence, motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'
import { formatPrice } from './ProductCard'

// Floating bottom bar that appears once the cart has items.
export default function CartBar() {
  const { count, subtotal, hydrated } = useCart()
  const show = hydrated && count > 0

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="fixed bottom-0 inset-x-0 z-40 p-4 pointer-events-none"
        >
          <div className="pointer-events-auto max-w-3xl mx-auto bg-brand-navy-dark border border-white/10 rounded-2xl shadow-2xl px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <svg viewBox="0 0 24 24" fill="none" stroke="#ffe100" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" width="24" height="24">
                  <circle cx="9" cy="21" r="1" />
                  <circle cx="20" cy="21" r="1" />
                  <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6" />
                </svg>
                <span className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-brand-yellow text-brand-navy-dark text-[10px] font-bold flex items-center justify-center">
                  {count}
                </span>
              </div>
              <div>
                <p className="text-white/50 text-[10px] font-bold uppercase tracking-wider">Subtotal</p>
                <p className="text-white font-bold text-lg leading-none">{formatPrice(subtotal)}</p>
              </div>
            </div>

            <Link
              href="/checkout"
              className="px-6 py-3 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors duration-200 whitespace-nowrap"
            >
              Checkout →
            </Link>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
