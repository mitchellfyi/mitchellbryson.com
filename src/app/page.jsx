import { Container } from '@/components/Container'
import { Newsletter } from '@/components/Newsletter'
import { Card } from '@/components/Card'
import { Resume } from '@/components/Resume'
import { Projects } from '@/components/Projects'
import { getAllArticles } from '@/lib/articles'
import { formatDate } from '@/lib/formatDate'
import { pinnedProjects } from '@/lib/pinnedProjects'

function Article({ article }) {
  return (
    <Card as="article">
      <Card.Eyebrow decorate>{formatDate(article.date)}</Card.Eyebrow>
      <Card.Title href={`/articles/${article.slug}`}>
        {article.title}
      </Card.Title>
      <Card.Description>{article.description}</Card.Description>
      <Card.Cta>Read article</Card.Cta>
    </Card>
  )
}

export default async function Home() {
  let articles = (await getAllArticles()).slice(0, 6)
  let projects = pinnedProjects

  return (
    <>
      <Container className="mt-9">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
            I&apos;m Mitchell, a full-stack AI Software Engineer.
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            I design, develop and ship engaging products and practical systems
            that cut manual work and improve margins. My focus: small,
            verifiable wins that go live fast, then scale. If you need a
            developer that knows what to build and why,{' '}
            <a href="/contact" className="text-teal-700">
              let&apos;s talk
            </a>
            .
          </p>
        </div>
      </Container>
      <Container className="mt-24 md:mt-28">
        <div className="mx-auto grid max-w-xl grid-cols-1 gap-y-20 lg:max-w-none lg:grid-cols-2">
          <div className="flex flex-col gap-16">
            {articles.map((article) => (
              <Article key={article.slug} article={article} />
            ))}
          </div>
          <div className="space-y-10 lg:pl-16 xl:pl-24">
            <Newsletter />
            <Projects projects={projects} />
            <Resume />
          </div>
        </div>
      </Container>
    </>
  )
}
