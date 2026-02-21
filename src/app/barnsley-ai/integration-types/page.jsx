import { LinkCardGrid } from '@/components/LinkCardGrid'
import { SimpleLayout } from '@/components/SimpleLayout'
import { aiIntegrations } from '@/lib/barnsleyPages'
import { getOgImage, siteUrl } from '@/lib/siteConfig'

const metaDescription =
  'AI product integrations for Barnsley - AI chatbots, AI search, document processing, workflow automation, data pipelines, and custom AI product features.'

export const metadata = {
  title: 'Types of AI Integrations Barnsley | AI Development South Yorkshire',
  description: metaDescription,
  keywords: [
    'AI integrations Barnsley',
    'AI development Barnsley',
    'AI product features South Yorkshire',
    'AI chatbots Barnsley',
  ],
  alternates: {
    canonical: `${siteUrl}/barnsley-ai/integration-types`,
  },
  openGraph: {
    title: 'Types of AI Integrations Barnsley | AI Software Engineer - Mitchell Bryson',
    description: metaDescription,
    url: `${siteUrl}/barnsley-ai/integration-types`,
    siteName: 'Mitchell Bryson',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: getOgImage('Types of AI Integrations Barnsley', metaDescription),
        width: 1200,
        height: 630,
        alt: 'Types of AI Integrations Barnsley - Mitchell Bryson',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Types of AI Integrations Barnsley | AI Development - Mitchell Bryson',
    description: metaDescription,
  },
}

export default function BarnsleyIntegrationTypesPage() {
  return (
    <SimpleLayout
      title="Types of AI integrations"
      intro="I help Barnsley businesses integrate AI into existing products or build new AI-powered features from scratch. Each AI integration type links to a page with more detail and example AI tools."
    >
      <div className="max-w-4xl space-y-6">
        <LinkCardGrid items={aiIntegrations} hrefPrefix="/barnsley-ai/" />
      </div>
    </SimpleLayout>
  )
}
