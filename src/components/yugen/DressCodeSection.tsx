import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { ComingSoonBlock } from './ComingSoonBlock'

export function DressCodeSection() {
  const hasDressCode = YUGEN.dressCode.length > 0

  return (
    <section id="dress-code" className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="label-caps mb-4">Dress code</p>
        <h2 className="section-title">Committee attire</h2>
      </motion.div>

      <div className="mt-12">
        {hasDressCode ? (
          <div className="grid gap-4 md:grid-cols-2">
            {YUGEN.dressCode.map((item) => (
              <div key={item.title} className="rounded-lg border border-yugen bg-surface p-6">
                <h3 className="font-heading text-lg font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <ComingSoonBlock
            eyebrow="Dress code"
            title="Guidelines publishing soon"
            description="Western formal, cultural formal, and session-specific attire details will be shared before registration opens."
          />
        )}
      </div>
    </section>
  )
}
