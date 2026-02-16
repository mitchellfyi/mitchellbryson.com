'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

function getFaviconUrl(url, logoDomain) {
  const domain = logoDomain || new URL(url).hostname.replace(/^www\./, '')
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

export function IntegrationCard({ integration, pages, showContext }) {
  const [imgError, setImgError] = useState(false)
  const faviconUrl = getFaviconUrl(integration.url, integration.logoDomain)
  const useDivWrapper = Array.isArray(pages)
  const Wrapper = useDivWrapper ? 'div' : 'a'
  const wrapperProps = useDivWrapper
    ? {}
    : { href: integration.url, target: '_blank', rel: 'noopener noreferrer' }

  return (
    <Wrapper
      {...wrapperProps}
      className="group flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-teal-300 hover:bg-teal-50/30 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-teal-600 dark:hover:bg-teal-900/20"
    >
      <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 dark:bg-zinc-900">
        {!imgError ? (
          <Image
            src={faviconUrl}
            alt=""
            width={48}
            height={48}
            className="object-contain rounded-lg"
            onError={() => setImgError(true)}
          />
        ) : (
          <span className="flex h-full w-full items-center justify-center rounded-lg bg-teal-100 text-lg font-semibold text-teal-600 dark:bg-teal-900/50 dark:text-teal-400">
            {integration.name.charAt(0)}
          </span>
        )}
      </div>
      <h3 className="font-semibold text-zinc-800 dark:text-zinc-200">
        {integration.name}
      </h3>
      {integration.description && (
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          {integration.description}
          {showContext && integration.contextSentence && ` ${integration.contextSentence}`}
        </p>
      )}
      {pages && pages.length > 0 && (
        <p className="mt-2 text-xs text-zinc-500 dark:text-zinc-500">
          Mentioned on:{' '}
          {pages.map((page, i) => (
            <span key={page.slug}>
              <Link
                href={`/barnsley-ai/${page.slug}`}
                className="font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
              >
                {page.title}
              </Link>
              {i < pages.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>
      )}
      {useDivWrapper ? (
        <a
          href={integration.url}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-2 inline-flex items-center text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:group-hover:text-teal-300"
        >
          Visit site
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </a>
      ) : (
        <span className="mt-2 inline-flex items-center text-sm font-medium text-teal-500 transition group-hover:text-teal-600 dark:text-teal-400 dark:group-hover:text-teal-300">
          Visit site
          <svg
            className="ml-1 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
            />
          </svg>
        </span>
      )}
    </Wrapper>
  )
}
