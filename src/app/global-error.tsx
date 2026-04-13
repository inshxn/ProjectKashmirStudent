'use client'
import { useEffect } from 'react'

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => { console.error(error) }, [error])
  return (
    <html>
      <body className="min-h-screen flex items-center justify-center bg-slate-50 font-sans p-4">
        <div className="text-center max-w-sm">
          <div className="text-5xl mb-4">⚠️</div>
          <h1 className="text-[22px] font-bold text-[#0a2218] mb-2">Something went wrong</h1>
          <p className="text-[13.5px] text-[#4a6355] mb-6">An unexpected error occurred. Please try again.</p>
          {error.digest && (
            <p className="text-[12px] text-[#7a9e8a] mb-4">Error code: {error.digest}</p>
          )}
          <button onClick={reset} className="bg-[#0a2218] text-white px-6 py-2.5 rounded-xl text-sm font-semibold hover:bg-[#133326] transition-all">
            Try Again
          </button>
        </div>
      </body>
    </html>
  )
}
