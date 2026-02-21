import { ContactCTA } from '@/components/ContactCTA'
import { BreadcrumbJsonLd, FAQPageJsonLd } from '@/components/JsonLd'
import { SimpleLayout } from '@/components/SimpleLayout'
import { barnsleyFaqs } from '@/lib/barnsleyFaqs'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'

export const metadata = buildMetadata({
  title: 'AI Consultant FAQ | Barnsley AI Services',
  description:
    'Frequently asked questions about AI consulting, costs, timelines, data safety, and how AI can help your business in Barnsley and South Yorkshire.',
  url: `${siteUrl}/barnsley-ai/faq`,
  ogTitle: 'AI Consultant FAQ | Barnsley',
  keywords: [
    'AI consultant FAQ',
    'AI for small business UK',
    'AI cost UK',
    'AI GDPR',
    'AI consultant Barnsley',
    'AI South Yorkshire',
  ],
})

export default function FAQPage() {
  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'AI in Barnsley', url: `${siteUrl}/barnsley-ai` },
          { name: 'FAQ', url: `${siteUrl}/barnsley-ai/faq` },
        ]}
      />
      <FAQPageJsonLd faqs={barnsleyFaqs} />
      <SimpleLayout
        title="Frequently asked questions"
        intro="Common questions about AI consulting, working with an AI developer, and what to expect when integrating AI into your business."
      >
        <dl className="space-y-3">
          {barnsleyFaqs.map((faq, i) => (
            <details
              key={i}
              className="group rounded-lg border border-zinc-100 dark:border-zinc-700/40"
            >
              <summary className="cursor-pointer px-4 py-3 text-sm font-medium text-zinc-800 select-none hover:text-teal-700 dark:text-zinc-200 dark:hover:text-teal-400">
                {faq.question}
              </summary>
              <dd className="px-4 pb-4 text-sm text-zinc-600 dark:text-zinc-400">
                {faq.answer}
              </dd>
            </details>
          ))}
        </dl>

        <ContactCTA />
      </SimpleLayout>
    </>
  )
}
