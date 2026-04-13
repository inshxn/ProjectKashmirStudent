'use client'
import Link from 'next/link'
import type { Listing } from '@/types'

interface Props { listings: Listing[]; adminUser: { name: string } }

export default function AdminDashboardContent({ listings, adminUser }: Props) {
  const hr = new Date().getHours()
  const greeting = hr < 12 ? 'Good morning' : hr < 17 ? 'Good afternoon' : 'Good evening'
  const firstName = adminUser.name.split(' ')[0]

  const totalViews = listings.reduce((s, l) => s + (l.views || 0), 0)
  const cats = { admissions: 0, scholarships: 0, jobs: 0, internships: 0 } as Record<string, number>
  listings.forEach(l => { cats[l.category] = (cats[l.category] || 0) + 1 })
  const expiring = listings.filter(l => (l.days_left ?? 0) <= 7)
  const barMax = Math.max(...Object.values(cats), 1)

  const CAT_COLORS: Record<string, string> = { admissions: '#4f46e5', scholarships: '#15803d', jobs: '#e8861a', internships: '#7c3aed' }

  return (
    <>
      {/* Header */}
      <div className="flex items-start justify-between mb-6 flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: '"DM Serif Display",serif' }} className="text-[24px] text-[#0a2218]">Dashboard</h1>
          <p className="text-[13px] text-[#4a6355] mt-0.5">{greeting}, {firstName}. Here's what's happening today.</p>
        </div>
        <div className="flex gap-2">
          <Link href="/admin/listings" className="text-[13px] font-semibold text-[#0a2218] border border-[#dde8e2] bg-white px-3 py-2 rounded-lg hover:bg-[#e8f5ee] transition-all">
            📋 All Listings
          </Link>
          <Link href="/admin/add-listing" className="text-[13px] font-bold bg-[#0a2218] text-white px-3 py-2 rounded-lg hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">
            + Add Listing
          </Link>
        </div>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[
          { icon: '📋', label: 'Total Listings', value: listings.length, trend: '↑ 6 this week', color: 'green', after: '#15803d' },
          { icon: '👁️', label: 'Total Views', value: `${(totalViews / 1000).toFixed(1)}K`, trend: '↑ 12% vs last week', color: 'blue', after: '#0ea5e9' },
          { icon: '⭐', label: 'Featured', value: listings.filter(l => l.is_featured).length, trend: 'Active on homepage', color: 'orange', after: '#e8861a' },
          { icon: '⏰', label: 'Expiring Soon', value: expiring.length, trend: expiring.length ? 'Needs attention' : 'All clear', color: expiring.length ? 'rose' : 'green', after: expiring.length ? '#e11d48' : '#15803d' },
        ].map(s => (
          <div key={s.label} className="bg-white border border-[#dde8e2] rounded-2xl p-5 relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-2xl" style={{ background: s.after }} />
            <div className="text-[22px] mb-2.5">{s.icon}</div>
            <div style={{ fontFamily: '"DM Serif Display",serif' }} className="text-[28px] text-[#0a2218] leading-none">{s.value}</div>
            <div className="text-[12.5px] text-[#7a9e8a] mt-1">{s.label}</div>
            <div className="text-[11.5px] mt-2 font-semibold" style={{ color: s.after }}>{s.trend}</div>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-[1fr_340px] gap-5 mb-5">
        {/* Bar chart */}
        <div className="bg-white border border-[#dde8e2] rounded-2xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-[14px] font-bold text-[#0a2218]">Listings by Category</h3>
            <span className="text-[12.5px] text-[#7a9e8a]">{listings.length} total</span>
          </div>
          <div className="flex items-end gap-4 h-[120px] pb-2">
            {Object.entries(cats).map(([cat, count]) => (
              <div key={cat} className="flex flex-col items-center gap-1.5 flex-1">
                <div className="text-[11px] font-bold text-[#0a2218]">{count}</div>
                <div className="w-full rounded-t-lg transition-all" style={{ height: `${Math.round((count / barMax) * 96)}px`, background: CAT_COLORS[cat], opacity: 0.85 }} title={`${cat}: ${count}`} />
                <div className="text-[10.5px] text-[#7a9e8a] capitalize">{cat}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent activity */}
        <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
          <div className="px-5 py-3.5 border-b border-[#f5f9f6] font-bold text-[14px] text-[#0a2218]">🔔 Recent Activity</div>
          <div className="overflow-y-auto max-h-[200px]">
            {[
              { icon: '➕', bg: '#dcfce7', text: 'JKPSC KAS 2025 published', time: '2h ago' },
              { icon: '✏️', bg: '#e0f2fe', text: 'NIT Srinagar listing updated', time: '5h ago' },
              { icon: '⭐', bg: '#fdf0e0', text: 'PMSSS Scholarship featured', time: '1d ago' },
              { icon: '👥', bg: '#e0f2fe', text: '28 new user registrations', time: 'Today' },
              { icon: '🤖', bg: '#fdf0e0', text: 'AI formatted 2 listings', time: '2d ago' },
            ].map((a, i) => (
              <div key={i} className="flex items-start gap-3 px-5 py-3 border-b border-[#f5f9f6] last:border-0">
                <div className="w-8 h-8 rounded-lg flex items-center justify-center text-[14px] shrink-0" style={{ background: a.bg }}>{a.icon}</div>
                <div className="flex-1 text-[13px] text-[#0a2218]">{a.text}</div>
                <div className="text-[11px] text-[#7a9e8a] shrink-0">{a.time}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Expiring soon table */}
      <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-[#dde8e2] flex items-center justify-between">
          <div>
            <h3 className="text-[14px] font-bold text-[#0a2218]">⏰ Expiring Soon</h3>
            <p className="text-[12.5px] text-[#7a9e8a] mt-0.5">Listings closing within 14 days</p>
          </div>
          <Link href="/admin/deadlines" className="text-[13px] font-semibold text-[#0a2218] border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-[#e8f5ee] transition-all">
            Full Tracker →
          </Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7faf8]">
                {['Listing', 'Category', 'Org', 'Days Left', 'Views', 'Actions'].map(h => (
                  <th key={h} className="text-left px-4 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7a9e8a] border-b border-[#dde8e2] whitespace-nowrap">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {(listings.filter(l => (l.days_left ?? 0) <= 14).sort((a, b) => (a.days_left ?? 0) - (b.days_left ?? 0))).map(l => (
                <tr key={l.id} className="hover:bg-[#f9fbfa] border-b border-[#f5f9f6] last:border-0 cursor-pointer">
                  <td className="px-4 py-3 text-[13.5px] font-semibold text-[#0a2218] max-w-[200px] truncate">{l.title}</td>
                  <td className="px-4 py-3"><span className={`chip-${l.category} text-[11px]`}>{l.category}</span></td>
                  <td className="px-4 py-3 text-[13px] text-[#7a9e8a] whitespace-nowrap">{l.org_name}</td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[12px] font-bold ${(l.days_left ?? 0) <= 3 ? 'bg-red-100 text-red-700' : (l.days_left ?? 0) <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {l.days_left}d
                    </span>
                  </td>
                  <td className="px-4 py-3 text-[13px] text-[#7a9e8a]">{l.views?.toLocaleString()}</td>
                  <td className="px-4 py-3">
                    <div className="flex gap-1.5">
                      <Link href={`/admin/listings/${l.id}`} className="px-2.5 py-1 bg-[#eef2ff] text-[#4f46e5] text-[12px] font-semibold rounded-md hover:bg-[#4f46e5] hover:text-white transition-all">Edit</Link>
                      <Link href={`/listings/${l.slug}`} target="_blank" className="px-2.5 py-1 bg-[#e8f5ee] text-[#0a2218] text-[12px] font-semibold rounded-md hover:bg-[#0a2218] hover:text-white transition-all">View</Link>
                    </div>
                  </td>
                </tr>
              ))}
              {listings.filter(l => (l.days_left ?? 0) <= 14).length === 0 && (
                <tr><td colSpan={6} className="px-4 py-8 text-center text-[13.5px] text-[#7a9e8a]">✅ No listings expiring in the next 14 days</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
