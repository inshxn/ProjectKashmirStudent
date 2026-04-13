import { redirect } from 'next/navigation'
import type { Metadata } from 'next'
import { createServerClient } from '@/lib/supabase-server'
import { getUserBookmarks } from '@/lib/listings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ListingCard from '@/components/ListingCard'

export const metadata: Metadata = { title: 'My Dashboard | Kashmir Student 4' }
export const revalidate = 0

export default async function DashboardPage() {
  const supabase = createServerClient()
  if (!supabase) redirect('/auth/login')
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login')

  const { data: profile } = await supabase.from('profiles').select('*').eq('id', user.id).single()
  const bookmarks = await getUserBookmarks(user.id)
  const urgent = bookmarks.filter(l => (l.days_left ?? 0) <= 14).sort((a, b) => (a.days_left ?? 0) - (b.days_left ?? 0))
  const hr = new Date().getHours()
  const greeting = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = profile?.full_name?.split(' ')[0] || user.email?.split('@')[0] || 'Student'

  return (
    <>
      <Navbar />

      {/* Banner */}
      <div className="bg-brand-800 px-4 sm:px-6 py-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <h1 className="font-serif text-[24px] text-white">{greeting}, {firstName}!</h1>
              <p className="text-white/50 text-[13.5px] mt-1">
                {bookmarks.length > 0
                  ? `You have ${bookmarks.length} saved opportunit${bookmarks.length === 1 ? 'y' : 'ies'}${urgent.length ? ` and ${urgent.length} expiring soon` : ''}.`
                  : 'Start saving opportunities to track them here.'}
              </p>
            </div>
            <a href="/listings" className="btn-amber text-sm px-5 py-2.5">+ Explore More</a>
          </div>

          {/* Stats */}
          <div className="flex gap-3 mt-5 flex-wrap">
            {[
              { n: bookmarks.length, l: 'Saved' },
              { n: urgent.length, l: 'Expiring Soon' },
              { n: bookmarks.filter(l => l.category === 'scholarships').length, l: 'Scholarships' },
              { n: bookmarks.filter(l => l.category === 'admissions').length, l: 'Admissions' },
            ].map(s => (
              <div key={s.l} className="bg-white/10 border border-white/15 rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="font-serif text-[22px] text-white">{s.n}</div>
                <div className="text-[12px] text-white/50">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {/* Deadline timeline */}
        {urgent.length > 0 && (
          <div className="bg-white border border-[#dde8e2] rounded-2xl p-5 mb-6">
            <h2 className="font-serif text-[16px] text-brand-800 mb-4">⏰ Upcoming Deadlines</h2>
            <div className="space-y-0">
              {urgent.map(l => {
                const days = l.days_left ?? 0
                return (
                  <a key={l.id} href={`/listings/${l.slug}`}
                    className="flex items-center gap-3 py-3 border-b border-[#f5f9f6] last:border-0 hover:opacity-75 transition-opacity cursor-pointer">
                    <div className={`w-11 h-11 rounded-xl flex flex-col items-center justify-center flex-shrink-0 ${days <= 3 ? 'bg-red-100' : days <= 7 ? 'bg-amber-50' : 'bg-slate-100'}`}>
                      <div className={`text-[16px] font-black leading-none ${days <= 3 ? 'text-red-600' : days <= 7 ? 'text-amber-600' : 'text-brand-800'}`}>{days}</div>
                      <div className="text-[8px] text-[#7a9e8a] uppercase">days</div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-[13.5px] text-brand-800 truncate">{l.title}</div>
                      <div className="text-[12px] text-[#7a9e8a]">{l.org_name}</div>
                    </div>
                    <span className={`chip-${l.category} text-[10px] flex-shrink-0`}>{l.category}</span>
                  </a>
                )
              })}
            </div>
          </div>
        )}

        {/* All saved */}
        {bookmarks.length > 0 ? (
          <>
            <div className="text-[12px] font-bold text-[#7a9e8a] uppercase tracking-widest mb-3">
              All Saved ({bookmarks.length})
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {bookmarks.map(l => <ListingCard key={l.id} listing={l} />)}
            </div>
          </>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#dde8e2]">
            <div className="text-4xl mb-4">🔖</div>
            <h3 className="font-serif text-xl text-brand-800 mb-2">Nothing saved yet</h3>
            <p className="text-[13.5px] text-[#4a6355] mb-5">Browse opportunities and click the bookmark icon to save them here.</p>
            <a href="/listings" className="btn-primary text-sm px-6 py-2.5">Browse Opportunities</a>
          </div>
        )}
      </div>

      <Footer />
    </>
  )
}
