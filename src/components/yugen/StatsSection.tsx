import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'

export function StatsSection() {
  return (
    <section className="border-b border-yugen bg-surface">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-yugen bg-yugen-border md:grid-cols-4">
          {YUGEN.stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-surface-raised px-6 py-8 text-center md:py-10"
            >
              <p className="font-display text-4xl uppercase tracking-tight text-yugen-white md:text-5xl">
                {stat.value}
              </p>
              <p className="label-caps mt-3">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
