'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const FILTERS = [
  { label: 'All Categories', value: 'all' },
  { label: '🎓 Admissions', value: 'admissions' },
  { label: '💰 Scholarships', value: 'scholarships' },
  { label: '💼 Jobs', value: 'jobs' },
  { label: '🧪 Internships', value: 'internships' },
]

export default function SearchHero() {
  const router = useRouter()
  const [query, setQuery] = useState('')
  const [activeFilter, setActiveFilter] = useState('all')

  function handleSearch() {
    if (!query.trim()) return
    const params = new URLSearchParams({ q: query })
    if (activeFilter !== 'all') params.set('category', activeFilter)
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="bg-brand-800 px-4 sm:px-6 py-16 relative overflow-hidden">
      <div className="absolute inset-0 hero-mesh pointer-events-none" />
      <div className="absolute inset-0 grid-dots pointer-events-none" />
      <div className="max-w-2xl mx-auto text-center relative">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 bg-amber/15 border border-amber/30 text-amber px-4 py-1.5 rounded-full text-[12px] font-bold uppercase tracking-widest mb-5">
          <span className="w-1.5 h-1.5 rounded-full bg-amber" />
          Kashmir's #1 Student Portal
        </div>

        <h1 className="font-serif text-[clamp(30px,6vw,52px)] text-white leading-[1.1] tracking-tight mb-4">
          Every <em className="text-amber not-italic">Opportunity</em><br />Under One Roof
        </h1>
        <p className="text-white/60 text-[15px] font-light mb-8 max-w-lg mx-auto leading-relaxed">
          Admissions, scholarships, jobs &amp; internships for students of Jammu &amp; Kashmir — deadline-tracked daily.
        </p>

        {/* Search bar */}
        <div className="flex bg-white/8 border border-white/15 rounded-2xl p-1.5 gap-1.5 shadow-xl mb-4">
          <input
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSearch()}
            placeholder="Try: JKPSC, NIT Srinagar, PMSSS, J&K Bank…"
            className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 px-4 py-2.5 text-[14.5px]"
          />
          <button
            onClick={handleSearch}
            className="px-6 py-2.5 bg-amber text-brand-800 rounded-xl font-bold text-[13.5px] hover:bg-amber-dark transition-all active:scale-95 whitespace-nowrap"
          >
            Search →
          </button>
        </div>

        {/* Filters */}
        <div className="flex gap-2 flex-wrap justify-center">
          {FILTERS.map(f => (
            <button
              key={f.value}
              onClick={() => setActiveFilter(f.value)}
              className={`px-4 py-1.5 rounded-full text-[12.5px] font-medium border transition-all ${
                activeFilter === f.value
                  ? 'bg-white/15 border-white/50 text-white'
                  : 'border-white/15 text-white/60 hover:bg-white/10 hover:text-white'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Stats */}
        <div className="flex justify-center gap-10 mt-10 pt-9 border-t border-white/10">
          {[
            { num: '18+', label: 'Opportunities' },
            { num: '120+', label: 'Institutes' },
            { num: '₹12Cr+', label: 'Scholarships' },
            { num: 'J&K', label: 'Focused' },
          ].map(s => (
            <div key={s.label} className="text-center">
              <div className="font-serif text-[26px] text-white leading-none">{s.num}</div>
              <div className="text-[11.5px] text-white/45 mt-1">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
