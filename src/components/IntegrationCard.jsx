'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import { ChevronRightIcon, ExternalLinkIcon } from '@/components/Icons'
import { integrationSlug } from '@/lib/barnsleyPages'
import { getFaviconUrl } from '@/lib/siteConfig'

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
            alt={`${integration.name} logo`}
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
                className="font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
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
          aria-label={`Learn more about ${integration.name}`}
          className="inline-flex items-center text-sm font-medium text-teal-700 transition hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          Learn more
          <ChevronRightIcon className="ml-1 h-4 w-4" />
        </Link>
        <a
          href={integration.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`Visit ${integration.name} website`}
          className="inline-flex items-center text-sm font-medium text-zinc-500 transition hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-300"
        >
          Visit site
          <ExternalLinkIcon className="ml-1 h-4 w-4" />
        </a>
      </div>
    </div>
  )
}
