import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { getAllArticles } from '@/lib/articles'

export async function generateStaticParams() {
  const articles = await getAllArticles()
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const articles = await getAllArticles()
  const article = articles.find(a => a.slug === slug)
  
  if (!article) {
    return {}
  }

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      publishedTime: article.date,
      authors: [article.author],
      images: article.coverImage ? [
        {
          url: article.coverImage,
          width: 1200,
          height: 630,
          alt: article.title,
        }
      ] : undefined,
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: article.coverImage ? [article.coverImage] : undefined,
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const articles = await getAllArticles()
  const article = articles.find(a => a.slug === slug)

  if (!article) {
    notFound()
  }

  return <ArticleLayout article={article} />
}
