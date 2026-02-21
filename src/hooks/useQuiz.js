import { useState, useEffect, useRef } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { encodeAnswers, decodeAnswers } from '@/lib/quizHelpers'

export function useQuiz(questionCount) {
  const searchParams = useSearchParams()
  const router = useRouter()
  const r = searchParams.get('r')
  const decoded = r ? decodeAnswers(r, questionCount) : null
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState(() => decoded || {})
  const [showResults, setShowResults] = useState(() => !!decoded)

  // Update URL when results are shown
  useEffect(() => {
    if (showResults && Object.keys(answers).length === questionCount) {
      const url = new URL(window.location.pathname, window.location.origin)
      url.searchParams.set('r', encodeAnswers(answers, questionCount))
      window.history.replaceState(null, '', url.toString())
    }
  }, [showResults, answers, questionCount])

  const currentQuestionRef = useRef(currentQuestion)
  useEffect(() => {
    currentQuestionRef.current = currentQuestion
  }, [currentQuestion])

  const selectedOption = answers[currentQuestion]
  const isLastQuestion = currentQuestion === questionCount - 1

  function handleSelect(optionIndex) {
    setAnswers((prev) => ({
      ...prev,
      [currentQuestionRef.current]: optionIndex,
    }))
    setTimeout(() => {
      if (currentQuestionRef.current === questionCount - 1) {
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
