'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

const NAV_LINKS = [
  { href: '/', label: 'Home' },
  { href: '/admissions', label: 'Admissions' },
  { href: '/scholarships', label: 'Scholarships' },
  { href: '/jobs', label: 'Jobs' },
  { href: '/internships', label: 'Internships' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [user, setUser] = useState<any>(null)
  const [dark, setDark] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.auth.getUser().then(({ data }) => setUser(data.user))
    const { data: listener } = supabase.auth.onAuthStateChange((_, session) => setUser(session?.user ?? null))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const saved = localStorage.getItem('ks_dark') === '1'
    setDark(saved)
    document.documentElement.classList.toggle('dark', saved)
  }, [])

  const toggleDark = () => {
    const next = !dark
    setDark(next)
    localStorage.setItem('ks_dark', next ? '1' : '0')
    document.documentElement.classList.toggle('dark', next)
  }

  const isActive = (href: string) =>
    href === '/' ? pathname === '/' : pathname.startsWith(href)

  return (
    <>
      <header className={`sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-[#dde8e2] transition-shadow ${scrolled ? 'shadow-md' : ''}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-[60px] flex items-center gap-0">
          {/* Logo */}
          <Link href="/" className="font-serif text-[17px] text-brand-800 mr-7 whitespace-nowrap flex items-center gap-1.5 shrink-0">
            <span className="flex items-start gap-1.5">
              <span>Kashmir Student</span>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-[#7a9e8a] mt-0.5">
                beta
              </span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber inline-block" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex gap-0.5">
            {NAV_LINKS.map(link => (
              <Link key={link.href} href={link.href}
                className={`px-3 py-1.5 rounded-lg text-[13.5px] font-medium transition-all ${
                  isActive(link.href)
                    ? 'bg-brand-800 text-white'
                    : 'text-[#4a6355] hover:bg-brand-50 hover:text-brand-800'
                }`}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="ml-auto flex items-center gap-2">
            {/* Dark toggle */}
            <button onClick={toggleDark} aria-label="Toggle dark mode"
              className="w-9 h-9 rounded-lg border border-[#dde8e2] bg-white flex items-center justify-center text-base hover:border-brand-800 transition-all">
              {dark ? '☀️' : '🌙'}
            </button>

            {/* Search */}
            <Link href="/search" aria-label="Search"
              className="w-9 h-9 rounded-lg border border-[#dde8e2] bg-white flex items-center justify-center text-base hover:border-brand-800 transition-all">
              🔍
            </Link>

            {/* Auth */}
            {user ? (
              <div className="flex items-center gap-2">
                <Link href="/dashboard"
                  className="hidden sm:flex text-[13px] font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-all">
                  Dashboard
                </Link>
                <div className="w-8 h-8 rounded-full bg-brand-800 text-white text-xs font-bold flex items-center justify-center">
                  {user.email?.[0].toUpperCase()}
                </div>
              </div>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Link href="/auth/login"
                  className="text-[13px] font-semibold text-brand-800 border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-brand-50 transition-all">
                  Log In
                </Link>
                <Link href="/auth/signup"
                  className="text-[13px] font-semibold bg-brand-800 text-white px-3 py-1.5 rounded-lg hover:bg-brand-700 transition-all">
                  Sign Up Free
                </Link>
              </div>
            )}

            {/* Hamburger */}
            <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden w-9 h-9 rounded-lg border border-[#dde8e2] bg-white flex flex-col items-center justify-center gap-1 px-2" aria-label="Menu">
              <span className={`block h-0.5 w-full bg-brand-800 rounded transition-all ${mobileOpen ? 'rotate-45 translate-y-1.5' : ''}`} />
              <span className={`block h-0.5 w-full bg-brand-800 rounded transition-all ${mobileOpen ? 'opacity-0' : ''}`} />
              <span className={`block h-0.5 w-full bg-brand-800 rounded transition-all ${mobileOpen ? '-rotate-45 -translate-y-1.5' : ''}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-x-0 top-[60px] bg-white border-b border-[#dde8e2] z-40 shadow-lg flex flex-col p-4 gap-1 md:hidden animate-fade-up">
          {NAV_LINKS.map(link => (
            <Link key={link.href} href={link.href} onClick={() => setMobileOpen(false)}
              className={`px-4 py-3 rounded-xl text-[15px] font-medium transition-all ${
                isActive(link.href) ? 'bg-brand-800 text-white' : 'text-brand-800 hover:bg-brand-50'
              }`}>
              {link.label}
            </Link>
          ))}
          <div className="border-t border-[#dde8e2] pt-3 mt-2 flex gap-2">
            {user ? (
              <Link href="/dashboard" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 text-[14px] font-semibold bg-brand-800 text-white rounded-xl">
                My Dashboard
              </Link>
            ) : (
              <>
                <Link href="/auth/login" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 text-[14px] font-semibold border border-[#dde8e2] rounded-xl text-brand-800">
                  Log In
                </Link>
                <Link href="/auth/signup" onClick={() => setMobileOpen(false)} className="flex-1 text-center py-3 text-[14px] font-bold bg-brand-800 text-white rounded-xl">
                  Sign Up Free
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </>
  )
}
