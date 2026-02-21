import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { siteUrl } from '@/lib/siteConfig'

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
