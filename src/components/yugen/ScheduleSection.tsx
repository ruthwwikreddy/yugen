import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { ComingSoonBlock } from './ComingSoonBlock'

export function ScheduleSection() {
  const hasSchedule = YUGEN.schedule.length > 0

  return (
    <section id="schedule" className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <p className="label-caps mb-4">Schedule</p>
        <h2 className="section-title">Two days of debate</h2>
        <p className="mt-4 max-w-xl text-muted">Full schedule publishes when dates are confirmed.</p>
      </motion.div>

      <div className="mt-12">
        {hasSchedule ? (
          <div className="space-y-8">
            {YUGEN.schedule.map((day) => (
              <div key={day.day} className="rounded-lg border border-yugen bg-surface-raised p-6">
                <h3 className="font-heading text-xl font-bold">{day.day}</h3>
                <ul className="mt-4 space-y-3">
                  {day.items.map((item) => (
                    <li key={`${item.time}-${item.title}`} className="flex gap-4 border-t border-yugen pt-3 text-sm">
                      <span className="label-caps w-20 shrink-0 pt-0.5">{item.time}</span>
                      <div>
                        <p className="text-yugen-white">{item.title}</p>
                        {item.location && <p className="text-dim">{item.location}</p>}
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        ) : (
          <ComingSoonBlock
            eyebrow="Schedule"
            title="Timeline coming soon"
            description="Opening ceremony, committee sessions, and socials — the full run of show lands here."
          />
        )}
      </div>
    </section>
  )
}
