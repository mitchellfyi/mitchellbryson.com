/**
 * Retry a function with exponential backoff.
 * @param {Function} fn - Async function to retry. Receives { attempt, maxAttempts }.
 * @param {object} options
 * @param {string} options.stepName - Label for log messages.
 * @param {number} [options.maxAttempts=3] - Maximum number of attempts.
 * @returns {Promise<*>} The return value of fn on success.
 */
export async function withRetry(fn, { stepName, maxAttempts = 3 }) {
  let lastError
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    try {
      return await fn({ attempt, maxAttempts })
    } catch (err) {
      lastError = err
      console.error(
        `[${stepName}] Attempt ${attempt}/${maxAttempts} failed: ${err.message}`,
      )
      if (attempt < maxAttempts) {
        const delay = Math.pow(2, attempt) * 1000
        console.log(`[${stepName}] Retrying in ${delay / 1000}s...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }
  throw new Error(
    `[${stepName}] Failed after ${maxAttempts} attempts: ${lastError.message}`,
  )
}
