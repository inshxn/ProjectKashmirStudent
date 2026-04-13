import { createServerClient as createSSRServerClient } from '@supabase/ssr'
import { createClient as createSupabaseAdminClient } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { serviceRoleKey, supabasePublicKey, supabaseUrl } from './supabase-config'

export function hasSupabaseServerEnv() {
  return Boolean(supabaseUrl && supabasePublicKey)
}

export function createServerClient() {
  const cookieStore = cookies()
  return createSSRServerClient(supabaseUrl, supabasePublicKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll()
      },
      setAll(cookiesToSet) {
        try {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        } catch {
          // Called from a Server Component — safe to ignore,
          // middleware keeps the session refreshed.
        }
      },
    },
  })
}

export function createAdminClient() {
  if (!serviceRoleKey) return null
  return createSupabaseAdminClient(supabaseUrl, serviceRoleKey, {
    auth: { autoRefreshToken: false, persistSession: false },
  })
}
