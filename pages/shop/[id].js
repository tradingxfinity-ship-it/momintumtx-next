import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { motion } from 'framer-motion'
import Navbar from '../../components/layout/Navbar'
import Footer from '../../components/layout/Footer'
import CartBar from '../../components/shop/CartBar'
import ProductCard, { formatPrice } from '../../components/shop/ProductCard'
import { useCart } from '../../context/CartContext'
import { PRODUCTS } from '../../data/products'

const ease = [0.22, 1, 0.36, 1]

export async function getStaticPaths() {
  return {
    paths: PRODUCTS.map(p => ({ params: { id: p.id } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const product = PRODUCTS.find(p => p.id === params.id) || null
  if (!product) return { notFound: true }
  const related = PRODUCTS
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 4)
  return { props: { product, related } }
}

export default function ProductPage({ product, related }) {
  const router = useRouter()
  const { addItem, items } = useCart()
  const [qty, setQty] = useState(1)

  if (router.isFallback) return null

  const soldOut = product.stock <= 0
  const inCart = items.find(i => i.id === product.id)?.qty || 0
  const maxAddable = Math.max(0, product.stock - inCart)
  const canAdd = !soldOut && maxAddable > 0

  const clampedQty = Math.min(qty, Math.max(1, maxAddable))

  return (
    <>
      <Head>
        <title>{product.name} — Momintum Cards & Collectibles</title>
        <meta name="description" content={product.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      <section className="bg-brand-navy-dark pt-28 pb-24 lg:pt-32 min-h-screen">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">

          {/* Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-white/40 mb-8">
            <Link href="/shop" className="hover:text-brand-yellow transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-white/60">{product.category}</span>
          </div>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease }}
              className="relative bg-white rounded-3xl p-6 lg:p-10 flex items-center justify-center aspect-square"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={product.image} alt={product.name} className="w-full h-full object-contain" />
              {product.featured && !soldOut && (
                <span className="absolute top-4 left-4 text-[10px] font-bold tracking-wider uppercase bg-brand-yellow text-brand-navy-dark px-2.5 py-1 rounded-full">
                  Featured
                </span>
              )}
              {soldOut && (
                <div className="absolute inset-0 bg-white/70 rounded-3xl flex items-center justify-center">
                  <span className="font-bebas text-3xl tracking-wide text-slate-500 border-2 border-slate-400 px-5 py-1.5 rounded-lg -rotate-6">
                    Sold Out
                  </span>
                </div>
              )}
            </motion.div>

            {/* Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: 0.1 }}
            >
              <span className="inline-block text-[10px] font-bold tracking-wider uppercase bg-white/8 text-white/60 px-3 py-1 rounded-full mb-4">
                {product.category}
              </span>
              <h1 className="font-bebas text-white text-4xl lg:text-5xl tracking-wide leading-none mb-4">
                {product.name}
              </h1>
              <p className="font-bebas text-brand-yellow text-4xl tracking-wide mb-6">
                {formatPrice(product.price)}
              </p>
              <p className="text-white/55 text-base leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Stock */}
              <p className={`text-sm font-semibold mb-6 ${soldOut ? 'text-red-400' : 'text-green-400'}`}>
                {soldOut ? 'Out of stock' : product.stock <= 3 ? `Only ${product.stock} left in stock` : 'In stock'}
              </p>

              {/* Quantity + add */}
              {canAdd && (
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center bg-white/5 border border-white/10 rounded-full">
                    <button
                      onClick={() => setQty(q => Math.max(1, q - 1))}
                      className="w-10 h-10 text-white text-lg hover:text-brand-yellow"
                    >−</button>
                    <span className="w-8 text-center text-white font-semibold">{clampedQty}</span>
                    <button
                      onClick={() => setQty(q => Math.min(maxAddable, q + 1))}
                      className="w-10 h-10 text-white text-lg hover:text-brand-yellow"
                    >+</button>
                  </div>
                  <button
                    onClick={() => addItem(product, clampedQty)}
                    className="flex-1 py-3.5 bg-brand-yellow text-brand-navy-dark text-sm font-bold rounded-full hover:bg-brand-yellow-dark transition-colors duration-200"
                  >
                    Add to Cart
                  </button>
                </div>
              )}

              {!canAdd && !soldOut && (
                <p className="text-sm text-white/50 mb-6">You already have the max available quantity in your cart.</p>
              )}

              {inCart > 0 && (
                <Link href="/checkout" className="inline-flex text-sm font-semibold text-brand-yellow hover:text-brand-yellow-dark transition-colors">
                  {inCart} in cart — go to checkout →
                </Link>
              )}

              {/* Fulfillment note */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-col gap-3 text-sm text-white/50">
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow">✓</span> Free in-store pickup in San Antonio
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow">✓</span> Delivery available at checkout
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-brand-yellow">✓</span> Secure PayPal checkout
                </div>
              </div>
            </motion.div>
          </div>

          {/* Related */}
          {related.length > 0 && (
            <div className="mt-20">
              <h2 className="font-bebas text-white text-3xl tracking-wide mb-6">More {product.category}</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                {related.map(p => <ProductCard key={p.id} product={p} />)}
              </div>
            </div>
          )}
        </div>
      </section>

      <CartBar />
      <Footer />
    </>
  )
}
