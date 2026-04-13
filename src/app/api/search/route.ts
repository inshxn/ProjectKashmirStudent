import { NextRequest, NextResponse } from 'next/server'
import { searchListings } from '@/lib/listings'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const q = searchParams.get('q')?.trim()
  if (!q || q.length < 2) {
    return NextResponse.json({ success: true, data: [], query: q })
  }
  try {
    const results = await searchListings(q)
    return NextResponse.json({ success: true, data: results, query: q, count: results.length })
  } catch (error) {
    return NextResponse.json({ success: false, error: 'Search failed' }, { status: 500 })
  }
}
