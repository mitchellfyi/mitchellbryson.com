'use client'

import { useContext } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { ArrowLeftIcon } from '@/components/Icons'
import { Newsletter } from '@/components/Newsletter'
import { MarkdownContent } from '@/components/MarkdownContent'
import { Prose } from '@/components/Prose'
import { formatDate } from '@/lib/formatDate'

function RelatedNews({ items }) {
  if (!items || items.length === 0) return null

  return (
    <section className="mt-16 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        More news
      </h2>
      <div className="mt-6 space-y-8">
        {items.map((item) => (
          <a
            key={item.slug}
            href={`/news/${item.slug}`}
            className="group block"
          >
            <article>
              <time
                dateTime={item.date}
                className="text-sm text-zinc-400 dark:text-zinc-500"
              >
                {formatDate(item.date)}
              </time>
              <h3 className="mt-1 text-base font-semibold text-zinc-800 group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-400">
                {item.title}
              </h3>
              {item.description && (
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {item.description}
                </p>
              )}
            </article>
          </a>
        ))}
      </div>
    </section>
  )
}

function ExternalLinkIcon({ className }) {
  return (
    <svg
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
      className={className}
    >
      <path
        d="M6.75 3.75h5.5v5.5M11.75 4.25 4.25 11.75"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function getDomain(url) {
  try {
    return new URL(url).hostname.replace(/^www\./, '')
  } catch {
    return null
  }
}

function SourceCard({ item }) {
  if (!item.sourceUrl) return null

  const domain = getDomain(item.sourceUrl)
  const headline = item.sourceHeadline || item.title
  const description = item.sourceDescription || item.description

  return (
    <a
      href={item.sourceUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group mt-6 block rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
    >
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0 flex-1">
          <p className="text-xs font-medium uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
            {item.sourceTitle || domain}
          </p>
          <p className="mt-1 text-sm font-semibold leading-snug text-zinc-900 group-hover:text-teal-600 dark:text-zinc-100 dark:group-hover:text-teal-400">
            {headline}
          </p>
          {description && (
            <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
              {description}
            </p>
          )}
          {domain && (
            <p className="mt-2 text-xs text-zinc-400 dark:text-zinc-500">
              {domain}
            </p>
          )}
        </div>
        <ExternalLinkIcon className="mt-1 h-4 w-4 flex-shrink-0 stroke-zinc-400 transition group-hover:stroke-teal-600 dark:stroke-zinc-500 dark:group-hover:stroke-teal-400" />
      </div>
    </a>
  )
}

export function NewsLayout({ item, relatedNews, children }) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)

  const isEditorial = item.type === 'editorial'

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to news"
              className="group mb-8 flex h-10 w-10 cursor-pointer items-center justify-center rounded-full bg-white shadow-md ring-1 shadow-zinc-800/5 ring-zinc-900/5 transition lg:absolute lg:-left-5 lg:-mt-2 lg:mb-0 xl:-top-1.5 xl:left-0 xl:mt-0 dark:border dark:border-zinc-700/50 dark:bg-zinc-800 dark:ring-0 dark:ring-white/10 dark:hover:border-zinc-700 dark:hover:ring-white/20"
            >
              <ArrowLeftIcon className="h-4 w-4 stroke-zinc-500 transition group-hover:stroke-zinc-700 dark:stroke-zinc-500 dark:group-hover:stroke-zinc-400" />
            </button>
          )}
          <article>
            <header className="flex flex-col">
              <h1
                data-speakable="headline"
                className="mt-6 text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100"
              >
                {item.title}
              </h1>
              {item.description && (
                <p data-speakable="description" className="sr-only">
                  {item.description}
                </p>
              )}
              <div className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <time dateTime={item.date} className="ml-3">
                  {formatDate(item.date)}
                </time>
                {item.readingTime && (
                  <>
                    <span className="mx-2">·</span>
                    <span>{item.readingTime}</span>
                  </>
                )}
              </div>
              {isEditorial && <SourceCard item={item} />}
            </header>
            {isEditorial && item.ogImage && (
              <div className="mt-8 lg:-mx-14">
                <Image
                  src={item.ogImage}
                  alt={item.title}
                  width={1200}
                  height={630}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}
            <Prose className="mt-8" data-mdx-content>
              <MarkdownContent content={item.content} rehypeRaw>
                {children}
              </MarkdownContent>
              <hr />
            </Prose>
            {isEditorial && item.sourceUrl && (
              <a
                href={item.sourceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group mt-8 flex items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 p-4 transition hover:border-zinc-300 hover:bg-zinc-100 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:hover:border-zinc-600 dark:hover:bg-zinc-800"
              >
                <div>
                  <p className="text-sm font-medium text-zinc-900 group-hover:text-teal-600 dark:text-zinc-100 dark:group-hover:text-teal-400">
                    Read the original on {item.sourceTitle}
                  </p>
                  <p className="mt-0.5 text-xs text-zinc-500 dark:text-zinc-400">
                    {getDomain(item.sourceUrl)}
                  </p>
                </div>
                <ExternalLinkIcon className="h-4 w-4 flex-shrink-0 stroke-zinc-400 transition group-hover:stroke-teal-600 dark:stroke-zinc-500 dark:group-hover:stroke-teal-400" />
              </a>
            )}
          </article>
          <div className="mt-16">
            <Newsletter />
          </div>
          <RelatedNews items={relatedNews} />
        </div>
      </div>
    </Container>
  )
}
