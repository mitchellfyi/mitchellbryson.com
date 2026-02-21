import { describe, it, expect } from 'vitest'
import { formatDate } from './formatDate'

describe('formatDate', () => {
  it('formats a valid date string correctly', () => {
    expect(formatDate('2024-01-15')).toBe('15 Jan 2024')
    expect(formatDate('2023-12-25')).toBe('25 Dec 2023')
    expect(formatDate('2022-07-04')).toBe('4 Jul 2022')
  })

  it('handles single digit days correctly', () => {
    expect(formatDate('2024-01-01')).toBe('1 Jan 2024')
    expect(formatDate('2024-02-09')).toBe('9 Feb 2024')
  })

  it('handles end of year dates correctly', () => {
    expect(formatDate('2023-12-31')).toBe('31 Dec 2023')
    expect(formatDate('2024-01-01')).toBe('1 Jan 2024')
  })

  it('returns "Invalid Date" for null or undefined input', () => {
    expect(formatDate(null)).toBe('Invalid Date')
    expect(formatDate(undefined)).toBe('Invalid Date')
    expect(formatDate('')).toBe('Invalid Date')
  })

  it('returns "Invalid Date" for invalid date strings', () => {
    expect(formatDate('invalid-date')).toBe('Invalid Date')
    expect(formatDate('2024-13-01')).toBe('Invalid Date') // Invalid month
    expect(formatDate('2024-02-30')).toBe('1 Mar 2024') // JS Date rolls over
    expect(formatDate('not a date')).toBe('Invalid Date')
  })

  it('handles leap year correctly', () => {
    expect(formatDate('2024-02-29')).toBe('29 Feb 2024') // Valid leap year
    expect(formatDate('2023-02-29')).toBe('1 Mar 2023') // Invalid leap year rolls over
  })

  it('consistently uses UTC timezone', () => {
    // Edge case: dates that might differ based on timezone
    expect(formatDate('2024-01-01')).toBe('1 Jan 2024')
    expect(formatDate('2023-12-31')).toBe('31 Dec 2023')
  })
})
