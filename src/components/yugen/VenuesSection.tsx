import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'

export function VenuesSection() {
  const v = YUGEN.venueDetail

  return (
    <section id="venues" className="border-t border-yugen bg-surface section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between"
        >
          <div>
            <p className="label-caps mb-4">Venue</p>
            <h2 className="section-title">On campus at PORPS</h2>
          </div>
          <Link to="/venue" className="btn-ghost shrink-0">
            Open venue guide →
          </Link>
        </motion.div>

        <div className="mt-12 grid gap-6 lg:grid-cols-5">
          {/* Address card */}
          <motion.aside
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2 flex flex-col justify-between rounded-xl border border-yugen bg-surface-raised p-8"
          >
            <div>
              <p className="label-caps">Main venue</p>
              <p className="mt-4 font-display text-2xl uppercase leading-tight sm:text-3xl">
                {YUGEN.venue}
              </p>
              <p className="mt-2 text-sm text-muted">
                {YUGEN.city}, {YUGEN.country}
              </p>

              <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
                <div>
                  <dt className="label-caps text-dim">Address</dt>
                  <dd className="mt-1 text-yugen-white">Jubilee Hills</dd>
                </div>
                <div>
                  <dt className="label-caps text-dim">Pin</dt>
                  <dd className="mt-1 text-yugen-white">500033</dd>
                </div>
                <div>
                  <dt className="label-caps text-dim">Area</dt>
                  <dd className="mt-1 text-yugen-white">Road No. 45</dd>
                </div>
                <div>
                  <dt className="label-caps text-dim">State</dt>
                  <dd className="mt-1 text-yugen-white">Telangana</dd>
                </div>
              </dl>
            </div>

            <a
              href={v.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-ghost mt-8 inline-flex w-full justify-center sm:w-auto"
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
            className="lg:col-span-3 overflow-hidden rounded-xl border border-yugen bg-surface-raised p-2"
          >
            <div className="aspect-[16/10] w-full overflow-hidden rounded-lg">
              <iframe
                src={v.mapEmbedUrl}
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="strict-origin-when-cross-origin"
                title={`${YUGEN.venue} location map`}
                className="h-full w-full grayscale"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
