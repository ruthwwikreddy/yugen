import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'

export function NotifyCTA() {
  return (
    <section className="section-padding mx-auto max-w-7xl">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="relative overflow-hidden rounded-3xl border border-yugen/40 px-8 py-20 text-center md:px-20"
      >
        {/* Animated premium background */}
        <div className="absolute inset-0 bg-surface-raised" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent-crimson/30 via-yugen-black to-accent-berry/20 opacity-80" />
        <div className="absolute inset-0 dot-pattern opacity-40 mix-blend-overlay" />
        
        {/* Animated slow-moving orbs */}
        <div className="absolute -left-1/4 top-0 h-96 w-96 rounded-full bg-accent-berry/20 blur-[128px] mix-blend-screen animate-[pulse-glow_8s_ease-in-out_infinite]" />
        <div className="absolute -right-1/4 bottom-0 h-96 w-96 rounded-full bg-accent-crimson/20 blur-[128px] mix-blend-screen animate-[pulse-glow_10s_ease-in-out_infinite_reverse]" />

        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <p className="font-display text-[clamp(6rem,25vw,18rem)] uppercase leading-none text-yugen-white/[0.02] select-none transform-gpu -rotate-2">
            YŪGEN
          </p>
        </div>

        <div className="relative z-10 max-w-2xl mx-auto">
          <span className="coming-soon-pill bg-yugen-black/50 backdrop-blur-sm border-accent-berry/30 text-accent-mauve">Showcase build</span>
          <h2 className="mt-8 font-heading text-4xl font-bold md:text-5xl lg:text-6xl text-yugen-white leading-tight">
            Experience Yūgen <span className="gradient-text-accent">6.0</span>
          </h2>
          <p className="mx-auto mt-6 text-lg text-muted md:text-xl">
            Explore the committees, secretariat, schedule, and venue that will bring Yūgen 6.0 to life this August.
          </p>
          
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/committees" className="btn-primary text-sm py-4 px-8 min-h-[56px] shadow-[0_8px_32px_rgba(93,33,40,0.6)]">
              Explore committees
            </Link>
            <Link to="/team" className="btn-ghost text-sm py-4 px-8 min-h-[56px] bg-yugen-black/40 backdrop-blur-md">
              Meet the team
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-3 text-xs text-dim font-medium uppercase tracking-wider">
            <span className="h-px w-8 bg-yugen-border" />
            Join 200+ delegates on <a href={YUGEN.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="text-accent-mauve hover:text-yugen-white transition-colors">{YUGEN.social.instagram}</a>
            <span className="h-px w-8 bg-yugen-border" />
          </div>
        </div>
      </motion.div>
    </section>
  )
}
