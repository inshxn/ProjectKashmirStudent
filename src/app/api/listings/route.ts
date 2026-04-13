import { NextRequest, NextResponse } from 'next/server'
import { getListings, searchListings } from '@/lib/listings'
import type { ListingFilters } from '@/types'

export const dynamic = 'force-dynamic'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const q = searchParams.get('q')

    if (q) {
      const results = await searchListings(q)
      return NextResponse.json({ success: true, data: results })
    }

    const filters: ListingFilters = {
      category: (searchParams.get('category') as any) || undefined,
      location: searchParams.get('location') || undefined,
      course: searchParams.get('course') || undefined,
      deadline: (searchParams.get('deadline') as any) || undefined,
      sort: (searchParams.get('sort') as any) || 'deadline',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '12'),
    }

    const result = await getListings(filters)
    return NextResponse.json({ success: true, ...result })
  } catch (error) {
    console.error('Listings API error:', error)
    return NextResponse.json({ success: false, error: 'Failed to fetch listings' }, { status: 500 })
  }
}
