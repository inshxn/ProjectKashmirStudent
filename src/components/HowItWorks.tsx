// HowItWorks.tsx
export function HowItWorks() {
  const steps = [
    { n: '01', icon: '🔍', title: 'Discover', desc: 'Browse JKPSC notifications, NIT admissions, PMSSS scholarships, J&K Bank jobs and national opportunities — all in one place.' },
    { n: '02', icon: '🔖', title: 'Save', desc: 'Bookmark any listing to your personal dashboard. Never lose track of an opportunity again.' },
    { n: '03', icon: '⏰', title: 'Get Alerts', desc: 'Receive deadline reminders before applications close, so you never miss a JKPSC or scholarship deadline.' },
    { n: '04', icon: '🚀', title: 'Apply', desc: 'Click Apply Now for direct access to official application pages with complete details.' },
  ]
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 py-10">
      <div className="flex items-end justify-between mb-5 pb-4 border-b-2 border-[#dde8e2]">
        <div>
          <div className="section-label mb-1">Simple Process</div>
          <h2 className="section-title">How Kashmir Student Works</h2>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {steps.map(s => (
          <div key={s.n} className="bg-white border border-[#dde8e2] rounded-2xl p-6 relative overflow-hidden">
            <div className="absolute top-4 right-5 font-serif text-[36px] text-[#dde8e2] font-bold leading-none select-none">{s.n}</div>
            <div className="text-[28px] mb-3">{s.icon}</div>
            <h3 className="font-serif text-[17px] text-brand-800 mb-2">{s.title}</h3>
            <p className="text-[13px] text-[#4a6355] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
export default HowItWorks
