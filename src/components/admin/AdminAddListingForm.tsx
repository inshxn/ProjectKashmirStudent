'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

const CATEGORIES = ['admissions', 'scholarships', 'jobs', 'internships']
const COURSES = ['All Courses', 'B.Tech', 'MBA', 'MBBS', 'B.Sc', 'B.Com', 'M.Tech', 'PhD', 'Diploma']
const LOCATIONS = ['Srinagar', 'Jammu', 'Pan India', 'Delhi', 'Bangalore', 'Hyderabad', 'International']

export default function AdminAddListingForm({ initialData }: { initialData?: any }) {
  const router = useRouter()
  const [form, setForm] = useState({
    title: initialData?.title || '',
    category: initialData?.category || 'admissions',
    org_name: initialData?.org_name || '',
    location: initialData?.location || 'Srinagar',
    course: initialData?.course || 'All Courses',
    short_desc: initialData?.short_desc || '',
    full_desc: initialData?.full_desc || '',
    fees: initialData?.fees || '',
    start_date: initialData?.start_date || '',
    last_date: initialData?.last_date || '',
    exam_date: initialData?.exam_date || '',
    apply_link: initialData?.apply_link || '',
    notif_link: initialData?.notif_link || '',
    is_featured: initialData?.is_featured || false,
    status: initialData?.status || 'live',
  })
  const [eligibility, setEligibility] = useState<string[]>(initialData?.eligibility || [''])
  const [tags, setTags] = useState<string[]>(initialData?.tags || [])
  const [tagInput, setTagInput] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const set = (k: string) => (e: React.ChangeEvent<any>) => setForm(f => ({ ...f, [k]: e.target.value }))
  const toggle = (k: string) => () => setForm(f => ({ ...f, [k]: !(f as any)[k] }))

  const slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')

  function addElig() { setEligibility(e => [...e, '']) }
  function updateElig(i: number, v: string) { setEligibility(e => e.map((x, j) => j === i ? v : x)) }
  function removeElig(i: number) { setEligibility(e => e.filter((_, j) => j !== i)) }

  function handleTagKey(e: React.KeyboardEvent<HTMLInputElement>) {
    if ((e.key === 'Enter' || e.key === ',') && tagInput.trim()) {
      e.preventDefault()
      const t = tagInput.trim().replace(/,$/, '')
      if (t && !tags.includes(t)) setTags(ts => [...ts, t])
      setTagInput('')
    }
    if (e.key === 'Backspace' && !tagInput && tags.length) setTags(ts => ts.slice(0, -1))
  }

  async function save(status: string) {
    if (!form.title.trim()) { setError('Title is required.'); return }
    if (!form.org_name.trim()) { setError('Organisation is required.'); return }
    if (!form.last_date) { setError('Last date is required.'); return }
    setSaving(true); setError('')
    const payload = { ...form, status, slug, eligibility: eligibility.filter(Boolean), tags }

    try {
      const res = await fetch('/api/admin', {
        method: initialData ? 'PATCH' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify(initialData ? { id: initialData.id, ...payload } : payload),
      })

      const data = await res.json()
      if (data.success) {
        router.push('/admin/listings')
        router.refresh()
        return
      }

      setError(data.error || 'Failed to save. Check your connection.')
    } catch {
      setError('Unable to save right now. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  const sInput = 'w-full px-3 py-2.5 border-[1.5px] border-[#dde8e2] rounded-lg text-[13.5px] text-[#0a2218] bg-white outline-none focus:border-[#0a2218] transition-colors'
  const sLabel = 'text-[11.5px] font-bold text-[#7a9e8a] uppercase tracking-widest block mb-1.5'

  return (
    <>
      <div className="flex items-start justify-between mb-5 flex-wrap gap-4">
        <div>
          <h1 style={{ fontFamily: '"DM Serif Display",serif' }} className="text-[24px] text-[#0a2218]">
            {initialData ? 'Edit Listing' : 'Add New Listing'}
          </h1>
          <p className="text-[13px] text-[#4a6355] mt-0.5">Fill in all details and publish to the site</p>
        </div>
        <button onClick={() => router.push('/admin/listings')} className="text-[13px] text-[#7a9e8a] border border-[#dde8e2] px-3 py-2 rounded-lg hover:bg-[#e8f5ee] transition-all">
          ← Back to Listings
        </button>
      </div>

      {error && <div className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-[13px] text-red-700 mb-4 flex items-center gap-2">⚠️ {error}</div>}

      <div className="grid lg:grid-cols-[1fr_280px] gap-5 items-start">
        <div className="space-y-4">

          {/* Basic Info */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]">
              <span className="text-[17px]">📝</span>
              <div><h3 className="text-[14px] font-bold text-[#0a2218]">Basic Information</h3><p className="text-[12px] text-[#7a9e8a]">Title, category, and description</p></div>
            </div>
            <div className="p-5 space-y-4">
              <div><label className={sLabel}>Title <span className="text-red-500">*</span></label><input className={sInput} placeholder="e.g. JKPSC KAS Exam 2026" value={form.title} onChange={set('title')} /></div>
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
                <div><label className={sLabel}>Category <span className="text-red-500">*</span></label>
                  <select className={sInput} value={form.category} onChange={set('category')}>
                    {CATEGORIES.map(c => <option key={c}>{c}</option>)}
                  </select></div>
                <div><label className={sLabel}>Organisation <span className="text-red-500">*</span></label><input className={sInput} placeholder="e.g. JKPSC" value={form.org_name} onChange={set('org_name')} /></div>
                <div><label className={sLabel}>Location</label>
                  <select className={sInput} value={form.location} onChange={set('location')}>
                    {LOCATIONS.map(l => <option key={l}>{l}</option>)}
                  </select></div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={sLabel}>Course / Stream</label>
                  <select className={sInput} value={form.course} onChange={set('course')}>
                    {COURSES.map(c => <option key={c}>{c}</option>)}
                  </select></div>
                <div><label className={sLabel}>URL Slug</label>
                  <input className={sInput} value={slug} readOnly style={{ opacity: 0.6 }} />
                  <p className="text-[11px] text-[#7a9e8a] mt-1">kashmirstudent.in/{form.category}/{slug || 'your-slug'}</p></div>
              </div>
              <div>
                <label className={sLabel}>Short Description <span className="text-red-500">*</span> <span className="normal-case font-normal">(shown on cards — 1–2 sentences)</span></label>
                <input className={sInput} placeholder="Concise summary for listing cards and search results" value={form.short_desc} onChange={set('short_desc')} maxLength={160} />
                <p className="text-[11px] text-[#7a9e8a] text-right mt-0.5">{form.short_desc.length}/160</p>
              </div>
              <div>
                <label className={sLabel}>Full Description <span className="text-red-500">*</span> <span className="normal-case font-normal">(200–300 words, SEO optimised)</span></label>
                <textarea className={sInput} rows={6} placeholder="Detailed SEO-optimised description…" value={form.full_desc} onChange={set('full_desc')} />
                <p className="text-[11px] text-[#7a9e8a] text-right mt-0.5">{form.full_desc.split(/\s+/).filter(Boolean).length} words</p>
              </div>
            </div>
          </div>

          {/* Dates */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]">
              <span className="text-[17px]">📅</span>
              <div><h3 className="text-[14px] font-bold text-[#0a2218]">Important Dates</h3></div>
            </div>
            <div className="p-5 grid grid-cols-3 gap-4">
              <div><label className={sLabel}>Opens</label><input type="date" className={sInput} value={form.start_date} onChange={set('start_date')} /></div>
              <div><label className={sLabel}>Last Date <span className="text-red-500">*</span></label><input type="date" className={sInput} value={form.last_date} onChange={set('last_date')} /></div>
              <div><label className={sLabel}>Exam Date</label><input type="date" className={sInput} value={form.exam_date} onChange={set('exam_date')} /></div>
            </div>
          </div>

          {/* Eligibility */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]">
              <span className="text-[17px]">✅</span>
              <div><h3 className="text-[14px] font-bold text-[#0a2218]">Eligibility Criteria</h3></div>
            </div>
            <div className="p-5 space-y-2">
              {eligibility.map((e, i) => (
                <div key={i} className="flex gap-2">
                  <input className={sInput} placeholder={`Criteria ${i + 1}`} value={e} onChange={ev => updateElig(i, ev.target.value)}
                    onKeyDown={ev => ev.key === 'Enter' && (ev.preventDefault(), addElig())} />
                  <button onClick={() => removeElig(i)} className="w-9 h-9 border border-[#dde8e2] rounded-lg text-red-500 hover:bg-red-500 hover:text-white transition-all shrink-0 flex items-center justify-center">✕</button>
                </div>
              ))}
              <button onClick={addElig} className="w-full py-2.5 border-2 border-dashed border-[#bdd0c5] rounded-lg text-[13px] text-[#7a9e8a] hover:border-[#0a2218] hover:text-[#0a2218] transition-all">
                + Add Eligibility Criteria
              </button>
            </div>
          </div>

          {/* Fees & Links */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]">
              <span className="text-[17px]">🔗</span>
              <div><h3 className="text-[14px] font-bold text-[#0a2218]">Fees &amp; Links</h3></div>
            </div>
            <div className="p-5 space-y-4">
              <div><label className={sLabel}>Application Fee</label><input className={sInput} placeholder="e.g. ₹600 (General) | ₹400 (SC/ST) or Free" value={form.fees} onChange={set('fees')} /></div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className={sLabel}>Apply Link <span className="text-red-500">*</span></label><input type="url" className={sInput} placeholder="https://…" value={form.apply_link} onChange={set('apply_link')} /></div>
                <div><label className={sLabel}>Official Notification</label><input type="url" className={sInput} placeholder="https://… (PDF or page)" value={form.notif_link} onChange={set('notif_link')} /></div>
              </div>
            </div>
          </div>

          {/* Tags */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="flex items-center gap-3 px-5 py-3.5 bg-[#f7faf8] border-b border-[#f5f9f6]">
              <span className="text-[17px]">🏷️</span>
              <div><h3 className="text-[14px] font-bold text-[#0a2218]">Tags</h3><p className="text-[12px] text-[#7a9e8a]">Press Enter or comma to add</p></div>
            </div>
            <div className="p-5">
              <div className="flex flex-wrap gap-1.5 border-[1.5px] border-[#dde8e2] rounded-lg p-2 min-h-[44px] focus-within:border-[#0a2218] transition-colors cursor-text" onClick={() => document.getElementById('tag-input')?.focus()}>
                {tags.map((t, i) => (
                  <span key={i} className="inline-flex items-center gap-1 bg-[#e8f5ee] text-[#0a2218] px-2.5 py-1 rounded text-[12.5px] font-medium">
                    {t}<button onClick={() => setTags(ts => ts.filter((_, j) => j !== i))} className="text-[#7a9e8a] hover:text-[#0a2218] ml-0.5">✕</button>
                  </span>
                ))}
                <input id="tag-input" value={tagInput} onChange={e => setTagInput(e.target.value)} onKeyDown={handleTagKey}
                  placeholder={tags.length ? '' : 'Type a tag and press Enter…'} className="flex-1 min-w-[120px] bg-transparent border-none outline-none text-[13.5px] text-[#0a2218]" />
              </div>
              <p className="text-[11.5px] text-[#7a9e8a] mt-2">Suggested: J&K, JKPSC, NIT Srinagar, Domicile, Scholarship, Government</p>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 sticky top-5">
          {/* Publish */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#f7faf8] border-b border-[#f5f9f6] text-[13px] font-bold text-[#0a2218]">Publish</div>
            <div className="p-4 space-y-2">
              <button onClick={() => save('live')} disabled={saving}
                className="w-full py-3 bg-[#0a2218] text-white rounded-xl text-[14px] font-bold hover:bg-[#e8861a] hover:text-[#0a2218] transition-all disabled:opacity-60 flex items-center justify-center gap-2">
                {saving ? <><span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> Saving…</> : '🚀 Publish Listing'}
              </button>
              <button onClick={() => save('draft')} disabled={saving}
                className="w-full py-2.5 bg-white border border-[#dde8e2] rounded-xl text-[13.5px] font-semibold text-[#0a2218] hover:bg-[#e8f5ee] transition-all">
                💾 Save as Draft
              </button>
              <button onClick={() => router.push('/admin/listings')}
                className="w-full py-2.5 text-[13px] text-[#7a9e8a] hover:text-[#0a2218] transition-all">
                Cancel
              </button>
              <div className="border-t border-[#f5f9f6] pt-3 mt-1 space-y-2">
                <div className="flex justify-between items-center text-[12.5px]"><span className="text-[#7a9e8a]">Category</span><span className="font-semibold text-[#0a2218] capitalize">{form.category}</span></div>
                <div className="flex justify-between items-center text-[12.5px]"><span className="text-[#7a9e8a]">Status</span><span className={`font-semibold ${form.status === 'live' ? 'text-green-600' : 'text-amber-600'}`}>{form.status}</span></div>
              </div>
            </div>
          </div>

          {/* Visibility */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#f7faf8] border-b border-[#f5f9f6] text-[13px] font-bold text-[#0a2218]">Visibility</div>
            <div className="p-4 space-y-3">
              {[
                { key: 'is_featured', label: 'Featured Listing', sub: 'Show on homepage' },
              ].map(f => (
                <div key={f.key} className="flex items-center justify-between">
                  <div><div className="text-[13.5px] font-medium text-[#0a2218]">{f.label}</div><div className="text-[11.5px] text-[#7a9e8a]">{f.sub}</div></div>
                  <button onClick={toggle(f.key)}
                    className={`w-10 h-5 rounded-full relative transition-colors ${(form as any)[f.key] ? 'bg-[#0a2218]' : 'bg-[#dde8e2]'}`}>
                    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white shadow transition-all ${(form as any)[f.key] ? 'left-[22px]' : 'left-0.5'}`} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* SEO Preview */}
          <div className="bg-white border border-[#dde8e2] rounded-2xl overflow-hidden">
            <div className="px-4 py-3 bg-[#f7faf8] border-b border-[#f5f9f6] text-[13px] font-bold text-[#0a2218]">SEO Preview</div>
            <div className="p-4">
              <div className="border border-[#dde8e2] rounded-lg p-3 bg-[#fafcfb]">
                <div className="text-[11px] text-green-600 mb-1">kashmirstudent.in › {form.category} › {slug || 'your-slug'}</div>
                <div className="text-[13.5px] text-blue-700 font-semibold mb-1 leading-tight line-clamp-1">{form.title || 'Page Title'}</div>
                <div className="text-[12px] text-[#7a9e8a] leading-relaxed line-clamp-2">{form.short_desc || 'Add a short description to see the preview…'}</div>
              </div>
              <div className="flex items-center gap-1.5 mt-2 text-[12px]">
                <span className={form.title && form.short_desc ? 'text-green-600' : 'text-amber-600'}>●</span>
                <span className="text-[#7a9e8a]">{form.title && form.short_desc ? 'Good SEO score' : 'Fill title & description for SEO score'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
