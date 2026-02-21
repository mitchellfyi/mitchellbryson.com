import Link from 'next/link'

import { ChevronRightIcon } from '@/components/Icons'

export function LinkCardGrid({ items, hrefPrefix }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {items.map((item) => (
        <Link
          key={item.slug}
          href={`${hrefPrefix}${item.slug}`}
          className="group flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-teal-300 hover:bg-teal-50/30 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
        >
          <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>
          <span className="mt-2 inline-flex items-center text-sm font-medium text-teal-700 transition group-hover:text-teal-800 dark:text-teal-400 dark:group-hover:text-teal-300">
            Read more
            <ChevronRightIcon className="ml-1 h-4 w-4" />
          </span>
        </Link>
      ))}
    </div>
  )
}
