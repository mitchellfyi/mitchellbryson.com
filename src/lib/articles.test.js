import { describe, it, expect } from 'vitest'

// Since these functions rely heavily on file system operations,
// we'll create integration tests that work with real test files
describe('articles module', () => {
  it('module exports getAllArticles function', async () => {
    const { getAllArticles } = await import('./articles')
    expect(typeof getAllArticles).toBe('function')
  })

  it('getAllArticles returns an array', async () => {
    const { getAllArticles } = await import('./articles')
    const articles = await getAllArticles()
    expect(Array.isArray(articles)).toBe(true)
  })

  it('articles have expected properties', async () => {
    const { getAllArticles } = await import('./articles')
    const articles = await getAllArticles()

    if (articles.length > 0) {
      const article = articles[0]
      expect(article).toHaveProperty('slug')
      expect(article).toHaveProperty('title')
      expect(article).toHaveProperty('date')
      expect(article).toHaveProperty('content')
      expect(article).toHaveProperty('readingTime')
    }
  })

  it('articles are sorted by date (newest first)', async () => {
    const { getAllArticles } = await import('./articles')
    const articles = await getAllArticles()

    if (articles.length > 1) {
      for (let i = 1; i < articles.length; i++) {
        const currentDate = new Date(articles[i].date)
        const previousDate = new Date(articles[i - 1].date)
        expect(previousDate.getTime()).toBeGreaterThanOrEqual(
          currentDate.getTime(),
        )
      }
    }
  })

  it('reading time is calculated for articles', async () => {
    const { getAllArticles } = await import('./articles')
    const articles = await getAllArticles()

    if (articles.length > 0) {
      articles.forEach((article) => {
        expect(article.readingTime).toMatch(/^\d+ min read$/)
      })
    }
  })

  it('all articles have required properties', async () => {
    const { getAllArticles } = await import('./articles')
    const articles = await getAllArticles()

    articles.forEach((article) => {
      expect(article).toHaveProperty('slug')
      expect(article).toHaveProperty('title')
      expect(article).toHaveProperty('date')
      expect(article).toHaveProperty('content')
      expect(article).toHaveProperty('readingTime')
    })
  })
})

describe('getRelatedArticles', () => {
  it('excludes the current slug', async () => {
    const { getAllArticles, getRelatedArticles } = await import('./articles')
    const articles = await getAllArticles()
    if (articles.length === 0) return

    const currentSlug = articles[0].slug
    const related = await getRelatedArticles(currentSlug)
    related.forEach((a) => expect(a.slug).not.toBe(currentSlug))
  })

  it('defaults to 3 results', async () => {
    const { getAllArticles, getRelatedArticles } = await import('./articles')
    const articles = await getAllArticles()
    if (articles.length <= 1) return

    const related = await getRelatedArticles(articles[0].slug)
    expect(related.length).toBeLessThanOrEqual(3)
  })

  it('respects count param', async () => {
    const { getAllArticles, getRelatedArticles } = await import('./articles')
    const articles = await getAllArticles()
    if (articles.length <= 1) return

    const related = await getRelatedArticles(articles[0].slug, 1)
    expect(related).toHaveLength(1)
  })
})
