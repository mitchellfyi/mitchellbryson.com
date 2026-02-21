import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    "Get in touch with me at website@mitchellbryson.com. I'd love to hear from you.",
  url: `${siteUrl}/contact`,
})

export default function ContactLayout({ children }) {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Contact', url: `${siteUrl}/contact` },
        ]}
      />
      {children}
    </>
  )
}
