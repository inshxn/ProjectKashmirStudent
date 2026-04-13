'use client'

interface Props {
  title: string
}

export default function ListingActions({ title }: Props) {
  function handleShare() {
    if (typeof navigator !== 'undefined' && navigator.share) {
      navigator.share({ title, url: window.location.href })
    } else {
      // fallback: copy to clipboard
      navigator.clipboard?.writeText(window.location.href)
      alert('Link copied to clipboard!')
    }
  }

  function handlePrint() {
    window.print()
  }

  return (
    <div className="flex gap-2">
      <button
        onClick={handleShare}
        className="text-xs border border-[#dde8e2] px-3 py-1.5 rounded-lg text-[#4a6355] hover:border-brand-800 hover:text-brand-800 transition-all"
      >
        ↗ Share
      </button>
      <button
        onClick={handlePrint}
        className="text-xs border border-[#dde8e2] px-3 py-1.5 rounded-lg text-[#4a6355] hover:border-brand-800 hover:text-brand-800 transition-all hidden sm:block"
      >
        🖨 Print
      </button>
    </div>
  )
}
