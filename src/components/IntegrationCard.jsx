'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { integrationSlug } from '@/lib/barnsleyPages'

function getFaviconUrl(url, logoDomain) {
  const domain = logoDomain || new URL(url).hostname.replace(/^www\./, '')
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}

export function IntegrationCard({ integration, pages, showContext }) {
  const [imgError, setImgError] = useState(false)
  const faviconUrl = getFaviconUrl(integration.url, integration.logoDomain)
  const slug = integration.slug || integrationSlug(integration.name)

  return (
    <div className="group flex flex-col rounded-xl border border-zinc-200 bg-zinc-50/50 p-4 transition hover:border-teal-300 hover:bg-teal-50/30 dark:border-zinc-700 dark:bg-zinc-800/50 dark:hover:border-teal-600 dark:hover:bg-teal-900/20">
      <div className="mb-3 flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-white p-2 dark:bg-zinc-900">
        {!imgError ? (
          <Image
            src={faviconUrl}
            alt=""
            width={48}
            height={48}
            className="rounded-lg object-contain"
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
          {showContext &&
            integration.contextSentence &&
            ` ${integration.contextSentence}`}
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
      <div className="mt-auto flex items-center gap-4 pt-3">
        <Link
          href={`/barnsley-ai/integrations/${slug}`}
          className="inline-flex items-center text-sm font-medium text-teal-500 transition hover:text-teal-600 dark:text-teal-400 dark:hover:text-teal-300"
        >
          Learn more
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
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Link>
        <a
          href={integration.url}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
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
      </div>
    </div>
  )
}
