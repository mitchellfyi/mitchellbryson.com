'use client'

import { useState } from 'react'

import { IntegrationCard } from '@/components/IntegrationCard'

function matchesFilter(integration, filterSlug) {
  if (!filterSlug) return true
  return integration.pages?.some((p) => p.slug === filterSlug)
}

function getIntegrationsByCategory(integrations, filterCategories) {
  const byCategory = new Map()
  for (const group of filterCategories) {
    for (const option of group.options) {
      const items = integrations.filter((i) =>
        i.pages?.some((p) => p.slug === option.slug),
      )
      if (items.length > 0) {
        byCategory.set(option.slug, { title: option.title, integrations: items })
      }
    }
  }
  return byCategory
}

export function IntegrationsFilter({ integrations, filterCategories }) {
  const [filterSlug, setFilterSlug] = useState(null)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const byCategory = getIntegrationsByCategory(integrations, filterCategories)
  const filtered = filterSlug
    ? integrations.filter((i) => matchesFilter(i, filterSlug))
    : integrations

  const activeLabel =
    filterSlug &&
    filterCategories.flatMap((g) => g.options).find((o) => o.slug === filterSlug)
      ?.title

  const btnBase =
    'cursor-pointer rounded-md px-2.5 py-1 text-sm font-medium transition'
  const btnActive =
    'bg-teal-500 text-white dark:bg-teal-600'
  const btnInactive =
    'bg-zinc-100 text-zinc-700 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700'

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
          Filter by category
        </label>

        {/* Mobile: dropdown */}
        <div className="relative sm:hidden">
          <button
            type="button"
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className={`flex w-full cursor-pointer items-center justify-between rounded-md border border-zinc-200 bg-white px-3 py-2 text-left text-sm dark:border-zinc-700 dark:bg-zinc-900`}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
          >
            <span className="text-zinc-800 dark:text-zinc-200">
              {filterSlug ? activeLabel : 'All'}
            </span>
            <svg
              className={`h-4 w-4 text-zinc-500 transition ${dropdownOpen ? 'rotate-180' : ''}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {dropdownOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                aria-hidden
                onClick={() => setDropdownOpen(false)}
              />
              <div
                role="listbox"
                className="absolute left-0 right-0 top-full z-20 mt-1 max-h-64 overflow-auto rounded-md border border-zinc-200 bg-white py-1 shadow-lg dark:border-zinc-700 dark:bg-zinc-900"
              >
                <div role="option" aria-selected={!filterSlug}>
                  <button
                    type="button"
                    onClick={() => {
                      setFilterSlug(null)
                      setDropdownOpen(false)
                    }}
                    className={`block w-full cursor-pointer px-3 py-2 text-left text-sm ${!filterSlug ? btnActive : 'text-zinc-700 dark:text-zinc-300'}`}
                  >
                    All
                  </button>
                </div>
                {filterCategories.map((group) => (
                  <div key={group.group} className="border-t border-zinc-100 dark:border-zinc-800">
                    <div className="px-3 py-1.5 text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      {group.group}
                    </div>
                    {group.options.map((option) => {
                      const count = integrations.filter((i) =>
                        i.pages?.some((p) => p.slug === option.slug),
                      ).length
                      if (count === 0) return null
                      const isActive = filterSlug === option.slug
                      return (
                        <div key={option.slug} role="option" aria-selected={isActive}>
                          <button
                            type="button"
                            onClick={() => {
                              setFilterSlug(isActive ? null : option.slug)
                              setDropdownOpen(false)
                            }}
                            className={`block w-full cursor-pointer px-3 py-2 text-left text-sm ${isActive ? btnActive : 'text-zinc-700 dark:text-zinc-300'}`}
                          >
                            {option.title} ({count})
                          </button>
                        </div>
                      )
                    })}
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Desktop: compact button row */}
        <div className="hidden flex-wrap gap-1.5 sm:flex">
          <button
            type="button"
            onClick={() => setFilterSlug(null)}
            className={`${btnBase} ${!filterSlug ? btnActive : btnInactive}`}
          >
            All
          </button>
          {filterCategories.map((group) =>
            group.options.map((option) => {
              const count = integrations.filter((i) =>
                i.pages?.some((p) => p.slug === option.slug),
              ).length
              if (count === 0) return null
              const isActive = filterSlug === option.slug
              return (
                <button
                  key={option.slug}
                  type="button"
                  onClick={() => setFilterSlug(isActive ? null : option.slug)}
                  className={`${btnBase} ${isActive ? btnActive : btnInactive}`}
                >
                  {option.title}
                  <span className="ml-1 opacity-70">({count})</span>
                </button>
              )
            }),
          )}
        </div>
      </div>

      <div role="status" className="sr-only">
        Showing {filtered.length} integration{filtered.length !== 1 ? 's' : ''}
      </div>

      {filterSlug ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((integration) => (
            <IntegrationCard
              key={integration.url}
              integration={integration}
              pages={integration.pages}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-12">
          {Array.from(byCategory.entries()).map(([slug, { title, integrations: items }]) => (
            <section key={slug}>
              <h2 className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-200">
                {title}
              </h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((integration) => (
                  <IntegrationCard
                    key={integration.url}
                    integration={integration}
                    pages={integration.pages}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}
    </div>
  )
}
