// ═══════════════════════════════════════
// Kashmir Student — TypeScript Types
// ═══════════════════════════════════════

export type Category = 'admissions' | 'scholarships' | 'jobs' | 'internships'
export type ListingStatus = 'live' | 'draft' | 'expired'

export interface Listing {
  id: string
  slug: string
  title: string
  category: Category
  short_desc: string
  full_desc: string
  eligibility: string[]
  fees: string | null
  location: string
  org_name: string
  course: string | null
  start_date: string | null
  last_date: string
  exam_date: string | null
  apply_link: string | null
  notif_link: string | null
  tags: string[]
  is_featured: boolean
  is_active: boolean
  views: number
  status: ListingStatus
  created_at: string
  updated_at: string
  // computed
  days_left?: number
}

export interface Profile {
  id: string
  email: string
  full_name: string | null
  college: string | null
  course: string | null
  location: string | null
  avatar_url: string | null
  created_at: string
  updated_at: string
}

export interface Bookmark {
  id: string
  user_id: string
  listing_id: string
  created_at: string
  listing?: Listing
}

export interface AdminUser {
  id: string
  email: string
  name: string
  role: 'super_admin' | 'editor'
  is_active: boolean
  last_login: string | null
  created_at: string
}

export interface ListingFilters {
  category?: Category | ''
  location?: string
  course?: string
  deadline?: 'active' | 'expiring' | ''
  sort?: 'deadline' | 'newest' | 'featured' | 'views'
  search?: string
  page?: number
  limit?: number
}

export interface PaginatedListings {
  data: Listing[]
  total: number
  page: number
  limit: number
  hasMore: boolean
}

export interface SEOMeta {
  title: string
  description: string
  canonical?: string
  openGraph?: {
    title: string
    description: string
    url?: string
  }
}

export type ApiResponse<T> =
  | { success: true; data: T }
  | { success: false; error: string }

// Category metadata
export const CATEGORIES: Record<Category, { label: string; icon: string; color: string; description: string }> = {
  admissions: {
    label: 'Admissions',
    icon: '🎓',
    color: '#3730a3',
    description: 'College and university admissions across J&K and India',
  },
  scholarships: {
    label: 'Scholarships',
    icon: '💰',
    color: '#065f46',
    description: 'Scholarships and financial aid for J&K students',
  },
  jobs: {
    label: 'Jobs',
    icon: '💼',
    color: '#854d0e',
    description: 'Government and private sector jobs in J&K and India',
  },
  internships: {
    label: 'Internships',
    icon: '🧪',
    color: '#9d174d',
    description: 'Paid internships at top companies and government departments',
  },
}
