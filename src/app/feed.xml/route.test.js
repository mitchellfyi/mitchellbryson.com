import { describe, it, expect, beforeEach } from 'vitest'

// Integration tests for RSS feed route
describe('RSS feed route', () => {
  beforeEach(() => {
    process.env.NEXT_PUBLIC_SITE_URL = 'https://example.com'
  })

  it('module exports GET function', async () => {
    const routeModule = await import('./route')
    expect(typeof routeModule.GET).toBe('function')
  })

  it('GET function is async', async () => {
    const { GET } = await import('./route')
    expect(GET.constructor.name).toBe('AsyncFunction')
  })

  it('throws error when NEXT_PUBLIC_SITE_URL is missing', async () => {
    const originalUrl = process.env.NEXT_PUBLIC_SITE_URL
    delete process.env.NEXT_PUBLIC_SITE_URL

    const { GET } = await import('./route')

    await expect(GET()).rejects.toThrow(
      'Missing NEXT_PUBLIC_SITE_URL environment variable',
    )

    process.env.NEXT_PUBLIC_SITE_URL = originalUrl
  })

  it('returns XML response', async () => {
    const { GET } = await import('./route')

    const response = await GET()
    expect(response).toBeDefined()
    expect(response instanceof Response).toBe(true)
    expect(response.headers.get('content-type')).toBe('application/xml')
    expect(response.status).toBe(200)
  })

  it('generates RSS feed content', async () => {
    const { GET } = await import('./route')

    const response = await GET()
    const content = await response.text()

    // Basic RSS structure validation
    expect(content).toContain('<?xml')
    expect(content).toContain('<rss')
    expect(content).toContain('</rss>')
  })

  it('contains channel with title', async () => {
    const { GET } = await import('./route')

    const response = await GET()
    const content = await response.text()

    expect(content).toContain('<channel>')
    expect(content).toMatch(/<title>.+<\/title>/)
  })

  it('contains at least one item', async () => {
    const { GET } = await import('./route')

    const response = await GET()
    const content = await response.text()

    expect(content).toContain('<item>')
  })

  it('items have title, link, and pubDate', async () => {
    const { GET } = await import('./route')

    const response = await GET()
    const content = await response.text()

    // Extract items section
    const itemMatch = content.match(/<item>[\s\S]*?<\/item>/)
    expect(itemMatch).not.toBeNull()

    const item = itemMatch[0]
    expect(item).toMatch(/<title>.+<\/title>/)
    expect(item).toMatch(/<link>.+<\/link>/)
    expect(item).toMatch(/<pubDate>.+<\/pubDate>/)
  })
})
