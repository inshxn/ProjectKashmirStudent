'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [showPw, setShowPw] = useState(false)

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    if (!email || !password) { setError('Please enter your email and password.'); return }
    setLoading(true)
    setError('')

    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signInWithPassword({ email, password })
      if (authError) {
        // Show the real error from Supabase
        if (authError.message.includes('Invalid login credentials')) {
          setError('Incorrect email or password. Please try again.')
        } else if (authError.message.includes('Email not confirmed')) {
          setError('Please confirm your email address first. Check your inbox.')
        } else {
          setError(authError.message)
        }
        setLoading(false)
      } else {
        router.push('/dashboard')
        router.refresh()
      }
    } catch (err: any) {
      setError(err?.message || 'Connection error. Check your Supabase env vars in Vercel.')
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 py-10">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="font-serif text-[22px] text-brand-800 flex items-center justify-center gap-1.5">
            <span className="flex items-start gap-1.5">
              <span>Kashmir Student</span>
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-[#7a9e8a] mt-1">beta</span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber inline-block" />
          </Link>
          <p className="text-[13px] text-[#4a6355] mt-1">Sign in to your account</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#dde8e2] shadow-sm overflow-hidden">
          <div className="bg-brand-800 px-6 py-5 text-center">
            <div className="text-3xl mb-2">🔒</div>
            <h1 className="font-serif text-[20px] text-white">Welcome Back</h1>
            <p className="text-white/50 text-[13px] mt-1">Access your saved opportunities</p>
          </div>

          <form onSubmit={handleLogin} className="p-6 space-y-4">
            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-[13px] text-red-700 flex items-center gap-2">
                ⚠️ {error}
              </div>
            )}

            <div>
              <label className="text-[12px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1.5">Email</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a9e8a]">✉️</span>
                <input type="email" value={email} onChange={e => setEmail(e.target.value)}
                  className="w-full pl-9 pr-4 py-3 border-[1.5px] border-[#dde8e2] rounded-xl text-[14px] outline-none focus:border-brand-800 transition-colors"
                  placeholder="you@example.com" autoComplete="email" />
              </div>
            </div>

            <div>
              <label className="text-[12px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1.5">Password</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a9e8a]">🔒</span>
                <input type={showPw ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-3 border-[1.5px] border-[#dde8e2] rounded-xl text-[14px] outline-none focus:border-brand-800 transition-colors"
                  placeholder="••••••••" autoComplete="current-password" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#7a9e8a] hover:text-brand-800 text-sm">
                  {showPw ? '🙈' : '👁️'}
                </button>
              </div>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 rounded-xl text-[14.5px] font-bold text-white transition-all disabled:opacity-60 flex items-center justify-center gap-2"
              style={{ background: '#0a2218' }}>
              {loading
                ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Signing in…</>
                : 'Sign In to Kashmir Student'}
            </button>
          </form>

          <div className="px-6 pb-5 text-center border-t border-[#f5f9f6] pt-4">
            <p className="text-[13px] text-[#7a9e8a]">
              Don't have an account?{' '}
              <Link href="/auth/signup" className="text-brand-800 font-bold hover:underline">Sign up free</Link>
            </p>
            <Link href="/" className="text-[12.5px] text-[#7a9e8a] hover:text-brand-800 mt-2 block">← Back to site</Link>
          </div>
        </div>
      </div>
    </div>
  )
}
