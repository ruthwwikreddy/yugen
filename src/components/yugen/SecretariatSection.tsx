import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { EasterEggSecretary } from './EasterEggSecretary'

type Member = { name: string; role: string; initials: string; image?: string }

const SECRETARY_GENERAL_TRIGGER = 'Dhruv Methukupally'

function TeamCard({ member, index, accent }: { member: Member; index: number; accent: 'secretariat' | 'usg' }) {
  const accentStyles =
    accent === 'secretariat'
      ? 'border-yugen-border-strong hover:border-accent-berry'
      : 'border-yugen-border hover:border-yugen-border-strong'

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ delay: index * 0.05, duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: -3 }}
      className={`group relative overflow-hidden rounded-md border bg-yugen-surface transition-colors duration-300 ${accentStyles}`}
    >
      {/* top hairline */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-yugen-border-strong to-transparent" />

      <div className="px-6 pb-6 pt-7">
        {/* role label with leading line */}
        <div className="flex items-center gap-2">
          <span className="h-px w-4 bg-yugen-border-strong" aria-hidden="true" />
          <span className="label-caps text-[10px] text-dim">{member.role}</span>
        </div>

        {/* initials watermark (very subtle) */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -right-2 -top-3 font-display text-[88px] leading-none text-yugen-white/[0.04] select-none"
        >
          {member.initials}
        </span>

        {/* name */}
        <h3 className="mt-5 font-heading text-xl font-bold leading-tight text-yugen-white sm:text-2xl">
          {member.name === SECRETARY_GENERAL_TRIGGER && member.role === 'Secretary General' ? (
            <EasterEggSecretary text={member.name} />
          ) : (
            member.name
          )}
        </h3>

        {/* footer accent bar */}
        <div className="mt-5 h-px w-full bg-yugen-border" aria-hidden="true" />
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-dim">
          <span>Yūgen 6.0</span>
          <span className="text-yugen-white/40 transition-colors group-hover:text-accent-mauve">
            {member.initials}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function SecretariatSection() {
  return (
    <section id="secretariat" className="border-t border-yugen bg-surface section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label-caps mb-4">Secretariat &amp; OC</p>
          <h2 className="section-title">The team behind Yūgen 6.0</h2>
          <p className="mt-4 max-w-xl text-muted">
            Meet the secretariat and organizing committee driving the vision and operations of Yūgen Summit 6.0.
          </p>
        </motion.div>

        <div className="mt-14">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-yugen-white">
              Secretariat
            </h3>
            <span className="text-xs text-dim">{YUGEN.secretariat.length} members</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {YUGEN.secretariat.map((member, i) => (
              <TeamCard key={`sec-${member.role}-${member.name}`} member={member} index={i} accent="secretariat" />
            ))}
          </div>
        </div>

        <div className="mt-16">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-yugen-white">
              Organizing Committee &amp; USGs
            </h3>
            <span className="text-xs text-dim">{YUGEN.team.usgs.length} members</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {YUGEN.team.usgs.map((member, i) => (
              <TeamCard key={`usg-${member.role}-${member.name}`} member={member} index={i} accent="usg" />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
