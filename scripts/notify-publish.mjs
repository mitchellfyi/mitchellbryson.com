#!/usr/bin/env node

/**
 * Post-publish notification script.
 *
 * Notifies search engines and RSS aggregators about new/updated URLs:
 *   - IndexNow  (Bing, DuckDuckGo, Yandex, Naver, Seznam)
 *   - WebSub    (Feedly, Flipboard, NewsBlur, all RSS subscribers)
 *   - Google    (sitemap ping)
 *
 * Usage:
 *   node scripts/notify-publish.mjs https://mitchellbryson.com/articles/my-post [more URLs...]
 */

const SITE_URL = 'https://mitchellbryson.com'
const INDEXNOW_KEY = 'e9b3a7c2d4f1085b'
const SITEMAP_URL = `${SITE_URL}/sitemap.xml`
const FEED_URL = `${SITE_URL}/feed.xml`
const WEBSUB_HUB = 'https://pubsubhubbub.superfeedr.com'

const urls = process.argv.slice(2)

if (urls.length === 0) {
  console.log('No URLs provided — nothing to notify.')
  process.exit(0)
}

console.log(
  `Notifying for ${urls.length} URL(s):\n${urls.map((u) => `  ${u}`).join('\n')}\n`,
)

async function submitIndexNow() {
  const body = {
    host: 'mitchellbryson.com',
    key: INDEXNOW_KEY,
    keyLocation: `${SITE_URL}/${INDEXNOW_KEY}.txt`,
    urlList: urls,
  }

  const res = await fetch('https://api.indexnow.org/IndexNow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify(body),
  })

  // IndexNow returns 200 or 202 on success
  if (res.ok) {
    console.log(`[IndexNow] OK (${res.status})`)
  } else {
    const text = await res.text().catch(() => '')
    console.error(`[IndexNow] Failed (${res.status}): ${text}`)
  }
}

async function pingWebSub() {
  const body = new URLSearchParams({
    'hub.mode': 'publish',
    'hub.url': FEED_URL,
  })

  const res = await fetch(WEBSUB_HUB, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
  })

  if (res.ok || res.status === 204) {
    console.log(`[WebSub] OK (${res.status})`)
  } else {
    const text = await res.text().catch(() => '')
    console.error(`[WebSub] Failed (${res.status}): ${text}`)
  }
}

async function pingGoogle() {
  const pingUrl = `https://www.google.com/ping?sitemap=${encodeURIComponent(SITEMAP_URL)}`
  const res = await fetch(pingUrl)

  if (res.ok) {
    console.log(`[Google] OK (${res.status})`)
  } else {
    const text = await res.text().catch(() => '')
    console.error(`[Google] Failed (${res.status}): ${text}`)
  }
}

const results = await Promise.allSettled([
  submitIndexNow(),
  pingWebSub(),
  pingGoogle(),
])

const failures = results.filter((r) => r.status === 'rejected')
if (failures.length > 0) {
  console.error(`\n${failures.length} notification(s) threw an error:`)
  failures.forEach((f) => console.error(`  ${f.reason}`))
  process.exit(1)
}

console.log('\nAll notifications sent.')
