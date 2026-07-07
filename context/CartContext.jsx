import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'momintum-cart'

export function CartProvider({ children }) {
  const [items, setItems] = useState([]) // [{ id, name, price, image, qty }]
  const [hydrated, setHydrated] = useState(false)

  // Load persisted cart once on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY)
      if (saved) setItems(JSON.parse(saved))
    } catch {
      /* ignore malformed storage */
    }
    setHydrated(true)
  }, [])

  // Persist on every change (after initial load).
  useEffect(() => {
    if (!hydrated) return
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
    } catch {
      /* storage full or unavailable — ignore */
    }
  }, [items, hydrated])

  const addItem = (product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.id)
      if (existing) {
        return prev.map(i =>
          i.id === product.id ? { ...i, qty: i.qty + qty } : i
        )
      }
      return [...prev, {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        qty,
      }]
    })
  }

  const removeItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  const setQty = (id, qty) => {
    if (qty <= 0) return removeItem(id)
    setItems(prev => prev.map(i => (i.id === id ? { ...i, qty } : i)))
  }

  const clearCart = () => setItems([])

  const count = useMemo(() => items.reduce((n, i) => n + i.qty, 0), [items])
  const subtotal = useMemo(
    () => items.reduce((sum, i) => sum + i.price * i.qty, 0),
    [items]
  )

  const value = {
    items, hydrated, count, subtotal,
    addItem, removeItem, setQty, clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}
