const API_URL = 'https://api.anthropic.com/v1/messages'

// Prefer API key (works everywhere); fall back to OAuth token (Claude Code Action only)
const API_KEY = process.env.ANTHROPIC_API_KEY
const OAUTH_TOKEN = !API_KEY ? process.env.CLAUDE_CODE_OAUTH_TOKEN : null

if (!API_KEY && !OAUTH_TOKEN) {
  throw new Error(
    'ANTHROPIC_API_KEY or CLAUDE_CODE_OAUTH_TOKEN environment variable is required',
  )
}

const AUTH_METHOD = API_KEY ? 'api-key' : 'oauth'
console.log(`[anthropic] Auth method: ${AUTH_METHOD}`)
console.log(`[anthropic] Token present: ${!!(OAUTH_TOKEN || API_KEY)}`)

/**
 * Call the Anthropic Messages API with retry logic.
 * Returns { text, usage, model, stopReason } for manifest tracking.
 */
export async function callClaude({
  model,
  maxTokens,
  temperature = 1.0,
  tools,
  prompt,
  stepName = 'unknown',
}) {
  const body = {
    model,
    max_tokens: maxTokens,
    temperature,
    messages: [{ role: 'user', content: prompt }],
  }

  if (tools && tools.length > 0) {
    body.tools = tools.map((t) => {
      if (typeof t === 'string') {
        if (t === 'web_search') return { type: 'web_search_20250305' }
        return { type: t }
      }
      return t
    })
  }

  console.log(`[anthropic] [${stepName}] Calling ${model}`)
  console.log(`[anthropic] [${stepName}]   max_tokens: ${maxTokens}`)
  console.log(`[anthropic] [${stepName}]   temperature: ${temperature}`)
  console.log(
    `[anthropic] [${stepName}]   tools: ${tools ? tools.join(', ') : 'none'}`,
  )
  console.log(
    `[anthropic] [${stepName}]   prompt length: ${prompt.length} chars`,
  )

  let lastError
  for (let attempt = 1; attempt <= 3; attempt++) {
    const startTime = Date.now()
    try {
      console.log(`[anthropic] [${stepName}] Attempt ${attempt}/3...`)

      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'anthropic-version': '2023-06-01',
          ...(OAUTH_TOKEN
            ? { Authorization: `Bearer ${OAUTH_TOKEN}` }
            : { 'x-api-key': API_KEY }),
        },
        body: JSON.stringify(body),
      })

      const elapsed = Date.now() - startTime
      console.log(
        `[anthropic] [${stepName}] Response: ${response.status} (${elapsed}ms)`,
      )

      if (!response.ok) {
        const errorText = await response.text()
        console.error(
          `[anthropic] [${stepName}] Error body: ${errorText.slice(0, 500)}`,
        )
        throw new Error(`Anthropic API ${response.status}: ${errorText}`)
      }

      const data = await response.json()

      // Log usage info
      const usage = data.usage || {}
      console.log(
        `[anthropic] [${stepName}] Usage: ${usage.input_tokens || '?'} in / ${usage.output_tokens || '?'} out`,
      )
      console.log(
        `[anthropic] [${stepName}] Stop reason: ${data.stop_reason || 'unknown'}`,
      )
      console.log(`[anthropic] [${stepName}] Model: ${data.model || model}`)

      // Log content block types
      const blockTypes = (data.content || []).map((b) => b.type)
      console.log(
        `[anthropic] [${stepName}] Content blocks: [${blockTypes.join(', ')}]`,
      )

      const text = extractText(data)
      console.log(
        `[anthropic] [${stepName}] Extracted text: ${text.length} chars`,
      )

      return {
        text,
        usage: {
          inputTokens: usage.input_tokens || 0,
          outputTokens: usage.output_tokens || 0,
        },
        model: data.model || model,
        stopReason: data.stop_reason || 'unknown',
        durationMs: elapsed,
        attempts: attempt,
      }
    } catch (err) {
      const elapsed = Date.now() - startTime
      lastError = err
      console.error(
        `[anthropic] [${stepName}] Attempt ${attempt}/3 failed (${elapsed}ms): ${err.message}`,
      )
      if (attempt < 3) {
        const delay = Math.pow(2, attempt) * 1000
        console.log(`[anthropic] [${stepName}] Retrying in ${delay / 1000}s...`)
        await sleep(delay)
      }
    }
  }

  throw new Error(
    `[${stepName}] Anthropic API failed after 3 attempts: ${lastError.message}`,
  )
}

/**
 * Extract the text content from an Anthropic API response.
 */
function extractText(response) {
  const textBlocks = (response.content || []).filter(
    (block) => block.type === 'text',
  )
  if (textBlocks.length > 0) {
    return textBlocks.map((b) => b.text).join('\n')
  }
  console.warn('[anthropic] No text blocks found in response')
  return ''
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
