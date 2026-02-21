/**
 * Reads the manifest and PR body template, renders the template with values,
 * and writes the result to /tmp/pr-body.md for the workflow to use.
 *
 * Usage: node scripts/generate-article/render-pr-body.mjs <slug>
 */
import fs from 'fs'
import path from 'path'

const slug = process.argv[2]
if (!slug) {
  console.error('Usage: render-pr-body.mjs <slug>')
  process.exit(1)
}

const manifestPath = path.resolve(`src/app/articles/${slug}/manifest.json`)
const templatePath = path.resolve(
  'scripts/generate-article/templates/pr-body.md',
)

console.log(`[render-pr] Slug: ${slug}`)
console.log(`[render-pr] Manifest: ${manifestPath}`)
console.log(`[render-pr] Template: ${templatePath}`)

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const template = fs.readFileSync(templatePath, 'utf8')

const sources =
  (manifest.article.sources || []).map((s) => `- ${s}`).join('\n') || '(none)'

const runUrl =
  manifest.runUrl ||
  `https://github.com/${process.env.GITHUB_REPOSITORY || ''}/actions`

const crossLinkStep = manifest.steps.crossLink || {}
const crossLinked =
  (crossLinkStep.updatedSlugs || []).map((s) => `- \`${s}\``).join('\n') ||
  '(none)'

const vars = {
  TITLE: manifest.article.title,
  SLUG: manifest.article.slug,
  DATE: manifest.article.publishDate,
  WORDS: String(manifest.article.wordCount),
  DRAFT_WORDS: String(manifest.article.draftWordCount),
  IMAGE_STATUS: manifest.article.hasImage ? 'Generated' : 'Not generated',
  API_CALLS: String(manifest.totals.apiCalls),
  TOKENS_IN: String(manifest.totals.inputTokens),
  TOKENS_OUT: String(manifest.totals.outputTokens),
  DURATION: (manifest.totals.pipelineDurationMs / 1000).toFixed(1),
  ERRORS: String(manifest.errors.length),
  SOURCES: sources,
  CROSS_LINKED: crossLinked,
  RUN_URL: runUrl,
}

let body = template
for (const [key, value] of Object.entries(vars)) {
  body = body.replaceAll(`{{${key}}}`, value)
}

const outputPath = '/tmp/pr-body.md'
fs.writeFileSync(outputPath, body)
console.log(`[render-pr] Written: ${outputPath} (${body.length} chars)`)
console.log(`[render-pr] Preview:\n${body.slice(0, 300)}...`)
