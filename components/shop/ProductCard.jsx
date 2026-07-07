import { motion } from 'framer-motion'
import { useCart } from '../../context/CartContext'

const ease = [0.22, 1, 0.36, 1]

export const formatPrice = (n) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })

export default function ProductCard({ product }) {
  const { addItem, items } = useCart()
  const soldOut = product.stock <= 0
  const inCart = items.find(i => i.id === product.id)?.qty || 0
  const atMax = inCart >= product.stock

  return (
    <motion.div
      variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 0.45, ease }}
      className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
    >
      {/* Image */}
      <div className="relative aspect-[4/5] bg-slate-100 overflow-hidden flex items-center justify-center p-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
        />
        <span className="absolute top-3 left-3 text-[10px] font-bold tracking-wider uppercase bg-brand-navy-dark text-white px-2.5 py-1 rounded-full">
          {product.category}
        </span>
        {product.featured && !soldOut && (
          <span className="absolute top-3 right-3 text-[10px] font-bold tracking-wider uppercase bg-brand-yellow text-brand-navy-dark px-2.5 py-1 rounded-full">
            Featured
          </span>
        )}
        {soldOut && (
          <div className="absolute inset-0 bg-white/70 flex items-center justify-center">
            <span className="font-bebas text-2xl tracking-wide text-slate-500 border-2 border-slate-400 px-4 py-1 rounded-lg -rotate-6">
              Sold Out
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-col flex-1 p-5">
        <h3 className="font-bold text-brand-navy-dark text-base leading-snug mb-1">
          {product.name}
        </h3>
        <p className="text-slate-500 text-xs leading-relaxed mb-4 flex-1">
          {product.description}
        </p>

        <div className="flex flex-col gap-3 mt-auto">
          <span className="font-bebas text-2xl text-brand-navy-dark tracking-wide">
            {formatPrice(product.price)}
          </span>

          <button
            type="button"
            disabled={soldOut || atMax}
            onClick={() => addItem(product)}
            className="w-full px-4 py-2.5 rounded-full text-xs font-bold whitespace-nowrap transition-colors duration-200 disabled:opacity-40 disabled:cursor-not-allowed bg-brand-yellow text-brand-navy-dark hover:bg-brand-yellow-dark"
          >
            {soldOut ? 'Sold Out' : atMax ? 'Max in cart' : inCart ? `Add · ${inCart} in cart` : 'Add to Cart'}
          </button>
        </div>
      </div>
    </motion.div>
  )
}
