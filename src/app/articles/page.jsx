import Image from 'next/image'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { siteUrl } from '@/lib/siteConfig'

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

const defaultOgImage = `${siteUrl}/api/og?title=${encodeURIComponent('Articles')}&description=${encodeURIComponent('Thoughts on AI, programming, product development, and more.')}&type=article`

export const metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order.',
  alternates: {
    canonical: `${siteUrl}/articles`,
  },
  openGraph: {
    title: 'Articles - Mitchell Bryson',
    description:
      'All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order.',
    url: `${siteUrl}/articles`,
    siteName: 'Mitchell Bryson',
    images: [
      {
        url: defaultOgImage,
        width: 1200,
        height: 630,
        alt: 'Articles - Mitchell Bryson',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Articles - Mitchell Bryson',
    description:
      'All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order.',
    images: [defaultOgImage],
  },
}

export default async function ArticlesIndex() {
  let articles = await getAllArticles()

  return (
    <SimpleLayout
      title="Writing on product development, company building, and the AI industry."
      intro="All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order."
    >
      <div className="md:border-l md:border-zinc-100 md:pl-6 md:dark:border-zinc-700/40">
        <div className="flex max-w-3xl flex-col space-y-16">
          {articles.map((article) => (
            <Article key={article.slug} article={article} />
          ))}
        </div>
      </div>
    </SimpleLayout>
  )
}
