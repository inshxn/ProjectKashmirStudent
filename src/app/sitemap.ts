import { MetadataRoute } from 'next'
import { createServerClient } from '@/lib/supabase-server'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://kashmirstudent.in'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${baseUrl}/listings`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/admissions`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/scholarships`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/jobs`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${baseUrl}/internships`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/search`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  // Dynamic listing pages
  try {
    const supabase = createServerClient()
    if (!supabase) return staticPages
    const { data: listings } = await supabase
      .from('listings')
      .select('slug, category, updated_at')
      .eq('is_active', true)
      .eq('status', 'live')

    const listingPages: MetadataRoute.Sitemap = (listings || []).map((l) => ({
      url: `${baseUrl}/listings/${l.slug}`,
      lastModified: new Date(l.updated_at),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...listingPages]
  } catch {
    return staticPages
  }
}
