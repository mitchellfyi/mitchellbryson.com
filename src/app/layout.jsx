import { Analytics } from '@vercel/analytics/react'

import { Providers } from '@/app/providers'
import { Layout } from '@/components/Layout'
import { WebSiteJsonLd, ProfilePageJsonLd } from '@/components/JsonLd'

import '@/styles/tailwind.css'
import '@/styles/prism.css'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'
const defaultOgImage = `${siteUrl}/api/og?title=${encodeURIComponent('Mitchell Bryson')}&description=${encodeURIComponent('AI Software Engineer - AI Systems & Automation')}&type=home`

export const metadata = {
  title: {
    template: '%s - Mitchell Bryson',
    default: 'Mitchell Bryson - AI Software Engineer',
  },
  description:
    "I'm Mitchell, an AI Software Engineer. I design and ship practical AI systems that cut manual work and improve margins.",
  alternates: {
    canonical: siteUrl,
    types: {
      'application/rss+xml': `${siteUrl}/feed.xml`,
    },
  },
  openGraph: {
    title: 'Mitchell Bryson - AI Software Engineer',
    description:
      'I design and ship practical AI systems that cut manual work and improve margins.',
    url: siteUrl,
    siteName: 'Mitchell Bryson',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Mitchell Bryson - AI Software Engineer',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mitchell Bryson - AI Software Engineer',
    description:
      'I design and ship practical AI systems that cut manual work and improve margins.',
    images: [defaultOgImage],
  },
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/favicon.ico', sizes: 'any' },
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      {
        url: '/android-chrome-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/android-chrome-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body
        className="flex h-full bg-zinc-50 dark:bg-black"
        suppressHydrationWarning
      >
        <WebSiteJsonLd />
        <ProfilePageJsonLd />
        <Providers>
          <div className="flex w-full">
            <Layout>{children}</Layout>
          </div>
        </Providers>
        <Analytics />
      </body>
    </html>
  )
}
