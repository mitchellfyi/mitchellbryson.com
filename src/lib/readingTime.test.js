import { describe, it, expect } from 'vitest'
import { calculateReadingTime } from './readingTime'

describe('calculateReadingTime', () => {
  it('returns "1 min read" for empty or null content', () => {
    expect(calculateReadingTime('')).toBe('1 min read')
    expect(calculateReadingTime(null)).toBe('1 min read')
    expect(calculateReadingTime(undefined)).toBe('1 min read')
  })

  it('calculates reading time for short content', () => {
    // Less than 200 words should be 1 min
    const shortContent = 'This is a short article. '.repeat(30) // ~150 words
    expect(calculateReadingTime(shortContent)).toBe('1 min read')
  })

  it('calculates reading time for medium content', () => {
    // 200-400 words should be 2 min
    const mediumContent = 'This is a medium article. '.repeat(60) // ~300 words
    expect(calculateReadingTime(mediumContent)).toBe('2 min read')
  })

  it('calculates reading time for long content', () => {
    // 600 words should be 3 min
    const longContent = 'This is a long article. '.repeat(120) // ~600 words
    expect(calculateReadingTime(longContent)).toBe('3 min read')
  })

  it('strips markdown code blocks', () => {
    const contentWithCode = `
      This is text.
      \`\`\`javascript
      const longCodeBlock = "This should not count as reading time";
      const moreCode = "This is more code that should be ignored";
      \`\`\`
      More text here.
    `
    expect(calculateReadingTime(contentWithCode)).toBe('1 min read')
  })

  it('strips inline code', () => {
    const content =
      'This is text with `inline code that should not count` in the middle.'
    expect(calculateReadingTime(content)).toBe('1 min read')
  })

  it('strips markdown images', () => {
    const content = 'Text before ![alt text](image.jpg) and after image.'
    expect(calculateReadingTime(content)).toBe('1 min read')
  })

  it('preserves link text but removes URLs', () => {
    const content = 'Check out [this link](https://example.com) for more info.'
    expect(calculateReadingTime(content)).toBe('1 min read')
  })

  it('strips markdown formatting characters', () => {
    const content =
      '# Header\n**Bold** text and *italic* text with ~~strikethrough~~.'
    expect(calculateReadingTime(content)).toBe('1 min read')
  })

  it('strips HTML tags', () => {
    const content =
      'Text with <strong>HTML</strong> and <em>tags</em> <br /> included.'
    expect(calculateReadingTime(content)).toBe('1 min read')
  })

  it('handles complex markdown content', () => {
    const complexContent = `
      # Article Title

      This is a paragraph with **bold** text and *italic* text.

      ## Section with Code

      Here's some text before code:

      \`\`\`python
      def long_function():
          # This is a very long code block
          # With many lines that should not count
          return "Hello World"
      \`\`\`

      And text after code with [a link](https://example.com) and \`inline code\`.

      ![Image description](image.jpg)

      > A blockquote with some text

      - List item 1
      - List item 2

      Final paragraph with more content.
    `
    // Should only count actual text words, not code or markdown syntax
    expect(calculateReadingTime(complexContent)).toBe('1 min read')
  })

  it('handles content with excessive whitespace', () => {
    const content = '  This   has    lots     of      spaces.      '
    expect(calculateReadingTime(content)).toBe('1 min read')
  })

  it('rounds up to nearest minute', () => {
    // 201 words should round up to 2 minutes
    const content = 'word '.repeat(201)
    expect(calculateReadingTime(content)).toBe('2 min read')
  })

  it('always returns at least 1 minute', () => {
    expect(calculateReadingTime('One word.')).toBe('1 min read')
    expect(calculateReadingTime('.')).toBe('1 min read')
    expect(calculateReadingTime('   ')).toBe('1 min read')
  })
})
