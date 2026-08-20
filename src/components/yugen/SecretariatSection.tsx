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
      whileHover={{ y: -4 }}
      className={`group relative overflow-hidden rounded-xl border bg-yugen-surface card-hover ${accentStyles}`}
    >
      {/* top hairline gradient */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-accent-berry/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      {/* Background photo logic */}
      {member.image && (
        <>
          <div className="absolute inset-0 bg-cover bg-center opacity-30 grayscale transition-all duration-500 group-hover:opacity-60 group-hover:grayscale-0" style={{ backgroundImage: `url(${member.image})` }} />
          <div className="absolute inset-0 bg-gradient-to-t from-yugen-surface via-yugen-surface/90 to-transparent" />
        </>
      )}

      <div className="relative z-10 px-6 pb-6 pt-7 min-h-[180px] flex flex-col justify-end">
        {/* role label with leading line */}
        <div className="flex items-center gap-2 mb-auto pb-4">
          <span className="h-px w-4 bg-accent-mauve" aria-hidden="true" />
          <span className="label-caps text-[10px] text-accent-mauve">{member.role}</span>
        </div>

        {/* initials watermark (very subtle) */}
        {!member.image && (
          <span
            aria-hidden="true"
            className="pointer-events-none absolute right-0 top-0 -translate-y-4 translate-x-2 font-display text-[100px] leading-none text-yugen-white/[0.03] select-none transition-colors duration-300 group-hover:text-yugen-white/[0.06]"
          >
            {member.initials}
          </span>
        )}

        {/* name */}
        <h3 className="mt-5 font-heading text-xl font-bold leading-tight text-yugen-white sm:text-2xl transition-colors group-hover:text-yugen-white">
          {member.name === SECRETARY_GENERAL_TRIGGER && member.role === 'Secretary General' ? (
            <EasterEggSecretary text={member.name} />
          ) : (
            member.name
          )}
        </h3>

        {/* footer accent bar */}
        <div className="mt-5 h-px w-full bg-yugen-border/50 transition-colors group-hover:bg-yugen-border" aria-hidden="true" />
        <div className="mt-3 flex items-center justify-between text-[10px] uppercase tracking-[0.18em] text-dim">
          <span>Yūgen 6.0</span>
          <span className="text-accent-berry/40 transition-colors group-hover:text-accent-mauve font-bold">
            {member.initials}
          </span>
        </div>
      </div>
    </motion.article>
  )
}

export function SecretariatSection() {
  return (
    <section id="secretariat" className="border-t border-yugen bg-surface section-padding relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label-caps mb-4 text-accent-mauve">Secretariat &amp; OC</p>
          <h2 className="section-title">The team behind Yūgen 6.0</h2>
          <p className="mt-4 max-w-xl text-muted">
            Meet the secretariat and organizing committee driving the vision and operations of Yūgen Summit 6.0.
          </p>
        </motion.div>

        <div className="mt-14 relative">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-yugen-white flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-berry" />
              Secretariat
            </h3>
            <span className="text-xs font-semibold tracking-wider text-accent-mauve uppercase">{YUGEN.secretariat.length} members</span>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
            {YUGEN.secretariat.map((member, i) => (
              <TeamCard key={`sec-${member.role}-${member.name}`} member={member} index={i} accent="secretariat" />
            ))}
          </div>
        </div>

        <div className="mt-20 relative">
          <div className="mb-6 flex items-end justify-between gap-4">
            <h3 className="font-heading text-lg font-bold uppercase tracking-wider text-yugen-white flex items-center gap-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-berry/50" />
              Organizing Committee &amp; USGs
            </h3>
            <span className="text-xs font-semibold tracking-wider text-dim uppercase">{YUGEN.team.usgs.length} members</span>
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
