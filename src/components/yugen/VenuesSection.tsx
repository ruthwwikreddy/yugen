import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'

export function VenuesSection() {
  const v = YUGEN.venueDetail

  return (
    <section id="venues" className="border-t border-yugen bg-surface section-padding relative overflow-hidden">
      {/* Decorative dot pattern */}
      <div className="absolute inset-0 dot-pattern opacity-30 pointer-events-none" />

      <div className="mx-auto max-w-7xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="label-caps mb-4 text-accent-mauve">Venue</p>
            <h2 className="section-title">On campus at PORPS</h2>
          </div>
          <Link to="/venue" className="btn-ghost shrink-0 group">
            Open venue guide
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1 ml-1">→</span>
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Address card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-between rounded-2xl border border-yugen bg-surface-raised p-8 relative overflow-hidden group card-hover"
          >
            {/* Top gradient border on hover */}
            <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-berry to-accent-mauve opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
            
            <div className="relative z-10">
              <p className="label-caps text-accent-mauve">Main venue</p>
              <p className="mt-5 font-display text-3xl uppercase leading-tight sm:text-4xl">
                {YUGEN.venue}
              </p>
              <p className="mt-2 text-base text-muted">
                {YUGEN.city}, {YUGEN.country}
              </p>

              <dl className="mt-8 grid grid-cols-2 gap-y-6 gap-x-4 text-sm">
                <div>
                  <dt className="label-caps text-dim mb-1">Address</dt>
                  <dd className="font-medium text-yugen-white">Jubilee Hills</dd>
                </div>
                <div>
                  <dt className="label-caps text-dim mb-1">Pin</dt>
                  <dd className="font-medium text-yugen-white">500033</dd>
                </div>
                <div>
                  <dt className="label-caps text-dim mb-1">Area</dt>
                  <dd className="font-medium text-yugen-white">Road No. 45</dd>
                </div>
                <div>
                  <dt className="label-caps text-dim mb-1">State</dt>
                  <dd className="font-medium text-yugen-white">Telangana</dd>
                </div>
              </dl>
            </div>

            <a
              href={v.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary mt-10 inline-flex w-full justify-center sm:w-auto relative z-10"
            >
              Open in Maps ↗
            </a>
          </motion.aside>

          {/* Map preview */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-3 overflow-hidden rounded-2xl border border-yugen bg-surface-raised p-2 card-hover"
          >
            <div className="aspect-[16/10] w-full overflow-hidden rounded-xl relative group">
              <div className="absolute inset-0 bg-yugen-black/20 group-hover:bg-transparent transition-colors duration-500 pointer-events-none z-10" />
              <iframe
                src={v.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`${YUGEN.venue} location map`}
                className="h-full w-full grayscale transition-all duration-700 group-hover:grayscale-0 group-hover:scale-105"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
