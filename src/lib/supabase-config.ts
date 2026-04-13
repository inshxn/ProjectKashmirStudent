// Supabase connection config — uses NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY
// (the key name used by the official Supabase Next.js setup guide)
export const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
export const supabasePublicKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
export const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

export function hasSupabasePublicEnv() {
  return Boolean(supabaseUrl && supabasePublicKey)
}
