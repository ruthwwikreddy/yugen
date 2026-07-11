import sharp from 'sharp'
import { readFileSync } from 'node:fs'
import { join, dirname } from 'node:path'
import { fileURLToPath } from 'node:url'

const publicDir = join(dirname(fileURLToPath(import.meta.url)), '..', 'public')
const assetsDir = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '.cursor', 'projects', 'Users-ruthwikreddy-yugen', 'assets')

const darkSource = join(assetsDir, 'logo-source-dark.png')
const whiteSource = join(assetsDir, 'logo-source-white.png')

/** Remove AI checkerboard / flat background while preserving faint globe grays. */
async function removeDarkBackground(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const px = Buffer.from(data)

  const isDark = (i) => px[i] < 90 && px[i + 1] < 90 && px[i + 2] < 90

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * 4
      const r = px[i]
      const g = px[i + 1]
      const b = px[i + 2]
      const neutral = Math.abs(r - g) <= 6 && Math.abs(g - b) <= 6

      if (!neutral) continue

      const bright = (r + g + b) / 3
      if (bright >= 248) {
        px[i + 3] = 0
        continue
      }

      if (bright >= 228 && bright <= 246) {
        let nearMark = false
        for (let dy = -2; dy <= 2 && !nearMark; dy++) {
          for (let dx = -2; dx <= 2 && !nearMark; dx++) {
            const nx = x + dx
            const ny = y + dy
            if (nx < 0 || ny < 0 || nx >= width || ny >= height) continue
            const ni = (ny * width + nx) * 4
            if (isDark(ni)) nearMark = true
          }
        }
        if (!nearMark) px[i + 3] = 0
      }
    }
  }

  return sharp(px, { raw: { width, height, channels: 4 } })
}

/** Remove dark checkerboard behind white mark. */
async function removeWhiteBackground(inputPath) {
  const { data, info } = await sharp(inputPath).ensureAlpha().raw().toBuffer({ resolveWithObject: true })
  const { width, height } = info
  const px = Buffer.from(data)

  for (let i = 0; i < px.length; i += 4) {
    const r = px[i]
    const g = px[i + 1]
    const b = px[i + 2]
    const neutral = Math.abs(r - g) <= 8 && Math.abs(g - b) <= 8
    const bright = (r + g + b) / 3

    if (neutral && bright < 120) {
      px[i + 3] = 0
    }
  }

  return sharp(px, { raw: { width, height, channels: 4 } })
}

async function exportSquare(input, png, size) {
  await input
    .clone()
    .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png({ compressionLevel: 9 })
    .toFile(join(publicDir, png))
  console.log(`Wrote ${png} (${size}px)`)
}

const darkProcessed = await removeDarkBackground(darkSource)
const whiteProcessed = await removeWhiteBackground(whiteSource)

await darkProcessed
  .clone()
  .png()
  .toFile(join(publicDir, 'logo-source.png'))
console.log('Wrote logo-source.png (1024px master)')

await darkProcessed.clone().png().toFile(join(publicDir, 'logo-transparent-master.png'))
await whiteProcessed.clone().png().toFile(join(publicDir, 'logo-white-master.png'))

const squareExports = [
  { input: darkProcessed, png: 'logo-transparent.png', size: 512 },
  { input: darkProcessed, png: 'logo-transparent@2x.png', size: 1024 },
  { input: darkProcessed, png: 'logo-transparent-168.png', size: 168 },
  { input: whiteProcessed, png: 'logo-168.png', size: 168 },
  { input: darkProcessed, png: 'logo-512.png', size: 512 },
  { input: darkProcessed, png: 'logo.png', size: 512 },
  { input: darkProcessed, png: 'logo@2x.png', size: 1024 },
  { input: darkProcessed, png: 'logo-112.png', size: 112 },
  { input: whiteProcessed, png: 'logo-white.png', size: 512 },
  { input: whiteProcessed, png: 'logo-white@2x.png', size: 1024 },
  { input: whiteProcessed, png: 'favicon-32.png', size: 32 },
  { input: whiteProcessed, png: 'apple-touch-icon.png', size: 180 },
]

for (const { input, png, size } of squareExports) {
  await exportSquare(input, png, size)
}

const ogSvg = readFileSync(join(publicDir, 'og-image.svg'), 'utf8')
await sharp(Buffer.from(ogSvg), { density: 150 })
  .resize(1200, 630, { fit: 'fill' })
  .png()
  .toFile(join(publicDir, 'og-image.png'))
console.log('Wrote og-image.png (1200x630)')
