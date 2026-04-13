import type { Metadata } from 'next'
import { getListings } from '@/lib/listings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ListingCard from '@/components/ListingCard'
import ListingsFilter from '@/components/ListingsFilter'
import type { Category, ListingFilters } from '@/types'

interface Props {
  params: { category?: string }
  searchParams: { [key: string]: string | undefined }
}

export async function generateMetadata({ params, searchParams }: Props): Promise<Metadata> {
  const cat = searchParams.category as Category | undefined
  const titles: Record<string, string> = {
    admissions: 'College Admissions in J&K & India',
    scholarships: 'Scholarships for J&K Students',
    jobs: 'Government & Private Jobs in J&K',
    internships: 'Internship Opportunities for J&K Students',
  }
  const title = cat ? titles[cat] : 'All Opportunities'
  return {
    title: `${title} | Kashmir Student 4`,
    description: `Browse ${title.toLowerCase()} on Kashmir Student — curated and deadline-tracked.`,
  }
}

export const revalidate = 1800

export default async function ListingsPage({ searchParams }: Props) {
  const filters: ListingFilters = {
    category: searchParams.category as Category | undefined,
    location: searchParams.location,
    course: searchParams.course,
    deadline: searchParams.deadline as any,
    sort: (searchParams.sort as any) || 'deadline',
    page: parseInt(searchParams.page || '1'),
    limit: 12,
  }

  const { data: listings, total, hasMore } = await getListings(filters)
  const catTitles: Record<string, string> = {
    admissions: 'College Admissions',
    scholarships: 'Scholarships',
    jobs: 'Jobs',
    internships: 'Internships',
  }
  const title = filters.category ? catTitles[filters.category] : 'All Opportunities'

  return (
    <>
      <Navbar />

      {/* Category band */}
      <div className="bg-brand-800 px-4 sm:px-6 py-7 relative overflow-hidden">
        <div className="max-w-7xl mx-auto flex items-end gap-6">
          <div>
            <h1 className="font-serif text-[28px] text-white">{title}</h1>
            <p className="text-white/50 text-[13.5px] mt-1">
              {filters.category === 'admissions' && 'Find the right college, course, and entrance for your future.'}
              {filters.category === 'scholarships' && 'Discover funding to support your education in J&K and beyond.'}
              {filters.category === 'jobs' && 'Full-time roles in government and private sector, hiring now.'}
              {filters.category === 'internships' && 'Real-world experience at top companies and government departments.'}
              {!filters.category && 'Browse all admissions, scholarships, jobs and internships.'}
            </p>
          </div>
          <div className="ml-auto font-serif text-[48px] text-white/10 leading-none pb-1 hidden sm:block">
            {total}
          </div>
        </div>
      </div>

      {/* Filters */}
      <ListingsFilter currentFilters={filters} total={total} />

      {/* Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {listings.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#dde8e2]">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-serif text-xl text-brand-800 mb-2">No results found</h3>
            <p className="text-[13.5px] text-[#4a6355]">Try adjusting your filters.</p>
          </div>
        )}

        {/* Pagination */}
        {total > 12 && (
          <div className="flex items-center justify-between mt-8">
            <p className="text-[13px] text-[#7a9e8a]">Showing {listings.length} of {total} results</p>
            <div className="flex gap-2">
              {filters.page! > 1 && (
                <a href={`?page=${filters.page! - 1}`} className="px-4 py-2 border border-[#dde8e2] rounded-lg text-sm font-medium hover:bg-brand-800 hover:text-white transition-all">‹ Prev</a>
              )}
              {hasMore && (
                <a href={`?page=${filters.page! + 1}`} className="px-4 py-2 border border-[#dde8e2] rounded-lg text-sm font-medium hover:bg-brand-800 hover:text-white transition-all">Next ›</a>
              )}
            </div>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
