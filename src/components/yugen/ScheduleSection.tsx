import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'

export function ScheduleSection() {
  const hasSchedule = YUGEN.schedule.length > 0
  const [activeTab, setActiveTab] = useState(0)

  // Helper to categorize events and assign colors/badges
  function getEventBadge(title: string) {
    const t = title.toLowerCase()
    if (t.includes('registration')) {
      return { label: 'Admin', color: 'bg-accent-crimson/20 text-accent-light border border-accent-berry/30' }
    }
    if (t.includes('ceremony')) {
      return { label: 'Ceremony', color: 'bg-amber-500/15 text-amber-300 border border-amber-500/25' }
    }
    if (t.includes('session')) {
      return { label: 'Debate', color: 'bg-blue-500/15 text-blue-300 border border-blue-500/25' }
    }
    if (t.includes('lunch') || t.includes('breakfast') || t.includes('break')) {
      return { label: 'Break', color: 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/25' }
    }
    return { label: 'Event', color: 'bg-zinc-800/55 text-zinc-300 border border-zinc-700/50' }
  }

  return (
    <section id="schedule" className="section-padding mx-auto max-w-7xl relative overflow-hidden">
      {/* Background glow effects */}
      <div className="pointer-events-none absolute -left-40 top-1/4 h-[400px] w-[400px] rounded-full bg-accent-crimson/10 blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-1/4 h-[400px] w-[400px] rounded-full bg-accent-berry/10 blur-[120px]" />

      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center md:text-left"
        >
          <p className="label-caps mb-4 tracking-[0.2em] text-accent-mauve">Schedule</p>
          <h2 className="section-title">Two days of debate</h2>
          <p className="mt-4 max-w-xl text-muted mx-auto md:mx-0">
            The full run of show for Yūgen Summit 6.0. Select a day to view sessions and timings.
          </p>
        </motion.div>

        {hasSchedule ? (
          <div className="mt-12">
            {/* Day Switcher Tabs */}
            <div className="flex justify-center md:justify-start gap-2 border-b border-yugen/50 pb-4 mb-10">
              {YUGEN.schedule.map((day, idx) => (
                <button
                  key={day.day}
                  onClick={() => setActiveTab(idx)}
                  className="relative px-6 py-3 text-sm font-heading font-semibold tracking-wide transition-colors focus:outline-none cursor-pointer rounded-t-lg"
                >
                  <span className={`relative z-10 ${activeTab === idx ? 'text-yugen-white' : 'text-dim hover:text-yugen-white transition-colors'}`}>
                    {day.day.split(' — ')[0]}
                  </span>
                  {activeTab === idx && (
                    <motion.div
                      layoutId="activeTabBg"
                      className="absolute inset-0 bg-white/[0.05] rounded-t-lg border-b-2 border-accent-berry"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              ))}
            </div>

            {/* Timeline */}
            <div className="relative border-l-2 border-yugen/40 ml-4 md:ml-32 pl-8 md:pl-12 py-2 space-y-8">
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="space-y-8"
                >
                  {YUGEN.schedule[activeTab].items.map((item, index) => {
                    const badge = getEventBadge(item.title)

                    return (
                      <motion.div
                        key={`${item.time}-${item.title}`}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                        className="relative group"
                      >
                        {/* Timeline Node dot */}
                        <div className="absolute -left-[41px] md:-left-[57px] top-4 h-4 w-4 rounded-full border-2 border-accent-berry bg-yugen-black group-hover:scale-125 group-hover:bg-accent-berry transition-all duration-300 shadow-[0_0_8px_rgba(126,87,88,0.5)]" />

                        {/* Event Timing for larger displays */}
                        <span className="hidden md:block absolute -left-[180px] top-3.5 w-28 text-right font-heading text-xs tracking-wider text-accent-mauve font-semibold">
                          {item.time}
                        </span>

                        {/* Interactive Card */}
                        <div className="rounded-xl border border-yugen bg-surface-raised/60 backdrop-blur-md p-5 transition-all duration-300 hover:border-yugen-strong hover:bg-surface-raised hover:shadow-[0_4px_24px_rgba(0,0,0,0.4)] group-hover:-translate-y-1 group-hover:shadow-[0_8px_32px_rgba(126,87,88,0.15)]">
                          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                            <div className="space-y-1.5">
                              {/* Timing for mobile */}
                              <span className="block md:hidden text-xs font-semibold text-accent-mauve tracking-wider">
                                {item.time}
                              </span>
                              <h3 className="font-heading text-base md:text-lg font-bold text-yugen-white leading-snug">
                                {item.title}
                              </h3>
                              {item.location && (
                                <p className="text-xs text-dim flex items-center gap-1.5">
                                  <svg className="h-3.5 w-3.5 text-accent-berry" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                  </svg>
                                  {item.location}
                                </p>
                              )}
                            </div>
                            <span className={`self-start sm:self-center px-2.5 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${badge.color}`}>
                              {badge.label}
                            </span>
                          </div>
                        </div>
                      </motion.div>
                    )
                  })}
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        ) : (
          <p className="mt-12 text-center text-muted">No schedule available.</p>
        )}
      </div>
    </section>
  )
}
