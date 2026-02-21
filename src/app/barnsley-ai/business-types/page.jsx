import { LinkCardGrid } from '@/components/LinkCardGrid'
import { SimpleLayout } from '@/components/SimpleLayout'
import { businessTypes } from '@/lib/barnsleyPages'
import { getOgImage, siteUrl } from '@/lib/siteConfig'

const metaDescription =
  'Businesses I help with AI in Barnsley - manufacturing, professional services, e-commerce, B2B SaaS, startups, and agencies adopting AI in South Yorkshire.'

export const metadata = {
  title: 'Businesses Using AI in Barnsley | AI Consultant South Yorkshire',
  description: metaDescription,
  keywords: [
    'AI Barnsley businesses',
    'AI consultant Barnsley',
    'AI manufacturing Barnsley',
    'AI South Yorkshire',
    'AI professional services Barnsley',
  ],
  alternates: {
    canonical: `${siteUrl}/barnsley-ai/business-types`,
  },
  openGraph: {
    title: 'Businesses Using AI in Barnsley | AI Software Engineer - Mitchell Bryson',
    description: metaDescription,
    url: `${siteUrl}/barnsley-ai/business-types`,
    siteName: 'Mitchell Bryson',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: getOgImage('Businesses Using AI in Barnsley', metaDescription),
        width: 1200,
        height: 630,
        alt: 'Businesses Using AI in Barnsley - Mitchell Bryson',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Businesses Using AI in Barnsley | AI Consultant - Mitchell Bryson',
    description: metaDescription,
  },
}

export default function BarnsleyBusinessTypesPage() {
  return (
    <SimpleLayout
      title="Types of businesses"
      intro="I've worked across sectors and team sizes. Barnsley and South Yorkshire have a strong mix of traditional and digital businesses adopting AI. Each type links to a Barnsley AI page with more detail and example AI tools."
    >
      <div className="max-w-4xl space-y-6">
        <LinkCardGrid items={businessTypes} hrefPrefix="/barnsley-ai/" />
      </div>
    </SimpleLayout>
  )
}
