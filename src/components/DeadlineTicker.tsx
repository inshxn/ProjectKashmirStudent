// DeadlineTicker.tsx
'use client'
import type { Listing } from '@/types'

export function DeadlineTicker({ listings }: { listings: Listing[] }) {
  if (!listings.length) return null
  const items = listings.map(l =>
    `⏰ ${l.title} — ${l.days_left === 0 ? 'Closes TODAY!' : l.days_left === 1 ? 'Last day!' : `${l.days_left} days left`}`
  )
  const pinned = ['🏔️ JKPSC KAS 2025 — Apply before 30 April', '🎓 NIT Srinagar — JoSAA counselling opens June 2025', '💰 PMSSS Scholarship — Exclusively for J&K students']
  const all = [...items, ...pinned]
  const full = [...all, ...all].map((text, i) => (
    <span key={i} className="ticker-item whitespace-nowrap px-8 text-[13px] font-semibold text-brand-800 flex items-center gap-2 after:content-['●'] after:opacity-30 after:ml-8">
      {text}
    </span>
  ))
  return (
    <div className="bg-gradient-to-r from-amber-dark to-amber overflow-hidden py-2.5">
      <div className="flex ticker-track">{full}</div>
    </div>
  )
}
export default DeadlineTicker
