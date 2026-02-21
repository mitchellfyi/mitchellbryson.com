import fs from 'fs'
import path from 'path'
import { callClaude } from './lib/anthropic.mjs'
import {
  getExistingArticles,
  getExampleContent,
  getExampleDrafts,
  slugExists,
} from './lib/articles.mjs'
import { generateCoverImage } from './lib/image.mjs'
import { loadPrompt, loadReference, resolvePrompt } from './lib/prompts.mjs'
import { buildSiteMap } from './lib/sitemap.mjs'

const ARTICLES_DIR = path.resolve('src/app/articles')
const pipelineStart = Date.now()

// ── Manifest ────────────────────────────────────────

const manifest = {
  version: '1.0',
  generatedAt: new Date().toISOString(),
  trigger: process.env.GITHUB_EVENT_NAME || 'local',
  runId: process.env.GITHUB_RUN_ID || 'local',
  runUrl: process.env.GITHUB_RUN_ID
    ? `https://github.com/${process.env.GITHUB_REPOSITORY}/actions/runs/${process.env.GITHUB_RUN_ID}`
    : null,
  inputs: {
    topicHint: process.env.TOPIC_HINT || null,
    publishDate: process.env.PUBLISH_DATE || null,
  },
  environment: {
    nodeVersion: process.version,
    platform: process.platform,
    authMethod: process.env.ANTHROPIC_API_KEY ? 'api-key' : 'oauth',
  },
  steps: {},
  article: {},
  files: [],
  totals: {
    inputTokens: 0,
    outputTokens: 0,
    durationMs: 0,
    apiCalls: 0,
  },
  errors: [],
}

function logStep(name, data) {
  manifest.steps[name] = {
    ...data,
    completedAt: new Date().toISOString(),
  }
  if (data.usage) {
    manifest.totals.inputTokens += data.usage.inputTokens || 0
    manifest.totals.outputTokens += data.usage.outputTokens || 0
  }
  if (data.durationMs) {
    manifest.totals.durationMs += data.durationMs
  }
  manifest.totals.apiCalls++
}

function logError(step, error) {
  manifest.errors.push({
    step,
    message: error.message,
    timestamp: new Date().toISOString(),
  })
}

// ── Helpers ─────────────────────────────────────────

function getNextSaturday() {
  const d = new Date()
  const day = d.getDay()
  const daysUntilSat = (6 - day + 7) % 7 || 7
  d.setDate(d.getDate() + daysUntilSat)
  return d.toISOString().split('T')[0]
}

function sanitiseSlug(slug) {
  return slug
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 60)
}

function extractJson(text) {
  try {
    return JSON.parse(text)
  } catch {
    const match = text.match(/```(?:json)?\s*\n?([\s\S]*?)\n?```/)
    if (match) {
      return JSON.parse(match[1].trim())
    }
    throw new Error('Could not extract JSON from response')
  }
}

function writeMetadata(slug, title, date) {
  fs.writeFileSync('/tmp/article-slug.txt', slug)
  fs.writeFileSync('/tmp/article-title.txt', title)
  fs.writeFileSync('/tmp/article-date.txt', date)
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length
}

// ── Main pipeline ───────────────────────────────────

