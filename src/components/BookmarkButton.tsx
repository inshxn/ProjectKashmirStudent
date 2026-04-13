'use client'
import { useState, useEffect } from 'react'
import { createClient } from '@/lib/supabase-browser'

export default function BookmarkButton({ listingId }: { listingId: string }) {
  const [saved, setSaved] = useState(false)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const supabase = createClient()
    if (!supabase) return
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return
      const { data: bm } = await supabase
        .from('bookmarks')
        .select('id')
        .eq('user_id', data.user.id)
        .eq('listing_id', listingId)
        .single()
      setSaved(!!bm)
    })
  }, [listingId])

  async function toggle() {
    setLoading(true)
    const supabase = createClient()
    if (!supabase) {
      setLoading(false)
      window.location.href = '/auth/login'
      return
    }
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      window.location.href = '/auth/login'
      return
    }
    const res = await fetch('/api/bookmarks', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ listing_id: listingId }),
    })
    const json = await res.json()
    if (json.success) setSaved(json.data.added)
    setLoading(false)
  }

  return (
    <button onClick={toggle} disabled={loading}
      className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-[13.5px] font-semibold border transition-all ${
        saved
          ? 'bg-amber-light border-amber text-amber-dark'
          : 'bg-white border-[#dde8e2] text-brand-800 hover:border-amber hover:bg-amber-light hover:text-amber-dark'
      }`}>
      {saved ? '🔖 Saved' : '🔲 Save for Later'}
    </button>
  )
}
