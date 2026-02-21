import { SimpleLayout } from '@/components/SimpleLayout'
import { ToolsList } from '@/components/ToolsList'
import { tools } from '@/lib/tools'

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'
const defaultOgImage = `${siteUrl}/api/og?title=${encodeURIComponent('Tools')}&description=${encodeURIComponent('Software and tools I use for development, automation, and productivity.')}&type=home`

export const metadata = {
  title: 'Tools',
  description: 'Software and tools I use for development, automation, and productivity.',
  alternates: {
    canonical: `${siteUrl}/tools`,
  },
  openGraph: {
    title: 'Tools - Mitchell Bryson',
    description: 'Software and tools I use for development, automation, and productivity.',
    url: `${siteUrl}/tools`,
    siteName: 'Mitchell Bryson',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Tools - Mitchell Bryson',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tools - Mitchell Bryson',
    description: 'Software and tools I use for development, automation, and productivity.',
    images: [defaultOgImage],
  },
}

export default function Tools() {
  return (
    <SimpleLayout
      title="Tools I use"
      intro="Software and tools that power my daily workflow - from AI coding agents and automations to hosting, DNS, and email."
    >
      <ToolsList tools={tools} />
    </SimpleLayout>
  )
}
