'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'

const NAV = [
  { id: 'dashboard', label: 'Dashboard', icon: '📊', href: '/admin/dashboard' },
  { id: 'listings', label: 'All Listings', icon: '📋', href: '/admin/listings', badge: '' },
  { id: 'add-listing', label: 'Add New Listing', icon: '➕', href: '/admin/add-listing' },
  { id: 'categories', label: 'Categories & Tags', icon: '🏷️', href: '/admin/categories' },
  { id: 'featured', label: 'Featured Manager', icon: '⭐', href: '/admin/featured' },
  { id: 'ai', label: 'AI Formatter', icon: '🤖', href: '/admin/ai' },
  { id: 'deadlines', label: 'Deadline Tracker', icon: '⏰', href: '/admin/deadlines' },
  { id: 'seo', label: 'SEO Tools', icon: '🔍', href: '/admin/seo' },
  { id: 'users', label: 'Users', icon: '👥', href: '/admin/users' },
  { id: 'settings', label: 'Settings', icon: '⚙️', href: '/admin/settings' },
]

interface Props {
  children: React.ReactNode
  currentPage: string
  adminUser: { name: string; role: string; username?: string }
}

export default function AdminShell({ children, currentPage, adminUser }: Props) {
  const pathname = usePathname()
  const router = useRouter()
  const [collapsed, setCollapsed] = useState(false)
  const [ddOpen, setDdOpen] = useState(false)

  async function logout() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin/login')
  }

  const initials = adminUser.name.split(' ').map((n: string) => n[0]).join('').slice(0, 2).toUpperCase()
  const pageTitle = NAV.find(n => pathname.startsWith(n.href))?.label || 'Admin'

  return (
    <div className="h-screen flex flex-col overflow-hidden" style={{ fontFamily: '"DM Sans", system-ui, sans-serif', background: '#f0f4f2' }}>

      {/* TOP BAR */}
      <header className="h-[52px] bg-white border-b border-[#dde8e2] flex items-center px-0 shrink-0 z-50 shadow-sm">
        {/* Logo area */}
        <div className={`flex items-center gap-2.5 px-4 border-r border-[#dde8e2] h-full shrink-0 transition-all ${collapsed ? 'w-[56px]' : 'w-[220px]'}`}>
          <div className="w-7 h-7 rounded-lg bg-[#0a2218] flex items-center justify-center text-sm shrink-0">🏔️</div>
          {!collapsed && (
            <div>
              <div style={{ fontFamily: '"DM Serif Display",serif' }} className="text-[14px] text-[#0a2218] leading-tight">Kashmir Student</div>
              <div className="text-[10px] text-[#7a9e8a]">Admin Console</div>
            </div>
          )}
        </div>

        {/* Breadcrumb */}
        <div className="flex items-center gap-1.5 px-5 text-[13px] text-[#4a6355] flex-1">
          <span>Admin</span>
          <span className="text-[#7a9e8a]">›</span>
          <span className="text-[#0a2218] font-semibold">{pageTitle}</span>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2 pr-4">
          <Link href="/" target="_blank"
            className="text-[13px] font-semibold text-[#0a2218] border border-[#dde8e2] px-3 py-1.5 rounded-lg hover:bg-[#e8f5ee] transition-all flex items-center gap-1.5">
            🌐 View Site
          </Link>
          <Link href="/admin/add-listing"
            className="text-[13px] font-bold bg-[#0a2218] text-white px-3 py-1.5 rounded-lg hover:bg-[#e8861a] hover:text-[#0a2218] transition-all">
            + Add Listing
          </Link>

          {/* User */}
          <div className="relative">
            <button onClick={() => setDdOpen(!ddOpen)}
              className="flex items-center gap-2 border border-[#dde8e2] rounded-lg px-2.5 py-1.5 bg-white hover:border-[#bdd0c5] transition-all">
              <div className="w-6 h-6 rounded-full bg-[#0a2218] text-white text-[11px] font-bold flex items-center justify-center">{initials}</div>
              <div className="text-left hidden sm:block">
                <div className="text-[13px] font-semibold text-[#0a2218] leading-none">{adminUser.name}</div>
                <div className="text-[10.5px] text-[#7a9e8a] capitalize">{adminUser.role.replace('_', ' ')}</div>
              </div>
              <span className="text-[10px] text-[#7a9e8a]">▾</span>
            </button>

            {ddOpen && (
              <div className="absolute top-full right-0 mt-1.5 bg-white border border-[#dde8e2] rounded-xl shadow-xl min-w-[200px] overflow-hidden z-50 animate-[slideIn_0.18s_ease]">
                <div className="px-4 py-3 bg-gradient-to-br from-[#0a2218] to-[#1e4d36] flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-white/20 text-white text-[12px] font-bold flex items-center justify-center">{initials}</div>
                  <div>
                    <div className="text-[13px] font-bold text-white">{adminUser.name}</div>
                    <div className="text-[11px] text-white/50">{adminUser.role === 'super_admin' ? 'Super Admin' : 'Editor'}</div>
                  </div>
                </div>
                {[
                  { icon: '👤', label: 'My Profile', href: '/admin/profile' },
                  { icon: '⚙️', label: 'Settings', href: '/admin/settings' },
                  { icon: '🌐', label: 'View Site', href: '/', external: true },
                ].map(item => (
                  <Link key={item.label} href={item.href} target={item.external ? '_blank' : undefined}
                    onClick={() => setDdOpen(false)}
                    className="flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-[#0a2218] hover:bg-[#e8f5ee] transition-all border-b border-[#f5f9f6] last:border-0">
                    <span className="text-base">{item.icon}</span> {item.label}
                  </Link>
                ))}
                <div className="border-t border-[#dde8e2]" />
                <button onClick={logout}
                  className="w-full flex items-center gap-2.5 px-4 py-2.5 text-[13.5px] text-red-600 hover:bg-red-50 transition-all">
                  <span className="text-base">↩️</span> Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* MAIN */}
      <div className="flex flex-1 overflow-hidden">
        {/* SIDEBAR */}
        <nav className={`bg-[#1a2e23] flex flex-col shrink-0 overflow-y-auto transition-all duration-200 ${collapsed ? 'w-[56px]' : 'w-[220px]'}`}>
          <div className="py-2 flex-1">
            {['Content', 'Tools', 'People', 'System'].map((section, si) => {
              const sectionItems = [
                NAV.slice(0, 5),
                NAV.slice(5, 8),
                NAV.slice(8, 9),
                NAV.slice(9),
              ][si]
              return (
                <div key={section}>
                  {!collapsed && (
                    <div className="px-4 pt-3 pb-1 text-[9.5px] font-bold uppercase tracking-widest text-white/25">{section}</div>
                  )}
                  {sectionItems.map(item => {
                    const active = pathname.startsWith(item.href)
                    return (
                      <Link key={item.id} href={item.href}
                        className={`flex items-center gap-2.5 mx-2 my-0.5 px-3 py-2 rounded-lg text-[13.5px] font-medium transition-all relative group ${
                          active ? 'bg-[#2d5040] text-white' : 'text-white/60 hover:bg-[#243d2e] hover:text-white'
                        }`}>
                        {active && <span className="absolute left-0 top-[20%] bottom-[20%] w-0.5 bg-[#e8861a] rounded-r" />}
                        <span className="text-[17px] w-5 text-center shrink-0">{item.icon}</span>
                        {!collapsed && <span>{item.label}</span>}
                        {!collapsed && item.badge && <span className="ml-auto bg-[#e8861a] text-[#0a2218] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full">{item.badge}</span>}
                        {collapsed && (
                          <span className="absolute left-full ml-2 bg-[#0a2218] text-white text-[12px] px-2.5 py-1 rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none z-50 transition-opacity shadow-lg">{item.label}</span>
                        )}
                      </Link>
                    )
                  })}
                </div>
              )
            })}
          </div>

          {/* Collapse toggle */}
          <div className="border-t border-white/10 py-2">
            <button onClick={() => setCollapsed(!collapsed)}
              className="flex items-center gap-2.5 mx-2 px-3 py-2 rounded-lg text-white/40 hover:text-white hover:bg-[#243d2e] transition-all w-[calc(100%-16px)] text-[13px]">
              <span className="text-base w-5 text-center shrink-0">{collapsed ? '▶' : '◀'}</span>
              {!collapsed && 'Collapse'}
            </button>
          </div>
        </nav>

        {/* CONTENT */}
        <main className="flex-1 overflow-y-auto">
          <div className="p-6 max-w-[1200px] mx-auto">{children}</div>
        </main>
      </div>
    </div>
  )
}
