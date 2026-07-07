import { createClient } from '@supabase/supabase-js'

const url = process.env.NEXT_PUBLIC_SUPABASE_URL
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

export function isSupabaseConfigured() {
  return Boolean(url && anonKey)
}

// Browser/public client — respects Row Level Security. Safe to use anywhere,
// including admin pages once the user has logged in via Supabase Auth.
export const supabase = isSupabaseConfigured() ? createClient(url, anonKey) : null

// Server-only client using the service role key. Bypasses RLS — NEVER import
// this into anything that runs in the browser. Used by API routes / SSR.
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
  if (!url || !serviceKey) return null
  return createClient(url, serviceKey, { auth: { persistSession: false } })
}
