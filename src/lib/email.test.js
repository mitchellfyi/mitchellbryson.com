import { describe, it, expect } from 'vitest'
import { escapeHtml, validateEmail, C } from './email'

describe('escapeHtml', () => {
  it('escapes < and >', () => {
    expect(escapeHtml('<script>')).toBe('&lt;script&gt;')
  })

  it('escapes &', () => {
    expect(escapeHtml('foo & bar')).toBe('foo &amp; bar')
  })

  it('escapes double quotes', () => {
    expect(escapeHtml('say "hello"')).toBe('say &quot;hello&quot;')
  })

  it('escapes all special characters together', () => {
    expect(escapeHtml('<a href="x">&</a>')).toBe(
      '&lt;a href=&quot;x&quot;&gt;&amp;&lt;/a&gt;',
    )
  })

  it('returns empty string for null or undefined', () => {
    expect(escapeHtml(null)).toBe('')
    expect(escapeHtml(undefined)).toBe('')
    expect(escapeHtml('')).toBe('')
  })

  it('converts non-string input to string', () => {
    expect(escapeHtml(42)).toBe('42')
    expect(escapeHtml(true)).toBe('true')
  })
})

describe('validateEmail', () => {
  it('returns null for a valid email', () => {
    expect(validateEmail('user@example.com')).toBeNull()
    expect(validateEmail('test.user@domain.co.uk')).toBeNull()
  })

  it('returns error for missing email', () => {
    expect(validateEmail('')).toBe('Email is required')
    expect(validateEmail(null)).toBe('Email is required')
    expect(validateEmail(undefined)).toBe('Email is required')
  })

  it('returns error for invalid format', () => {
    expect(validateEmail('notanemail')).toBe('Invalid email address')
    expect(validateEmail('missing@')).toBe('Invalid email address')
    expect(validateEmail('@nodomain')).toBe('Invalid email address')
    expect(validateEmail('spaces in@email.com')).toBe('Invalid email address')
  })
})

describe('C constants', () => {
  it('exports expected color keys', () => {
    expect(C).toHaveProperty('TEAL')
    expect(C).toHaveProperty('HEADING')
    expect(C).toHaveProperty('SUBHEADING')
    expect(C).toHaveProperty('TEXT')
    expect(C).toHaveProperty('BG')
    expect(C).toHaveProperty('WHITE')
    expect(C).toHaveProperty('BORDER')
  })

  it('all values are valid hex colors', () => {
    for (const value of Object.values(C)) {
      expect(value).toMatch(/^#[0-9a-fA-F]{3,6}$/)
    }
  })
})
