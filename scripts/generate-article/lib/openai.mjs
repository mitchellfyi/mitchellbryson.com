const API_URL = 'https://api.openai.com/v1/images/generations'
const API_KEY = process.env.OPENAI_API_KEY

/**
 * Generate an image using OpenAI DALL-E / gpt-image-1.
 * Returns { buffer, durationMs, attempts } for manifest tracking.
 */
export async function generateImage(prompt) {
  if (!API_KEY) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }

  console.log(`[openai] Generating image with gpt-image-1`)
  console.log(`[openai]   prompt length: ${prompt.length} chars`)
  console.log(`[openai]   prompt: ${prompt.slice(0, 150)}...`)
  console.log(`[openai]   size: 1536x1024, quality: medium`)

  let lastError
  for (let attempt = 1; attempt <= 3; attempt++) {
    const startTime = Date.now()
    try {
      console.log(`[openai] Attempt ${attempt}/3...`)

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${API_KEY}`,
        },
        body: JSON.stringify({
          model: 'gpt-image-1',
          prompt,
          n: 1,
          size: '1536x1024',
          quality: 'medium',
        }),
      })

      const elapsed = Date.now() - startTime
      console.log(`[openai] Response: ${response.status} (${elapsed}ms)`)

      if (!response.ok) {
        const errorText = await response.text()
        console.error(`[openai] Error body: ${errorText.slice(0, 500)}`)
        throw new Error(`OpenAI API ${response.status}: ${errorText}`)
      }

      const data = await response.json()
      const b64 = data.data[0].b64_json
      const buffer = Buffer.from(b64, 'base64')

      console.log(
        `[openai] Image generated: ${buffer.length} bytes (${elapsed}ms)`,
      )

      return { buffer, durationMs: elapsed, attempts: attempt }
    } catch (err) {
      const elapsed = Date.now() - startTime
      lastError = err
      console.error(
        `[openai] Attempt ${attempt}/3 failed (${elapsed}ms): ${err.message}`,
      )
      if (attempt < 3) {
        const delay = Math.pow(2, attempt) * 1000
        console.log(`[openai] Retrying in ${delay / 1000}s...`)
        await new Promise((resolve) => setTimeout(resolve, delay))
      }
    }
  }

  throw lastError
}
