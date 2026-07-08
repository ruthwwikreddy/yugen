import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { TornCardTop } from './TornEdge'

export function SecretariatSection() {
  return (
    <section id="secretariat" className="border-t border-yugen bg-surface section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label-caps mb-4">Secretariat</p>
          <h2 className="section-title">The team behind Yūgen 6.0</h2>
          <p className="mt-4 max-w-xl text-muted">
            Full secretariat roster and portraits drop soon. Placeholders below until confirmed.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {YUGEN.secretariat.map((member, i) => (
            <motion.article
              key={member.role}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="overflow-hidden rounded-lg border border-yugen bg-yugen-black"
            >
              <TornCardTop />
              <div className="relative bg-surface-raised px-5 pb-6 pt-2">
                <div className="relative mx-auto aspect-[3/4] w-full max-w-[200px] overflow-hidden bg-yugen-black">
                  {member.image ? (
                    <img
                      src={member.image}
                      alt={member.name}
                      className="h-full w-full object-cover grayscale"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gradient-to-b from-yugen-surface-raised to-yugen-black">
                      <span className="font-display text-5xl uppercase text-yugen-white/25">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
                </div>
                <div className="mt-4 text-center">
                  <span className="coming-soon-pill text-[9px]">TBA</span>
                  <p className="mt-3 font-heading text-sm font-bold uppercase tracking-wide text-yugen-white">
                    {member.role}
                  </p>
                  <p className="mt-1 text-xs text-dim">{member.name}</p>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
