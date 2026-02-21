import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const ARTICLES_DIR = path.resolve('src/app/articles')

let _cachedArticles = null

/**
 * Read all existing articles and return their metadata.
 * Results are cached for the lifetime of the process.
 */
export function getExistingArticles() {
  if (_cachedArticles) return _cachedArticles
  const dirs = fs.readdirSync(ARTICLES_DIR).filter((d) => {
    if (d === '[slug]') return false
    const contentPath = path.join(ARTICLES_DIR, d, 'content.md')
    return fs.existsSync(contentPath)
  })

  _cachedArticles = dirs
    .map((dir) => {
      const raw = fs.readFileSync(
        path.join(ARTICLES_DIR, dir, 'content.md'),
        'utf8',
      )
      const { data } = matter(raw)
      return {
        slug: dir,
        title: data.title || dir,
        date: data.date ? String(data.date) : '',
        description: data.description || '',
      }
    })
    .sort((a, b) => (b.date > a.date ? 1 : -1))

  return _cachedArticles
}

/**
 * Get the first N words of a string.
 */
function firstNWords(text, n) {
  return text.split(/\s+/).slice(0, n).join(' ')
}

/**
 * Pick `count` random recent article excerpts (first 500 words each).
 */
export function getExampleContent(count = 2) {
  const articles = getExistingArticles()
  const recent = articles.slice(0, 6)
  const picked = shuffle(recent).slice(0, count)

  return picked
    .map((a) => {
      const raw = fs.readFileSync(
        path.join(ARTICLES_DIR, a.slug, 'content.md'),
        'utf8',
      )
      const { content } = matter(raw)
      return `### "${a.title}"\n\n${firstNWords(content, 500)}`
    })
    .join('\n\n---\n\n')
}

/**
 * Pick `count` random draft excerpts (first 300 words each).
 */
export function getExampleDrafts(count = 2) {
  const articles = getExistingArticles()
  const withDrafts = articles.filter((a) =>
    fs.existsSync(path.join(ARTICLES_DIR, a.slug, 'content_draft.md')),
  )
  const picked = shuffle(withDrafts).slice(0, count)

  return picked
    .map((a) => {
      const raw = fs.readFileSync(
        path.join(ARTICLES_DIR, a.slug, 'content_draft.md'),
        'utf8',
      )
      const { content } = matter(raw)
      return `### Draft for "${a.title}"\n\n${firstNWords(content, 300)}`
    })
    .join('\n\n---\n\n')
}

/**
 * Check if a slug already exists as an article directory.
 */
export function slugExists(slug) {
  return fs.existsSync(path.join(ARTICLES_DIR, slug, 'content.md'))
}

/**
 * Fisher-Yates shuffle.
 */
function shuffle(arr) {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
