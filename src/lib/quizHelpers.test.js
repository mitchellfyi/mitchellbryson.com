import { describe, it, expect } from 'vitest'
import { encodeAnswers, decodeAnswers } from './quizHelpers'

describe('encodeAnswers', () => {
  it('encodes answers correctly', () => {
    expect(encodeAnswers({ 0: 1, 1: 2, 2: 3 }, 3)).toBe('123')
  })

  it('defaults missing answers to 0', () => {
    expect(encodeAnswers({ 0: 1 }, 3)).toBe('100')
    expect(encodeAnswers({}, 4)).toBe('0000')
  })

  it('handles full 6-question quiz', () => {
    expect(encodeAnswers({ 0: 0, 1: 1, 2: 2, 3: 3, 4: 0, 5: 1 }, 6)).toBe(
      '012301',
    )
  })
})

describe('decodeAnswers', () => {
  it('decodes a valid string', () => {
    expect(decodeAnswers('123', 3)).toEqual({ 0: 1, 1: 2, 2: 3 })
  })

  it('returns null for wrong length', () => {
    expect(decodeAnswers('12', 3)).toBeNull()
    expect(decodeAnswers('1234', 3)).toBeNull()
  })

  it('returns null for non-numeric characters', () => {
    expect(decodeAnswers('abc', 3)).toBeNull()
    expect(decodeAnswers('1a2', 3)).toBeNull()
  })

  it('returns null for out-of-range values', () => {
    expect(decodeAnswers('124', 3)).toBeNull() // 4 is out of range
    expect(decodeAnswers('159', 3)).toBeNull()
  })

  it('returns null for null or undefined input', () => {
    expect(decodeAnswers(null, 3)).toBeNull()
    expect(decodeAnswers(undefined, 3)).toBeNull()
    expect(decodeAnswers('', 3)).toBeNull()
  })

  it('decodes full 6-question quiz', () => {
    expect(decodeAnswers('012301', 6)).toEqual({
      0: 0,
      1: 1,
      2: 2,
      3: 3,
      4: 0,
      5: 1,
    })
  })

  it('round-trips with encodeAnswers', () => {
    const answers = { 0: 2, 1: 0, 2: 3, 3: 1 }
    const encoded = encodeAnswers(answers, 4)
    expect(decodeAnswers(encoded, 4)).toEqual(answers)
  })
})
