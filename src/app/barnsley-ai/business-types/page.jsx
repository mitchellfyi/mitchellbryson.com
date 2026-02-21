import { ContactCTA } from '@/components/ContactCTA'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { LinkCardGrid } from '@/components/LinkCardGrid'
import { SimpleLayout } from '@/components/SimpleLayout'
import { businessTypes } from '@/lib/barnsleyPages'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'Businesses Using AI in Barnsley | AI Consultant South Yorkshire',
  description:
    'Businesses I help with AI in Barnsley - manufacturing, professional services, e-commerce, B2B SaaS, startups, and agencies adopting AI in South Yorkshire.',
  url: `${siteUrl}/barnsley-ai/business-types`,
  locale: 'en_GB',
  keywords: [
    'AI Barnsley businesses',
    'AI consultant Barnsley',
    'AI manufacturing Barnsley',
    'AI South Yorkshire',
    'AI professional services Barnsley',
  ],
})

export default function BarnsleyBusinessTypesPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'AI in Barnsley', url: `${siteUrl}/barnsley-ai` },
          {
            name: 'Types of Businesses',
            url: `${siteUrl}/barnsley-ai/business-types`,
          },
        ]}
      />
      <SimpleLayout
        title="Types of businesses"
        intro="I've worked across sectors and team sizes. Barnsley and South Yorkshire have a strong mix of traditional and digital businesses adopting AI. Each type links to a Barnsley AI page with more detail and example AI tools."
      >
        <div className="max-w-4xl space-y-6">
          <LinkCardGrid items={businessTypes} hrefPrefix="/barnsley-ai/" />
        </div>
        <div className="mt-12">
          <ContactCTA />
        </div>
      </SimpleLayout>
    </>
  )
}
