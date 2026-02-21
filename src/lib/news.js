import glob from 'fast-glob'
import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { calculateReadingTime } from './readingTime'

async function importMarkdownNews(newsDir) {
  const contentPath = path.join('./src/app/news', newsDir, 'content.md')

  if (!fs.existsSync(contentPath)) {
    console.warn(`No content.md found for news directory: ${newsDir}`)
    return null
  }

  const fileContents = fs.readFileSync(contentPath, 'utf8')
  const { data: frontmatter, content } = matter(fileContents)

  // Auto-detect OG image based on slug (WebP only for news)
  const webpExists = fs.existsSync(
    path.join('./public/images/news', `${newsDir}.webp`),
  )
  const ogImagePath = webpExists ? `/images/news/${newsDir}.webp` : null

  return {
    slug: newsDir,
    ...frontmatter,
    content,
    ogImage: ogImagePath || frontmatter.ogImage || null,
    // Ensure date is a string
    date: frontmatter.date ? frontmatter.date.toString() : frontmatter.date,
    // Calculate reading time from content
    readingTime: calculateReadingTime(content),
    // Ensure type defaults
    type: frontmatter.type || 'editorial',
    sourceUrl: frontmatter.sourceUrl || null,
    sourceTitle: frontmatter.sourceTitle || null,
    sourceHeadline: frontmatter.sourceHeadline || null,
    sourceDescription: frontmatter.sourceDescription || null,
    sources: frontmatter.sources || [],
  }
}

export async function getRelatedNews(currentSlug, count = 3) {
  const news = await getAllNews()
  return news.filter((n) => n.slug !== currentSlug).slice(0, count)
}

export async function getAllNews() {
  // Get all news directories with content.md files (excluding the [slug] dynamic route)
  let newsDirs = await glob('*/content.md', {
    cwd: './src/app/news',
  }).then((files) =>
    files.map((file) => path.dirname(file)).filter((dir) => dir !== '[slug]'),
  )

  let news = await Promise.all(newsDirs.map(importMarkdownNews))

  // Filter out any failed imports
  news = news.filter((item) => item !== null)

  // Filter out items with dates after today
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  const publishedNews = news.filter((item) => {
    const itemDate = new Date(item.date)
    itemDate.setHours(0, 0, 0, 0)
    return itemDate <= today
  })

  if (process.env.NODE_ENV === 'development') {
    return news.sort((a, z) => +new Date(z.date) - +new Date(a.date))
  }

  return publishedNews.sort((a, z) => +new Date(z.date) - +new Date(a.date))
}

export async function getAllEditorials() {
  const news = await getAllNews()
  return news.filter((item) => item.type === 'editorial')
}

export async function getAllDigests() {
  const news = await getAllNews()
  return news.filter((item) => item.type === 'digest')
}

export async function getAllSourceLinks() {
  const news = await getAllNews()
  const seen = new Set()
  const links = []

  for (const item of news) {
    // Editorial source link
    if (item.type === 'editorial' && item.sourceUrl) {
      if (!seen.has(item.sourceUrl)) {
        seen.add(item.sourceUrl)
        links.push({
          headline: item.sourceHeadline || item.title,
          url: item.sourceUrl,
          sourceName: item.sourceTitle,
          date: item.date,
        })
      }
    }

    // Digest and links type source arrays
    if ((item.type === 'digest' || item.type === 'links') && item.sources) {
      for (const source of item.sources) {
        if (source.url && !seen.has(source.url)) {
          seen.add(source.url)
          links.push({
            headline: source.headline,
            url: source.url,
            sourceName: source.sourceName,
            date: item.date,
          })
        }
      }
    }
  }

  return links
}
