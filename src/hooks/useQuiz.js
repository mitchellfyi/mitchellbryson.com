import { useState, useEffect } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { encodeAnswers, decodeAnswers } from '@/lib/quizHelpers'

export function useQuiz(questionCount) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState({})
  const [showResults, setShowResults] = useState(false)

  // Load from permalink on mount
  useEffect(() => {
    const r = searchParams.get('r')
    if (r) {
      const decoded = decodeAnswers(r, questionCount)
      if (decoded) {
        setAnswers(decoded)
        setShowResults(true)
      }
    }
  }, [searchParams, questionCount])

  // Update URL when results are shown
  useEffect(() => {
    if (showResults && Object.keys(answers).length === questionCount) {
      const url = new URL(window.location.pathname, window.location.origin)
      url.searchParams.set('r', encodeAnswers(answers, questionCount))
      window.history.replaceState(null, '', url.toString())
    }
  }, [showResults, answers, questionCount])

  const selectedOption = answers[currentQuestion]
  const isLastQuestion = currentQuestion === questionCount - 1

  function handleSelect(optionIndex) {
    setAnswers((prev) => ({ ...prev, [currentQuestion]: optionIndex }))
    setTimeout(() => {
      if (currentQuestion === questionCount - 1) {
        setShowResults(true)
      } else {
        setCurrentQuestion((prev) => prev + 1)
      }
    }, 300)
  }

  function handleNext() {
    if (isLastQuestion) {
      setShowResults(true)
    } else {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  function handleBack() {
    setCurrentQuestion((prev) => prev - 1)
  }

  function handleRestart() {
    setCurrentQuestion(0)
    setAnswers({})
    setShowResults(false)
    router.replace(window.location.pathname, { scroll: false })
  }

  return {
    currentQuestion,
    answers,
    showResults,
    selectedOption,
    isLastQuestion,
    handleSelect,
    handleNext,
    handleBack,
    handleRestart,
  }
}
