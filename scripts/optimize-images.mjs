#!/usr/bin/env node
/**
 * One-time image optimization script.
 * - Compresses portrait.jpg (resize to max 1600px wide, JPEG q80)
 * - Converts avatar.png to avatar.webp (256x256, q80)
 * - Converts article cover PNGs to WebP (q80)
 * - Deletes original PNGs after successful WebP conversion
 */
import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

const ROOT = path.resolve('.')

async function optimizePortrait() {
  const src = path.join(ROOT, 'src/images/portrait.jpg')
  const stats = fs.statSync(src)
  console.log(`[portrait] Original: ${(stats.size / 1024 / 1024).toFixed(1)}MB`)

  const img = sharp(src)
  const meta = await img.metadata()
  console.log(`[portrait] Dimensions: ${meta.width}x${meta.height}`)

  const buf = await sharp(src)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer()

  fs.writeFileSync(src, buf)
  console.log(`[portrait] Compressed: ${(buf.length / 1024).toFixed(0)}KB`)
}

async function optimizeAvatar() {
  const src = path.join(ROOT, 'src/images/avatar.png')
  const dst = path.join(ROOT, 'src/images/avatar.webp')
  const stats = fs.statSync(src)
  console.log(`[avatar] Original PNG: ${(stats.size / 1024).toFixed(0)}KB`)

  const buf = await sharp(src)
    .resize(256, 256, { fit: 'cover' })
    .webp({ quality: 80 })
    .toBuffer()

  fs.writeFileSync(dst, buf)
  console.log(`[avatar] WebP: ${(buf.length / 1024).toFixed(0)}KB → ${dst}`)
}

async function convertArticleImages() {
  const dir = path.join(ROOT, 'public/images/articles')
  const pngs = fs.readdirSync(dir).filter((f) => f.endsWith('.png'))
  console.log(`\n[articles] Found ${pngs.length} PNG files`)

  let totalBefore = 0
  let totalAfter = 0

  for (const png of pngs) {
    const src = path.join(dir, png)
    const dst = path.join(dir, png.replace('.png', '.webp'))
    const stats = fs.statSync(src)
    totalBefore += stats.size

    const buf = await sharp(src).webp({ quality: 80 }).toBuffer()
    totalAfter += buf.length

    fs.writeFileSync(dst, buf)
    fs.unlinkSync(src)
    console.log(
      `  ${png} → ${(stats.size / 1024).toFixed(0)}KB → ${(buf.length / 1024).toFixed(0)}KB`,
    )
  }

  console.log(
    `[articles] Total: ${(totalBefore / 1024 / 1024).toFixed(1)}MB → ${(totalAfter / 1024 / 1024).toFixed(1)}MB`,
  )
}

console.log('=== Image Optimization ===\n')
await optimizePortrait()
console.log()
await optimizeAvatar()
await convertArticleImages()
console.log('\n=== Done ===')
