import { getListings } from '@/lib/listings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ListingCard from '@/components/ListingCard'
import ListingsFilter from '@/components/ListingsFilter'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Scholarships for J&K Students | Kashmir Student 4',
  description: 'Find PMSSS, PM Scholarship, AICTE Pragati and more scholarships exclusively for Jammu & Kashmir students.',
}
export const revalidate = 3600

export default async function ScholarshipsPage({ searchParams }: { searchParams: Record<string, string> }) {
  const filters = { category: 'scholarships' as const, ...searchParams, page: parseInt(searchParams.page || '1'), limit: 12 }
  const { data: listings, total } = await getListings(filters)
  return (
    <>
      <Navbar />
      <div className="bg-brand-800 px-4 sm:px-6 py-7">
        <div className="max-w-7xl mx-auto flex items-end gap-6">
          <div>
            <h1 className="font-serif text-[28px] text-white">💰 Scholarships</h1>
            <p className="text-white/50 text-[13.5px] mt-1">PMSSS, PM Scholarship, AICTE Pragati and ₹12Cr+ in funding for J&K students.</p>
          </div>
          <div className="ml-auto font-serif text-[48px] text-white/10 leading-none pb-1 hidden sm:block">{total}</div>
        </div>
      </div>
      <ListingsFilter currentFilters={filters} total={total} />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {listings.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">{listings.map(l => <ListingCard key={l.id} listing={l} />)}</div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#dde8e2]"><div className="text-4xl mb-4">💰</div><h3 className="font-serif text-xl text-brand-800 mb-2">No scholarships found</h3></div>
        )}
      </div>
      <Footer />
    </>
  )
}
