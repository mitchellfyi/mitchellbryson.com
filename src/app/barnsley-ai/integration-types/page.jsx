import { ContactCTA } from '@/components/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { LinkCardGrid } from '@/components/LinkCardGrid'
import { SimpleLayout } from '@/components/SimpleLayout'
import { aiIntegrations } from '@/lib/barnsleyPages'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'Types of AI Integrations Barnsley | AI Development South Yorkshire',
  description:
    'AI product integrations for Barnsley - AI chatbots, AI search, document processing, workflow automation, data pipelines, and custom AI product features.',
  url: `${siteUrl}/barnsley-ai/integration-types`,
  locale: 'en_GB',
  keywords: [
    'AI integrations Barnsley',
    'AI development Barnsley',
    'AI product features South Yorkshire',
    'AI chatbots Barnsley',
  ],
})

export default function BarnsleyIntegrationTypesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'AI in Barnsley', url: `${siteUrl}/barnsley-ai` },
          { name: 'Types of AI Integrations', url: `${siteUrl}/barnsley-ai/integration-types` },
        ]}
      />
      <SimpleLayout
        title="Types of AI integrations"
        intro="I help Barnsley businesses integrate AI into existing products or build new AI-powered features from scratch. Each AI integration type links to a page with more detail and example AI tools."
      >
        <div className="max-w-4xl space-y-6">
          <LinkCardGrid items={aiIntegrations} hrefPrefix="/barnsley-ai/" />
        </div>
        <div className="mt-12">
          <ContactCTA />
        </div>
      </SimpleLayout>
    </>
  )
}
