import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { generateImage } from './openai.mjs'

const IMAGES_DIR = path.resolve('public/images/articles')

/**
 * Generate a cover image with DALL-E and resize to 1200x630.
 * Returns metadata for manifest tracking.
 */
export async function generateCoverImage(dallePrompt, slug) {
  console.log('[image] Starting cover image generation...')
  console.log(`[image]   slug: ${slug}`)
  console.log(`[image]   target: 1200x630 PNG`)

  const {
    buffer: rawBuffer,
    durationMs: genMs,
    attempts,
  } = await generateImage(dallePrompt)
  console.log(`[image] Raw image: ${rawBuffer.length} bytes`)

  // Get raw image metadata
  const rawMeta = await sharp(rawBuffer).metadata()
  console.log(
    `[image] Raw dimensions: ${rawMeta.width}x${rawMeta.height} (${rawMeta.format})`,
  )

  // Resize to 1200x630 (article cover dimensions)
  console.log('[image] Resizing to 1200x630...')
  const resized = await sharp(rawBuffer)
    .resize(1200, 630, { fit: 'cover', position: 'centre' })
    .png({ quality: 90 })
    .toBuffer()

  console.log(`[image] Resized: ${resized.length} bytes`)

  const outputPath = path.join(IMAGES_DIR, `${slug}.png`)
  fs.mkdirSync(path.dirname(outputPath), { recursive: true })
  fs.writeFileSync(outputPath, resized)

  console.log(`[image] Saved: ${outputPath}`)

  return {
    path: outputPath,
    rawSizeBytes: rawBuffer.length,
    finalSizeBytes: resized.length,
    rawDimensions: `${rawMeta.width}x${rawMeta.height}`,
    finalDimensions: '1200x630',
    generationMs: genMs,
    attempts,
  }
}
