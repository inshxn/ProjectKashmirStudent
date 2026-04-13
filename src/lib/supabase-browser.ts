import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  if (!url || !key) {
    console.error(
      '[supabase-browser] Missing env vars.\n' +
      '  NEXT_PUBLIC_SUPABASE_URL:', url ? '✅' : '❌ MISSING', '\n' +
      '  NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY:', key ? '✅' : '❌ MISSING'
    )
    throw new Error('Supabase is not configured. Check NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY in Vercel.')
  }

  return createBrowserClient(url, key)
}
