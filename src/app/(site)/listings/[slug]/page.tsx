import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getListing, getRelatedListings } from '@/lib/listings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ListingCard from '@/components/ListingCard'
import BookmarkButton from '@/components/BookmarkButton'
import DeadlineCountdown from '@/components/DeadlineCountdown'
import { CATEGORIES } from '@/types'
import ListingActions from '@/components/ListingActions'
import { format, parseISO } from 'date-fns'

interface Props {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const listing = await getListing(params.slug)
  if (!listing) return { title: 'Not Found' }

  const title = `${listing.title} 2025 — Apply Online | Kashmir Student 4`
  const desc = listing.short_desc

  return {
    title,
    description: desc,
    alternates: { canonical: `/listings/${listing.slug}` },
    openGraph: {
      title,
      description: desc,
      url: `https://kashmirstudent.in/listings/${listing.slug}`,
      type: 'article',
    },
  }
}

export const revalidate = 3600

export default async function ListingDetailPage({ params }: Props) {
  const listing = await getListing(params.slug)
  if (!listing) notFound()

  const related = await getRelatedListings(listing)
  const cat = CATEGORIES[listing.category]
  const daysLeft = listing.days_left ?? 0
  const isUrgent = daysLeft <= 7
  const fmtDate = (d: string | null) => d ? format(parseISO(d), 'dd/MM/yyyy') : 'TBA'

  // JSON-LD structured data
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': listing.category === 'admissions' ? 'EducationalOccupationalProgram' : 'JobPosting',
    name: listing.title,
    description: listing.short_desc,
    provider: { '@type': 'Organization', name: listing.org_name },
    applicationDeadline: listing.last_date,
    url: `https://kashmirstudent.in/listings/${listing.slug}`,
    ...(listing.apply_link && { applicationContact: { '@type': 'ContactPoint', url: listing.apply_link } }),
  }

  return (
    <>
      <Navbar />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav className="bg-white border-b border-[#dde8e2] px-4 sm:px-6 py-3">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-[#4a6355]">
            <Link href="/" className="hover:text-brand-800">Home</Link>
            <span className="text-[#7a9e8a]">›</span>
            <Link href={`/${listing.category}`} className="hover:text-brand-800 capitalize">{listing.category}</Link>
            <span className="text-[#7a9e8a]">›</span>
            <span className="text-brand-800 font-semibold truncate max-w-48">{listing.title}</span>
          </div>
          <ListingActions title={listing.title} />
        </div>
      </nav>

      {/* Hero */}
      <div className="bg-brand-800 px-4 sm:px-6 py-8 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="max-w-5xl mx-auto relative">
          <div className="flex flex-wrap gap-2 mb-3">
            <span className={`chip-${listing.category}`}>{cat.icon} {cat.label}</span>
            {listing.is_featured && <span className="bg-amber/20 text-amber text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">⭐ Featured</span>}
            {isUrgent && <span className="bg-red-500/20 text-red-300 text-xs font-bold px-2 py-1 rounded-md uppercase tracking-wide">⏰ {daysLeft} Days Left</span>}
          </div>
          <h1 className="font-serif text-2xl sm:text-4xl text-white leading-tight mb-2">{listing.title}</h1>
          <p className="text-white/60 text-sm mb-5 max-w-xl leading-relaxed">{listing.short_desc}</p>
          <div className="flex flex-wrap gap-4 pt-4 border-t border-white/10">
            <div className="flex items-center gap-1.5 text-white/70 text-sm">🏛 <strong className="text-white">{listing.org_name}</strong></div>
            <div className="flex items-center gap-1.5 text-white/70 text-sm">📍 <strong className="text-white">{listing.location}</strong></div>
            {listing.course && <div className="flex items-center gap-1.5 text-white/70 text-sm">📖 <strong className="text-white">{listing.course}</strong></div>}
            <div className="flex items-center gap-1.5 text-white/70 text-sm">📅 Last Date: <strong className={isUrgent ? 'text-red-300' : 'text-white'}>{fmtDate(listing.last_date)}</strong></div>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 grid lg:grid-cols-[1fr_300px] gap-6 items-start">

        {/* Main */}
        <div className="space-y-4">
          {/* Overview */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-[#f7faf8] border-b border-[#f1f5f9]">
              <div className="w-8 h-8 rounded-lg bg-[#eef2ff] flex items-center justify-content text-base">📄</div>
              <h3 className="font-bold text-sm text-brand-800">Overview</h3>
            </div>
            <div className="px-5 py-5">
              <p className="listing-prose">{listing.full_desc}</p>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-[#f7faf8] border-b border-[#f1f5f9]">
              <div className="w-8 h-8 rounded-lg bg-[#d1fae5] flex items-center justify-content text-base">📅</div>
              <h3 className="font-bold text-sm text-brand-800">Important Dates</h3>
            </div>
            <div className="px-5 py-5">
              <table className="w-full">
                <tbody className="divide-y divide-[#f1f5f9]">
                  <tr><td className="py-2.5 text-sm text-[#4a6355] font-medium w-2/5">Application Opens</td><td className="py-2.5 text-sm font-semibold text-brand-800">{fmtDate(listing.start_date)}</td></tr>
                  <tr><td className="py-2.5 text-sm text-[#4a6355] font-medium">Last Date to Apply</td><td className="py-2.5 text-sm font-bold text-red-600">{fmtDate(listing.last_date)}</td></tr>
                  {listing.exam_date && <tr><td className="py-2.5 text-sm text-[#4a6355] font-medium">Exam / Test Date</td><td className="py-2.5 text-sm font-semibold text-brand-800">{fmtDate(listing.exam_date)}</td></tr>}
                </tbody>
              </table>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-[#f7faf8] border-b border-[#f1f5f9]">
              <div className="w-8 h-8 rounded-lg bg-[#d1fae5] flex items-center justify-content text-base">✅</div>
              <h3 className="font-bold text-sm text-brand-800">Eligibility Criteria</h3>
            </div>
            <div className="px-5 py-5">
              <ul className="space-y-2.5">
                {listing.eligibility.map((e, i) => (
                  <li key={i} className="flex gap-3 items-start text-sm text-[#4a6355] leading-relaxed">
                    <div className="w-5 h-5 rounded-full bg-[#d1fae5] text-green-700 text-[11px] font-bold flex items-center justify-center flex-shrink-0 mt-0.5">✓</div>
                    {e}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Fees */}
          {listing.fees && (
            <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
              <div className="flex items-center gap-3 px-5 py-4 bg-[#f7faf8] border-b border-[#f1f5f9]">
                <div className="w-8 h-8 rounded-lg bg-amber-light flex items-center justify-content text-base">💳</div>
                <h3 className="font-bold text-sm text-brand-800">Fees &amp; Charges</h3>
              </div>
              <div className="px-5 py-5"><p className="text-sm text-[#4a6355]">{listing.fees}</p></div>
            </div>
          )}

          {/* Application Steps */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-4 bg-[#f7faf8] border-b border-[#f1f5f9]">
              <div className="w-8 h-8 rounded-lg bg-[#e0f2fe] flex items-center justify-content text-base">🔢</div>
              <h3 className="font-bold text-sm text-brand-800">Application Process</h3>
            </div>
            <div className="px-5 py-5 space-y-0">
              {[
                { t: 'Register', d: 'Visit the official website and create an account with your email and mobile number.' },
                { t: 'Fill Application', d: 'Complete the online form with personal, academic, and category details carefully.' },
                { t: 'Upload Documents', d: 'Upload photo, signature, and required certificates in the prescribed format.' },
                { t: 'Pay Fees', d: 'Pay the application fee via Credit/Debit Card, Net Banking, UPI, or NEFT.' },
                { t: 'Submit & Print', d: 'Submit the form, note your application number, and download the confirmation receipt.' },
              ].map((s, i) => (
                <div key={i} className="flex gap-3 items-start py-3 border-b border-[#f8fafc] last:border-0">
                  <div className="w-7 h-7 rounded-lg bg-brand-800 text-white text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5">{i + 1}</div>
                  <div className="text-sm text-[#4a6355] leading-relaxed"><strong className="text-brand-800 block mb-0.5">{s.t}</strong>{s.d}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {listing.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {listing.tags.map(tag => (
                <Link key={tag} href={`/search?q=${encodeURIComponent(tag)}`} className="px-3 py-1.5 bg-slate-100 rounded-lg text-xs text-[#4a6355] hover:bg-brand-800 hover:text-white transition-all">
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sticky top-20">
          {/* Countdown */}
          <DeadlineCountdown lastDate={listing.last_date} daysLeft={daysLeft} />

          {/* Apply CTA */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl p-4 space-y-2">
            <a href={listing.apply_link || '#'} target="_blank" rel="noopener noreferrer"
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-brand-800 text-white rounded-xl text-base font-bold hover:bg-amber hover:text-brand-800 transition-all hover:-translate-y-0.5 hover:shadow-lg">
              🚀 Apply Now →
            </a>
            <BookmarkButton listingId={listing.id} />
            {listing.notif_link && (
              <a href={listing.notif_link} target="_blank" rel="noopener noreferrer"
                className="w-full flex items-center justify-center gap-2 py-2 text-sm text-brand-800 hover:bg-slate-50 rounded-lg transition-all">
                📄 Official Notification ↗
              </a>
            )}
          </div>

          {/* Org Info */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl p-4">
            <h4 className="font-bold text-sm text-brand-800 mb-3">🏛 Organisation</h4>
            <div className="space-y-2 text-sm text-[#4a6355]">
              <div className="font-semibold text-brand-800">{listing.org_name}</div>
              <div>📍 {listing.location}</div>
              {listing.course && <div>📖 {listing.course}</div>}
            </div>
          </div>
        </div>
      </div>

      {/* Related */}
      {related.length > 0 && (
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6">
          <div className="flex items-end justify-between mb-4 pb-3 border-b-2 border-[#dde8e2]">
            <div>
              <div className="section-label mb-1">More Like This</div>
              <h2 className="section-title">Related {CATEGORIES[listing.category].label}</h2>
            </div>
            <Link href={`/${listing.category}`} className="text-sm font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-800 hover:text-white transition-all">
              See All →
            </Link>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {related.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        </div>
      )}

      <Footer />
    </>
  )
}
