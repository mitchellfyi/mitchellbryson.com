/**
 * Reads the manifest and PR body template, renders the template with values,
 * and writes the result to /tmp/pr-body.md for the workflow to use.
 *
 * Usage: node scripts/generate-news/render-pr-body.mjs <digest-slug>
 */
import fs from 'fs'
import path from 'path'

const digestSlug = process.argv[2]
if (!digestSlug) {
  console.error('Usage: render-pr-body.mjs <digest-slug>')
  process.exit(1)
}

const manifestPath = path.resolve(`src/app/news/${digestSlug}/manifest.json`)
const templatePath = path.resolve('scripts/generate-news/templates/pr-body.md')

console.log(`[render-pr] Digest slug: ${digestSlug}`)
console.log(`[render-pr] Manifest: ${manifestPath}`)
console.log(`[render-pr] Template: ${templatePath}`)

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
const template = fs.readFileSync(templatePath, 'utf8')

const itemsList =
  manifest.items
    .map(
      (item) =>
        `- **[${item.type}]** \`${item.slug}\` — ${item.title}${item.sourceName ? ` (via ${item.sourceName})` : ''}`,
    )
    .join('\n') || '(none)'

const filesList =
  manifest.files.map((f) => `- \`${f.path}\` (${f.type})`).join('\n') ||
  '(none)'

const runUrl =
  manifest.runUrl ||
  `https://github.com/${process.env.GITHUB_REPOSITORY || ''}/actions`

const today = manifest.items[0]?.slug
  ? manifest.generatedAt.split('T')[0]
  : new Date().toISOString().split('T')[0]

const vars = {
  DATE: today,
  ITEMS_LIST: itemsList,
  FILES_LIST: filesList,
  API_CALLS: String(manifest.totals.apiCalls),
  TOKENS_IN: String(manifest.totals.inputTokens),
  TOKENS_OUT: String(manifest.totals.outputTokens),
  DURATION: (manifest.totals.pipelineDurationMs / 1000).toFixed(1),
  ERRORS: String(manifest.errors.length),
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
