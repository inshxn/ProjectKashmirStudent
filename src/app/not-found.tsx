import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

export default function NotFound() {
  return (
    <>
      <Navbar />
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="text-center max-w-sm">
          <div className="font-serif text-[80px] text-brand-800 leading-none mb-2">404</div>
          <h1 className="font-serif text-[24px] text-brand-800 mb-3">Page Not Found</h1>
          <p className="text-[13.5px] text-[#4a6355] mb-7 leading-relaxed">
            The page you're looking for doesn't exist or may have been moved. Let's get you back on track.
          </p>
          <div className="flex gap-3 justify-center flex-wrap">
            <Link href="/" className="btn-primary px-6 py-2.5">← Back to Home</Link>
            <Link href="/listings" className="btn-secondary px-6 py-2.5">Browse Listings</Link>
          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
