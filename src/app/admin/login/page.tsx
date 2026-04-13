'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function AdminLoginPage() {
  const router = useRouter()
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!credentials.username || !credentials.password) {
      setError('Please enter your username and password.')
      return
    }
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(credentials),
      })
      const data = await res.json()

      if (data.success) {
        router.push('/admin/dashboard')
        router.refresh()
      } else {
        setError(data.error || 'Invalid credentials. Please try again.')
        setLoading(false)
      }
    } catch {
      setError('Unable to connect. Please check your connection and try again.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-10"
      style={{ background: 'linear-gradient(135deg, #0a2218 0%, #1e4d36 100%)' }}>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none"
        style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,.1) 1px,transparent 1px),linear-gradient(90deg,rgba(255,255,255,.1) 1px,transparent 1px)', backgroundSize: '48px 48px' }} />

      <div className="w-full max-w-[400px] relative">
        <div className="bg-white rounded-[20px] overflow-hidden shadow-[0_24px_64px_rgba(0,0,0,.25)]">
          {/* Top */}
          <div className="bg-brand-800 px-8 py-8 text-center" style={{ background: 'linear-gradient(135deg, #0a2218, #1e4d36)' }}>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 px-4 py-2 rounded-full mb-4">
              <span className="text-lg">🛡️</span>
              <span className="font-serif text-white text-[15px] flex items-start gap-1.5">
                <span>Kashmir Student</span>
                <span className="font-sans text-[8px] font-bold uppercase tracking-[0.22em] text-white/50 mt-1">
                  admin
                </span>
              </span>
            </div>
            <h1 className="font-serif text-[22px] text-white mb-1">Admin Panel</h1>
            <p className="text-white/50 text-[13px]">Sign in to manage the platform</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="px-8 py-7 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700 flex items-center gap-2">
                <span>⚠️</span> {error}
              </div>
            )}

            <div>
              <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">
                Username
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">👤</span>
                <input
                  type="text"
                  value={credentials.username}
                  onChange={e => setCredentials(c => ({ ...c, username: e.target.value }))}
                  className="w-full pl-10 pr-4 py-3 border-[1.5px] border-[#dde8e2] rounded-xl text-[14px] outline-none focus:border-brand-800 transition-colors"
                  placeholder="Username"
                  autoComplete="username"
                />
              </div>
            </div>

            <div>
              <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5">
                Password
              </label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base">🔒</span>
                <input
                  type={showPw ? 'text' : 'password'}
                  value={credentials.password}
                  onChange={e => setCredentials(c => ({ ...c, password: e.target.value }))}
                  className="w-full pl-10 pr-11 py-3 border-[1.5px] border-[#dde8e2] rounded-xl text-[14px] outline-none focus:border-brand-800 transition-colors"
                  placeholder="••••••••"
                  autoComplete="current-password"
                />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a9e8a] hover:text-brand-800 text-sm">
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3.5 bg-brand-800 text-white rounded-xl text-[14.5px] font-bold
                hover:bg-amber hover:text-brand-800 transition-all disabled:opacity-60
                flex items-center justify-center gap-2 mt-2"
              style={{ background: '#0a2218' }}>
              {loading ? (
                <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
              ) : 'Sign In to Admin Panel'}
            </button>
          </form>

          <div className="px-8 py-5 border-t border-[#f5f9f6] bg-[#fafcfb] text-center">
            <Link href="/" className="text-[13px] text-[#7a9e8a] hover:text-brand-800 transition-colors">
              ← Back to Kashmir Student
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
