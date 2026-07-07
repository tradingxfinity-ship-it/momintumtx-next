import { supabase } from '../supabase'

// Public read — used by the shop and the admin list.
export async function fetchProducts() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('fetchProducts:', error.message)
    return []
  }
  return data || []
}

export async function fetchProduct(id) {
  if (!supabase) return null
  const { data } = await supabase.from('products').select('*').eq('id', id).single()
  return data || null
}

// Admin writes — run with the logged-in session (RLS allows authenticated users).
export async function saveProduct(product) {
  if (!supabase) throw new Error('Supabase not configured')
  const { data, error } = await supabase.from('products').upsert(product).select().single()
  if (error) throw new Error(error.message)
  return data
}

export async function deleteProduct(id) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('products').delete().eq('id', id)
  if (error) throw new Error(error.message)
}
