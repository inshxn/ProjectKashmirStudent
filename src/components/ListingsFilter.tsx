'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import type { ListingFilters } from '@/types'

interface Props { currentFilters: ListingFilters; total: number }

export default function ListingsFilter({ currentFilters, total }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function update(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set(key, value)
    else params.delete(key)
    params.delete('page')
    router.push(`/listings?${params.toString()}`)
  }

  function clear() { router.push('/listings') }

  const hasFilters = !!(currentFilters.category || currentFilters.location || currentFilters.course || currentFilters.deadline)

  return (
    <div className="bg-white border-b border-[#dde8e2] px-4 sm:px-6 py-3 sticky top-[60px] z-30 shadow-sm">
      <div className="max-w-7xl mx-auto flex gap-2 items-center flex-wrap">
        <select value={currentFilters.category || ''} onChange={e => update('category', e.target.value)} className="form-input w-auto text-sm py-2 min-w-[140px]">
          <option value="">All Categories</option>
          <option value="admissions">Admissions</option>
          <option value="scholarships">Scholarships</option>
          <option value="jobs">Jobs</option>
          <option value="internships">Internships</option>
        </select>
        <select value={currentFilters.location || ''} onChange={e => update('location', e.target.value)} className="form-input w-auto text-sm py-2 min-w-[130px]">
          <option value="">All Locations</option>
          {['Srinagar', 'Jammu', 'Pan India', 'Delhi', 'Bangalore', 'Hyderabad', 'International'].map(l => <option key={l}>{l}</option>)}
        </select>
        <select value={currentFilters.course || ''} onChange={e => update('course', e.target.value)} className="form-input w-auto text-sm py-2 min-w-[130px]">
          <option value="">All Courses</option>
          {['B.Tech', 'MBA', 'MBBS', 'B.Sc', 'B.Com', 'M.Tech', 'PhD', 'Diploma', 'All Courses'].map(c => <option key={c}>{c}</option>)}
        </select>
        <select value={currentFilters.deadline || ''} onChange={e => update('deadline', e.target.value)} className="form-input w-auto text-sm py-2 min-w-[140px]">
          <option value="">Any Deadline</option>
          <option value="active">Active</option>
          <option value="expiring">Expiring ≤ 7 days</option>
        </select>
        <select value={currentFilters.sort || 'deadline'} onChange={e => update('sort', e.target.value)} className="form-input w-auto text-sm py-2 min-w-[140px]">
          <option value="deadline">Sort: Deadline</option>
          <option value="newest">Sort: Newest</option>
          <option value="featured">Sort: Featured</option>
          <option value="views">Sort: Most Viewed</option>
        </select>
        <div className="ml-auto text-sm text-[#7a9e8a] font-medium whitespace-nowrap">{total} result{total !== 1 ? 's' : ''}</div>
        {hasFilters && <button onClick={clear} className="text-sm text-red-500 font-semibold px-2 py-1 rounded-lg hover:bg-red-50 transition-all">Clear ✕</button>}
      </div>
    </div>
  )
}
