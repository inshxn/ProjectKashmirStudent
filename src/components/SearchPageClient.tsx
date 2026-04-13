'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import ListingCard from './ListingCard'
import type { Listing } from '@/types'

const POPULAR = ['JKPSC KAS', 'NIT Srinagar', 'PMSSS Scholarship', 'J&K Bank PO', 'Digital J&K Internship', 'JEE Advanced', 'PM Scholarship', 'Google Internship', 'IIM MBA', 'GATE 2026']

interface Props { query: string; results: Listing[] }

export default function SearchPageClient({ query, results }: Props) {
  const router = useRouter()
  const [input, setInput] = useState(query)

  function doSearch(q?: string) {
    const term = (q ?? input).trim()
    if (!term) return
    router.push(`/search?q=${encodeURIComponent(term)}`)
  }

  return (
    <>
      {/* Header */}
      <div className="bg-brand-800 px-4 sm:px-6 py-10">
        <div className="max-w-2xl mx-auto">
          <h1 className="font-serif text-[26px] text-white mb-4">Search Opportunities</h1>
          <div className="flex bg-white/10 border border-white/15 rounded-xl overflow-hidden shadow-lg">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && doSearch()}
              placeholder="Try: JKPSC, NIT Srinagar, PMSSS, J&K Bank…"
              className="flex-1 bg-transparent border-none outline-none text-white placeholder:text-white/40 px-4 py-3 text-[14px]"
            />
            <button
              onClick={() => input && doSearch()}
              className="px-5 bg-amber text-brand-800 font-bold text-[13.5px] hover:bg-amber-dark transition-all"
            >
              Search
            </button>
            {input && (
              <button
                onClick={() => { setInput(''); router.push('/search') }}
                className="px-3 text-white/50 hover:text-white"
              >✕</button>
            )}
          </div>
          {query && (
            <div className="text-white/50 text-sm mt-3">
              {results.length} result{results.length !== 1 ? 's' : ''} for &ldquo;{query}&rdquo;
            </div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-6">
        {!query ? (
          <>
            {/* Popular searches */}
            <div className="mb-8">
              <h2 className="font-serif text-[18px] text-brand-800 mb-4">Popular Searches</h2>
              <div className="flex flex-wrap gap-2.5">
                {POPULAR.map(p => (
                  <button key={p} onClick={() => { setInput(p); doSearch(p) }}
                    className="px-4 py-2 bg-white border border-[#dde8e2] rounded-full text-[13px] font-medium text-brand-800 hover:bg-brand-800 hover:text-white hover:border-brand-800 transition-all">
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : results.length > 0 ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {results.map(l => <ListingCard key={l.id} listing={l} />)}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-[#dde8e2]">
            <div className="text-4xl mb-4">🔍</div>
            <h3 className="font-serif text-xl text-brand-800 mb-2">No results for &ldquo;{query}&rdquo;</h3>
            <p className="text-[13.5px] text-[#4a6355] mb-4">Try different keywords or browse by category.</p>
            <button onClick={() => { setInput(''); router.push('/search') }} className="btn-secondary text-sm">
              Clear Search
            </button>
          </div>
        )}
      </div>
    </>
  )
}
