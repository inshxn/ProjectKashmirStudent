import { NextRequest, NextResponse } from 'next/server'
import { adminGetListings, adminCreateListing, adminUpdateListing, adminDeleteListing } from '@/lib/listings'

export const dynamic = 'force-dynamic'

function verifyAdmin(request: NextRequest): { ok: boolean; error?: string } {
  const secret = process.env.ADMIN_SECRET_KEY
  if (!secret) return { ok: false, error: 'ADMIN_SECRET_KEY not set in environment.' }

  const headerToken = request.headers.get('x-admin-token')
  const cookieToken = request.cookies.get('ks_admin_token')?.value

  if (headerToken === secret || cookieToken === secret) return { ok: true }
  return { ok: false, error: 'Unauthorized — invalid or missing admin token.' }
}

export async function GET(request: NextRequest) {
  const auth = verifyAdmin(request)
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  try {
    const listings = await adminGetListings()
    return NextResponse.json({ success: true, data: listings })
  } catch (error: any) {
    console.error('[admin GET]', error)
    return NextResponse.json({ success: false, error: error?.message || 'Server error' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const auth = verifyAdmin(request)
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  try {
    const body = await request.json()
    console.log('[admin POST] Creating listing:', body.title)
    const listing = await adminCreateListing(body)
    return NextResponse.json({ success: true, data: listing }, { status: 201 })
  } catch (error: any) {
    console.error('[admin POST] Failed to create listing:', error)
    // Return the actual Supabase error so you can see what's wrong
    return NextResponse.json({
      success: false,
      error: error?.message || 'Failed to create listing. Check Vercel logs.'
    }, { status: 500 })
  }
}

export async function PATCH(request: NextRequest) {
  const auth = verifyAdmin(request)
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  try {
    const { id, ...updates } = await request.json()
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
    const listing = await adminUpdateListing(id, updates)
    return NextResponse.json({ success: true, data: listing })
  } catch (error: any) {
    console.error('[admin PATCH]', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to update listing' }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  const auth = verifyAdmin(request)
  if (!auth.ok) return NextResponse.json({ success: false, error: auth.error }, { status: 401 })
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get('id')
    if (!id) return NextResponse.json({ success: false, error: 'id required' }, { status: 400 })
    await adminDeleteListing(id)
    return NextResponse.json({ success: true })
  } catch (error: any) {
    console.error('[admin DELETE]', error)
    return NextResponse.json({ success: false, error: error?.message || 'Failed to delete listing' }, { status: 500 })
  }
}
