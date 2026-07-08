import { useState } from 'react'
import Head from 'next/head'
import { motion } from 'framer-motion'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import ProductCard from '../components/shop/ProductCard'
import CartBar from '../components/shop/CartBar'
import { CATEGORIES } from '../data/products'
import { supabase } from '../lib/supabase'

const ease = [0.22, 1, 0.36, 1]
const FILTERS = ['All', ...CATEGORIES]

export async function getServerSideProps() {
  let products = []
  if (supabase) {
    const { data } = await supabase.from('products').select('*').order('created_at', { ascending: false })
    products = data || []
  }
  return { props: { products } }
}

export default function Shop({ products }) {
  const [filter, setFilter] = useState('All')

  const visible = products
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
      <section className="relative bg-brand-navy-dark pt-32 pb-16 lg:pt-40 lg:pb-20 overflow-hidden">
        {/* Banner background — top-aligned so the bottom ~30% is cropped off */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/shop-hero.png"
          alt=""
          aria-hidden="true"
          className="absolute inset-0 w-full h-full object-cover object-top pointer-events-none select-none"
        />
        {/* Darkening overlay for text readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-navy-dark/85 via-brand-navy-dark/70 to-brand-navy-dark/95 pointer-events-none" />
        <div className="absolute top-0 left-0 right-0 h-1 bg-brand-yellow z-20" />

        <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
          <motion.p
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease }}
            className="text-brand-yellow text-xs font-bold tracking-[0.25em] uppercase mb-4"
          >
            Shop Online
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.1 }}
            className="font-bebas text-white leading-none tracking-wide mb-5 drop-shadow-lg"
            style={{ fontSize: 'clamp(2.75rem, 6vw, 5.5rem)' }}
          >
            The <span className="text-brand-yellow">Card Shop</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: 0.2 }}
            className="text-white/70 text-base md:text-lg max-w-xl mx-auto"
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
