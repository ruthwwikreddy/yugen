import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageLayout } from '../components/yugen/PageLayout'
import { GalleryMarquee } from '../components/yugen/GalleryMarquee'
import { getGalleryItems } from '../lib/yugen'
import { YUGEN } from '../lib/yugen'

export function GalleryPage() {
  const items = getGalleryItems()
  const hasPhotos = YUGEN.gallery.length > 0

  return (
    <PageLayout
      title="Gallery | Yūgen Summit 6.0"
      description="Photos from Yūgen Summit — opening ceremony, committees, caucus, and closing at PORPS."
      path="/gallery"
      eyebrow="Gallery"
      headline="Moments from Yūgen"
      subheadline={hasPhotos ? 'Black & white. Bold. Yūgen.' : 'Photo grid fills when past summit and 6.0 assets are added to yugen.ts.'}
    >
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
        {items.map((item, i) => (
          <motion.figure
            key={item.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.05 }}
            className="group relative aspect-square overflow-hidden rounded-lg border border-yugen bg-surface-raised"
          >
            {item.src ? (
              <img src={item.src} alt={item.alt} className="h-full w-full object-cover grayscale transition-opacity group-hover:opacity-90" />
            ) : (
              <div className="flex h-full flex-col items-center justify-center p-4 text-center">
                <span className="font-display text-2xl uppercase text-yugen-white/15">YŪGEN</span>
                <span className="coming-soon-pill mt-3 text-[8px]">TBA</span>
              </div>
            )}
            {item.caption ? (
              <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent p-3">
                <p className="text-xs text-yugen-white/80">{item.caption}</p>
              </figcaption>
            ) : null}
          </motion.figure>
        ))}
      </div>

      <a
        href={YUGEN.social.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="btn-ghost mt-10 inline-flex"
      >
        More on {YUGEN.social.instagram}
      </a>
    </PageLayout>
  )
}

export function GallerySection() {
  return (
    <section id="gallery" className="border-t border-yugen bg-surface section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="label-caps mb-4">Gallery</p>
            <h2 className="section-title">Yūgen in frames</h2>
          </div>
          <Link to="/gallery" className="btn-ghost shrink-0">View all</Link>
        </motion.div>

        <div className="mt-10">
          <GalleryMarquee />
        </div>
      </div>
    </section>
  )
}
