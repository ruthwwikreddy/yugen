import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'
import { CommitteeCard } from './CommitteeCard'

export function CommitteesSection() {
  return (
    <section className="section-padding mx-auto max-w-7xl relative overflow-hidden">
      {/* Decorative background element */}
      <div className="absolute right-0 top-0 h-[600px] w-[600px] -translate-y-1/4 translate-x-1/3 rounded-full bg-accent-berry/5 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative z-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
      >
        <div>
          <p className="label-caps mb-4 text-accent-mauve">Committees</p>
          <h2 className="section-title">Engage in diplomacy</h2>
        </div>
        <Link to="/committees" className="btn-ghost shrink-0 group">
          View all committees
          <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
        </Link>
      </motion.div>

      {/* Horizontal scroll on mobile, grid on desktop */}
      <div className="relative z-10 mt-12 -mx-4 px-4 sm:mx-0 sm:px-0">
        <div className="flex gap-5 overflow-x-auto pb-8 sm:grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:overflow-visible sm:pb-0 snap-x snap-mandatory hide-scrollbar">
          {YUGEN.committees.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              className="w-[280px] shrink-0 sm:w-auto snap-center"
            >
              <CommitteeCard committee={c} />
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
        className="mt-12 rounded-2xl border border-accent-berry/30 bg-gradient-to-br from-accent-crimson/20 to-surface-raised p-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMiIgY3k9IjIiIHI9IjEiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiLz48L3N2Zz4=')] opacity-50" />
        <div className="relative z-10">
          <h3 className="font-heading text-xl font-bold text-yugen-white">Join the debate</h3>
          <p className="mt-2 text-sm text-muted max-w-md mx-auto">
            Delegates are required to join their respective WhatsApp groups for updates and study materials.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            {Object.entries(YUGEN.whatsapp).map(([id, url]) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-yugen/50 bg-white/[0.03] px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-yugen-white transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:text-[#25D366]"
              >
                <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                {id}
              </a>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  )
}
