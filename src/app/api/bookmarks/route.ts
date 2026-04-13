import { NextRequest, NextResponse } from 'next/server'
import { createServerClient } from '@/lib/supabase-server'
import { getUserBookmarks, toggleBookmark } from '@/lib/listings'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const supabase = createServerClient()
    if (!supabase) return NextResponse.json({ success: false, error: 'Supabase is not configured.' }, { status: 503 })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

    const bookmarks = await getUserBookmarks(user.id)
    return NextResponse.json({ success: true, data: bookmarks })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  try {
    const supabase = createServerClient()
    if (!supabase) return NextResponse.json({ success: false, error: 'Supabase is not configured.' }, { status: 503 })
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) return NextResponse.json({ success: false, error: 'Unauthorized' }, { status: 401 })

    const { listing_id } = await request.json()
    if (!listing_id) return NextResponse.json({ success: false, error: 'listing_id required' }, { status: 400 })

    const added = await toggleBookmark(user.id, listing_id)
    return NextResponse.json({ success: true, data: { added } })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Server error' }, { status: 500 })
  }
}
