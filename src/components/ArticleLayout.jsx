'use client'

import { useContext, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { AppContext } from '@/app/providers'
import { Container } from '@/components/Container'
import { ArrowLeftIcon } from '@/components/Icons'
import { Newsletter } from '@/components/Newsletter'
import { MarkdownContent } from '@/components/MarkdownContent'
import { Prose } from '@/components/Prose'
import { ArticleToggle } from '@/components/ArticleToggle'
import { formatDate } from '@/lib/formatDate'

function RelatedArticles({ articles }) {
  if (!articles || articles.length === 0) return null

  return (
    <section className="mt-16 border-t border-zinc-100 pt-10 dark:border-zinc-700/40">
      <h2 className="text-lg font-semibold text-zinc-800 dark:text-zinc-100">
        More articles
      </h2>
      <div className="mt-6 space-y-8">
        {articles.map((article) => (
          <Link
            key={article.slug}
            href={`/articles/${article.slug}`}
            className="group block"
          >
            <article>
              <time
                dateTime={article.date}
                className="text-sm text-zinc-400 dark:text-zinc-500"
              >
                {formatDate(article.date)}
              </time>
              <h3 className="mt-1 text-base font-semibold text-zinc-800 group-hover:text-teal-500 dark:text-zinc-100 dark:group-hover:text-teal-400">
                {article.title}
              </h3>
              {article.description && (
                <p className="mt-1 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400">
                  {article.description}
                </p>
              )}
            </article>
          </Link>
        ))}
      </div>
    </section>
  )
}

export function ArticleLayout({ article, relatedArticles, children }) {
  let router = useRouter()
  let { previousPathname } = useContext(AppContext)
  const [isDraft, setIsDraft] = useState(false)

  // Only show toggle if draft content exists
  const hasDraft =
    article.draftContent && article.draftContent.trim().length > 0

  return (
    <Container className="mt-16 lg:mt-32">
      <div className="xl:relative">
        <div className="mx-auto max-w-2xl">
          {previousPathname && (
            <button
              type="button"
              onClick={() => router.back()}
              aria-label="Go back to articles"
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
                {article.title}
              </h1>
              {article.description && (
                <p data-speakable="description" className="sr-only">
                  {article.description}
                </p>
              )}
              <div className="order-first flex items-center text-base text-zinc-400 dark:text-zinc-500">
                <span className="h-4 w-0.5 rounded-full bg-zinc-200 dark:bg-zinc-500" />
                <time dateTime={article.date} className="ml-3">
                  {formatDate(article.date)}
                </time>
                {article.readingTime && (
                  <>
                    <span className="mx-2">·</span>
                    <span>{article.readingTime}</span>
                  </>
                )}
              </div>
            </header>
            {article.coverImage && (
              <div className="mt-8 lg:-mx-14">
                <Image
                  src={article.coverImage}
                  alt={article.title}
                  width={1200}
                  height={630}
                  className="rounded-lg shadow-lg"
                  priority
                />
              </div>
            )}
            {hasDraft && (
              <div className="mt-8 mb-6">
                <ArticleToggle isDraft={isDraft} onToggle={setIsDraft} />
              </div>
            )}
            <Prose className="mt-8" data-mdx-content>
              <MarkdownContent
                content={
                  isDraft && hasDraft ? article.draftContent : article.content
                }
                rehypeRaw
              >
                {children}
              </MarkdownContent>
              <hr />
            </Prose>
          </article>
          <div className="mt-16">
            <Newsletter />
          </div>
          <RelatedArticles articles={relatedArticles} />
        </div>
      </div>
    </Container>
  )
}
