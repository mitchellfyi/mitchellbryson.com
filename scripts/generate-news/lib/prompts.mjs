import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const PROMPTS_DIR = path.resolve('prompts/news-generation')

/**
 * Load a prompt file and parse its YAML frontmatter config + template body.
 */
export function loadPrompt(filename) {
  const filePath = path.join(PROMPTS_DIR, filename)
  const raw = fs.readFileSync(filePath, 'utf8')
  const { data: config, content: template } = matter(raw)
  return { config, template: template.trim() }
}

/**
 * Load a static reference file (no frontmatter parsing, just raw content).
 */
export function loadReference(filename) {
  const filePath = path.join(PROMPTS_DIR, filename)
  return fs.readFileSync(filePath, 'utf8').trim()
}

/**
 * Replace all {{variable}} placeholders in a template with provided values.
 */
export { resolvePrompt } from '../../generate-article/lib/prompts.mjs'
