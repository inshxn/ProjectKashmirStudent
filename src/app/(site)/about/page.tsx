import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export const metadata: Metadata = {
  title: 'About Kashmir Student 4 | J&K\'s #1 Student Portal',
  description: "Kashmir Student connects every J&K student with the opportunities they deserve — JKPSC, NIT Srinagar, PMSSS and more.",
}

const STATS = [
  { num: '18+', label: 'Live Listings' },
  { num: '1L+', label: 'Students Served' },
  { num: '20', label: 'J&K Districts' },
  { num: '₹12Cr+', label: 'Scholarships Listed' },
]

const VALUES = [
  { icon: '🎯', title: 'Our Mission', desc: 'Kashmir Student exists to connect every student of Jammu & Kashmir with the opportunities they deserve — regardless of district, internet access, or guidance. We curate JKPSC updates, university admissions, PMSSS scholarships and J&K Bank jobs so students can focus on applying, not searching.' },
  { icon: '🔧', title: 'What We Do', desc: 'We aggregate admissions, scholarships, jobs and internships from official sources, structure them into clear, consistent formats, and make them searchable. Deadline tracking and alerts ensure you never miss an opportunity.' },
  { icon: '👨‍🎓', title: 'Who We Serve', desc: 'Students from every district of J&K — from Class 12 aspirants targeting NIT Srinagar, to graduates seeking PMSSS funding, to freshers looking for J&K Bank or government jobs.' },
  { icon: '📈', title: 'Our Impact', desc: 'Since launch, Kashmir Student has helped J&K students access over ₹12 crore in scholarship funding, 300+ college admissions via JoSAA counselling, and 200+ government job placements.' },
]

export default function AboutPage() {
  return (
    <>
      <Navbar />

      {/* Hero */}
      <div className="bg-brand-800 px-4 sm:px-6 py-12 relative overflow-hidden">
        <div className="absolute inset-0 hero-mesh pointer-events-none" />
        <div className="max-w-3xl mx-auto text-center relative">
          <h1 className="font-serif text-[clamp(28px,5vw,42px)] text-white mb-4">About Kashmir Student</h1>
          <p className="text-white/60 text-[15px] leading-relaxed">
            J&amp;K's most trusted student portal — built to connect every student with the opportunities they deserve.
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-12">
          {STATS.map(s => (
            <div key={s.label} className="bg-white border border-[#dde8e2] rounded-2xl p-5 text-center">
              <div className="font-serif text-[28px] text-brand-800">{s.num}</div>
              <div className="text-[12.5px] text-[#7a9e8a] mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid sm:grid-cols-2 gap-5 mb-12">
          {VALUES.map(v => (
            <div key={v.title} className="bg-white border border-[#dde8e2] rounded-2xl p-6">
              <div className="text-3xl mb-3">{v.icon}</div>
              <h3 className="font-serif text-[18px] text-brand-800 mb-3">{v.title}</h3>
              <p className="text-[13.5px] text-[#4a6355] leading-relaxed">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="bg-brand-800 rounded-2xl p-8 text-center relative overflow-hidden">
          <div className="absolute inset-0 hero-mesh pointer-events-none" />
          <div className="relative">
            <h3 className="font-serif text-[22px] text-white mb-3">Join Kashmir Student</h3>
            <p className="text-white/55 text-[14px] mb-6 max-w-md mx-auto">
              Sign up free to save opportunities, get deadline alerts, and never miss out again.
            </p>
            <Link href="/auth/signup" className="btn-amber px-8 py-3 text-[15px]">
              Create Free Account →
            </Link>
          </div>
        </div>
      </div>

      <Footer />
    </>
  )
}
