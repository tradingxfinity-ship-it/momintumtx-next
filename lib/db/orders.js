import { supabase } from '../supabase'

export const ORDER_STATUSES = ['paid', 'packed', 'ready', 'shipped', 'completed', 'cancelled']

export async function fetchOrders() {
  if (!supabase) return []
  const { data, error } = await supabase
    .from('orders')
    .select('*')
    .order('created_at', { ascending: false })
  if (error) {
    console.error('fetchOrders:', error.message)
    return []
  }
  return data || []
}

export async function updateOrderStatus(id, status) {
  if (!supabase) throw new Error('Supabase not configured')
  const { error } = await supabase.from('orders').update({ status }).eq('id', id)
  if (error) throw new Error(error.message)
}
