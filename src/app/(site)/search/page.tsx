import type { Metadata } from 'next'
import { searchListings } from '@/lib/listings'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import ListingCard from '@/components/ListingCard'
import SearchPageClient from '@/components/SearchPageClient'

interface Props { searchParams: { q?: string } }

export async function generateMetadata({ searchParams }: Props): Promise<Metadata> {
  return { title: searchParams.q ? `Search: "${searchParams.q}" | Kashmir Student 4` : 'Search | Kashmir Student 4' }
}

export const revalidate = 0

export default async function SearchPage({ searchParams }: Props) {
  const q = searchParams.q?.trim() || ''
  const results = q ? await searchListings(q) : []

  return (
    <>
      <Navbar />
      <SearchPageClient query={q} results={results} />
      <Footer />
    </>
  )
}
