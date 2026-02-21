'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import { Card } from '@/components/Card'
import { formatDate } from '@/lib/formatDate'

const ITEMS_PER_PAGE = 50

function NewsItem({ item }) {
  const isEditorial = item.type === 'editorial'

  return (
    <article className="md:grid md:grid-cols-4 md:items-start">
      <Card className="md:col-span-4">
        <div className="flex-1">
          <div className="mb-2 flex items-center gap-2">
            <span
              className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
                isEditorial
                  ? 'bg-teal-50 text-teal-700 dark:bg-teal-900/30 dark:text-teal-400'
                  : 'bg-zinc-100 text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400'
              }`}
            >
              {isEditorial ? 'Editorial' : 'Digest'}
            </span>
            {isEditorial && item.sourceTitle && (
              <span className="text-xs text-zinc-500 dark:text-zinc-500">
                via {item.sourceTitle}
              </span>
            )}
          </div>
          <Card.Title href={`/news/${item.slug}`}>{item.title}</Card.Title>
          <Card.Description>{item.description}</Card.Description>
          <Card.Cta>
            {isEditorial ? 'Read commentary' : 'View roundup'}
          </Card.Cta>
        </div>
      </Card>
    </article>
  )
}

function SourceLink({ link }) {
  return (
    <article>
      <div className="group relative flex flex-col items-start">
        <h2 className="text-xl font-semibold tracking-tight text-zinc-800 dark:text-zinc-100">
          <a
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="absolute -inset-x-4 -inset-y-4 z-20 sm:-inset-x-6 sm:rounded-2xl" />
            <span className="relative z-10">{link.headline}</span>
          </a>
        </h2>
        <p className="relative z-10 mt-1 text-sm text-zinc-500 dark:text-zinc-500">
          {link.sourceName}
        </p>
        <div className="absolute -inset-x-4 -inset-y-4 z-0 scale-95 bg-zinc-50 opacity-0 transition group-hover:scale-100 group-hover:opacity-100 sm:-inset-x-6 sm:rounded-2xl dark:bg-zinc-800/50" />
      </div>
    </article>
  )
}

function buildDayFeed(news, sourceLinks) {
  const byDate = {}

  for (const item of news) {
    if (!byDate[item.date]) byDate[item.date] = { items: [], links: [] }
    byDate[item.date].items.push(item)
  }

  for (const link of sourceLinks) {
    if (!byDate[link.date]) byDate[link.date] = { items: [], links: [] }
    byDate[link.date].links.push(link)
  }

  return Object.entries(byDate).sort(
    ([a], [b]) => +new Date(b) - +new Date(a),
  )
}

function flattenFeed(dayFeed) {
  const flat = []
  for (const [date, { items, links }] of dayFeed) {
    flat.push({ type: 'date-header', date, key: `date-${date}` })
    for (const item of items) {
      flat.push({ type: 'news-item', data: item, key: `item-${item.slug}` })
    }
    for (const link of links) {
      flat.push({ type: 'source-link', data: link, key: `link-${link.url}` })
    }
  }
  return flat
}

export function NewsFeed({ news, sourceLinks }) {
  const dayFeed = buildDayFeed(news, sourceLinks)
  const allEntries = flattenFeed(dayFeed)

  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE)
  const sentinelRef = useRef(null)

  const loadMore = useCallback(() => {
    setVisibleCount((prev) => Math.min(prev + ITEMS_PER_PAGE, allEntries.length))
  }, [allEntries.length])

  useEffect(() => {
    const sentinel = sentinelRef.current
    if (!sentinel) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore()
        }
      },
      { rootMargin: '400px' },
    )

    observer.observe(sentinel)
    return () => observer.disconnect()
  }, [loadMore])

  const visibleEntries = allEntries.slice(0, visibleCount)
  const hasMore = visibleCount < allEntries.length

  return (
    <div className="flex max-w-3xl flex-col mx-auto">
      {visibleEntries.map((entry) => {
        if (entry.type === 'date-header') {
          return (
            <time
              key={entry.key}
              dateTime={entry.date}
              className="mt-10 mb-6 pb-3 text-sm font-semibold text-zinc-800 first:mt-0 dark:text-zinc-100"
            >
              {formatDate(entry.date)}
            </time>
          )
        }

        if (entry.type === 'news-item') {
          return (
            <div key={entry.key} className="mb-10">
              <NewsItem item={entry.data} />
            </div>
          )
        }

        if (entry.type === 'source-link') {
          return (
            <div key={entry.key} className="mb-6">
              <SourceLink link={entry.data} />
            </div>
          )
        }

        return null
      })}

      {hasMore && (
        <div ref={sentinelRef} className="flex justify-center py-8">
          <div className="h-5 w-5 animate-spin rounded-full border-2 border-zinc-300 border-t-teal-500" />
        </div>
      )}
    </div>
  )
}
