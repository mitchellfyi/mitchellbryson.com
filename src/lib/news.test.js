import { describe, it, expect } from 'vitest'

describe('news module', () => {
  it('module exports getAllNews function', async () => {
    const { getAllNews } = await import('./news')
    expect(typeof getAllNews).toBe('function')
  })

  it('module exports getAllEditorials function', async () => {
    const { getAllEditorials } = await import('./news')
    expect(typeof getAllEditorials).toBe('function')
  })

  it('module exports getAllDigests function', async () => {
    const { getAllDigests } = await import('./news')
    expect(typeof getAllDigests).toBe('function')
  })

  it('module exports getRelatedNews function', async () => {
    const { getRelatedNews } = await import('./news')
    expect(typeof getRelatedNews).toBe('function')
  })

  it('getAllNews returns an array', async () => {
    const { getAllNews } = await import('./news')
    const news = await getAllNews()
    expect(Array.isArray(news)).toBe(true)
  })

  it('news items have expected properties', async () => {
    const { getAllNews } = await import('./news')
    const news = await getAllNews()

    if (news.length > 0) {
      const item = news[0]
      expect(item).toHaveProperty('slug')
      expect(item).toHaveProperty('title')
      expect(item).toHaveProperty('date')
      expect(item).toHaveProperty('content')
      expect(item).toHaveProperty('readingTime')
      expect(item).toHaveProperty('type')
    }
  })

  it('editorials have sourceUrl and sourceTitle', async () => {
    const { getAllEditorials } = await import('./news')
    const editorials = await getAllEditorials()

    if (editorials.length > 0) {
      const editorial = editorials[0]
      expect(editorial).toHaveProperty('sourceUrl')
      expect(editorial).toHaveProperty('sourceTitle')
    }
  })

  it('news items are sorted by date (newest first)', async () => {
    const { getAllNews } = await import('./news')
    const news = await getAllNews()

    if (news.length > 1) {
      for (let i = 1; i < news.length; i++) {
        const currentDate = new Date(news[i].date)
        const previousDate = new Date(news[i - 1].date)
        expect(previousDate.getTime()).toBeGreaterThanOrEqual(
          currentDate.getTime(),
        )
      }
    }
  })

  it('reading time is calculated for news items', async () => {
    const { getAllNews } = await import('./news')
    const news = await getAllNews()

    if (news.length > 0) {
      news.forEach((item) => {
        expect(item.readingTime).toMatch(/^\d+ min read$/)
      })
    }
  })
})