async function main() {
  console.log('╔══════════════════════════════════════════╗')
  console.log('║   Article Generation Pipeline            ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log()
  console.log(`[pipeline] Started at: ${manifest.generatedAt}`)
  console.log(`[pipeline] Trigger: ${manifest.trigger}`)
  console.log(`[pipeline] Run ID: ${manifest.runId}`)
  console.log(`[pipeline] Node: ${process.version}`)
  console.log(`[pipeline] Auth: ${manifest.environment.authMethod}`)
  console.log(`[pipeline] Topic hint: ${process.env.TOPIC_HINT || '(none)'}`)
  console.log()

  // ── Load context ──────────────────────────────────

  console.log('─── Loading context ───────────────────────')

  const styleGuide = loadReference('style-guide.md')
  console.log(`[context] Style guide: ${styleGuide.length} chars`)

  const topicThemes = loadReference('topic-themes.md')
  console.log(`[context] Topic themes: ${topicThemes.length} chars`)

  const existingArticles = getExistingArticles()
  const existingTitles = existingArticles
    .map((a) => `- ${a.title} (${a.slug})`)
    .join('\n')
  console.log(`[context] Existing articles: ${existingArticles.length}`)
  existingArticles.forEach((a) =>
    console.log(`[context]   - ${a.slug}: "${a.title}" (${a.date})`),
  )

  const topicHint = process.env.TOPIC_HINT
    ? `## Topic hint from the user\n\nThe user has suggested this topic direction: "${process.env.TOPIC_HINT}". Use this as a starting point but feel free to refine the angle.`
    : ''

  const publishDate = process.env.PUBLISH_DATE || getNextSaturday()
  console.log(`[context] Publish date: ${publishDate}`)
  console.log()

  // ── Step 1: Research ──────────────────────────────

  console.log('─── Step 1: Research ──────────────────────')
  const researchPrompt = loadPrompt('01-research.md')
  console.log(
    `[step:research] Prompt config: model=${researchPrompt.config.model}, max_tokens=${researchPrompt.config.max_tokens}`,
  )

  const researchText = resolvePrompt(researchPrompt.template, {
    existing_article_titles: existingTitles,
    topic_themes: topicThemes,
    topic_hint: topicHint,
  })
  console.log(`[step:research] Resolved prompt: ${researchText.length} chars`)

  const researchResult = await callClaude({
    model: researchPrompt.config.model,
    maxTokens: researchPrompt.config.max_tokens,
    temperature: researchPrompt.config.temperature,
    tools: researchPrompt.config.tools,
    prompt: researchText,
    stepName: 'research',
  })

  let research
  try {
    research = extractJson(researchResult.text)
    console.log(`[step:research] Parsed JSON successfully`)
    console.log(`[step:research]   topic: ${research.topic}`)
    console.log(`[step:research]   slug: ${research.slug}`)
    console.log(`[step:research]   title: ${research.title}`)
    console.log(`[step:research]   description: ${research.description}`)
    console.log(
      `[step:research]   key_points: ${(research.key_points || []).length}`,
    )
    console.log(`[step:research]   sources: ${(research.sources || []).length}`)
    ;(research.sources || []).forEach((s) =>
      console.log(`[step:research]     - ${s}`),
    )
    console.log(
      `[step:research]   research_summary: ${(research.research_summary || '').length} chars`,
    )
  } catch (err) {
    console.error(`[step:research] JSON parse failed: ${err.message}`)
    console.error(
      `[step:research] Raw response (first 500 chars): ${researchResult.text.slice(0, 500)}`,
    )
    throw err
  }

  logStep('research', {
    status: 'success',
    model: researchResult.model,
    usage: researchResult.usage,
    durationMs: researchResult.durationMs,
    attempts: researchResult.attempts,
    output: {
      topic: research.topic,
      slug: research.slug,
      title: research.title,
      sources: research.sources,
      keyPoints: research.key_points,
      summaryLength: (research.research_summary || '').length,
    },
  })

  // Validate and deduplicate slug
  let slug = sanitiseSlug(research.slug)
  console.log(`[step:research] Sanitised slug: ${slug}`)
  if (slugExists(slug)) {
    const suffix = publishDate.slice(0, 7)
    slug = `${slug}-${suffix}`
    console.log(`[step:research] Slug collision detected, using: ${slug}`)
  }

  const { title, description } = research
  const researchOutput = research.research_summary
  console.log()

  // ── Step 2: Draft ─────────────────────────────────

  console.log('─── Step 2: Draft ─────────────────────────')
  const draftPrompt = loadPrompt('02-draft.md')
  console.log(
    `[step:draft] Prompt config: model=${draftPrompt.config.model}, max_tokens=${draftPrompt.config.max_tokens}`,
  )

  const exampleDrafts = getExampleDrafts(2)
  console.log(
    `[step:draft] Loaded example drafts: ${exampleDrafts.length} chars`,
  )

  const draftText = resolvePrompt(draftPrompt.template, {
    example_draft_excerpt: exampleDrafts,
    style_guide: styleGuide,
    research_output: researchOutput,
    topic: research.topic,
    title: research.title,
  })
  console.log(`[step:draft] Resolved prompt: ${draftText.length} chars`)

  const draftResult = await callClaude({
    model: draftPrompt.config.model,
    maxTokens: draftPrompt.config.max_tokens,
    temperature: draftPrompt.config.temperature,
    prompt: draftText,
    stepName: 'draft',
  })

  const draftContent = draftResult.text
  const draftWords = wordCount(draftContent)
  console.log(
    `[step:draft] Draft: ${draftWords} words, ${draftContent.length} chars`,
  )
  console.log(`[step:draft] First 200 chars: ${draftContent.slice(0, 200)}...`)

  logStep('draft', {
    status: 'success',
    model: draftResult.model,
    usage: draftResult.usage,
    durationMs: draftResult.durationMs,
    attempts: draftResult.attempts,
    output: {
      wordCount: draftWords,
      charCount: draftContent.length,
    },
  })
  console.log()

  // ── Step 3: Polish ────────────────────────────────

  console.log('─── Step 3: Polish ────────────────────────')
  const polishPrompt = loadPrompt('03-polish.md')
  console.log(
    `[step:polish] Prompt config: model=${polishPrompt.config.model}, max_tokens=${polishPrompt.config.max_tokens}`,
  )

  const exampleArticles = getExampleContent(2)
  console.log(
    `[step:polish] Loaded example articles: ${exampleArticles.length} chars`,
  )

  const polishText = resolvePrompt(polishPrompt.template, {
    style_guide: styleGuide,
    example_article_excerpt: exampleArticles,
    draft_content: draftContent,
    research_output: researchOutput,
    title: research.title,
    slug,
    description: research.description,
  })
  console.log(`[step:polish] Resolved prompt: ${polishText.length} chars`)

  const polishResult = await callClaude({
    model: polishPrompt.config.model,
    maxTokens: polishPrompt.config.max_tokens,
    temperature: polishPrompt.config.temperature,
    prompt: polishText,
    stepName: 'polish',
  })

  const articleContent = polishResult.text
  const articleWords = wordCount(articleContent)
  console.log(
    `[step:polish] Article: ${articleWords} words, ${articleContent.length} chars`,
  )
  console.log(
    `[step:polish] First 200 chars: ${articleContent.slice(0, 200)}...`,
  )

  // Check for headers
  const headers = articleContent.match(/^##+ .+/gm) || []
  console.log(`[step:polish] Headers found: ${headers.length}`)
  headers.forEach((h) => console.log(`[step:polish]   ${h}`))

  logStep('polish', {
    status: 'success',
    model: polishResult.model,
    usage: polishResult.usage,
    durationMs: polishResult.durationMs,
    attempts: polishResult.attempts,
    output: {
      wordCount: articleWords,
      charCount: articleContent.length,
      headerCount: headers.length,
      headers,
    },
  })
  console.log()

  // ── Step 4: Internal links ─────────────────────────

  console.log('─── Step 4: Internal Links ────────────────')
  let linkedContent = articleContent
  try {
    const linksPrompt = loadPrompt('05-internal-links.md')
    console.log(
      `[step:links] Prompt config: model=${linksPrompt.config.model}, max_tokens=${linksPrompt.config.max_tokens}`,
    )

    const siteMap = buildSiteMap()
    console.log(`[step:links] Site map: ${siteMap.length} chars`)

    const linksText = resolvePrompt(linksPrompt.template, {
      article_content: articleContent,
      site_map: siteMap,
    })
    console.log(`[step:links] Resolved prompt: ${linksText.length} chars`)

    const linksResult = await callClaude({
      model: linksPrompt.config.model,
      maxTokens: linksPrompt.config.max_tokens,
      temperature: linksPrompt.config.temperature,
      prompt: linksText,
      stepName: 'internal-links',
    })

    linkedContent = linksResult.text.trim()

    // Count links added
    const linkPattern = /\[([^\]]+)\]\(\/[^)]+\)/g
    const linksAdded = [...linkedContent.matchAll(linkPattern)]
    console.log(`[step:links] Links added: ${linksAdded.length}`)
    linksAdded.forEach((m) =>
      console.log(`[step:links]   "${m[1]}" → ${m[0].match(/\(([^)]+)\)/)[1]}`),
    )

    logStep('internalLinks', {
      status: 'success',
      model: linksResult.model,
      usage: linksResult.usage,
      durationMs: linksResult.durationMs,
      attempts: linksResult.attempts,
      output: {
        linksAdded: linksAdded.length,
        links: linksAdded.map((m) => ({
          text: m[1],
          url: m[0].match(/\(([^)]+)\)/)[1],
        })),
      },
    })
  } catch (err) {
    console.error(`[step:links] Failed: ${err.message}`)
    console.warn(`[step:links] Continuing with unlinked article`)
    logError('internalLinks', err)
    logStep('internalLinks', {
      status: 'failed',
      error: err.message,
    })
  }
  console.log()

  // ── Step 5: Image prompt ──────────────────────────

  console.log('─── Step 5: Image Prompt ──────────────────')
  const imagePrompt = loadPrompt('04-image.md')
  console.log(
    `[step:image-prompt] Prompt config: model=${imagePrompt.config.model}, max_tokens=${imagePrompt.config.max_tokens}`,
  )

  const imagePromptText = resolvePrompt(imagePrompt.template, {
    title: research.title,
    description: research.description,
  })
  console.log(
    `[step:image-prompt] Resolved prompt: ${imagePromptText.length} chars`,
  )

  const imagePromptResult = await callClaude({
    model: imagePrompt.config.model,
    maxTokens: imagePrompt.config.max_tokens,
    temperature: imagePrompt.config.temperature,
    prompt: imagePromptText,
    stepName: 'image-prompt',
  })

  const dallePrompt = imagePromptResult.text.trim()
  console.log(
    `[step:image-prompt] DALL-E prompt (${dallePrompt.length} chars):`,
  )
  console.log(`[step:image-prompt]   ${dallePrompt}`)

  logStep('imagePrompt', {
    status: 'success',
    model: imagePromptResult.model,
    usage: imagePromptResult.usage,
    durationMs: imagePromptResult.durationMs,
    attempts: imagePromptResult.attempts,
    output: {
      prompt: dallePrompt,
      charCount: dallePrompt.length,
    },
  })
  console.log()

  // ── Step 6: Generate cover image ──────────────────

  console.log('─── Step 6: Image Generation ──────────────')
  let imageGenerated = false
  let imageMeta = null
  try {
    imageMeta = await generateCoverImage(dallePrompt, slug)
    imageGenerated = true

    logStep('imageGeneration', {
      status: 'success',
      durationMs: imageMeta.generationMs,
      attempts: imageMeta.attempts,
      output: {
        rawSizeBytes: imageMeta.rawSizeBytes,
        finalSizeBytes: imageMeta.finalSizeBytes,
        rawDimensions: imageMeta.rawDimensions,
        finalDimensions: imageMeta.finalDimensions,
        path: imageMeta.path,
      },
    })
  } catch (err) {
    console.error(`[step:image] Failed: ${err.message}`)
    logError('imageGeneration', err)
    logStep('imageGeneration', {
      status: 'failed',
      error: err.message,
    })
  }
  console.log()

  // ── Step 7: Write files ───────────────────────────

  console.log('─── Step 7: Write Files ───────────────────')
  const articleDir = path.join(ARTICLES_DIR, slug)
  fs.mkdirSync(articleDir, { recursive: true })
  console.log(`[step:write] Created directory: ${articleDir}`)

  // Assemble frontmatter
  const escapeYaml = (s) =>
    s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ')
  const frontmatter = `---
author: Mitchell Bryson
date: "${publishDate}"
title: "${escapeYaml(title)}"
description: "${escapeYaml(description)}"
---`

  console.log(`[step:write] Frontmatter:`)
  console.log(
    frontmatter
      .split('\n')
      .map((l) => `[step:write]   ${l}`)
      .join('\n'),
  )

  // Write final article
  const contentPath = path.join(articleDir, 'content.md')
  const contentFull = `${frontmatter}\n\n${linkedContent}\n`
  fs.writeFileSync(contentPath, contentFull)
  console.log(
    `[step:write] Written: ${contentPath} (${contentFull.length} chars)`,
  )
  manifest.files.push({
    path: `src/app/articles/${slug}/content.md`,
    sizeBytes: contentFull.length,
    type: 'article',
  })

  // Write draft
  const draftPath = path.join(articleDir, 'content_draft.md')
  const draftFull = `${draftContent}\n`
  fs.writeFileSync(draftPath, draftFull)
  console.log(`[step:write] Written: ${draftPath} (${draftFull.length} chars)`)
  manifest.files.push({
    path: `src/app/articles/${slug}/content_draft.md`,
    sizeBytes: draftFull.length,
    type: 'draft',
  })

  if (imageGenerated) {
    manifest.files.push({
      path: `public/images/articles/${slug}.png`,
      sizeBytes: imageMeta.finalSizeBytes,
      type: 'cover-image',
    })
  }

  // Write manifest
  manifest.article = {
    slug,
    title,
    description,
    publishDate,
    wordCount: articleWords,
    draftWordCount: draftWords,
    headerCount: headers.length,
    hasImage: imageGenerated,
    dallePrompt: imageGenerated ? dallePrompt : null,
    sources: research.sources || [],
    keyPoints: research.key_points || [],
  }

  manifest.totals.pipelineDurationMs = Date.now() - pipelineStart
  manifest.completedAt = new Date().toISOString()

  const manifestPath = path.join(articleDir, 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`[step:write] Written: ${manifestPath}`)
  manifest.files.push({
    path: `src/app/articles/${slug}/manifest.json`,
    sizeBytes: fs.statSync(manifestPath).size,
    type: 'manifest',
  })

  // Write metadata for the workflow PR step
  writeMetadata(slug, title, publishDate)
  console.log(`[step:write] Written metadata to /tmp/`)

  logStep('write', {
    status: 'success',
    filesWritten: manifest.files.length,
  })
  console.log()

  // ── Step 8: Cross-link existing articles ──────────

  console.log('─── Step 8: Cross-Link Existing Articles ──')
  const crossLinkedArticles = []
  try {
    const crossLinkPrompt = loadPrompt('06-cross-link.md')
    console.log(
      `[step:cross-link] Prompt config: model=${crossLinkPrompt.config.model}, max_tokens=${crossLinkPrompt.config.max_tokens}`,
    )
    console.log(
      `[step:cross-link] Checking ${existingArticles.length} existing articles`,
    )

    for (const article of existingArticles) {
      const articlePath = path.join(ARTICLES_DIR, article.slug, 'content.md')
      const raw = fs.readFileSync(articlePath, 'utf8')

      // Split frontmatter from body
      const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/)
      if (!fmMatch) {
        console.log(
          `[step:cross-link]   ${article.slug}: skipped (no frontmatter)`,
        )
        continue
      }
      const existingFrontmatter = fmMatch[0]
      const existingBody = raw.slice(existingFrontmatter.length).trim()

      // Skip if already links to the new article
      if (existingBody.includes(`/articles/${slug}`)) {
        console.log(
          `[step:cross-link]   ${article.slug}: already links to new article`,
        )
        continue
      }

      const crossLinkText = resolvePrompt(crossLinkPrompt.template, {
        new_title: title,
        new_description: description,
        new_slug: slug,
        existing_content: existingBody,
      })

      const crossLinkResult = await callClaude({
        model: crossLinkPrompt.config.model,
        maxTokens: crossLinkPrompt.config.max_tokens,
        temperature: crossLinkPrompt.config.temperature,
        prompt: crossLinkText,
        stepName: `cross-link:${article.slug}`,
      })

      manifest.totals.inputTokens += crossLinkResult.usage.inputTokens || 0
      manifest.totals.outputTokens += crossLinkResult.usage.outputTokens || 0
      manifest.totals.apiCalls++

      const updatedBody = crossLinkResult.text.trim()

      // Check if any link to the new article was actually added
      if (updatedBody.includes(`/articles/${slug}`)) {
        const updatedFull = `${existingFrontmatter}\n${updatedBody}\n`
        fs.writeFileSync(articlePath, updatedFull)
        crossLinkedArticles.push(article.slug)
        console.log(`[step:cross-link]   ${article.slug}: linked`)
      } else {
        console.log(
          `[step:cross-link]   ${article.slug}: no relevant link found`,
        )
      }
    }

    logStep('crossLink', {
      status: 'success',
      articlesChecked: existingArticles.length,
      articlesUpdated: crossLinkedArticles.length,
      updatedSlugs: crossLinkedArticles,
    })
  } catch (err) {
    console.error(`[step:cross-link] Failed: ${err.message}`)
    logError('crossLink', err)
    logStep('crossLink', {
      status: 'failed',
      error: err.message,
      articlesUpdatedBeforeFailure: crossLinkedArticles.length,
      updatedSlugs: crossLinkedArticles,
    })
  }
  console.log()

  // ── Summary ───────────────────────────────────────

  console.log('╔══════════════════════════════════════════╗')
  console.log('║   Pipeline Complete                      ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log()
  console.log(`  Slug:           ${slug}`)
  console.log(`  Title:          ${title}`)
  console.log(`  Description:    ${description}`)
  console.log(`  Publish date:   ${publishDate}`)
  console.log(`  Draft:          ${draftWords} words`)
  console.log(`  Article:        ${articleWords} words`)
  console.log(`  Headers:        ${headers.length}`)
  console.log(`  Cover image:    ${imageGenerated ? 'yes' : 'no (skipped)'}`)
  console.log(`  Files written:  ${manifest.files.length}`)
  console.log(`  API calls:      ${manifest.totals.apiCalls}`)
  console.log(
    `  Tokens (in):    ${manifest.totals.inputTokens.toLocaleString()}`,
  )
  console.log(
    `  Tokens (out):   ${manifest.totals.outputTokens.toLocaleString()}`,
  )
  console.log(
    `  Total duration: ${(manifest.totals.pipelineDurationMs / 1000).toFixed(1)}s`,
  )
  console.log(`  Errors:         ${manifest.errors.length}`)
  console.log(
    `  Cross-linked:   ${crossLinkedArticles.length} existing articles`,
  )
  crossLinkedArticles.forEach((s) => console.log(`    - ${s}`))
  console.log()
  console.log(`  Sources:`)
  ;(research.sources || []).forEach((s) => console.log(`    - ${s}`))
  console.log()

  // Write cross-linked article paths for the workflow to stage
  if (crossLinkedArticles.length > 0) {
    const paths = crossLinkedArticles
      .map((s) => `src/app/articles/${s}/content.md`)
      .join('\n')
    fs.writeFileSync('/tmp/cross-linked-articles.txt', paths)
    console.log(
      `[pipeline] Cross-linked article paths written to /tmp/cross-linked-articles.txt`,
    )
  }
}

main().catch((err) => {
  manifest.totals.pipelineDurationMs = Date.now() - pipelineStart
  manifest.completedAt = new Date().toISOString()
  manifest.fatalError = err.message

  // Try to write partial manifest even on failure
  try {
    fs.mkdirSync('/tmp/article-generation', { recursive: true })
    fs.writeFileSync(
      '/tmp/article-generation/manifest.json',
      JSON.stringify(manifest, null, 2),
    )
    console.error(
      `[pipeline] Partial manifest written to /tmp/article-generation/manifest.json`,
    )
  } catch {
    // ignore
  }

  console.error(`[pipeline] Fatal error: ${err.message}`)
  console.error(err.stack)
  process.exit(1)
})
