import { SimpleLayout } from '@/components/SimpleLayout'
import { ToolsList } from '@/components/ToolsList'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { tools } from '@/lib/tools'

export const metadata = buildMetadata({
  title: 'Tools',
  description: 'Software and tools I use for development, automation, and productivity.',
  url: `${siteUrl}/tools`,
})

export default function Tools() {
  return (
    <>
    <BreadcrumbJsonLd
      items={[
        { name: 'Home', url: siteUrl },
        { name: 'Tools', url: `${siteUrl}/tools` },
      ]}
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
