import { describe, it, expect } from 'vitest'
import { barnsleyFaqs } from './barnsleyFaqs'

describe('barnsleyFaqs', () => {
  it('is a non-empty array', () => {
    expect(Array.isArray(barnsleyFaqs)).toBe(true)
    expect(barnsleyFaqs.length).toBeGreaterThan(0)
  })

  it('each FAQ has a question and answer', () => {
    for (const faq of barnsleyFaqs) {
      expect(typeof faq.question).toBe('string')
      expect(faq.question.length).toBeGreaterThan(0)
      expect(typeof faq.answer).toBe('string')
      expect(faq.answer.length).toBeGreaterThan(0)
    }
  })

  it('each question ends with a question mark', () => {
    for (const faq of barnsleyFaqs) {
      expect(faq.question.endsWith('?')).toBe(true)
    }
  })

  it('has no duplicate questions', () => {
    const questions = barnsleyFaqs.map((f) => f.question)
    expect(new Set(questions).size).toBe(questions.length)
  })
})
