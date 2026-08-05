import { useMemo } from 'react'
import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'

type Photo = { id: string; src: string; alt: string }

/** Fisher–Yates with a seeded RNG so the order is stable per render */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const out = arr.slice()
  let s = seed >>> 0
  for (let i = out.length - 1; i > 0; i--) {
    s = (s * 1664525 + 1013904223) >>> 0
    const j = s % (i + 1)
    ;[out[i], out[j]] = [out[j], out[i]]
  }
  return out
}

function split<T>(arr: T[], parts: number): T[][] {
  const out: T[][] = Array.from({ length: parts }, () => [])
  arr.forEach((item, i) => out[i % parts].push(item))
  return out
}

function MarqueeRow({
  photos,
  durationSeconds,
  reverse = false,
  tileHeight = 220,
  delay = 0,
}: {
  photos: Photo[]
  durationSeconds: number
  reverse?: boolean
  tileHeight?: number
  delay?: number
}) {
  // Duplicate so the track is long enough for a seamless -50% loop
  const loop = useMemo(() => [...photos, ...photos], [photos])
  if (photos.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="gallery-marquee"
    >
      <div
        className={`gallery-marquee__track ${reverse ? 'gallery-marquee__track--reverse' : ''}`}
        style={{
          animationDuration: `${durationSeconds}s`,
        }}
      >
        {loop.map((photo, i) => (
          <div
            key={`${photo.id}-${i}`}
            className="relative shrink-0 overflow-hidden rounded-lg border border-yugen bg-surface-raised"
            style={{ height: `${tileHeight}px`, aspectRatio: '3 / 4' }}
          >
            <img
              src={photo.src}
              alt={photo.alt}
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover grayscale"
            />
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function GalleryMarquee() {
  const photos = useMemo(() => YUGEN.gallery.slice(), [])

  // Stable random shuffle so the order doesn't jump on re-render
  const shuffled = useMemo(() => seededShuffle(photos, 42), [photos])

  // Use ALL photos, split across two rows so each row sees a different subset
  const [rowA, rowB] = useMemo(() => split(shuffled, 2), [shuffled])

  if (photos.length === 0) return null

  return (
    <div className="space-y-4">
      <MarqueeRow photos={rowA} durationSeconds={60} tileHeight={220} />
      <MarqueeRow photos={rowB} durationSeconds={80} reverse tileHeight={180} delay={0.1} />
    </div>
  )
}
