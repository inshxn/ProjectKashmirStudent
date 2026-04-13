'use client'
import { useState } from 'react'
import Link from 'next/link'
import type { Listing } from '@/types'

export default function AdminListingsTable({ listings }: { listings: Listing[] }) {
  const [search, setSearch] = useState('')
  const [cat, setCat] = useState('')
  const [sort, setSort] = useState('deadline')
  const [error, setError] = useState('')

  let filtered = listings.filter(l => {
    const matchSearch = !search || l.title.toLowerCase().includes(search.toLowerCase()) || l.org_name.toLowerCase().includes(search.toLowerCase())
    const matchCat = !cat || l.category === cat
    return matchSearch && matchCat
  })

  if (sort === 'deadline') filtered.sort((a, b) => (a.days_left ?? 0) - (b.days_left ?? 0))
  else if (sort === 'views') filtered.sort((a, b) => (b.views || 0) - (a.views || 0))
  else if (sort === 'newest') filtered.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())

  async function deleteItem(id: string) {
    if (!confirm('Delete this listing? This cannot be undone.')) return
    setError('')

    try {
      const res = await fetch(`/api/admin?id=${id}`, { method: 'DELETE' })
      const data = await res.json()

      if (!data.success) {
        setError(data.error || 'Failed to delete listing.')
        return
      }

      window.location.reload()
    } catch {
      setError('Unable to delete right now. Please try again.')
    }
  }

  return (
    <>
      <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: '"DM Serif Display",serif' }} className="text-[24px] text-[#0a2218]">All Listings</h1>
          <p className="text-[13px] text-[#4a6355] mt-0.5">{listings.length} total · {listings.filter(l => l.is_featured).length} featured · {listings.filter(l => l.status === 'live').length} live</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => alert('CSV export — connect to API in production')} className="text-[13px] font-semibold text-[#0a2218] border border-[#dde8e2] bg-white px-3 py-2 rounded-lg hover:bg-[#e8f5ee] transition-all">
            📥 Export CSV
          </button>
          <Link href="/admin/add-listing" className="text-[13px] font-bold bg-[#0a2218] text-white px-3 py-2 rounded-lg hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">
            + Add New
          </Link>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700 mb-4">
          {error}
        </div>
      )}

      <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
        {/* Filters */}
        <div className="flex gap-2 px-4 py-3 border-b border-[#dde8e2] bg-[#fafcfb] flex-wrap">
          <div className="flex items-center gap-2 bg-white border border-[#dde8e2] rounded-lg px-3 py-2 flex-1 min-w-[180px]">
            <span className="text-sm">🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search listings…" className="flex-1 bg-transparent border-none outline-none text-[13px] text-[#0a2218]" />
          </div>
          <select value={cat} onChange={e => setCat(e.target.value)} className="border border-[#dde8e2] rounded-lg px-3 py-2 text-[13px] text-[#0a2218] bg-white outline-none">
            <option value="">All Categories</option>
            {['admissions', 'scholarships', 'jobs', 'internships'].map(c => <option key={c} value={c}>{c.charAt(0).toUpperCase()+c.slice(1)}</option>)}
          </select>
          <select value={sort} onChange={e => setSort(e.target.value)} className="border border-[#dde8e2] rounded-lg px-3 py-2 text-[13px] text-[#0a2218] bg-white outline-none">
            <option value="deadline">Sort: Deadline</option>
            <option value="views">Sort: Views</option>
            <option value="newest">Sort: Newest</option>
          </select>
          <div className="ml-auto text-[13px] text-[#7a9e8a] font-medium self-center">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</div>
          {(search || cat) && <button onClick={() => { setSearch(''); setCat('') }} className="text-[13px] text-red-500 font-semibold px-2 rounded-lg hover:bg-red-50 transition-all">Clear ✕</button>}
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f7faf8]">
                {['', 'Title', 'Category', 'Location', 'Deadline', 'Status', 'Featured', 'Views', 'Actions'].map(h => (
                  <th key={h} className="text-left px-3 py-2.5 text-[11px] font-bold uppercase tracking-wider text-[#7a9e8a] border-b border-[#dde8e2] whitespace-nowrap first:w-8">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map(l => (
                <tr key={l.id} className="hover:bg-[#f9fbfa] border-b border-[#f5f9f6] last:border-0">
                  <td className="px-3 py-3"><input type="checkbox" className="w-4 h-4 accent-[#0a2218]" /></td>
                  <td className="px-3 py-3 max-w-[200px]">
                    <div className="font-semibold text-[13.5px] text-[#0a2218] truncate">{l.title}</div>
                    <div className="text-[12px] text-[#7a9e8a] truncate">{l.org_name}</div>
                  </td>
                  <td className="px-3 py-3"><span className={`chip-${l.category} text-[11px]`}>{l.category}</span></td>
                  <td className="px-3 py-3 text-[12.5px] text-[#7a9e8a] whitespace-nowrap">{l.location}</td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-[12px] font-bold whitespace-nowrap ${(l.days_left ?? 0) <= 3 ? 'bg-red-100 text-red-700' : (l.days_left ?? 0) <= 7 ? 'bg-amber-100 text-amber-700' : 'bg-green-100 text-green-700'}`}>
                      {l.days_left}d left
                    </span>
                  </td>
                  <td className="px-3 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11.5px] font-semibold ${l.status === 'live' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${l.status === 'live' ? 'bg-green-500' : 'bg-amber-500'}`} />
                      {l.status}
                    </span>
                  </td>
                  <td className="px-3 py-3 text-center text-[15px]">{l.is_featured ? '⭐' : <span className="text-[#bdd0c5]">—</span>}</td>
                  <td className="px-3 py-3 text-[13px] text-[#7a9e8a]">{l.views?.toLocaleString()}</td>
                  <td className="px-3 py-3">
                    <div className="flex gap-1.5">
                      <Link href={`/admin/listings/${l.id}`} className="px-2.5 py-1 bg-[#eef2ff] text-[#4f46e5] text-[12px] font-semibold rounded-md hover:bg-[#4f46e5] hover:text-white transition-all">Edit</Link>
                      <Link href={`/listings/${l.slug}`} target="_blank" className="px-2.5 py-1 bg-[#e8f5ee] text-[#0a2218] text-[12px] font-semibold rounded-md hover:bg-[#0a2218] hover:text-white transition-all">View</Link>
                      <button onClick={() => deleteItem(l.id)} className="px-2.5 py-1 bg-[#fff0f3] text-red-600 text-[12px] font-semibold rounded-md hover:bg-red-600 hover:text-white transition-all">Del</button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 && (
                <tr><td colSpan={9} className="px-4 py-12 text-center text-[13.5px] text-[#7a9e8a]">No listings found. <Link href="/admin/add-listing" className="text-[#0a2218] font-semibold underline">Add one →</Link></td></tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-3.5 border-t border-[#dde8e2]">
          <p className="text-[13px] text-[#7a9e8a]">Showing 1–{filtered.length} of {filtered.length}</p>
          <div className="flex gap-1.5">
            {[1, 2, 3].map(p => (
              <button key={p} className={`w-8 h-8 rounded-lg text-[13px] font-medium transition-all ${p === 1 ? 'bg-[#0a2218] text-white' : 'border border-[#dde8e2] hover:bg-[#0a2218] hover:text-white'}`}>{p}</button>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
