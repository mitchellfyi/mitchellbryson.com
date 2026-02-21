import { describe, it, expect } from 'vitest'
import { getOgImage, buildMetadata, getFaviconUrl, siteUrl } from './siteConfig'

describe('getOgImage', () => {
  it('builds URL with encoded title and description', () => {
    const result = getOgImage('My Title', 'My Description')
    expect(result).toBe(
      `${siteUrl}/api/og?title=My%20Title&description=My%20Description&type=home`,
    )
  })

  it('encodes special characters', () => {
    const result = getOgImage('A <b> & "test"', 'Desc & <more>')
    expect(result).toContain('title=A%20%3Cb%3E%20%26%20%22test%22')
    expect(result).toContain('description=Desc%20%26%20%3Cmore%3E')
  })

  it('defaults type to home', () => {
    const result = getOgImage('T', 'D')
    expect(result).toContain('&type=home')
  })

  it('uses provided type', () => {
    const result = getOgImage('T', 'D', 'article')
    expect(result).toContain('&type=article')
  })

  it('uses siteUrl as base', () => {
    const result = getOgImage('T', 'D')
    expect(result).toMatch(/^http:\/\/localhost:3000\/api\/og\?/)
  })
})

describe('buildMetadata', () => {
  const base = { title: 'Test', description: 'A test', url: '/test' }

  it('returns title and description at top level', () => {
    const meta = buildMetadata(base)
    expect(meta.title).toBe('Test')
    expect(meta.description).toBe('A test')
  })

  it('sets canonical URL in alternates', () => {
    const meta = buildMetadata(base)
    expect(meta.alternates.canonical).toBe('/test')
  })

  it('openGraph.title uses ogTitle when provided', () => {
    const meta = buildMetadata({ ...base, ogTitle: 'OG Title' })
    expect(meta.openGraph.title).toBe('OG Title - Mitchell Bryson')
  })

  it('openGraph.title falls back to title', () => {
    const meta = buildMetadata(base)
    expect(meta.openGraph.title).toBe('Test - Mitchell Bryson')
  })

  it('openGraph.description uses ogDescription when provided', () => {
    const meta = buildMetadata({ ...base, ogDescription: 'OG Desc' })
    expect(meta.openGraph.description).toBe('OG Desc')
  })

  it('openGraph.description falls back to description', () => {
    const meta = buildMetadata(base)
    expect(meta.openGraph.description).toBe('A test')
  })

  it('includes keywords when provided', () => {
    const meta = buildMetadata({ ...base, keywords: ['a', 'b'] })
    expect(meta.keywords).toEqual(['a', 'b'])
  })

  it('omits keywords when not provided', () => {
    const meta = buildMetadata(base)
    expect(meta).not.toHaveProperty('keywords')
  })

  it('defaults locale to en_GB', () => {
    const meta = buildMetadata(base)
    expect(meta.openGraph.locale).toBe('en_GB')
  })

  it('uses provided locale', () => {
    const meta = buildMetadata({ ...base, locale: 'en_US' })
    expect(meta.openGraph.locale).toBe('en_US')
  })

  it('defaults type to website', () => {
    const meta = buildMetadata(base)
    expect(meta.openGraph.type).toBe('website')
  })

  it('uses provided type', () => {
    const meta = buildMetadata({ ...base, type: 'article' })
    expect(meta.openGraph.type).toBe('article')
  })

  it('twitter card is summary_large_image', () => {
    const meta = buildMetadata(base)
    expect(meta.twitter.card).toBe('summary_large_image')
  })

  it('authors contains siteName with /about URL', () => {
    const meta = buildMetadata(base)
    expect(meta.authors).toEqual([
      { name: 'Mitchell Bryson', url: `${siteUrl}/about` },
    ])
  })
})

describe('getFaviconUrl', () => {
  it('parses hostname from URL', () => {
    const result = getFaviconUrl('https://example.com/path')
    expect(result).toBe(
      'https://www.google.com/s2/favicons?domain=example.com&sz=128',
    )
  })

  it('strips www. prefix', () => {
    const result = getFaviconUrl('https://www.example.com/path')
    expect(result).toBe(
      'https://www.google.com/s2/favicons?domain=example.com&sz=128',
    )
  })

  it('uses logoDomain override when provided', () => {
    const result = getFaviconUrl('https://example.com', 'custom.com')
    expect(result).toBe(
      'https://www.google.com/s2/favicons?domain=custom.com&sz=128',
    )
  })
})
