import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { ComingSoonBlock } from '../components/yugen/ComingSoonBlock'
import { YUGEN } from '../lib/yugen'

export function AccommodationPage() {
  const hasHotels = YUGEN.accommodation.hotels.length > 0

  return (
    <PageLayout
      title="Accommodation | Yūgen Summit 6.0"
      description="Travel and accommodation guidance for outstation delegations attending Yūgen Summit 6.0 in Hyderabad."
      path="/accommodation"
      eyebrow="Accommodation"
      headline="Travel &amp; stay"
      subheadline={YUGEN.accommodation.intro}
    >
      <section>
        <h2 className="label-caps mb-6">Getting to Hyderabad</h2>
        <div className="grid gap-4 md:grid-cols-3">
          {YUGEN.accommodation.travel.map((item) => (
            <div key={item.title} className="rounded-lg border border-yugen bg-surface-raised p-6">
              <h3 className="font-heading font-bold">{item.title}</h3>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="label-caps mb-6">Recommended hotels</h2>
        {hasHotels ? (
          <div className="space-y-4">
            {YUGEN.accommodation.hotels.map((hotel) => (
              <div key={hotel.name} className="rounded-lg border border-yugen bg-surface p-6">
                <p className="font-heading font-bold">{hotel.name}</p>
                {hotel.distance && <p className="mt-1 text-sm text-dim">{hotel.distance} from PORPS</p>}
                {hotel.notes && <p className="mt-2 text-sm text-muted">{hotel.notes}</p>}
              </div>
            ))}
          </div>
        ) : (
          <ComingSoonBlock
            eyebrow="Hotels"
            title="Hotel list publishing soon"
            description="Curated options for outstation faculty advisors and delegations — distances and contacts included."
            compact
          />
        )}
      </section>

      <Link to="/venue" className="btn-ghost mt-10 inline-flex">Venue details</Link>
    </PageLayout>
  )
}
