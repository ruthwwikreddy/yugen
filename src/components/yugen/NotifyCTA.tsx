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
        className="relative overflow-hidden rounded-2xl border border-yugen bg-surface-raised px-8 py-16 text-center md:px-16"
      >
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <p className="font-display text-[clamp(4rem,20vw,12rem)] uppercase leading-none text-yugen-white/[0.03]">
            YŪGEN
          </p>
        </div>
        <div className="relative">
          <span className="coming-soon-pill">Showcase build</span>
          <h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">
            Experience Yūgen Summit 6.0
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Explore the committees, secretariat, schedule, and venue that will bring Yūgen 6.0 to life this August.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/committees" className="btn-primary">
              Explore committees
            </Link>
            <Link to="/team" className="btn-ghost">
              Meet the team
            </Link>
            <a
              href={YUGEN.social.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost"
            >
              {YUGEN.social.instagram}
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
