import type { Metadata } from 'next'
import Link from 'next/link'
import { getFeaturedListings, getListingsByCategory, getUrgentListings } from '@/lib/listings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ListingCard from '@/components/ListingCard'
import DeadlineTicker from '@/components/DeadlineTicker'
import SearchHero from '@/components/SearchHero'
import HowItWorks from '@/components/HowItWorks'
import CategoryStats from '@/components/CategoryStats'

export const metadata: Metadata = {
  title: 'Kashmir Student 4 — J&K\'s #1 Student Portal',
  description: "Discover JKPSC, NIT Srinagar, PMSSS scholarships, J&K Bank jobs and national opportunities — curated daily for students of Jammu & Kashmir.",
}

export const revalidate = 3600 // ISR — revalidate every hour

export default async function HomePage() {
  const [featured, urgent, admissions, scholarships, jobs] = await Promise.all([
    getFeaturedListings(),
    getUrgentListings(14),
    getListingsByCategory('admissions', 4),
    getListingsByCategory('scholarships', 4),
    getListingsByCategory('jobs', 4),
  ])

  return (
    <>
      <Navbar />
      <DeadlineTicker listings={urgent} />

      {/* Hero */}
      <SearchHero />

      {/* Category Stats */}
      <CategoryStats />

      {/* Featured */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
          <div className="flex items-end justify-between mb-5 pb-4 border-b-2 border-[#dde8e2]">
            <div>
              <div className="section-label mb-1">Handpicked</div>
              <h2 className="section-title">Featured Opportunities</h2>
            </div>
            <Link href="/listings" className="text-sm font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-800 hover:text-white transition-all">
              View All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {featured.slice(0, 6).map((listing, i) => (
              <ListingCard key={listing.id} listing={listing} featured={i === 0} />
            ))}
          </div>
        </section>
      )}

      {/* Admissions */}
      {admissions.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-end justify-between mb-5 pb-4 border-b-2 border-[#dde8e2]">
            <div>
              <div className="section-label mb-1">Enroll Now</div>
              <h2 className="section-title">Latest Admissions</h2>
            </div>
            <Link href="/admissions" className="text-sm font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-800 hover:text-white transition-all">
              See All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {admissions.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      )}

      {/* Scholarships */}
      {scholarships.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-end justify-between mb-5 pb-4 border-b-2 border-[#dde8e2]">
            <div>
              <div className="section-label mb-1">Fund Your Future</div>
              <h2 className="section-title">Active Scholarships</h2>
            </div>
            <Link href="/scholarships" className="text-sm font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-800 hover:text-white transition-all">
              See All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {scholarships.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      )}

      {/* Jobs */}
      {jobs.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="flex items-end justify-between mb-5 pb-4 border-b-2 border-[#dde8e2]">
            <div>
              <div className="section-label mb-1">Launch Your Career</div>
              <h2 className="section-title">Jobs &amp; Internships</h2>
            </div>
            <Link href="/jobs" className="text-sm font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-800 hover:text-white transition-all">
              See All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {jobs.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </section>
      )}

      {/* How it works */}
      <HowItWorks />

      {/* CTA Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
        <div className="bg-brand-800 rounded-3xl px-8 py-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-mesh pointer-events-none" />
          <div className="relative">
            <h2 className="font-serif text-3xl sm:text-4xl text-white mb-3 leading-tight">
              Never Miss a J&amp;K <em className="text-amber not-italic">Deadline</em>
            </h2>
            <p className="text-white/60 text-base mb-7 max-w-md mx-auto leading-relaxed">
              Create a free account to save opportunities, get deadline alerts for JKPSC, NIT, PMSSS and J&amp;K Bank.
            </p>
            <div className="flex gap-3 justify-center flex-wrap">
              <Link href="/auth/signup" className="btn-amber text-base px-7 py-3">
                Create Free Account →
              </Link>
              <Link href="/listings" className="inline-flex items-center bg-white/10 text-white border border-white/20 rounded-lg px-7 py-3 text-base font-semibold hover:bg-white/20 transition-all">
                Browse Opportunities
              </Link>
            </div>
            <p className="text-white/35 text-xs mt-4">No credit card · Free forever · 2 min setup</p>
          </div>
        </div>
      </section>

      <Footer />
    </>
  )
}
