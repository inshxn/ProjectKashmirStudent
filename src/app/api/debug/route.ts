import { NextResponse } from 'next/server'

// DELETE THIS FILE after confirming everything works
// Visit /api/debug to check which env vars are loaded
export async function GET() {
  return NextResponse.json({
    env: {
      NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ set' : '❌ MISSING',
      NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ? '✅ set' : '❌ MISSING',
      SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ set' : '❌ MISSING',
      ADMIN_SECRET_KEY: process.env.ADMIN_SECRET_KEY ? '✅ set' : '❌ MISSING',
      NEXT_PUBLIC_SITE_URL: process.env.NEXT_PUBLIC_SITE_URL || '❌ MISSING',
      NODE_ENV: process.env.NODE_ENV,
    }
  })
}
