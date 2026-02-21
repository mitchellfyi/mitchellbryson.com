import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const IMAGES_DIR = path.resolve('public/images/news')

/**
 * Fetch the OG image from a source URL, download it, and resize to 1200x630 WebP.
 * Returns the local path on success, null on failure.
 */
export async function fetchOgImage(sourceUrl, slug) {
  try {
    console.log(`[og-image] Fetching OG image for: ${sourceUrl}`)

    // Fetch the HTML page to find the og:image meta tag
    const response = await fetch(sourceUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; NewsBot/1.0; +https://mitchellbryson.com)',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(10000),
    })

    if (!response.ok) {
      console.warn(
        `[og-image] Failed to fetch page: ${response.status} ${response.statusText}`,
      )
      return null
    }

    const html = await response.text()

    // Parse og:image from HTML
    const ogImageMatch =
      html.match(
        /<meta\s+(?:[^>]*?\s+)?(?:property|name)=["']og:image["']\s+content=["']([^"']+)["']/i,
      ) ||
      html.match(
        /<meta\s+content=["']([^"']+)["']\s+(?:[^>]*?\s+)?(?:property|name)=["']og:image["']/i,
      )

    if (!ogImageMatch) {
      console.warn(`[og-image] No og:image meta tag found`)
      return null
    }

    let imageUrl = ogImageMatch[1]
    console.log(`[og-image] Found og:image: ${imageUrl}`)

    // Handle relative URLs
    if (imageUrl.startsWith('/')) {
      const url = new URL(sourceUrl)
      imageUrl = `${url.protocol}//${url.host}${imageUrl}`
    }

    // Download the image
    const imageResponse = await fetch(imageUrl, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (compatible; NewsBot/1.0; +https://mitchellbryson.com)',
      },
      redirect: 'follow',
      signal: AbortSignal.timeout(15000),
    })

    if (!imageResponse.ok) {
      console.warn(
        `[og-image] Failed to download image: ${imageResponse.status}`,
      )
      return null
    }

    const imageBuffer = Buffer.from(await imageResponse.arrayBuffer())
    console.log(`[og-image] Downloaded image: ${imageBuffer.length} bytes`)

    // Ensure output directory exists
    fs.mkdirSync(IMAGES_DIR, { recursive: true })

    // Resize and convert to WebP
    const outputPath = path.join(IMAGES_DIR, `${slug}.webp`)
    await sharp(imageBuffer)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center',
      })
      .webp({ quality: 85 })
      .toFile(outputPath)

    const stats = fs.statSync(outputPath)
    console.log(`[og-image] Saved: ${outputPath} (${stats.size} bytes)`)

    return `/images/news/${slug}.webp`
  } catch (err) {
    console.warn(`[og-image] Failed to fetch OG image: ${err.message}`)
    return null
  }
}
