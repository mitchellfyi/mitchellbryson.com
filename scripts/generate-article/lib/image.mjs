import fs from 'fs'
import path from 'path'
import sharp from 'sharp'
import { generateImage } from './openai.mjs'

const IMAGES_DIR = path.resolve('public/images/articles')
const COVER_WIDTH = 1200
const COVER_HEIGHT = 630

/**
 * Generate a cover image with DALL-E and resize to cover dimensions.
 * Returns metadata for manifest tracking.
 */
export async function generateCoverImage(dallePrompt, slug) {
  console.log('[image] Starting cover image generation...')
  console.log(`[image]   slug: ${slug}`)
  console.log(`[image]   target: ${COVER_WIDTH}x${COVER_HEIGHT} PNG`)

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

  // Resize to article cover dimensions
  console.log(`[image] Resizing to ${COVER_WIDTH}x${COVER_HEIGHT}...`)
  const resized = await sharp(rawBuffer)
    .resize(COVER_WIDTH, COVER_HEIGHT, { fit: 'cover', position: 'centre' })
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
    finalDimensions: `${COVER_WIDTH}x${COVER_HEIGHT}`,
    generationMs: genMs,
    attempts,
  }
}
