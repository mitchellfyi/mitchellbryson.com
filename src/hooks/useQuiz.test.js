import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { renderHook, act } from '@testing-library/react'

// Mock next/navigation
const mockReplace = vi.fn()
const mockSearchParams = new URLSearchParams()
vi.mock('next/navigation', () => ({
  useSearchParams: () => mockSearchParams,
  useRouter: () => ({ replace: mockReplace }),
}))

// Mock quizHelpers
vi.mock('@/lib/quizHelpers', () => ({
  encodeAnswers: (answers, count) =>
    Array.from({ length: count }, (_, i) => answers[i] ?? 0).join(''),
  decodeAnswers: (str, count) => {
    if (!str || str.length !== count) return null
    const answers = {}
    for (let i = 0; i < str.length; i++) {
      const v = parseInt(str[i], 10)
      if (isNaN(v) || v < 0 || v > 3) return null
      answers[i] = v
    }
    return answers
  },
}))

import { useQuiz } from './useQuiz'

describe('useQuiz', () => {
  beforeEach(() => {
    vi.useFakeTimers()
    mockReplace.mockClear()
    // Reset search params
    for (const key of [...mockSearchParams.keys()]) {
      mockSearchParams.delete(key)
    }
    // Mock window.history.replaceState
    vi.spyOn(window.history, 'replaceState').mockImplementation(() => {})
  })

  afterEach(() => {
    vi.useRealTimers()
    vi.restoreAllMocks()
  })

  it('starts at question 0 with empty answers', () => {
    const { result } = renderHook(() => useQuiz(5))
    expect(result.current.currentQuestion).toBe(0)
    expect(result.current.answers).toEqual({})
    expect(result.current.showResults).toBe(false)
  })

  it('restores answers from ?r= URL param', () => {
    mockSearchParams.set('r', '12301')
    const { result } = renderHook(() => useQuiz(5))
    expect(result.current.answers).toEqual({ 0: 1, 1: 2, 2: 3, 3: 0, 4: 1 })
    expect(result.current.showResults).toBe(true)
  })

  it('handleSelect records an answer', () => {
    const { result } = renderHook(() => useQuiz(5))
    act(() => {
      result.current.handleSelect(2)
    })
    expect(result.current.answers[0]).toBe(2)
  })

  it('handleSelect auto-advances after 300ms', () => {
    const { result } = renderHook(() => useQuiz(5))
    act(() => {
      result.current.handleSelect(1)
    })
    expect(result.current.currentQuestion).toBe(0)
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.currentQuestion).toBe(1)
  })

  it('handleSelect shows results on last question', () => {
    const { result } = renderHook(() => useQuiz(2))
    // Answer Q0
    act(() => {
      result.current.handleSelect(0)
    })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    // Now on Q1 (last)
    act(() => {
      result.current.handleSelect(1)
    })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.showResults).toBe(true)
  })

  it('handleBack decrements currentQuestion', () => {
    const { result } = renderHook(() => useQuiz(5))
    // Move to Q1
    act(() => {
      result.current.handleSelect(0)
    })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.currentQuestion).toBe(1)
    act(() => {
      result.current.handleBack()
    })
    expect(result.current.currentQuestion).toBe(0)
  })

  it('handleRestart resets all state', () => {
    const { result } = renderHook(() => useQuiz(3))
    act(() => {
      result.current.handleSelect(2)
    })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    act(() => {
      result.current.handleRestart()
    })
    expect(result.current.currentQuestion).toBe(0)
    expect(result.current.answers).toEqual({})
    expect(result.current.showResults).toBe(false)
    expect(mockReplace).toHaveBeenCalled()
  })

  it('selectedOption reflects current answer', () => {
    const { result } = renderHook(() => useQuiz(5))
    expect(result.current.selectedOption).toBeUndefined()
    act(() => {
      result.current.handleSelect(3)
    })
    expect(result.current.selectedOption).toBe(3)
  })

  it('isLastQuestion is true on final question', () => {
    const { result } = renderHook(() => useQuiz(2))
    expect(result.current.isLastQuestion).toBe(false)
    act(() => {
      result.current.handleSelect(0)
    })
    act(() => {
      vi.advanceTimersByTime(300)
    })
    expect(result.current.isLastQuestion).toBe(true)
  })

  it('handleNext advances without delay', () => {
    const { result } = renderHook(() => useQuiz(5))
    act(() => {
      result.current.handleNext()
    })
    expect(result.current.currentQuestion).toBe(1)
  })
})
