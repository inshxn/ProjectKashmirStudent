'use client'
import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase-browser'

export default function SignupPage() {
  const router = useRouter()
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', password: '', college: '', course: '' })
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => setForm(f => ({ ...f, [k]: e.target.value }))

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault()
    if (!form.firstName || !form.email || !form.password) { setError('Please fill in all required fields.'); return }
    if (form.password.length < 6) { setError('Password must be at least 6 characters.'); return }
    setLoading(true)
    setError('')
    try {
      const supabase = createClient()
      const { error: authError } = await supabase.auth.signUp({
        email: form.email,
        password: form.password,
        options: {
          data: { full_name: `${form.firstName} ${form.lastName}`.trim(), college: form.college, course: form.course },
        },
      })
      if (authError) { setError(authError.message); setLoading(false) }
      else { router.push('/dashboard') }
    } catch (err: any) {
      setError(err?.message || 'Connection error. Check Supabase env vars in Vercel.')
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
              <span className="font-sans text-[9px] font-bold uppercase tracking-[0.22em] text-[#7a9e8a] mt-1">
                beta
              </span>
            </span>
            <span className="w-2 h-2 rounded-full bg-amber inline-block" />
          </Link>
          <p className="text-[13px] text-[#4a6355] mt-1">Create your free account</p>
        </div>

        <div className="bg-white rounded-2xl border border-[#dde8e2] shadow-sm overflow-hidden">
          <div className="bg-brand-800 px-6 py-5 text-center">
            <div className="text-3xl mb-2">🎓</div>
            <h1 className="font-serif text-[20px] text-white">Join Kashmir Student</h1>
            <p className="text-white/50 text-[13px] mt-1">Save opportunities, get deadline alerts</p>
          </div>

          <form onSubmit={handleSignup} className="p-6 space-y-3.5">
            {error && <div className="bg-red-50 border border-red-200 rounded-lg px-3 py-2.5 text-[13px] text-red-700">⚠️ {error}</div>}

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1">First Name *</label>
                <input className="form-input" placeholder="Aadil" value={form.firstName} onChange={set('firstName')} />
              </div>
              <div>
                <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1">Last Name</label>
                <input className="form-input" placeholder="Bashir" value={form.lastName} onChange={set('lastName')} />
              </div>
            </div>

            <div>
              <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1">Email *</label>
              <input type="email" className="form-input" placeholder="you@example.com" value={form.email} onChange={set('email')} />
            </div>

            <div>
              <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1">Password * (min 6 chars)</label>
              <input type="password" className="form-input" placeholder="••••••••" value={form.password} onChange={set('password')} />
            </div>

            <div>
              <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1">College (optional)</label>
              <input className="form-input" placeholder="e.g. NIT Srinagar" value={form.college} onChange={set('college')} />
            </div>

            <div>
              <label className="text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-wide block mb-1">Current Course (optional)</label>
              <select className="form-input" value={form.course} onChange={set('course')}>
                <option value="">Select course</option>
                {['B.Tech', 'MBA', 'MBBS', 'B.Sc', 'B.Com', 'M.Tech', 'PhD', 'Diploma', 'Other'].map(c => <option key={c}>{c}</option>)}
              </select>
            </div>

            <button type="submit" disabled={loading}
              className="w-full py-3 bg-brand-800 text-white rounded-xl text-[14.5px] font-bold hover:bg-amber hover:text-brand-800 transition-all disabled:opacity-60 flex items-center justify-center gap-2 mt-1">
              {loading ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Creating account…</> : 'Create Free Account →'}
            </button>

            <p className="text-[11.5px] text-center text-[#7a9e8a]">
              By signing up you agree to our <Link href="/terms" className="underline">Terms</Link> &amp; <Link href="/privacy" className="underline">Privacy Policy</Link>
            </p>
          </form>

          <div className="px-6 pb-5 text-center border-t border-[#f5f9f6] pt-4">
            <p className="text-[13px] text-[#7a9e8a]">Already have an account?{' '}
              <Link href="/auth/login" className="text-brand-800 font-bold hover:underline">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
