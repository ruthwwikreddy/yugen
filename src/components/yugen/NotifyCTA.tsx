import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { EARLY_BIRD_REGISTER_PATH } from '../../config/features'
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
            NOTIFY
          </p>
        </div>
        <div className="relative">
          <span className="coming-soon-pill">Early bird · Live</span>
          <h2 className="mt-6 font-heading text-3xl font-bold md:text-4xl">
            Early bird registration is open
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-muted">
            Round 1 delegate registration is live. Complete the form, pay via UPI, and save your registration ID.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to={EARLY_BIRD_REGISTER_PATH} className="btn-primary">
              Register now
            </Link>
            <Link to="/register" className="btn-ghost">
              View pricing
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
