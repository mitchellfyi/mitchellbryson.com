import Image from 'next/image'
import { Card } from '@/components/Card'
import { SimpleLayout } from '@/components/SimpleLayout'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'

function Article({ article }) {
  return (
    <article className="md:grid md:grid-cols-4 md:items-start">
      <Card className="md:col-span-3">
        <div className="flex gap-4">
          {article.coverImage && (
            <div className="flex-shrink-0 hidden max-md:block">
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
            </Card.Eyebrow>
            <Card.Description>{article.description}</Card.Description>
            <Card.Cta>Read article</Card.Cta>
          </div>
        </div>
      </Card>
      <Card.Eyebrow
        as="time"
        dateTime={article.date}
        className="mt-1 max-md:hidden flex-col gap-3"
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
        {formatDate(article.date)}
      </Card.Eyebrow>
    </article>
  )
}

export const metadata = {
  title: 'Articles',
  description:
    'All of my long-form thoughts on AI, programming, product development, and more, collected in chronological order.',
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
