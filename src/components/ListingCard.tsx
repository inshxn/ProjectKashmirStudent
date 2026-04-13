import Link from 'next/link'
import type { Listing } from '@/types'

interface Props {
  listing: Listing
  featured?: boolean
}

const catLabel: Record<string, string> = {
  admissions: '🎓 Admission',
  scholarships: '💰 Scholarship',
  jobs: '💼 Job',
  internships: '🧪 Internship',
}

function deadlineClass(days: number) {
  if (days <= 3) return 'urgent'
  if (days <= 7) return 'warn'
  return 'ok'
}

function deadlinePct(days: number, max = 120) {
  return Math.max(2, Math.min(100, Math.round((1 - days / max) * 100)))
}

export default function ListingCard({ listing, featured = false }: Props) {
  const days = listing.days_left ?? 0
  const dc = deadlineClass(days)
  const pct = deadlinePct(days)
  const isNew = days > 80 && !listing.is_featured

  return (
    <Link href={`/listings/${listing.slug}`} className="card flex flex-col group">
      {/* Featured / New badge */}
      {listing.is_featured && (
        <div className="absolute top-3 right-3 bg-amber text-brand-800 text-[10.5px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide z-10">
          Featured
        </div>
      )}
      {isNew && (
        <div className="absolute top-3 right-3 bg-green-600 text-white text-[10.5px] font-extrabold px-2 py-0.5 rounded uppercase tracking-wide z-10">
          New
        </div>
      )}

      <div className="p-4 pb-0 flex-1">
        {/* Category + urgency chips */}
        <div className="flex flex-wrap gap-1.5 mb-2.5">
          <span className={`chip-${listing.category}`}>{catLabel[listing.category] || listing.category}</span>
          {days <= 3 && days >= 0 && (
            <span className="bg-red-100 text-red-700 text-[10.5px] font-bold px-2 py-0.5 rounded uppercase">
              🔴 Last {days} Day{days !== 1 ? 's' : ''}
            </span>
          )}
          {days > 3 && days <= 7 && (
            <span className="bg-amber-50 text-amber-700 text-[10.5px] font-bold px-2 py-0.5 rounded uppercase">
              ⏰ Closing Soon
            </span>
          )}
        </div>

        {/* Org */}
        <div className="text-xs text-[#7a9e8a] mb-1.5 flex items-center gap-1">
          🏛 {listing.org_name} &nbsp;·&nbsp; 📍 {listing.location}
        </div>

        {/* Title */}
        <h3 className={`font-serif leading-tight mb-2 text-brand-800 ${featured ? 'text-[18px]' : 'text-[15px]'}`}>
          {listing.title}
        </h3>

        {/* Excerpt */}
        <p className="text-[12.5px] text-[#4a6355] leading-relaxed line-clamp-2 mb-3">
          {listing.short_desc}
        </p>
      </div>

      {/* Deadline progress bar */}
      <div className="deadline-bar mx-4 mb-0">
        <div
          className={`deadline-bar-fill deadline-bar-fill-${dc}`}
          style={{ width: `${pct}%` }}
        />
      </div>

      {/* Footer */}
      <div className="px-4 py-3 flex items-center justify-between border-t border-[#f5f9f6] mt-auto">
        <div className="flex gap-3 items-center">
          <span className={`text-[11.5px] font-${dc !== 'ok' ? 'bold' : 'medium'} ${dc === 'urgent' ? 'text-red-600' : dc === 'warn' ? 'text-amber-600' : 'text-[#7a9e8a]'}`}>
            📅 {days <= 7 ? `${days} days left` : `Last: ${listing.last_date ? new Date(listing.last_date).toLocaleDateString('en-IN', { day: '2-digit', month: '2-digit', year: 'numeric' }) : 'TBA'}`}
          </span>
          {listing.course && listing.course !== 'All Courses' && (
            <span className="text-[11.5px] text-[#7a9e8a]">📖 {listing.course}</span>
          )}
        </div>
        <span className="text-[11px] text-[#7a9e8a] group-hover:text-brand-800 transition-colors">View →</span>
      </div>
    </Link>
  )
}
