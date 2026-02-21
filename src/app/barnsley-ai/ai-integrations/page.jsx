import { ContactCTA } from '@/components/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { IntegrationsFilter } from '@/components/IntegrationsFilter'
import { SimpleLayout } from '@/components/SimpleLayout'
import {
  getAllIntegrationsWithPages,
  integrationFilterCategories,
} from '@/lib/barnsleyPages'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'AI Integrations Barnsley | AI Tools & Services South Yorkshire',
  description:
    'AI tools and services for Barnsley businesses - AI chatbots, document processing, AI search, workflow automation, and custom AI product features.',
  url: `${siteUrl}/barnsley-ai/ai-integrations`,
  locale: 'en_GB',
  keywords: [
    'AI integrations Barnsley',
    'AI tools Barnsley',
    'AI services South Yorkshire',
    'AI chatbots Barnsley',
  ],
})

export default function BarnsleyAiIntegrationsPage() {
  const integrations = getAllIntegrationsWithPages()

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'AI in Barnsley', url: `${siteUrl}/barnsley-ai` },
          { name: 'AI Integrations', url: `${siteUrl}/barnsley-ai/ai-integrations` },
        ]}
      />
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
        <div className="mt-12">
          <ContactCTA />
        </div>
      </SimpleLayout>
    </>
  )
}
