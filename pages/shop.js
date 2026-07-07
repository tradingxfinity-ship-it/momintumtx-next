import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/shop/ProductCard'
import CartBar from '../components/shop/CartBar'
import { PRODUCTS, CATEGORIES } from '../data/products'

const ease = [0.22, 1, 0.36, 1]
const FILTERS = ['All', ...CATEGORIES]

export default function Shop() {
  const [filter, setFilter] = useState('All')

  const visible = PRODUCTS
    .filter(p => filter === 'All' || p.category === filter)
    .sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))

  return (
    <>
      <Head>
        <title>Shop Cards Online — Momintum Cards & Collectibles</title>
        <meta name="description" content="Shop sports cards, Pokémon, One Piece, graded slabs, and sealed product online. Pick up in store in San Antonio or get it delivered." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Navbar />

      {/* Hero */}
      <section className="relative bg-brand-navy-dark overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow z-20" />

        {/* Full branded banner */}
        <div className="relative pt-20 lg:pt-24">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/shop-hero.png"
            alt="Momintum — sports cards, Pokémon and more"
            className="w-full h-auto object-contain select-none"
          />
          {/* Subtle fade so the banner blends into the section below */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-brand-navy-dark to-transparent pointer-events-none" />
        </div>

        {/* Tagline below the banner */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center pb-14 lg:pb-16 -mt-6">
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="text-white/60 text-base md:text-lg max-w-xl mx-auto"
          >
            Browse our inventory and check out with PayPal. Choose <span className="text-white font-semibold">in-store pickup</span> in San Antonio or <span className="text-white font-semibold">delivery</span> to your door.
          </motion.p>
        </div>
      </section>

      {/* Catalog */}
      <section className="bg-white py-14 lg:py-20 min-h-[50vh]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">

          {/* Category filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {FILTERS.map(cat => {
              const active = filter === cat
              return (
                <button
                  key={cat}
                  onClick={() => setFilter(cat)}
                  className={`px-4 py-2 rounded-full text-xs font-bold border transition-all duration-150 ${
                    active
                      ? 'bg-brand-navy-dark text-white border-brand-navy-dark'
                      : 'bg-white text-slate-500 border-slate-200 hover:border-brand-navy-dark hover:text-brand-navy-dark'
                  }`}
                >
                  {cat}
                </button>
              )
            })}
          </div>

          {/* Grid */}
          <motion.div
            key={filter}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            initial="hidden"
            animate="visible"
            transition={{ staggerChildren: 0.05 }}
          >
            {visible.map(p => <ProductCard key={p.id} product={p} />)}
          </motion.div>

          {visible.length === 0 && (
            <p className="text-center text-slate-400 py-20">No products in this category yet.</p>
          )}
        </div>
      </section>

      <CartBar />
      <Footer />
    </>
  )
}
