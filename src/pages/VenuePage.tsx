import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { ComingSoonBlock } from '../components/yugen/ComingSoonBlock'
import { YUGEN } from '../lib/yugen'

export function VenuePage() {
  const v = YUGEN.venueDetail

  return (
    <PageLayout
      title="Venue | Yūgen Summit 6.0"
      description="Venue information for Yūgen Summit 6.0 at P. Obul Reddy Public School, Hyderabad."
      path="/venue"
      eyebrow="Venue"
      headline="On campus at PORPS"
      subheadline={`${YUGEN.venue}, ${YUGEN.city}`}
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-yugen bg-surface-raised p-8">
          <p className="label-caps">Address</p>
          <p className="mt-3 font-heading text-xl font-bold">{v.address}</p>
          {v.mapUrl ? (
            <a href={v.mapUrl} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-6 inline-flex">
              Open in Maps
            </a>
          ) : (
            <span className="coming-soon-pill mt-6 inline-flex">Map · TBA</span>
          )}
        </div>

        <ComingSoonBlock
          eyebrow="Campus map"
          title="Interactive map coming soon"
          description="Committee room assignments and campus navigation publish with the final roster."
          compact
        />
      </div>

      <div className="mt-10 grid gap-4 md:grid-cols-3">
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

      <Link to="/accommodation" className="btn-ghost mt-10 inline-flex">Travel &amp; accommodation</Link>
    </PageLayout>
  )
}
