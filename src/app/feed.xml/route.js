import { Feed } from 'feed'
import { getAllArticles } from '@/lib/articles'
import { getAllNews } from '@/lib/news'

export async function GET(req) {
  let siteUrl = process.env.NEXT_PUBLIC_SITE_URL

  if (!siteUrl) {
    throw Error('Missing NEXT_PUBLIC_SITE_URL environment variable')
  }

  let author = {
    name: 'Mitchell Bryson',
    email: 'website@mitchellbryson.com',
  }

  let feed = new Feed({
    title: author.name,
    description:
      'Articles and news on AI, programming, product development, and more, collected in chronological order.',
    author,
    id: siteUrl,
    link: siteUrl,
    image: `${siteUrl}/favicon.ico`,
    favicon: `${siteUrl}/favicon.ico`,
    copyright: `© ${new Date().getFullYear()} Mitchell Bryson. All rights reserved.`,
    feedLinks: {
      rss2: `${siteUrl}/feed.xml`,
    },
  })

  let allArticles = await getAllArticles()

  // Filter to only include articles with dates before today
  const today = new Date()
  today.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
  const publishedArticles = allArticles.filter((article) => {
    const articleDate = new Date(article.date)
    articleDate.setHours(0, 0, 0, 0) // Set to start of day for accurate comparison
    return articleDate <= today
  })

  for (let article of publishedArticles) {
    let publicUrl = `${siteUrl}/articles/${article.slug}`
    let content = `${article.description} <br /><br /><a href="${publicUrl}">Read the full article</a>.`

    feed.addItem({
      title: article.title,
      id: publicUrl,
      link: publicUrl,
      content,
      author: [author],
      contributor: [author],
      date: new Date(article.date),
    })
  }

  let allNews = await getAllNews()

  const publishedNews = allNews.filter((item) => {
    if (item.type === 'links') return false
    const itemDate = new Date(item.date)
    itemDate.setHours(0, 0, 0, 0)
    return itemDate <= today
  })

  for (let item of publishedNews) {
    let publicUrl = `${siteUrl}/news/${item.slug}`
    let description = item.description || ''
    if (item.type === 'editorial' && item.sourceTitle) {
      description += ` (via ${item.sourceTitle})`
    }
    let content = `${description} <br /><br /><a href="${publicUrl}">Read more</a>.`

    feed.addItem({
      title: item.title,
      id: publicUrl,
      link: publicUrl,
      content,
      author: [author],
      contributor: [author],
      date: new Date(item.date),
      category: [{ name: 'News' }],
    })
  }

  return new Response(feed.rss2(), {
    status: 200,
    headers: {
      'content-type': 'application/xml',
      'cache-control': 's-maxage=31556952',
    },
  })
}
