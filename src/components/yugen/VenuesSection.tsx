import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { ComingSoonBlock } from './ComingSoonBlock'

export function VenuesSection() {
  return (
    <section id="venues" className="border-t border-yugen bg-surface section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label-caps mb-4">Venues</p>
          <h2 className="section-title">On campus at PORPS</h2>
        </motion.div>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-yugen bg-surface-raised p-8">
            <p className="label-caps">Main venue</p>
            <h3 className="mt-3 font-heading text-2xl font-bold">{YUGEN.venue}</h3>
            <p className="mt-2 text-muted">{YUGEN.city}, {YUGEN.country}</p>
            <span className="coming-soon-pill mt-6">Campus map · TBA</span>
          </div>
          <ComingSoonBlock
            eyebrow="Committee venues"
            title="Room assignments coming soon"
            description="Individual committee rooms and venue maps publish with the final roster."
            compact
          />
        </div>
      </div>
    </section>
  )
}
