import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { YUGEN } from '../../lib/yugen'

function useCountUp(target: number, duration = 1600, inView = false) {
  const [value, setValue] = useState(0)
  useEffect(() => {
    if (!inView) return
    const isNum = /^\d+$/.test(String(target))
    if (!isNum) { setValue(target); return }
    const start = Date.now()
    const tick = () => {
      const p = Math.min((Date.now() - start) / duration, 1)
      const eased = 1 - Math.pow(1 - p, 3)
      setValue(Math.round(eased * target))
      if (p < 1) requestAnimationFrame(tick)
    }
    requestAnimationFrame(tick)
  }, [target, duration, inView])
  return value
}

const EXTRA_STAT = { label: 'August 2026', value: '22–23' }

const ALL_STATS = [...YUGEN.stats, EXTRA_STAT]

const STAT_SUBTEXTS: Record<string, string> = {
  Edition:       'Consecutive years',
  Committees:    'Active councils',
  Delegates:     'Expected participants',
  'Schools':     'Partner institutions',
  'August 2026': 'Conference dates',
}

function StatCard({ stat, index }: { stat: { label: string; value: string }; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const numericTarget = parseInt(stat.value.replace(/\D/g, ''), 10)
  const isNumeric = !isNaN(numericTarget) && !/[–\-]/.test(stat.value)
  const countVal = useCountUp(isNumeric ? numericTarget : 0, 1800, inView)
  const displayVal = isNumeric
    ? (stat.value.includes('+') ? `${countVal}+` : String(countVal))
    : stat.value

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="group relative overflow-hidden bg-surface-raised px-6 py-8 text-center md:py-10 transition-all duration-300 hover:bg-white/[0.07]"
    >
      {/* Top accent line */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-berry/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      <p className="font-display text-4xl uppercase tracking-tight text-yugen-white md:text-5xl xl:text-6xl tabular-nums">
        {displayVal}
      </p>
      <p className="label-caps mt-3">{stat.label}</p>
      <p className="mt-1 text-[10px] text-dim/60">{STAT_SUBTEXTS[stat.label] ?? ''}</p>
    </motion.div>
  )
}

export function StatsSection() {
  return (
    <section className="border-b border-yugen bg-surface">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-2xl border border-yugen bg-yugen-border md:grid-cols-5"
          style={{ boxShadow: '0 0 0 1px rgba(255,255,255,0.04), 0 8px 48px rgba(0,0,0,0.4)' }}
        >
          {ALL_STATS.map((stat, i) => (
            <StatCard key={stat.label} stat={stat} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
