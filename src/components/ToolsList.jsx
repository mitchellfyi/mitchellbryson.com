'use client'

import { useState } from 'react'
import Link from 'next/link'
import clsx from 'clsx'

const CATEGORIES = [
  { id: 'all', label: 'All' },
  { id: 'ai-coding', label: 'AI & Coding' },
  { id: 'data', label: 'Data' },
  { id: 'automation', label: 'Automation' },
  { id: 'productivity', label: 'Productivity' },
  { id: 'hosting', label: 'Hosting' },
  { id: 'infrastructure', label: 'Infrastructure' },
]

export function ToolsList({ tools }) {
  const [activeCategory, setActiveCategory] = useState('all')

  const filteredTools =
    activeCategory === 'all'
      ? tools
      : tools.filter((tool) => tool.category === activeCategory)

  return (
    <div>
      <nav
        aria-label="Filter tools by category"
        className="mb-8 flex flex-wrap gap-2"
      >
        {CATEGORIES.map((category) => {
          const count =
            category.id === 'all'
              ? tools.length
              : tools.filter((t) => t.category === category.id).length
          if (count === 0) return null

          return (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={clsx(
                'cursor-pointer rounded-full px-4 py-2 text-sm font-medium transition',
                activeCategory === category.id
                  ? 'bg-teal-500 text-white dark:bg-teal-500'
                  : 'bg-zinc-100 text-zinc-600 hover:bg-zinc-200 hover:text-zinc-900 dark:bg-zinc-800 dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200',
              )}
            >
              {category.label}
              <span className="ml-1.5 text-xs opacity-75">({count})</span>
            </button>
          )
        })}
      </nav>

      <ul
        role="list"
        className="grid grid-cols-1 gap-x-12 gap-y-8 sm:grid-cols-2 lg:grid-cols-3"
      >
        {filteredTools.map((tool) => (
          <li key={tool.name}>
            <Link
              href={`/tools/${tool.slug}`}
              className="group flex flex-col rounded-2xl border border-zinc-100 p-6 transition hover:border-zinc-200 hover:bg-zinc-50 dark:border-zinc-700/40 dark:hover:border-zinc-700 dark:hover:bg-zinc-800/50"
            >
              <div className="flex items-center justify-between">
                <h3 className="text-base font-semibold text-zinc-800 dark:text-zinc-100">
                  {tool.name}
                </h3>
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 text-zinc-400 transition group-hover:text-teal-500 dark:group-hover:text-teal-400"
                >
                  <path
                    d="M9 5l7 7-7 7"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                {tool.description}
              </p>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
