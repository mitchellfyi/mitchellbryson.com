import { IntegrationsFilter } from '@/components/IntegrationsFilter'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  getAllIntegrationsWithPages,
  integrationFilterCategories,
} from '@/lib/barnsleyPages'
import { getOgImage, siteUrl } from '@/lib/siteConfig'

const metaDescription =
  'AI tools and services for Barnsley businesses - AI chatbots, document processing, AI search, workflow automation, and custom AI product features.'

export const metadata = {
  title: 'AI Integrations Barnsley | AI Tools & Services South Yorkshire',
  description: metaDescription,
  keywords: [
    'AI integrations Barnsley',
    'AI tools Barnsley',
    'AI services South Yorkshire',
    'AI chatbots Barnsley',
  ],
  alternates: {
    canonical: `${siteUrl}/barnsley-ai/ai-integrations`,
  },
  openGraph: {
    title: 'AI Integrations Barnsley | AI Software Engineer - Mitchell Bryson',
    description: metaDescription,
    url: `${siteUrl}/barnsley-ai/ai-integrations`,
    siteName: 'Mitchell Bryson',
    locale: 'en_GB',
    type: 'website',
    images: [
      {
        url: getOgImage('AI Integrations Barnsley', metaDescription),
        width: 1200,
        height: 630,
        alt: 'AI Integrations Barnsley - Mitchell Bryson',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Integrations Barnsley | AI Tools & Services - Mitchell Bryson',
    description: metaDescription,
  },
}

export default function BarnsleyAiIntegrationsPage() {
  const integrations = getAllIntegrationsWithPages()

  return (
    <SimpleLayout
      title="AI integrations"
      intro="AI tools and services I've integrated for Barnsley businesses across AI product development, document processing, AI search, workflow automation, and industry-specific solutions. Filter by category or browse all. Each links to the Barnsley AI page where it's featured."
    >
      <div className="max-w-4xl">
        <IntegrationsFilter
          integrations={integrations}
          filterCategories={integrationFilterCategories}
        />
      </div>
    </SimpleLayout>
  )
}
