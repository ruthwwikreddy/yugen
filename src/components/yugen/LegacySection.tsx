import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'

export function LegacySection() {
  return (
    <section id="legacy" className="border-t border-yugen bg-yugen-black section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label-caps mb-4">Legacy</p>
          <h2 className="section-title">{YUGEN.legacy.headline}</h2>
          <p className="mt-4 max-w-xl text-muted">{YUGEN.legacy.description}</p>
        </motion.div>

        <div className="mt-12 grid gap-4 md:grid-cols-3">
          {YUGEN.legacy.editions.map((ed, i) => (
            <motion.div
              key={ed.edition}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-lg border border-yugen bg-surface-raised p-6"
            >
              <div className="flex items-baseline justify-between">
                <p className="font-display text-3xl uppercase">Yūgen {ed.edition}</p>
                <span className="text-xs text-dim">{ed.year}</span>
              </div>
              <div className="mt-4 grid grid-cols-3 gap-2 border-t border-yugen pt-4">
                {[
                  { l: 'Delegates', v: ed.delegates },
                  { l: 'Committees', v: ed.committees },
                  { l: 'Schools', v: ed.schools },
                ].map((s) => (
                  <div key={s.l}>
                    <p className="text-[10px] uppercase tracking-wider text-dim">{s.l}</p>
                    <p className="font-heading text-sm font-semibold">{s.v}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-muted">{ed.highlight}</p>
            </motion.div>
          ))}
        </div>

        <Link to="/about" className="btn-ghost mt-10 inline-flex">Read our story</Link>
      </div>
    </section>
  )
}
