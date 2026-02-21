import { notFound } from 'next/navigation'
import { NewsLayout } from '@/components/NewsLayout'
import { NewsArticleJsonLd, BreadcrumbJsonLd } from '@/components/JsonLd'
import { getAllNews, getRelatedNews } from '@/lib/news'
import { getOgImage, siteName, siteUrl } from '@/lib/siteConfig'

export async function generateStaticParams() {
  const news = await getAllNews()
  return news
    .filter((item) => item.type !== 'links')
    .map((item) => ({
      slug: item.slug,
    }))
}

export async function generateMetadata({ params }) {
  const { slug } = await params
  const news = await getAllNews()
  const item = news.find((n) => n.slug === slug)

  if (!item) {
    return {}
  }

  const ogImageUrl =
    item.type === 'editorial' && item.ogImage
      ? `${siteUrl}${item.ogImage}`
      : getOgImage(item.title, item.description || '', 'article')

  const itemUrl = `${siteUrl}/news/${slug}`

  return {
    title: item.title,
    description: item.description,
    alternates: {
      canonical: itemUrl,
    },
    openGraph: {
      title: `${item.title} - ${siteName}`,
      description: item.description,
      type: 'article',
      url: itemUrl,
      siteName,
      locale: 'en_GB',
      publishedTime: item.date,
      authors: [item.author],
      images: [
        {
          url: ogImageUrl,
          width: 1200,
          height: 630,
          alt: item.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: item.title,
      description: item.description,
      images: [ogImageUrl],
    },
  }
}

export default async function NewsItemPage({ params }) {
  const { slug } = await params
  const news = await getAllNews()
  const item = news.find((n) => n.slug === slug)

  if (!item) {
    notFound()
  }

  const relatedNews = await getRelatedNews(slug)

  return (
    <>
      <NewsArticleJsonLd
        article={{ ...item, slug }}
        url={`${siteUrl}/news/${slug}`}
      />
      <BreadcrumbJsonLd
        items={[
          { name: 'Home', url: siteUrl },
          { name: 'News', url: `${siteUrl}/news` },
          { name: item.title, url: `${siteUrl}/news/${slug}` },
        ]}
      />
      <NewsLayout item={item} relatedNews={relatedNews} />
    </>
  )
}
