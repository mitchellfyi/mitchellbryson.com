import Link from 'next/link'
import { Button } from '@/components/Button'

export function ContactCTA({
  heading = 'Want to discuss AI for your business?',
  description = 'I help businesses across South Yorkshire and beyond integrate AI into their workflows. Get in touch to talk through your specific situation.',
}) {
  return (
    <div className="mt-24 rounded-2xl border border-zinc-100 bg-zinc-50 p-6 dark:border-zinc-700/40 dark:bg-zinc-800/50 sm:p-8">
      <h3 className="text-base font-semibold text-zinc-900 dark:text-zinc-100">
        {heading}
      </h3>
      <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
        {description}
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <Button href="/contact">Get in touch</Button>
        <Button variant="secondary" href="/barnsley-ai">
          Learn more about AI services
        </Button>
      </div>
    </div>
  )
}
