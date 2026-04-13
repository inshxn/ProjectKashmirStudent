'use client'
import { useEffect, useState } from 'react'
import { parseISO, differenceInSeconds } from 'date-fns'

export default function DeadlineCountdown({ lastDate, daysLeft }: { lastDate: string; daysLeft: number }) {
  const [time, setTime] = useState({ d: 0, h: 0, m: 0, s: 0 })
  const isUrgent = daysLeft <= 7

  useEffect(() => {
    const deadline = parseISO(lastDate)
    deadline.setHours(23, 59, 59, 999)

    function tick() {
      const diff = differenceInSeconds(deadline, new Date())
      if (diff <= 0) { setTime({ d: 0, h: 0, m: 0, s: 0 }); return }
      setTime({
        d: Math.floor(diff / 86400),
        h: Math.floor((diff % 86400) / 3600),
        m: Math.floor((diff % 3600) / 60),
        s: diff % 60,
      })
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [lastDate])

  const pad = (n: number) => String(n).padStart(2, '0')

  if (!isUrgent) return null

  return (
    <div className="bg-gradient-to-br from-red-50 to-red-100 border border-red-200 rounded-2xl p-4 mb-1">
      <div className="text-[12px] font-bold text-red-600 uppercase tracking-wide mb-3 flex items-center gap-1.5">
        ⏱ Live Countdown to Deadline
      </div>
      <div className="grid grid-cols-4 gap-2">
        {[{ v: time.d, l: 'Days' }, { v: time.h, l: 'Hrs' }, { v: time.m, l: 'Mins' }, { v: time.s, l: 'Secs' }].map(u => (
          <div key={u.l} className="bg-brand-800 rounded-xl p-2.5 text-center">
            <div className="font-serif text-[22px] text-white leading-none tabular-nums">{pad(u.v)}</div>
            <div className="text-[9.5px] text-white/40 uppercase tracking-widest mt-1">{u.l}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
