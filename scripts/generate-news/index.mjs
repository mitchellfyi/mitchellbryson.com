import fs from 'fs'
import path from 'path'
import { callClaude } from './lib/anthropic.mjs'
import { getExistingNews, getRecentSourceLinks, slugExists } from './lib/news.mjs'
import { loadPrompt, loadReference } from './lib/prompts.mjs'
import { resolvePrompt } from '../../scripts/generate-article/lib/prompts.mjs'
import { fetchOgImage } from './lib/og-image.mjs'
import { buildSiteMap } from '../generate-article/lib/sitemap.mjs'
import { getExistingArticles } from '../generate-article/lib/articles.mjs'

const NEWS_DIR = path.resolve('src/app/news')
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
  environment: {
    nodeVersion: process.version,
    platform: process.platform,
    authMethod: process.env.ANTHROPIC_API_KEY ? 'api-key' : 'oauth',
  },
  steps: {},
  items: [],
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

function getToday() {
  return new Date().toISOString().split('T')[0]
}

function formatTodayLong() {
  return new Date().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
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

function writeMetadata(slugs, titles) {
  fs.writeFileSync('/tmp/news-slugs.txt', slugs.join('\n'))
  fs.writeFileSync('/tmp/news-titles.txt', titles.join('\n'))
  fs.writeFileSync('/tmp/news-date.txt', getToday())
}

function escapeYaml(s) {
  return s.replace(/\\/g, '\\\\').replace(/"/g, '\\"').replace(/\n/g, ' ')
}

function wordCount(text) {
  return text.split(/\s+/).filter(Boolean).length
}

// ── Main pipeline ───────────────────────────────────

async function main() {
  const today = getToday()
  const mode = process.env.NEWS_MODE || 'editorial'
  const includeDigest = mode === 'digest'

  console.log('╔══════════════════════════════════════════╗')
  console.log('║   News Generation Pipeline               ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log()
  console.log(`[pipeline] Started at: ${manifest.generatedAt}`)
  console.log(`[pipeline] Date: ${today}`)
  console.log(`[pipeline] Mode: ${mode}${includeDigest ? ' (digest + editorial)' : ' (editorial only)'}`)
  console.log(`[pipeline] Trigger: ${manifest.trigger}`)
  console.log(`[pipeline] Auth: ${manifest.environment.authMethod}`)
  console.log()

  // ── Load context ──────────────────────────────────

  console.log('─── Loading context ───────────────────────')

  const sourcesRaw = fs.readFileSync(
    path.resolve('scripts/generate-news/sources.json'),
    'utf8',
  )
  const sources = JSON.parse(sourcesRaw)
  const sourcesFormatted = sources.categories
    .map(
      (cat) =>
        `### ${cat.name}\n${cat.sources.map((s) => `- ${s.name} (${s.domain}): search "${s.searchQuery}"`).join('\n')}`,
    )
    .join('\n\n')
  console.log(
    `[context] Sources: ${sources.categories.length} categories, ${sources.categories.reduce((n, c) => n + c.sources.length, 0)} sources`,
  )

  const styleGuide = loadReference('style-guide.md')
  console.log(`[context] Style guide: ${styleGuide.length} chars`)

  const existingNews = getExistingNews()
  const existingNewsList = existingNews
    .map((n) => `- ${n.title} (${n.slug}, ${n.date})`)
    .join('\n')
  console.log(`[context] Existing news items: ${existingNews.length}`)
  console.log()

  // ── Step 1: Research ──────────────────────────────

  console.log('─── Step 1: Research ──────────────────────')
  const researchPrompt = loadPrompt('01-research.md')
  console.log(
    `[step:research] Prompt config: model=${researchPrompt.config.model}, max_tokens=${researchPrompt.config.max_tokens}`,
  )

  const researchText = resolvePrompt(researchPrompt.template, {
    sources: sourcesFormatted,
    existing_news: existingNewsList || '(none)',
    today,
    today_formatted: formatTodayLong(),
    today_slug: today,
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
    console.log(`[step:research]   Stories: ${research.stories.length}`)
    console.log(
      `[step:research]   Editorial picks: ${research.editorialPicks.length}`,
    )
    research.stories.forEach((s, i) => {
      const isEditorial = research.editorialPicks.includes(i)
      console.log(
        `[step:research]   ${isEditorial ? '★' : ' '} [${i}] ${s.headline} (${s.sourceName})`,
      )
    })
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
      storyCount: research.stories.length,
      editorialPicks: research.editorialPicks,
    },
  })
  console.log()

  // ── Step 2: Write digest (Friday only) ──────────────

  let digestSlug = null
  if (includeDigest) {
    console.log('─── Step 2: Write Weekly Digest ────────────')
    digestSlug = sanitiseSlug(research.digestSlug || `digest-${today}`)
    const digestTitle = research.digestTitle || `AI News Roundup — ${formatTodayLong()}`

    // Gather source links from the past 7 days (up to 15)
    const weeklyLinks = getRecentSourceLinks(7, 15)
    console.log(`[step:digest] Found ${weeklyLinks.length} links from the past 7 days`)

    // Also include today's freshly researched stories (dedup against existing)
    const existingUrls = new Set(weeklyLinks.map((l) => l.url))
    const freshStories = research.stories.filter((s) => !existingUrls.has(s.url))
    const allDigestStories = [
      ...weeklyLinks.map((l) => ({
        headline: l.headline,
        url: l.url,
        sourceName: l.sourceName,
        category: 'This Week',
        description: '',
      })),
      ...freshStories.map((s) => ({
        headline: s.headline,
        url: s.url,
        sourceName: s.sourceName,
        category: s.category,
        description: s.description,
      })),
    ].slice(0, 15)

    console.log(`[step:digest] Total stories for digest: ${allDigestStories.length}`)

    const storiesForPrompt = allDigestStories
      .map(
        (s, i) =>
          `${i + 1}. **${s.headline}** — ${s.sourceName}${s.description ? `\n   URL: ${s.url}\n   ${s.description}` : `\n   URL: ${s.url}`}`,
      )
      .join('\n\n')

    const digestPrompt = loadPrompt('03-write-digest.md')
    console.log(
      `[step:digest] Prompt config: model=${digestPrompt.config.model}, max_tokens=${digestPrompt.config.max_tokens}`,
    )

    const digestPromptText = resolvePrompt(digestPrompt.template, {
      stories: storiesForPrompt,
      style_guide: styleGuide,
    })

    const digestResult = await callClaude({
      model: digestPrompt.config.model,
      maxTokens: digestPrompt.config.max_tokens,
      temperature: digestPrompt.config.temperature,
      prompt: digestPromptText,
      stepName: 'digest',
    })

    const digestBody = digestResult.text.trim()
    const digestWords = wordCount(digestBody)
    console.log(`[step:digest] Digest: ${digestWords} words`)

    // Build sources YAML array from the weekly stories
    const sourcesYaml = allDigestStories
      .map(
        (s) =>
          `  - headline: "${escapeYaml(s.headline)}"\n    url: "${s.url}"\n    sourceName: "${escapeYaml(s.sourceName)}"`,
      )
      .join('\n')

    const digestFrontmatter = `---
author: Mitchell Bryson
date: "${today}"
title: "${escapeYaml(digestTitle)}"
description: "This week's top AI news, product launches, and trending repos"
type: digest
sources:
${sourcesYaml}
---`

    const digestDir = path.join(NEWS_DIR, digestSlug)
    fs.mkdirSync(digestDir, { recursive: true })
    const digestContent = `${digestFrontmatter}\n\n${digestBody}\n`
    fs.writeFileSync(path.join(digestDir, 'content.md'), digestContent)
    console.log(`[step:digest] Written: ${digestSlug}/content.md (${digestContent.length} chars)`)
    manifest.files.push({
      path: `src/app/news/${digestSlug}/content.md`,
      type: 'digest',
    })
    manifest.items.push({
      slug: digestSlug,
      title: digestTitle,
      type: 'digest',
    })

    allSlugs.push(digestSlug)
    allTitles.push(digestTitle)

    logStep('digest', {
      status: 'success',
      model: digestResult.model,
      usage: digestResult.usage,
      durationMs: digestResult.durationMs,
      attempts: digestResult.attempts,
      output: {
        slug: digestSlug,
        title: digestTitle,
        storyCount: research.stories.length,
        wordCount: digestWords,
      },
    })
    console.log()
  } else {
    console.log('─── Step 2: Skipped (digest is Friday only) ─')
    console.log()
  }

  // ── Step 3: Write editorial ───────────────────────

  console.log('─── Step 3: Write Editorials ──────────────')
  const editorialPrompt = loadPrompt('02-write-editorial.md')
  const allSlugs = []
  const allTitles = []

  for (const pickIndex of research.editorialPicks) {
    const story = research.stories[pickIndex]
    if (!story) {
      console.warn(`[step:editorial] Invalid pick index: ${pickIndex}`)
      continue
    }

    console.log(
      `[step:editorial] Writing editorial for: ${story.headline}`,
    )

    let editorialSlug = sanitiseSlug(story.slug || story.headline)
    if (slugExists(editorialSlug)) {
      editorialSlug = `${editorialSlug}-${today}`
      console.log(
        `[step:editorial] Slug collision, using: ${editorialSlug}`,
      )
    }

    // Write editorial content
    const editorialText = resolvePrompt(editorialPrompt.template, {
      headline: story.headline,
      source_name: story.sourceName,
      source_url: story.url,
      description: story.description,
      key_points: (story.key_points || []).map((p) => `- ${p}`).join('\n'),
      style_guide: styleGuide,
    })

    const editorialResult = await callClaude({
      model: editorialPrompt.config.model,
      maxTokens: editorialPrompt.config.max_tokens,
      temperature: editorialPrompt.config.temperature,
      prompt: editorialText,
      stepName: `editorial:${editorialSlug}`,
    })

    let editorialContent = editorialResult.text.trim()
    const words = wordCount(editorialContent)
    console.log(
      `[step:editorial] ${editorialSlug}: ${words} words`,
    )

    logStep(`editorial:${editorialSlug}`, {
      status: 'success',
      model: editorialResult.model,
      usage: editorialResult.usage,
      durationMs: editorialResult.durationMs,
      attempts: editorialResult.attempts,
      output: { wordCount: words },
    })

    // Add internal links to the editorial
    try {
      const linksPrompt = loadPrompt('04-internal-links.md')
      const siteMap = buildSiteMap()
      console.log(`[step:links] Adding internal links to ${editorialSlug}`)

      const linksText = resolvePrompt(linksPrompt.template, {
        article_content: editorialContent,
        site_map: siteMap,
      })

      const linksResult = await callClaude({
        model: linksPrompt.config.model,
        maxTokens: linksPrompt.config.max_tokens,
        temperature: linksPrompt.config.temperature,
        prompt: linksText,
        stepName: `links:${editorialSlug}`,
      })

      editorialContent = linksResult.text.trim()

      const linkPattern = /\[([^\]]+)\]\(\/[^)]+\)/g
      const linksAdded = [...editorialContent.matchAll(linkPattern)]
      console.log(`[step:links] ${editorialSlug}: ${linksAdded.length} internal links added`)
      linksAdded.forEach((m) =>
        console.log(`[step:links]   "${m[1]}" → ${m[0].match(/\(([^)]+)\)/)[1]}`),
      )

      logStep(`links:${editorialSlug}`, {
        status: 'success',
        model: linksResult.model,
        usage: linksResult.usage,
        durationMs: linksResult.durationMs,
        output: {
          linksAdded: linksAdded.length,
          links: linksAdded.map((m) => ({
            text: m[1],
            url: m[0].match(/\(([^)]+)\)/)[1],
          })),
        },
      })
    } catch (err) {
      console.warn(`[step:links] ${editorialSlug}: failed (${err.message}), continuing without links`)
      logError(`links:${editorialSlug}`, err)
    }

    // Fetch OG image
    let ogImagePath = null
    try {
      ogImagePath = await fetchOgImage(story.url, editorialSlug)
    } catch (err) {
      console.warn(
        `[step:editorial] OG image fetch failed: ${err.message}`,
      )
      logError(`og-image:${editorialSlug}`, err)
    }

    // Generate editorial title from Claude's content or use headline
    const editorialTitle = story.headline

    // Assemble frontmatter
    const ogImageLine = ogImagePath
      ? `\nogImage: "${ogImagePath}"`
      : ''
    const editorialFrontmatter = `---
author: Mitchell Bryson
date: "${today}"
title: "${escapeYaml(editorialTitle)}"
description: "${escapeYaml(story.description)}"
type: editorial
sourceUrl: "${story.url}"
sourceTitle: "${escapeYaml(story.sourceName)}"
sourceHeadline: "${escapeYaml(story.headline)}"
sourceDescription: "${escapeYaml(story.description)}"${ogImageLine}
---`

    const editorialDir = path.join(NEWS_DIR, editorialSlug)
    fs.mkdirSync(editorialDir, { recursive: true })
    const editorialFull = `${editorialFrontmatter}\n\n${editorialContent}\n`
    fs.writeFileSync(
      path.join(editorialDir, 'content.md'),
      editorialFull,
    )
    console.log(
      `[step:editorial] Written: ${editorialSlug}/content.md (${editorialFull.length} chars)`,
    )

    manifest.files.push({
      path: `src/app/news/${editorialSlug}/content.md`,
      type: 'editorial',
    })
    if (ogImagePath) {
      manifest.files.push({
        path: `public/images/news/${editorialSlug}.webp`,
        type: 'og-image',
      })
    }
    manifest.items.push({
      slug: editorialSlug,
      title: editorialTitle,
      type: 'editorial',
      sourceUrl: story.url,
      sourceName: story.sourceName,
      hasImage: !!ogImagePath,
    })

    allSlugs.push(editorialSlug)
    allTitles.push(editorialTitle)
  }
  console.log()

  // ── Save daily source links ───────────────────────

  console.log('─── Save Daily Links ──────────────────────')
  const editorialUrls = new Set(
    manifest.items.filter((i) => i.type === 'editorial').map((i) => i.sourceUrl),
  )
  const nonEditorialStories = research.stories.filter((s) => !editorialUrls.has(s.url))

  if (nonEditorialStories.length > 0) {
    const linksSlug = `links-${today}`
    const linksSourcesYaml = nonEditorialStories
      .map(
        (s) =>
          `  - headline: "${escapeYaml(s.headline)}"\n    url: "${s.url}"\n    sourceName: "${escapeYaml(s.sourceName)}"`,
      )
      .join('\n')

    const linksFrontmatter = `---
date: "${today}"
type: links
sources:
${linksSourcesYaml}
---`

    const linksDir = path.join(NEWS_DIR, linksSlug)
    fs.mkdirSync(linksDir, { recursive: true })
    const linksContent = `${linksFrontmatter}\n`
    fs.writeFileSync(path.join(linksDir, 'content.md'), linksContent)
    console.log(`[links] Written: ${linksSlug}/content.md (${nonEditorialStories.length} links)`)
    manifest.files.push({
      path: `src/app/news/${linksSlug}/content.md`,
      type: 'links',
    })
    allSlugs.push(linksSlug)
    allTitles.push(`Links ${today}`)
  } else {
    console.log(`[links] No non-editorial stories to save`)
  }
  console.log()

  // ── Step 4: Cross-link existing content ─────────────

  console.log('─── Step 4: Cross-Link Existing Content ───')
  const crossLinkedPaths = []
  const editorialItems = manifest.items.filter((i) => i.type === 'editorial')

  if (editorialItems.length > 0) {
    try {
      const crossLinkPrompt = loadPrompt('05-cross-link.md')
      console.log(
        `[step:cross-link] Prompt config: model=${crossLinkPrompt.config.model}`,
      )

      // Gather all existing articles and news items to check
      const existingArticles = getExistingArticles()
      console.log(
        `[step:cross-link] Checking ${existingArticles.length} articles + ${existingNews.length} news items`,
      )

      for (const editorial of editorialItems) {
        console.log(
          `[step:cross-link] Cross-linking for: ${editorial.slug}`,
        )

        // Check existing articles
        for (const article of existingArticles) {
          const articlePath = path.join(ARTICLES_DIR, article.slug, 'content.md')
          const raw = fs.readFileSync(articlePath, 'utf8')

          const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/)
          if (!fmMatch) continue
          const existingFrontmatter = fmMatch[0]
          const existingBody = raw.slice(existingFrontmatter.length).trim()

          if (existingBody.includes(`/news/${editorial.slug}`)) {
            console.log(
              `[step:cross-link]   ${article.slug}: already links to editorial`,
            )
            continue
          }

          const crossLinkText = resolvePrompt(crossLinkPrompt.template, {
            new_title: editorial.title,
            new_description: editorial.sourceUrl
              ? `Commentary on "${editorial.title}" from ${editorial.sourceName}`
              : editorial.title,
            new_slug: editorial.slug,
            existing_content: existingBody,
          })

          const crossLinkResult = await callClaude({
            model: crossLinkPrompt.config.model,
            maxTokens: crossLinkPrompt.config.max_tokens,
            temperature: crossLinkPrompt.config.temperature,
            prompt: crossLinkText,
            stepName: `cross-link:${article.slug}→${editorial.slug}`,
          })

          manifest.totals.inputTokens += crossLinkResult.usage.inputTokens || 0
          manifest.totals.outputTokens += crossLinkResult.usage.outputTokens || 0
          manifest.totals.apiCalls++

          const updatedBody = crossLinkResult.text.trim()

          if (updatedBody.includes(`/news/${editorial.slug}`)) {
            const updatedFull = `${existingFrontmatter}\n${updatedBody}\n`
            fs.writeFileSync(articlePath, updatedFull)
            crossLinkedPaths.push(`src/app/articles/${article.slug}/content.md`)
            console.log(`[step:cross-link]   ${article.slug}: linked`)
          } else {
            console.log(
              `[step:cross-link]   ${article.slug}: no relevant link found`,
            )
          }
        }

        // Check existing news editorials (not the ones just created)
        for (const newsItem of existingNews) {
          if (newsItem.type !== 'editorial') continue
          const newsPath = path.join(NEWS_DIR, newsItem.slug, 'content.md')
          if (!fs.existsSync(newsPath)) continue

          const raw = fs.readFileSync(newsPath, 'utf8')
          const fmMatch = raw.match(/^---\n([\s\S]*?)\n---\n/)
          if (!fmMatch) continue
          const existingFrontmatter = fmMatch[0]
          const existingBody = raw.slice(existingFrontmatter.length).trim()

          if (existingBody.includes(`/news/${editorial.slug}`)) continue

          const crossLinkText = resolvePrompt(crossLinkPrompt.template, {
            new_title: editorial.title,
            new_description: editorial.sourceUrl
              ? `Commentary on "${editorial.title}" from ${editorial.sourceName}`
              : editorial.title,
            new_slug: editorial.slug,
            existing_content: existingBody,
          })

          const crossLinkResult = await callClaude({
            model: crossLinkPrompt.config.model,
            maxTokens: crossLinkPrompt.config.max_tokens,
            temperature: crossLinkPrompt.config.temperature,
            prompt: crossLinkText,
            stepName: `cross-link:${newsItem.slug}→${editorial.slug}`,
          })

          manifest.totals.inputTokens += crossLinkResult.usage.inputTokens || 0
          manifest.totals.outputTokens += crossLinkResult.usage.outputTokens || 0
          manifest.totals.apiCalls++

          const updatedBody = crossLinkResult.text.trim()

          if (updatedBody.includes(`/news/${editorial.slug}`)) {
            const updatedFull = `${existingFrontmatter}\n${updatedBody}\n`
            fs.writeFileSync(newsPath, updatedFull)
            crossLinkedPaths.push(`src/app/news/${newsItem.slug}/content.md`)
            console.log(`[step:cross-link]   ${newsItem.slug}: linked`)
          } else {
            console.log(
              `[step:cross-link]   ${newsItem.slug}: no relevant link found`,
            )
          }
        }
      }

      logStep('crossLink', {
        status: 'success',
        editorialsChecked: editorialItems.length,
        contentUpdated: crossLinkedPaths.length,
        updatedPaths: crossLinkedPaths,
      })
    } catch (err) {
      console.error(`[step:cross-link] Failed: ${err.message}`)
      logError('crossLink', err)
      logStep('crossLink', {
        status: 'failed',
        error: err.message,
        updatedBeforeFailure: crossLinkedPaths.length,
      })
    }
  } else {
    console.log(`[step:cross-link] No editorials to cross-link`)
  }
  console.log()

  // ── Write manifest and metadata ───────────────────

  console.log('─── Writing Manifest ──────────────────────')
  manifest.totals.pipelineDurationMs = Date.now() - pipelineStart
  manifest.completedAt = new Date().toISOString()

  // Write manifest into the first item's directory
  const manifestDir = path.join(NEWS_DIR, allSlugs[0])
  const manifestPath = path.join(manifestDir, 'manifest.json')
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2))
  console.log(`[manifest] Written: ${manifestPath}`)

  // Write metadata for the workflow PR step
  writeMetadata(allSlugs, allTitles)
  console.log(`[manifest] Written metadata to /tmp/`)
  console.log()

  // ── Summary ───────────────────────────────────────

  console.log('╔══════════════════════════════════════════╗')
  console.log('║   Pipeline Complete                      ║')
  console.log('╚══════════════════════════════════════════╝')
  console.log()
  console.log(`  Date:           ${today}`)
  console.log(`  Mode:           ${mode}`)
  console.log(`  Digest:         ${digestSlug || '(skipped)'}`)
  console.log(
    `  Editorials:     ${manifest.items.filter((i) => i.type === 'editorial').length}`,
  )
  manifest.items.forEach((item) => {
    console.log(
      `    - [${item.type}] ${item.slug}: "${item.title}"`,
    )
  })
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
    `  Cross-linked:   ${crossLinkedPaths.length} existing items`,
  )
  crossLinkedPaths.forEach((p) => console.log(`    - ${p}`))
  console.log()

  // Write cross-linked paths for the workflow to stage
  if (crossLinkedPaths.length > 0) {
    fs.writeFileSync('/tmp/cross-linked-news.txt', crossLinkedPaths.join('\n'))
    console.log(
      `[pipeline] Cross-linked paths written to /tmp/cross-linked-news.txt`,
    )
  }
}

main().catch((err) => {
  manifest.totals.pipelineDurationMs = Date.now() - pipelineStart
  manifest.completedAt = new Date().toISOString()
  manifest.fatalError = err.message

  try {
    fs.mkdirSync('/tmp/news-generation', { recursive: true })
    fs.writeFileSync(
      '/tmp/news-generation/manifest.json',
      JSON.stringify(manifest, null, 2),
    )
    console.error(
      `[pipeline] Partial manifest written to /tmp/news-generation/manifest.json`,
    )
  } catch {
    // ignore
  }

  console.error(`[pipeline] Fatal error: ${err.message}`)
  console.error(err.stack)
  process.exit(1)
})
