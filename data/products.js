// ─────────────────────────────────────────────────────────────
//  Momintum shop catalog
//  Edit this file to manage what shows in the online store.
//  - id:        unique string (keep it unique per product)
//  - name:      product title
//  - price:     number in USD (no "$")
//  - category:  must match one of CATEGORIES below
//  - image:     URL or /public path (e.g. '/store-1.jpg')
//  - stock:     units available (set 0 to show "Sold Out")
//  - featured:  true to highlight it near the top
//  - description: short blurb shown on the card
// ─────────────────────────────────────────────────────────────

export const CATEGORIES = [
  'Sports Cards',
  'Pokémon',
  'One Piece',
  'Graded Slabs',
  'Sealed Product',
]

// Storefront settings — edit these freely.
export const SHOP_CONFIG = {
  deliveryFee: 5.99,                                   // flat delivery fee in USD
  freeDeliveryOver: 200,                               // free delivery when subtotal ≥ this (set null to disable)
  pickupLocation: '7121 W US Hwy 90 #214, San Antonio, TX 78227',
}

export const PRODUCTS = [
  {
    id: 'pkmn-151-etb',
    name: 'Pokémon 151 Elite Trainer Box',
    price: 59.99,
    category: 'Sealed Product',
    image: 'https://images.pokemontcg.io/sv3pt5/logo.png',
    stock: 8,
    featured: true,
    description: 'Sealed Scarlet & Violet 151 ETB — 9 booster packs + accessories.',
  },
  {
    id: 'charizard-base-psa9',
    name: 'Charizard Base Set — PSA 9',
    price: 899.0,
    category: 'Graded Slabs',
    image: 'https://images.pokemontcg.io/base1/4.png',
    stock: 1,
    featured: true,
    description: 'Iconic 1999 Base Set Charizard, graded PSA 9 Mint.',
  },
  {
    id: 'onepiece-op05-booster',
    name: 'One Piece OP-05 Booster Box',
    price: 104.99,
    category: 'Sealed Product',
    image: 'https://images.pokemontcg.io/sv1/logo.png',
    stock: 5,
    featured: false,
    description: 'Awakening of the New Era sealed booster box — 24 packs.',
  },
  {
    id: 'luffy-leader-alt',
    name: 'Monkey D. Luffy — Alt Art Leader',
    price: 74.5,
    category: 'One Piece',
    image: 'https://images.pokemontcg.io/base1/58.png',
    stock: 3,
    featured: false,
    description: 'Sought-after alternate-art Luffy leader card, near mint.',
  },
  {
    id: 'prizm-rookie-lot',
    name: 'NBA Prizm Rookie Lot (10 cards)',
    price: 39.99,
    category: 'Sports Cards',
    image: 'https://images.pokemontcg.io/base1/10.png',
    stock: 12,
    featured: false,
    description: 'Curated 10-card lot of Prizm basketball rookies.',
  },
  {
    id: 'mewtwo-holo-nm',
    name: 'Mewtwo Base Set Holo — NM',
    price: 129.99,
    category: 'Pokémon',
    image: 'https://images.pokemontcg.io/base1/10.png',
    stock: 2,
    featured: true,
    description: 'Base Set holographic Mewtwo in near-mint condition.',
  },
  {
    id: 'blastoise-base-lp',
    name: 'Blastoise Base Set — LP',
    price: 149.99,
    category: 'Pokémon',
    image: 'https://images.pokemontcg.io/base1/2.png',
    stock: 2,
    featured: false,
    description: 'Base Set Blastoise holo, lightly played.',
  },
  {
    id: 'venusaur-base-psa8',
    name: 'Venusaur Base Set — PSA 8',
    price: 219.0,
    category: 'Graded Slabs',
    image: 'https://images.pokemontcg.io/base1/15.png',
    stock: 1,
    featured: false,
    description: 'Base Set Venusaur graded PSA 8 NM-MT.',
  },
  {
    id: 'nfl-mosaic-blaster',
    name: 'NFL Mosaic Blaster Box',
    price: 44.99,
    category: 'Sealed Product',
    image: 'https://images.pokemontcg.io/base1/4.png',
    stock: 0,
    featured: false,
    description: 'Panini Mosaic football blaster — chase the Reactive prizms.',
  },
]
