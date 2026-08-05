import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { PageLayout } from '../components/yugen/PageLayout'
import { YUGEN } from '../lib/yugen'

export function VenuePage() {
  const v = YUGEN.venueDetail
  const mapsHref =
    v.mapUrl ||
    `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(v.address)}`

  return (
    <PageLayout
      title="Venue | Yūgen Summit 6.0"
      description="Yūgen Summit 6.0 is hosted at DDMS AMS P. Obul Reddy Public School, Road No. 45, Jubilee Hills, Hyderabad."
      path="/venue"
      eyebrow="Venue"
      headline={YUGEN.venue}
      subheadline="Road No. 45, Jubilee Hills, Hyderabad, Telangana 500033"
    >
      {/* Top split: address card + map */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Address card */}
        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="lg:col-span-2 flex flex-col justify-between rounded-xl border border-yugen bg-surface-raised p-8"
        >
          <div>
            <p className="label-caps">School &amp; Address</p>
            <p className="mt-4 font-display text-3xl uppercase leading-tight">
              {YUGEN.venue}
            </p>
            <p className="mt-3 text-sm text-muted">{v.address}</p>

            <dl className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <div>
                <dt className="label-caps text-dim">City</dt>
                <dd className="mt-1 text-yugen-white">{YUGEN.city}</dd>
              </div>
              <div>
                <dt className="label-caps text-dim">Pin</dt>
                <dd className="mt-1 text-yugen-white">500033</dd>
              </div>
              <div>
                <dt className="label-caps text-dim">Area</dt>
                <dd className="mt-1 text-yugen-white">Jubilee Hills</dd>
              </div>
              <div>
                <dt className="label-caps text-dim">State</dt>
                <dd className="mt-1 text-yugen-white">Telangana</dd>
              </div>
            </dl>
          </div>

          <a
            href={mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary mt-8 inline-flex w-full justify-center sm:w-auto"
          >
            Open in Google Maps ↗
          </a>
        </motion.aside>

        {/* Map */}
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

      {/* Getting here */}
      <section className="mt-16">
        <p className="label-caps mb-4">Getting here</p>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">On campus at PORPS</h2>
        <p className="mt-3 max-w-2xl text-muted">
          Yūgen 6.0 takes place across the DDMS AMS P. Obul Reddy Public School campus
          on Road No. 45, Jubilee Hills. Plan your travel and arrival with the notes below.
        </p>

        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {[
            { title: 'Parking', body: v.parking },
            { title: 'Accessibility', body: v.accessibility },
            { title: 'Committee rooms', body: v.committeeRooms },
          ].map((item) => (
            <div key={item.title} className="rounded-lg border border-yugen bg-surface p-6">
              <p className="label-caps">{item.title}</p>
              <p className="mt-3 text-sm text-muted">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Travel */}
      <section className="mt-16 grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-yugen bg-yugen-black p-8">
          <p className="label-caps">Travel</p>
          <h3 className="mt-3 font-heading text-xl font-bold">Travel &amp; accommodation</h3>
          <p className="mt-2 text-sm text-muted">
            Outstation delegations can find travel options and hotel guidance on the
            accommodation page.
          </p>
          <Link to="/accommodation" className="btn-ghost mt-6 inline-flex">
            View accommodation guide
          </Link>
        </div>

        <div className="rounded-xl border border-yugen bg-yugen-black p-8">
          <p className="label-caps">In doubt?</p>
          <h3 className="mt-3 font-heading text-xl font-bold">Contact the secretariat</h3>
          <p className="mt-2 text-sm text-muted">
            For campus entry, gate access, or directions, reach the Yūgen secretariat
            before conference day.
          </p>
          <Link to="/contact" className="btn-ghost mt-6 inline-flex">
            Contact the secretariat
          </Link>
        </div>
      </section>
    </PageLayout>
  )
}
