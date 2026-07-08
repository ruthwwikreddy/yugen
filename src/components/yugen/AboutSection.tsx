import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'

export function AboutSection() {
  return (
    <section id="about" className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <p className="label-caps mb-4">About</p>
        <h2 className="section-title max-w-3xl">{YUGEN.about.headline}</h2>
        <div className="mt-8 grid gap-8 md:grid-cols-2 md:gap-12">
          {YUGEN.about.paragraphs.map((p) => (
            <p key={p.slice(0, 40)} className="text-base leading-relaxed text-muted">
              {p}
            </p>
          ))}
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-3">
          {[
            { label: 'Host', value: YUGEN.venueShort },
            { label: 'Edition', value: YUGEN.edition },
            { label: 'Dates', value: YUGEN.dates },
          ].map((item) => (
            <div key={item.label} className="rounded-lg border border-yugen bg-surface p-5">
              <p className="label-caps">{item.label}</p>
              <p className="mt-2 font-heading text-lg font-semibold text-yugen-white">{item.value}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}
