import { SimpleLayout } from '@/components/SimpleLayout'
import { ToolsList } from '@/components/ToolsList'
import { BreadcrumbJsonLd, CollectionPageJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { tools } from '@/lib/tools'

export const metadata = buildMetadata({
  title: 'Uses',
  description:
    'Software and tools that power my daily workflow - from AI coding agents and automations to hosting, DNS, and email.',
  url: `${siteUrl}/uses`,
})

export default function Uses() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Uses', url: `${siteUrl}/uses` },
        ]}
      />
      <CollectionPageJsonLd
        name="Uses"
        description="Software and tools I use for development, automation, and productivity."
        url={`${siteUrl}/uses`}
      />
      <SimpleLayout
        title="Tools I use"
        intro="Software and tools that power my daily workflow - from AI coding agents and automations to hosting, DNS, and email."
      >
        <ToolsList tools={tools} />
      </SimpleLayout>
    </>
  )
}
