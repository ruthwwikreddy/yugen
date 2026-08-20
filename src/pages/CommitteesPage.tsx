import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../lib/yugen'
import { CommitteeCard } from '../components/yugen/CommitteeCard'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'

export function CommitteesPage() {
  return (
    <Shell>
      <SEO
        title="Committees | Yūgen 6.0"
        description="Explore the committees and agendas for Yūgen Summit 6.0. Find your forum and prepare for debate."
        path="/committees"
      />
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-28 pb-16 md:pt-40 md:pb-24 border-b border-yugen/40">
        <div className="absolute inset-0 bg-yugen-black">
          <div className="absolute inset-0 dot-pattern opacity-40" />
          {/* Large glowing orbs */}
          <div className="absolute left-1/4 top-0 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-accent-crimson/15 blur-[120px]" />
          <div className="absolute right-1/4 bottom-0 h-[400px] w-[400px] translate-x-1/2 translate-y-1/2 rounded-full bg-accent-berry/15 blur-[100px]" />
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="coming-soon-pill mb-6 bg-yugen-black/50 backdrop-blur-md">Yūgen 6.0 Committees</span>
            <h1 className="font-display text-5xl md:text-7xl lg:text-8xl uppercase text-yugen-white tracking-tight">
              Forums of <span className="gradient-text-accent">Debate</span>
            </h1>
            <p className="mt-6 mx-auto max-w-2xl text-lg text-muted md:text-xl">
              Seven distinct councils spanning international security, human rights, national policy, and specialized agencies.
            </p>
          </motion.div>
        </div>
      </section>

      {/* WhatsApp Groups Banner */}
      <section className="border-b border-yugen/40 bg-surface-raised relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-accent-crimson/10 to-transparent pointer-events-none" />
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6 relative z-10">
          <div>
            <h2 className="font-heading text-xl font-bold text-yugen-white">Join your delegation</h2>
            <p className="text-sm text-dim mt-1">Delegates must join their respective WhatsApp groups for live updates.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {Object.entries(YUGEN.whatsapp).map(([id, url]) => (
              <a
                key={id}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 rounded-full border border-yugen bg-yugen-black px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-muted transition-all hover:border-[#25D366]/50 hover:bg-[#25D366]/10 hover:text-[#25D366]"
              >
                {id}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Committee Grid */}
      <section className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {YUGEN.committees.map((c, i) => (
            <motion.div
              key={c.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: Math.min(i * 0.05, 0.5), duration: 0.5 }}
            >
              <CommitteeCard committee={c} />
            </motion.div>
          ))}
        </div>
        
        {/* Help Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 rounded-2xl border border-yugen bg-surface-raised p-8 text-center md:flex md:items-center md:justify-between md:text-left relative overflow-hidden group"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-accent-berry/10 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
          <div className="relative z-10">
            <h3 className="font-heading text-xl font-bold text-yugen-white">Not sure which committee fits?</h3>
            <p className="mt-2 text-sm text-muted">
              Check out our portfolio guide to understand difficulty levels and council dynamics.
            </p>
          </div>
          <Link to="/portfolio-guide" className="btn-ghost mt-6 shrink-0 md:mt-0 relative z-10 border-yugen-strong hover:border-accent-berry">
            Read guide
          </Link>
        </motion.div>
      </section>
    </Shell>
  )
}
