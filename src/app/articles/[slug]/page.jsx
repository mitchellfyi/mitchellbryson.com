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
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    return {}
  }

  // Generate dynamic OG image URL
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://mitchellbryson.com'
  const ogImageUrl = article.coverImage
    ? `${siteUrl}${article.coverImage}`
    : `${siteUrl}/api/og?title=${encodeURIComponent(article.title)}&description=${encodeURIComponent(article.description || '')}&type=article`

  const articleUrl = `${siteUrl}/articles/${slug}`

  return {
    title: article.title,
    description: article.description,
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: articleUrl,
      siteName: 'Mitchell Bryson',
      publishedTime: article.date,
      authors: [article.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: article.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: article.title,
      description: article.description,
      images: [ogImageUrl],
    },
  }
}

export default async function ArticlePage({ params }) {
  const { slug } = await params
  const articles = await getAllArticles()
  const article = articles.find((a) => a.slug === slug)

  if (!article) {
    notFound()
  }

  return <ArticleLayout article={article} />
}
