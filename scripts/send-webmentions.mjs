#!/usr/bin/env node

/**
 * Send webmentions for external links found in content files.
 *
 * For each markdown file passed as a CLI arg, extracts external links
 * and attempts to send a W3C Webmention to each target's endpoint.
 *
 * Usage:
 *   node scripts/send-webmentions.mjs src/app/articles/my-post/content.md
 */

import { readFileSync } from 'node:fs'

const SITE_URL = 'https://mitchellbryson.com'
const OWN_DOMAIN = 'mitchellbryson.com'
const FETCH_TIMEOUT = 10_000
const DELAY_MS = 1_000
const SKIP_EXTENSIONS = [
  '.png',
  '.jpg',
  '.jpeg',
  '.gif',
  '.svg',
  '.webp',
  '.pdf',
  '.zip',
]

const files = process.argv.slice(2)

if (files.length === 0) {
  console.log('No files provided — nothing to send.')
  process.exit(0)
}

function deriveSourceUrl(filePath) {
  // src/app/{section}/{slug}/content.md → https://mitchellbryson.com/{section}/{slug}
  const match = filePath.match(/src\/app\/([^/]+)\/([^/]+)\/content\.md$/)
  if (!match) return null
  return `${SITE_URL}/${match[1]}/${match[2]}`
}

function extractExternalLinks(markdown) {
  // Strip frontmatter
  const body = markdown.replace(/^---[\s\S]*?---/, '')

  const linkPattern = /\[(?:[^\]]*)\]\((https?:\/\/[^)]+)\)/g
  const seen = new Set()
  const links = []

  for (const match of body.matchAll(linkPattern)) {
    const url = match[1]

    try {
      const parsed = new URL(url)

      // Skip own domain
      if (
        parsed.hostname === OWN_DOMAIN ||
        parsed.hostname === `www.${OWN_DOMAIN}`
      )
        continue

      // Skip images, PDFs, etc.
      const ext = parsed.pathname
        .substring(parsed.pathname.lastIndexOf('.'))
        .toLowerCase()
      if (SKIP_EXTENSIONS.includes(ext)) continue

      // Deduplicate
      const canonical = parsed.origin + parsed.pathname
      if (seen.has(canonical)) continue
      seen.add(canonical)

      links.push(url)
    } catch {
      // Malformed URL — skip
    }
  }

  return links
}

async function fetchWithTimeout(url, options = {}) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), FETCH_TIMEOUT)
  try {
    return await fetch(url, { ...options, signal: controller.signal })
  } finally {
    clearTimeout(timer)
  }
}

async function discoverEndpoint(targetUrl) {
  // Try HEAD first for Link header
  try {
    const headRes = await fetchWithTimeout(targetUrl, {
      method: 'HEAD',
      redirect: 'follow',
    })
    const linkHeader = headRes.headers.get('link')
    if (linkHeader) {
      const match = linkHeader.match(/<([^>]+)>;\s*rel="?webmention"?/)
      if (match) return match[1]
    }
  } catch {
    // HEAD failed — try GET below
  }

  // GET the page and search HTML
  try {
    const getRes = await fetchWithTimeout(targetUrl, { redirect: 'follow' })
    if (!getRes.ok) return null

    const contentType = getRes.headers.get('content-type') || ''
    if (!contentType.includes('text/html')) return null

    const html = await getRes.text()

    // Look for <link rel="webmention" href="...">
    const match =
      html.match(
        /<link[^>]+rel=["']?webmention["']?[^>]+href=["']([^"']+)["']/i,
      ) ||
      html.match(
        /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']?webmention["']?/i,
      )
    if (match) return match[1]
  } catch {
    // GET failed
  }

  return null
}

async function sendWebmention(endpoint, sourceUrl, targetUrl) {
  const body = new URLSearchParams({ source: sourceUrl, target: targetUrl })

  const res = await fetchWithTimeout(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  return {
    status: res.status,
    ok: res.ok || res.status === 201 || res.status === 202,
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function processFile(filePath) {
  const sourceUrl = deriveSourceUrl(filePath)
  if (!sourceUrl) {
    console.log(`[Webmention] Skipping ${filePath} — cannot derive URL.`)
    return
  }

  let markdown
  try {
    markdown = readFileSync(filePath, 'utf-8')
  } catch {
    console.log(`[Webmention] Skipping ${filePath} — file not found.`)
    return
  }

  const links = extractExternalLinks(markdown)
  if (links.length === 0) {
    console.log(`[Webmention] ${sourceUrl} — no external links found.`)
    return
  }

  console.log(
    `[Webmention] ${sourceUrl} — ${links.length} external link(s) to process.`,
  )

  let sent = 0
  let skipped = 0
  let failed = 0

  for (const target of links) {
    try {
      const endpoint = await discoverEndpoint(target)
      if (!endpoint) {
        skipped++
        console.log(`  [skip] ${target} — no webmention endpoint`)
        await sleep(DELAY_MS)
        continue
      }

      const result = await sendWebmention(endpoint, sourceUrl, target)
      if (result.ok) {
        sent++
        console.log(`  [sent] ${target} (${result.status})`)
      } else {
        failed++
        console.log(`  [fail] ${target} — endpoint returned ${result.status}`)
      }
    } catch (err) {
      failed++
      console.log(`  [fail] ${target} — ${err.message}`)
    }

    await sleep(DELAY_MS)
  }

  console.log(
    `[Webmention] Done: ${sent} sent, ${skipped} skipped, ${failed} failed.`,
  )
}

for (const file of files) {
  await processFile(file)
}
