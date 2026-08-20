import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'

export function AboutSection() {
  const sg = YUGEN.about.letterFromSG

  return (
    <section id="about" className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <p className="label-caps mb-4">About</p>
        <h2 className="section-title max-w-3xl">{YUGEN.about.headline}</h2>

        <div className="mt-10 grid gap-6 md:grid-cols-2 md:gap-10">
          {YUGEN.about.paragraphs.map((p, i) => (
            <motion.p
              key={p.slice(0, 40)}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="text-base leading-relaxed text-muted"
            >
              {p}
            </motion.p>
          ))}
        </div>

        {/* Info cards */}
        <div className="mt-10 grid gap-3 sm:grid-cols-3">
          {[
            { label: 'Host', value: YUGEN.venueShort, sub: 'Jubilee Hills, Hyderabad' },
            { label: 'Edition', value: YUGEN.edition, sub: 'Est. 2019' },
            { label: 'Dates', value: YUGEN.dates, sub: 'Sat & Sun' },
          ].map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 + i * 0.08, duration: 0.5 }}
              className="group relative overflow-hidden rounded-xl border border-yugen bg-surface p-5 card-hover"
            >
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-berry/30 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
              <p className="label-caps">{item.label}</p>
              <p className="mt-2 font-heading text-lg font-bold text-yugen-white">{item.value}</p>
              <p className="mt-0.5 text-xs text-dim/70">{item.sub}</p>
            </motion.div>
          ))}
        </div>

        {/* SG Letter pull-quote */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-12 relative overflow-hidden rounded-2xl border border-yugen bg-surface-raised p-8 md:p-10"
        >
          {/* Decorative quote mark */}
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-6 top-4 font-display text-[8rem] leading-none text-yugen-white/[0.04] select-none"
          >
            "
          </span>

          {/* Accent left bar */}
          <div className="absolute left-0 top-8 bottom-8 w-1 rounded-r-full bg-gradient-to-b from-accent-berry via-accent-mauve to-transparent" />

          <div className="pl-6">
            <p className="label-caps mb-5 text-accent-mauve">Letter from the Secretary General</p>
            <div className="space-y-4">
              {sg.paragraphs.map((p, i) => (
                <p key={i} className="text-base leading-relaxed text-muted italic">
                  {p}
                </p>
              ))}
            </div>
            <div className="mt-6 flex items-center gap-3">
              {/* Initials avatar */}
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-crimson/30 border border-accent-berry/30">
                <span className="font-display text-sm uppercase text-accent-mauve">
                  {sg.signatoryName.split(' ').map(w => w[0]).join('')}
                </span>
              </div>
              <div>
                <p className="font-heading text-sm font-bold text-yugen-white">{sg.signatoryName}</p>
                <p className="text-xs text-dim">{sg.signatory} · {YUGEN.name}</p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA row */}
        <div className="mt-10 flex flex-wrap gap-3">
          <Link to="/committees" className="btn-primary">Explore committees →</Link>
          <Link to="/team" className="btn-ghost">Meet the team</Link>
          <Link to="/about" className="btn-ghost">Full story</Link>
        </div>
      </motion.div>
    </section>
  )
}
