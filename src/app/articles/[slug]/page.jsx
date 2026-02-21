import { notFound } from 'next/navigation'
import { ArticleLayout } from '@/components/ArticleLayout'
import { ArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'
import { getAllArticles } from '@/lib/articles'
import { getOgImage, siteName, siteUrl } from '@/lib/siteConfig'

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

  const ogImageUrl = article.coverImage
    ? `${siteUrl}${article.coverImage}`
    : getOgImage(article.title, article.description || '', 'article')

  const articleUrl = `${siteUrl}/articles/${slug}`

  return {
    title: article.title,
    description: article.description,
    alternates: {
      canonical: articleUrl,
    },
    openGraph: {
      title: article.title,
      description: article.description,
      type: 'article',
      url: articleUrl,
      siteName,
      locale: 'en_GB',
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

  return (
    <>
      <ArticleJsonLd article={article} />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'Articles', url: `${siteUrl}/articles` },
          { name: article.title, url: `${siteUrl}/articles/${article.slug}` },
        ]}
      />
      <ArticleLayout article={article} />
    </>
  )
}
