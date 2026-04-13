import type { Metadata } from 'next'
import { DM_Serif_Display, DM_Sans } from 'next/font/google'
import './globals.css'

function getMetadataBase() {
  const fallback = 'https://kashmirstudent.in'

  try {
    return new URL(process.env.NEXT_PUBLIC_SITE_URL || fallback)
  } catch {
    return new URL(fallback)
  }
}

const dmSerif = DM_Serif_Display({
  weight: ['400'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  variable: '--font-serif',
  display: 'swap',
})

const dmSans = DM_Sans({
  weight: ['300', '400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Kashmir Student 4 — Admissions, Scholarships, Jobs & Internships',
    template: '%s | Kashmir Student 4',
  },
  description: "J&K's most trusted student portal. Find JKPSC, NIT Srinagar, PMSSS scholarships, J&K Bank jobs, and national opportunities — curated daily for J&K students.",
  keywords: ['JKPSC', 'NIT Srinagar', 'PMSSS scholarship', 'J&K Bank PO', 'Kashmir student portal', 'J&K jobs', 'Jammu Kashmir scholarships'],
  authors: [{ name: 'Kashmir Student 4', url: 'https://kashmirstudent.in' }],
  creator: 'Kashmir Student 4',
  metadataBase: getMetadataBase(),
  openGraph: {
    type: 'website',
    locale: 'en_IN',
    siteName: 'Kashmir Student 4',
    title: 'Kashmir Student 4 — J&K\'s #1 Student Portal',
    description: "Admissions, scholarships, jobs and internships for students of Jammu & Kashmir",
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Kashmir Student 4',
    description: "J&K's most trusted student portal",
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-video-preview': -1, 'max-image-preview': 'large' },
  },
  alternates: {
    canonical: '/',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${dmSerif.variable} ${dmSans.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#0a2218" />
      </head>
      <body className="font-sans bg-slate-50 text-brand antialiased">
        {children}
      </body>
    </html>
  )
}
