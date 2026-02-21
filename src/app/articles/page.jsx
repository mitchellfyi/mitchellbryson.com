import Image from 'next/image'
import Link from 'next/link'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { WritingNav } from '@/components/WritingNav'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { BreadcrumbJsonLd, CollectionPageJsonLd } from '@/components/JsonLd'
import { buildMetadata, siteUrl } from '@/lib/siteConfig'
import { Newsletter } from '@/components/Newsletter'

const ARTICLES_PER_PAGE = 10

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-start">
      <Card className="md:col-span-3">
        <div className="flex gap-4">
          {article.coverImage && (
            <div className="hidden flex-shrink-0 max-md:block">
              <Image
                src={article.coverImage}
                alt={article.title}
                width={120}
                height={80}
                className="rounded-lg object-cover"
              />
            </div>
          )}
          <div className="flex-1">
            <Card.Title href={`/articles/${article.slug}`}>
              {article.title}
            </Card.Title>
            <Card.Eyebrow
              as="time"
              dateTime={article.date}
              className="md:hidden"
              decorate
            >
              {formatDate(article.date)}
              <span className="mx-2">·</span>
              <span>{article.readingTime}</span>
            </Card.Eyebrow>
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
          </div>
        </div>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 flex-col gap-3 max-md:hidden"
      >
        {article.coverImage && (
          <div className="flex-shrink-0">
            <Image
              src={article.coverImage}
              alt={article.title}
              width={120}
              height={80}
              className="rounded-lg object-cover"
            />
          </div>
        )}
        <span>{formatDate(article.date)}</span>
        <span className="text-zinc-400 dark:text-zinc-500">
          {article.readingTime}
        </span>
      </Card.Eyebrow>
    </article>
  )
}

export const metadata = buildMetadata({
  title: 'Articles',
  description:
    'All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order.',
  url: `${siteUrl}/articles`,
})

function Pagination({ currentPage, totalPages }) {
  if (totalPages <= 1) return null

  return (
    <nav aria-label="Pagination" className="mt-16 flex items-center justify-center gap-2">
      {currentPage > 1 ? (
        <Link
          href={currentPage === 2 ? '/articles' : `/articles?page=${currentPage - 1}`}
          className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Previous
        </Link>
      ) : (
        <span className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 dark:text-zinc-600">
          Previous
        </span>
      )}

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((pageNum) => (
        <Link
          key={pageNum}
          href={pageNum === 1 ? '/articles' : `/articles?page=${pageNum}`}
          aria-current={pageNum === currentPage ? 'page' : undefined}
          className={
            pageNum === currentPage
              ? 'rounded-md bg-teal-500 px-3 py-2 text-sm font-medium text-white'
              : 'rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800'
          }
        >
          {pageNum}
        </Link>
      ))}

      {currentPage < totalPages ? (
        <Link
          href={`/articles?page=${currentPage + 1}`}
          className="rounded-md px-3 py-2 text-sm font-medium text-zinc-600 hover:bg-zinc-100 dark:text-zinc-400 dark:hover:bg-zinc-800"
        >
          Next
        </Link>
      ) : (
        <span className="rounded-md px-3 py-2 text-sm font-medium text-zinc-300 dark:text-zinc-600">
          Next
        </span>
      )}
    </nav>
  )
}

export default async function ArticlesIndex({ searchParams }) {
  const params = await searchParams
  const page = Math.max(1, parseInt(params?.page, 10) || 1)
  let articles = await getAllArticles()

  const totalPages = Math.ceil(articles.length / ARTICLES_PER_PAGE)
  const currentPage = Math.min(page, totalPages)
  const paginatedArticles = articles.slice(
    (currentPage - 1) * ARTICLES_PER_PAGE,
    currentPage * ARTICLES_PER_PAGE,
  )

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Articles', url: `${siteUrl}/articles` },
        ]}
      />
      <CollectionPageJsonLd
        name="Articles"
        description="All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order."
        url={`${siteUrl}/articles`}
      />
      <SimpleLayout
        title="Writing on product development, company building, and the AI industry."
        intro="All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order."
      >
        <div className="mt-6 mb-10 flex justify-center">
          <WritingNav />
        </div>
        <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
          <div className="flex max-w-3xl flex-col space-y-16">
            {paginatedArticles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
        </div>
        <Pagination currentPage={currentPage} totalPages={totalPages} />
        <div className="mt-16 mx-auto max-w-lg">
          <Newsletter />
        </div>
      </SimpleLayout>
    </>
  )
}
