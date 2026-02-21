import { ContactForm } from '@/components/ContactForm'
import { BreadcrumbJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'Contact',
  description:
    'Get in touch with Mitchell Bryson. Send a message about AI engineering, software development, or collaboration opportunities.',
  url: `${siteUrl}/contact`,
})

export default function Contact() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Contact', url: `${siteUrl}/contact` },
        ]}
      />
      <ContactForm />
    </>
  )
}
