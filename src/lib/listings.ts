import { createServerClient, createAdminClient, hasSupabaseServerEnv } from './supabase-server'
import type { Listing, ListingFilters, PaginatedListings, Category } from '@/types'
import { differenceInDays, parseISO } from 'date-fns'

function addDaysLeft(listing: Listing): Listing {
  return {
    ...listing,
    days_left: differenceInDays(parseISO(listing.last_date), new Date()),
  }
}

// ── Public queries ──────────────────────────

export async function getListings(filters: ListingFilters = {}): Promise<PaginatedListings> {
  if (!hasSupabaseServerEnv()) {
    return { data: [], total: 0, page: filters.page || 1, limit: filters.limit || 12, hasMore: false }
  }

  const supabase = createServerClient()
  if (!supabase) {
    return { data: [], total: 0, page: filters.page || 1, limit: filters.limit || 12, hasMore: false }
  }
  const {
    category, location, course, deadline,
    sort = 'deadline', page = 1, limit = 12, search
  } = filters

  let query = supabase
    .from('listings')
    .select('*', { count: 'exact' })
    .eq('is_active', true)
    .eq('status', 'live')

  if (category) query = query.eq('category', category)
  if (location) query = query.eq('location', location)
  if (course)   query = query.eq('course', course)
  if (deadline === 'expiring') {
    const week = new Date()
    week.setDate(week.getDate() + 7)
    query = query.lte('last_date', week.toISOString().split('T')[0])
  }
  if (deadline === 'active') {
    query = query.gte('last_date', new Date().toISOString().split('T')[0])
  }
  if (search) {
    query = query.or(`title.ilike.%${search}%,org_name.ilike.%${search}%,short_desc.ilike.%${search}%`)
  }

  // Sorting
  if (sort === 'deadline')  query = query.order('last_date', { ascending: true })
  if (sort === 'newest')    query = query.order('created_at', { ascending: false })
  if (sort === 'featured')  query = query.order('is_featured', { ascending: false }).order('last_date', { ascending: true })
  if (sort === 'views')     query = query.order('views', { ascending: false })

  // Pagination
  const from = (page - 1) * limit
  query = query.range(from, from + limit - 1)

  const { data, error, count } = await query
  if (error) {
    return {
      data: [],
      total: 0,
      page,
      limit,
      hasMore: false,
    }
  }

  return {
    data: (data || []).map(addDaysLeft),
    total: count || 0,
    page,
    limit,
    hasMore: (count || 0) > page * limit,
  }
}

export async function getListing(slug: string): Promise<Listing | null> {
  if (!hasSupabaseServerEnv()) return null
  const supabase = createServerClient()
  if (!supabase) return null
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (error || !data) return null

  // Increment views (fire and forget)
  supabase
    .from('listings')
    .update({ views: (data.views || 0) + 1 })
    .eq('id', data.id)
    .then(() => {})

  return addDaysLeft(data)
}

export async function getFeaturedListings(): Promise<Listing[]> {
  if (!hasSupabaseServerEnv()) return []
  const supabase = createServerClient()
  if (!supabase) return []
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('is_active', true)
    .eq('status', 'live')
    .eq('is_featured', true)
    .order('last_date', { ascending: true })
    .limit(6)

  return (data || []).map(addDaysLeft)
}

export async function getRelatedListings(listing: Listing): Promise<Listing[]> {
  if (!hasSupabaseServerEnv()) return []
  const supabase = createServerClient()
  if (!supabase) return []
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('is_active', true)
    .eq('status', 'live')
    .eq('category', listing.category)
    .neq('id', listing.id)
    .order('last_date', { ascending: true })
    .limit(4)

  return (data || []).map(addDaysLeft)
}

export async function getUrgentListings(days = 14): Promise<Listing[]> {
  if (!hasSupabaseServerEnv()) return []
  const supabase = createServerClient()
  if (!supabase) return []
  const deadline = new Date()
  deadline.setDate(deadline.getDate() + days)
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('is_active', true)
    .eq('status', 'live')
    .lte('last_date', deadline.toISOString().split('T')[0])
    .gte('last_date', new Date().toISOString().split('T')[0])
    .order('last_date', { ascending: true })
    .limit(10)

  return (data || []).map(addDaysLeft)
}

export async function searchListings(query: string): Promise<Listing[]> {
  if (!hasSupabaseServerEnv()) return []
  const supabase = createServerClient()
  if (!supabase) return []
  const { data } = await supabase
    .rpc('search_listings', { query })
    .limit(20)

  return (data || []).map(addDaysLeft)
}

export async function getListingsByCategory(category: Category, limit = 4): Promise<Listing[]> {
  if (!hasSupabaseServerEnv()) return []
  const supabase = createServerClient()
  if (!supabase) return []
  const { data } = await supabase
    .from('listings')
    .select('*')
    .eq('is_active', true)
    .eq('status', 'live')
    .eq('category', category)
    .order('is_featured', { ascending: false })
    .order('last_date', { ascending: true })
    .limit(limit)

  return (data || []).map(addDaysLeft)
}

// ── Admin queries ───────────────────────────

export async function adminGetListings() {
  const supabase = createAdminClient()
  if (!supabase) throw new Error('Supabase admin environment is not configured.')
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .order('created_at', { ascending: false })

  if (error) throw error
  return (data || []).map(addDaysLeft)
}

export async function adminGetListingById(id: string) {
  const supabase = createAdminClient()
  if (!supabase) throw new Error('Supabase admin environment is not configured.')
  const { data, error } = await supabase
    .from('listings')
    .select('*')
    .eq('id', id)
    .single()

  if (error) throw error
  return data ? addDaysLeft(data) : null
}

export async function adminCreateListing(listing: Partial<Listing>) {
  const supabase = createAdminClient()
  if (!supabase) throw new Error('Supabase admin environment is not configured.')
  const { data, error } = await supabase
    .from('listings')
    .insert(listing)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function adminUpdateListing(id: string, updates: Partial<Listing>) {
  const supabase = createAdminClient()
  if (!supabase) throw new Error('Supabase admin environment is not configured.')
  const { data, error } = await supabase
    .from('listings')
    .update(updates)
    .eq('id', id)
    .select()
    .single()

  if (error) throw error
  return data
}

export async function adminDeleteListing(id: string) {
  const supabase = createAdminClient()
  if (!supabase) throw new Error('Supabase admin environment is not configured.')
  const { error } = await supabase
    .from('listings')
    .update({ is_active: false })
    .eq('id', id)

  if (error) throw error
}

// ── Bookmarks ───────────────────────────────

export async function getUserBookmarks(userId: string): Promise<Listing[]> {
  if (!hasSupabaseServerEnv()) return []
  const supabase = createServerClient()
  if (!supabase) return []
  const { data } = await supabase
    .from('bookmarks')
    .select('listing_id, listings(*)')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })

  return ((data || []).map((b: any) => b.listings).filter(Boolean) as Listing[]).map(addDaysLeft)
}

export async function toggleBookmark(userId: string, listingId: string): Promise<boolean> {
  if (!hasSupabaseServerEnv()) return false
  const supabase = createServerClient()
  if (!supabase) return false
  const { data: existing, error } = await supabase
    .from('bookmarks')
    .select('id')
    .eq('user_id', userId)
    .eq('listing_id', listingId)
    .single()

  if (error && error.code !== 'PGRST116') {
    return false
  }

  if (existing) {
    await supabase.from('bookmarks').delete().eq('id', existing.id)
    return false // removed
  } else {
    await supabase.from('bookmarks').insert({ user_id: userId, listing_id: listingId })
    return true // added
  }
}
