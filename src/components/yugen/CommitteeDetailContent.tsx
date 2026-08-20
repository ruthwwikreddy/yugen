import { motion } from 'framer-motion'
import { type ReactNode } from 'react'
import type { Committee } from '../../lib/yugen'
import { YUGEN } from '../../lib/yugen'

function Section({ title, children, delay = 0 }: { title: string; children: ReactNode; delay?: number }) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mt-16"
    >
      <h2 className="font-heading text-xl font-bold uppercase tracking-wider text-yugen-white flex items-center gap-3">
        <span className="h-2 w-2 rounded-full bg-accent-berry" />
        {title}
      </h2>
      <div className="mt-6 border-t border-yugen pt-6">{children}</div>
    </motion.section>
  )
}

function ChairCard({ name, role }: { name: string; role: string }) {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-yugen bg-surface p-5 card-hover flex items-center gap-4">
      {/* Glow hover effect */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent-berry/50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-raised border border-yugen-strong transition-colors group-hover:border-accent-berry/50">
        <span className="font-display text-lg uppercase text-yugen-white/40 group-hover:text-accent-mauve transition-colors">
          {name.charAt(0)}
        </span>
      </div>
      <div>
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-accent-mauve">{role}</p>
        <p className="mt-0.5 text-base font-semibold text-yugen-white group-hover:text-yugen-white/90 transition-colors">{name}</p>
      </div>
    </div>
  )
}

export function CommitteeDetailContent({ committee }: { committee: Committee }) {
  const whatsappUrl = YUGEN.whatsapp.groups.find(g => g.id === committee.id)?.url

  return (
    <div className="grid gap-12 lg:grid-cols-[1fr_300px] xl:gap-20 relative">
      <div className="min-w-0">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="prose prose-invert max-w-none prose-p:text-muted prose-headings:text-yugen-white prose-a:text-accent-mauve prose-a:no-underline hover:prose-a:text-yugen-white"
        >
          <p className="text-lg leading-relaxed">{committee.description}</p>
        </motion.div>

        {committee.topicExpanded && (
          <Section title="Agenda" delay={0.1}>
            <div className="group relative rounded-xl border border-yugen bg-surface-raised p-5 card-hover">
              <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-0 bg-accent-berry rounded-r transition-all duration-300 group-hover:h-2/3" />
              <p className="font-medium leading-relaxed text-yugen-white sm:text-lg pl-2">{committee.topicExpanded}</p>
            </div>
          </Section>
        )}

        {committee.chairs.length > 0 && (
          <Section title="Executive Board" delay={0.2}>
            <div className="grid gap-4 sm:grid-cols-2">
              {committee.chairs.map((chair, i) => (
                <ChairCard key={i} name={chair.name} role={chair.role} />
              ))}
            </div>
          </Section>
        )}

        {whatsappUrl && (
          <Section title="Communication" delay={0.3}>
            <div className="rounded-xl border border-[#25D366]/30 bg-[#25D366]/5 p-6 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-[#25D366]/10 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div>
                  <h3 className="font-heading text-lg font-bold text-yugen-white">Delegate WhatsApp Group</h3>
                  <p className="text-sm text-dim mt-1 max-w-md">Join this group to receive live updates, study materials, and direct communication from the Executive Board.</p>
                </div>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shrink-0 flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-xs font-bold uppercase tracking-widest text-black transition-all hover:bg-[#25D366]/90 hover:scale-105 shadow-[0_4px_16px_rgba(37,211,102,0.3)]"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                  </svg>
                  Join Group
                </a>
              </div>
            </div>
          </Section>
        )}
      </div>

      {/* Sticky Right Sidebar */}
      <motion.aside
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="hidden lg:block"
      >
        <div className="sticky top-32 rounded-2xl border border-yugen bg-surface-raised p-6 shadow-xl">
          <p className="label-caps mb-4 text-yugen-white/80">Committee Info</p>
          
          <dl className="space-y-5">
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-dim mb-1">Level</dt>
              <dd className="inline-flex items-center rounded-full bg-white/[0.05] border border-white/10 px-2.5 py-1 text-xs font-medium text-yugen-white">
                {committee.difficulty}
              </dd>
            </div>
            
            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-dim mb-1">Type</dt>
              <dd className="text-sm text-yugen-white font-medium">{committee.type}</dd>
            </div>

            <div>
              <dt className="text-xs font-semibold uppercase tracking-wider text-dim mb-1">Size</dt>
              <dd className="text-sm text-yugen-white font-medium">{committee.delegateCapacity} delegates</dd>
            </div>
          </dl>

          <div className="mt-8 pt-8 border-t border-yugen/50 space-y-3">
            <a href={`/allocations`} className="btn-primary w-full text-xs py-3">View Country Matrix</a>
            <a href={`/portfolio-guide`} className="btn-ghost w-full text-xs py-3">Read Portfolio Guide</a>
          </div>
        </div>
      </motion.aside>
    </div>
  )
}
