export function encodeAnswers(answers, questionCount) {
  return Array.from({ length: questionCount }, (_, i) => answers[i] ?? 0).join('')
}

export function decodeAnswers(str, questionCount) {
  if (!str || str.length !== questionCount) return null
  const answers = {}
  for (let i = 0; i < str.length; i++) {
    const v = parseInt(str[i], 10)
    if (isNaN(v) || v < 0 || v > 3) return null
    answers[i] = v
  }
  return answers
}
