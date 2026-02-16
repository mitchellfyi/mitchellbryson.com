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
})
