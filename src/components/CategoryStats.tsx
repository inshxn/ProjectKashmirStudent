// CategoryStats.tsx
import Link from 'next/link'
import { CATEGORIES } from '@/types'

export function CategoryStats() {
  const stats = [
    { cat: 'admissions' as const, count: '6+', desc: 'Colleges & universities' },
    { cat: 'scholarships' as const, count: '4+', desc: 'Including PMSSS & PM Scholarship' },
    { cat: 'jobs' as const, count: '5+', desc: 'JKPSC, J&K Bank & more' },
    { cat: 'internships' as const, count: '3+', desc: 'Govt & private sector' },
  ]
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map(s => {
          const cat = CATEGORIES[s.cat]
          return (
            <Link key={s.cat} href={`/${s.cat}`}
              className="bg-white border border-[#dde8e2] rounded-2xl p-5 flex items-center gap-4 hover:border-brand-800 hover:shadow-md transition-all group">
              <div className="text-3xl">{cat.icon}</div>
              <div>
                <div className="font-serif text-[22px] text-brand-800 leading-none">{s.count}</div>
                <div className="text-[12px] font-bold text-brand-800 mt-0.5">{cat.label}</div>
                <div className="text-[11.5px] text-[#7a9e8a] mt-0.5">{s.desc}</div>
              </div>
              <div className="ml-auto text-[#7a9e8a] group-hover:text-brand-800 transition-colors text-sm">→</div>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
export default CategoryStats
