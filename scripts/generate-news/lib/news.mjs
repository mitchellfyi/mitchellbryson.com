import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const NEWS_DIR = path.resolve('src/app/news')

let _cachedNews = null

/**
 * Read all existing news items and return their metadata.
 * Results are cached for the lifetime of the process.
 */
export function getExistingNews() {
  if (_cachedNews) return _cachedNews
  const dirs = fs.readdirSync(NEWS_DIR).filter((d) => {
    if (d === '[slug]') return false
    const contentPath = path.join(NEWS_DIR, d, 'content.md')
    return fs.existsSync(contentPath)
  })

  _cachedNews = dirs
    .map((dir) => {
      const raw = fs.readFileSync(
        path.join(NEWS_DIR, dir, 'content.md'),
        'utf8',
      )
      const { data } = matter(raw)
      return {
        slug: dir,
        title: data.title || dir,
        date: data.date ? String(data.date) : '',
        description: data.description || '',
        type: data.type || 'editorial',
        sourceUrl: data.sourceUrl || null,
        sourceTitle: data.sourceTitle || null,
        sourceHeadline: data.sourceHeadline || null,
        sources: data.sources || [],
      }
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1))

  return _cachedNews
}

/**
 * Get all source links from the past N days.
 * Collects from editorials (sourceUrl), digests (sources), and links (sources).
 */
export function getRecentSourceLinks(days = 7, limit = 15) {
  const news = getExistingNews()
  const cutoff = new Date()
  cutoff.setDate(cutoff.getDate() - days)
  cutoff.setHours(0, 0, 0, 0)

  const seen = new Set()
  const links = []

  for (const item of news) {
    const itemDate = new Date(item.date)
    if (itemDate < cutoff) continue

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

  return links.slice(0, limit)
}

/**
 * Check if a slug already exists as a news directory.
 */
export function slugExists(slug) {
  return fs.existsSync(path.join(NEWS_DIR, slug, 'content.md'))
}
