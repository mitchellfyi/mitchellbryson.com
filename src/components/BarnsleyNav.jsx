'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

const navItems = [
  { href: '/barnsley-ai', label: 'Barnsley AI', shortLabel: 'Barnsley' },
  { href: '/barnsley-ai/integration-types', label: 'AI integration types', shortLabel: 'AI types' },
  { href: '/barnsley-ai/business-types', label: 'Business types', shortLabel: 'Business' },
  { href: '/barnsley-ai/ai-integrations', label: 'AI integrations', shortLabel: 'Integrations' },
]

export function BarnsleyNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Barnsley section"
      className="flex flex-wrap items-center justify-center gap-x-1 gap-y-1"
    >
      {navItems.map((item) => {
        const isActive =
          item.href === pathname ||
          (item.href !== '/barnsley-ai' && pathname.startsWith(item.href + '/'))
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              'rounded-md px-3 py-1.5 text-sm font-medium transition',
              isActive
                ? 'text-teal-600 dark:text-teal-400'
                : 'text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100',
            )}
          >
            <span className="sm:hidden">{item.shortLabel}</span>
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        )
      })}
    </nav>
  )
}
