import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { NewsFeed } from './NewsFeed'

// Mock next/link used by Card
vi.mock('next/link', () => ({
  __esModule: true,
  default: ({ children, href, ...props }) => (
    <a href={href} {...props}>
      {children}
    </a>
  ),
}))

beforeEach(() => {
  global.IntersectionObserver = class {
    constructor() {}
    observe() {}
    disconnect() {}
  }
})

function makeNewsItem(overrides = {}) {
  return {
    title: 'News Title',
    description: 'News description',
    slug: 'news-slug',
    date: '2024-06-15',
    type: 'editorial',
    ...overrides,
  }
}

function makeSourceLink(overrides = {}) {
  return {
    headline: 'Source Headline',
    sourceName: 'Source Name',
    url: 'https://example.com/link',
    date: '2024-06-15',
    ...overrides,
  }
}

describe('NewsFeed', () => {
  describe('date grouping', () => {
    it('renders a date header for each unique date', () => {
      const news = [
        makeNewsItem({ slug: 'a', date: '2024-06-15' }),
        makeNewsItem({ slug: 'b', date: '2024-06-14' }),
      ]
      const { container } = render(<NewsFeed news={news} sourceLinks={[]} />)
      const times = container.querySelectorAll('time')
      expect(times).toHaveLength(2)
    })

    it('dates appear in descending order (newest first)', () => {
      const news = [
        makeNewsItem({ slug: 'old', date: '2024-01-01' }),
        makeNewsItem({ slug: 'new', date: '2024-12-01' }),
      ]
      const { container } = render(<NewsFeed news={news} sourceLinks={[]} />)
      const times = container.querySelectorAll('time')
      expect(times[0]).toHaveAttribute('datetime', '2024-12-01')
      expect(times[1]).toHaveAttribute('datetime', '2024-01-01')
    })

    it('items from same date share a single date header', () => {
      const news = [
        makeNewsItem({ slug: 'a', date: '2024-06-15' }),
        makeNewsItem({ slug: 'b', date: '2024-06-15' }),
      ]
      const { container } = render(<NewsFeed news={news} sourceLinks={[]} />)
      const times = container.querySelectorAll('time')
      expect(times).toHaveLength(1)
    })
  })

  describe('item rendering', () => {
    it('renders link to /news/[slug] for each news item', () => {
      const news = [makeNewsItem({ slug: 'my-post', title: 'My Post' })]
      render(<NewsFeed news={news} sourceLinks={[]} />)
      expect(screen.getByText('My Post').closest('a')).toHaveAttribute(
        'href',
        '/news/my-post',
      )
    })

    it('renders Editorial badge for editorial type items', () => {
      const news = [makeNewsItem({ type: 'editorial' })]
      render(<NewsFeed news={news} sourceLinks={[]} />)
      expect(screen.getByText('Editorial')).toBeInTheDocument()
    })

    it('renders Digest badge for non-editorial items', () => {
      const news = [makeNewsItem({ type: 'digest' })]
      render(<NewsFeed news={news} sourceLinks={[]} />)
      expect(screen.getByText('Digest')).toBeInTheDocument()
    })
  })

  describe('pagination', () => {
    it('does not render sentinel when all entries fit', () => {
      const news = [makeNewsItem()]
      const { container } = render(<NewsFeed news={news} sourceLinks={[]} />)
      // Sentinel is the spinner div, look for animate-spin
      expect(container.querySelector('.animate-spin')).toBeNull()
    })

    it('renders sentinel when entries exceed page size', () => {
      // ITEMS_PER_PAGE is 50, need 51+ flat entries
      // Each unique date = 1 header + 1 item = 2 flat entries, so 26 dates = 52 entries > 50
      const news = Array.from({ length: 26 }, (_, i) => {
        const month = String(Math.floor(i / 28) + 1).padStart(2, '0')
        const day = String((i % 28) + 1).padStart(2, '0')
        return makeNewsItem({
          slug: `item-${i}`,
          date: `2024-${month}-${day}`,
        })
      })
      const { container } = render(<NewsFeed news={news} sourceLinks={[]} />)
      // 26 items across 26 dates = 52 flat entries (26 headers + 26 items) > 50
      expect(container.querySelector('.animate-spin')).toBeInTheDocument()
    })
  })

  describe('edge cases', () => {
    it('renders empty when both news and sourceLinks are empty', () => {
      const { container } = render(<NewsFeed news={[]} sourceLinks={[]} />)
      expect(container.querySelectorAll('time')).toHaveLength(0)
      expect(container.querySelectorAll('article')).toHaveLength(0)
    })

    it('handles news-only feed', () => {
      const news = [makeNewsItem()]
      render(<NewsFeed news={news} sourceLinks={[]} />)
      expect(screen.getByText('News Title')).toBeInTheDocument()
    })

    it('handles sourceLinks-only feed', () => {
      const links = [makeSourceLink()]
      render(<NewsFeed news={[]} sourceLinks={links} />)
      expect(screen.getByText('Source Headline')).toBeInTheDocument()
    })
  })
})
