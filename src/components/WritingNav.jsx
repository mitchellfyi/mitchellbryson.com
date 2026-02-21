'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import clsx from 'clsx'

const navItems = [
  { href: '/articles', label: 'Opinion' },
  { href: '/news', label: 'News' },
]

export function WritingNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Writing section"
      className="inline-flex items-center gap-1 rounded-full bg-zinc-100 p-1 dark:bg-zinc-800/80"
    >
      {navItems.map((item) => {
        const isActive = pathname.startsWith(item.href)
        return (
          <Link
            key={item.href}
            href={item.href}
            aria-current={isActive ? 'page' : undefined}
            className={clsx(
              'rounded-full px-4 py-1.5 text-sm font-medium transition',
              isActive
                ? 'bg-white text-zinc-900 shadow-sm dark:bg-zinc-700 dark:text-zinc-100'
                : 'text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
