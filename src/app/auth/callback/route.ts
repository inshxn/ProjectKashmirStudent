import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { supabasePublicKey, supabaseUrl } from '@/lib/supabase-config'

export async function GET(request: NextRequest) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // Default redirect after OAuth to user dashboard
  const next = searchParams.get('next') ?? '/dashboard'

  if (code && supabaseUrl && supabasePublicKey) {
    const cookieStore = cookies()
    const supabase = createServerClient(supabaseUrl, supabasePublicKey, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => {
              cookieStore.set(name, value, options)
            })
          } catch {}
        },
      },
    })

    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      // Use NEXT_PUBLIC_SITE_URL in production to avoid redirect issues
      const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
      return NextResponse.redirect(`${baseUrl}${next}`)
    }
  }

  // Return to auth error page on failure
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || origin
  return NextResponse.redirect(`${baseUrl}/auth/error`)
}
