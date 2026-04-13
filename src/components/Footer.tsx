import Link from 'next/link'

const FOOTER_LINKS = {
  opportunities: [
    { label: 'Admissions', href: '/admissions' },
    { label: 'Scholarships', href: '/scholarships' },
    { label: 'Jobs', href: '/jobs' },
    { label: 'Internships', href: '/internships' },
    { label: 'Browse All', href: '/listings' },
  ],
  topJK: [
    { label: 'JKPSC Civil Services', href: '/search?q=JKPSC' },
    { label: 'PMSSS Scholarship', href: '/search?q=PMSSS' },
    { label: 'NIT Srinagar', href: '/search?q=NIT+Srinagar' },
    { label: 'J&K Bank Jobs', href: '/search?q=JK+Bank' },
    { label: 'Domicile Schemes', href: '/search?q=Domicile' },
  ],
  site: [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Admin Panel', href: '/admin' },
    { label: 'Advertise', href: '/advertise' },
  ],
}

export default function Footer() {
  return (
    <footer className="bg-brand-800 text-white/70 mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pt-14 pb-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <div className="font-serif text-[22px] text-white flex items-center gap-1.5 mb-3 cursor-pointer">
            <span className="flex items-start gap-1.5">
              <span>Kashmir Student</span>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-white/50 mt-1">
                beta
              </span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber inline-block" />
          </div>
          <p className="text-[13.5px] text-white/50 leading-relaxed max-w-[260px] mb-4">
            J&amp;K's most trusted student portal. Discover admissions, scholarships, jobs &amp; internships — curated daily.
          </p>
          <span className="inline-flex items-center gap-1.5 bg-amber/10 border border-amber/20 text-amber text-[11.5px] font-semibold px-2.5 py-1 rounded">
            ✓ Free for Students — Always
          </span>

          {/* Newsletter */}
          <div className="mt-5">
            <label className="text-[11px] font-bold uppercase tracking-widest text-white/40 block mb-2">
              Get Deadline Alerts
            </label>
            <div className="flex overflow-hidden bg-white/10 border border-white/15 rounded-lg">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 bg-transparent border-none outline-none px-3 py-2 text-[13px] text-white placeholder:text-white/30"
              />
              <button className="px-3 bg-amber text-brand-800 text-[12.5px] font-bold hover:bg-amber-dark transition-all">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Opportunities */}
        <div>
          <h4 className="text-[13px] font-bold text-white mb-4">Opportunities</h4>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.opportunities.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/50 hover:text-amber transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Top in J&K */}
        <div>
          <h4 className="text-[13px] font-bold text-white mb-4">Top in J&amp;K</h4>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.topJK.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/50 hover:text-amber transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Site */}
        <div>
          <h4 className="text-[13px] font-bold text-white mb-4">Kashmir Student</h4>
          <ul className="space-y-2.5">
            {FOOTER_LINKS.site.map(l => (
              <li key={l.href}>
                <Link href={l.href} className="text-[13px] text-white/50 hover:text-amber transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-white/[0.07]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 flex flex-wrap items-center justify-between gap-3">
          <p className="text-[12.5px] text-white/35">
            © {new Date().getFullYear()} Kashmir Student. Built with ❤️ for the students of J&amp;K.
          </p>
          <div className="flex gap-4">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map(l => (
              <Link key={l} href="#" className="text-[12.5px] text-white/35 hover:text-white/70 transition-colors">
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
