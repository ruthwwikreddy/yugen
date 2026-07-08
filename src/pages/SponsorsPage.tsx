import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { ComingSoonBlock } from '../components/yugen/ComingSoonBlock'
import { YUGEN } from '../lib/yugen'
import { GATHRLY } from '../lib/partners'

export function SponsorsPage() {
  const hasSponsors = YUGEN.sponsors.length > 0

  return (
    <PageLayout
      title="Sponsors | Yūgen Summit 6.0"
      description="Partners and sponsors of Yūgen Summit 6.0 at P. Obul Reddy Public School, Hyderabad."
      path="/sponsors"
      eyebrow="Sponsors"
      headline="Partners &amp; sponsors"
      subheadline="Organizations that make Yūgen possible. Our event registration and QR check-in partner is Gathrly."
    >
      {hasSponsors ? (
        <div className="space-y-12">
          <p className="text-sm leading-relaxed text-muted">
            <a href={GATHRLY.eventTechnology} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
              Gathrly
            </a>{' '}
            is our premium event technology partner — branded registration, UPI payments, and QR gate check-in for Yūgen 6.0.
            Additional title, gold, and silver sponsors announce soon.
          </p>
          {(['title', 'gold', 'silver', 'partner'] as const).map((tier) => {
            const tierSponsors = YUGEN.sponsors.filter((s) => s.tier === tier)
            if (tierSponsors.length === 0) return null
            return (
              <section key={tier}>
                <h2 className="label-caps mb-6">{tier} sponsors</h2>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {tierSponsors.map((s) => {
                    const content = s.logo ? (
                      <img src={s.logo} alt={s.name} className="max-h-12 max-w-full grayscale" />
                    ) : (
                      <span className="font-heading text-sm font-semibold">{s.name}</span>
                    )

                    return (
                      <div key={s.name} className="flex h-24 items-center justify-center rounded-lg border border-yugen bg-surface-raised p-4">
                        {s.url ? (
                          <a
                            href={s.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex h-full w-full items-center justify-center hover:opacity-80"
                          >
                            {content}
                          </a>
                        ) : (
                          content
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>
      ) : (
        <>
          <p className="mb-8 text-sm leading-relaxed text-muted">
            <a href={GATHRLY.homepage} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
              Gathrly
            </a>{' '}
            is our premium event technology partner — powering branded registration, UPI payments, and QR gate check-in for Yūgen 6.0.
            Title, gold, and silver sponsor tiers announce soon.
          </p>
          <ComingSoonBlock
            title="Additional sponsor roster announcing soon"
            description="Interested in sponsoring? Email hello@yugenporps.in."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {['Title sponsor', 'Gold', 'Silver', 'Partner'].map((tier) => (
              <div key={tier} className="flex h-24 items-center justify-center rounded-lg border border-dashed border-yugen bg-surface p-4">
                <span className="text-sm text-dim">{tier} · TBA</span>
              </div>
            ))}
          </div>
        </>
      )}

      <Link to="/contact" className="btn-ghost mt-10 inline-flex">Partner with Yūgen</Link>
    </PageLayout>
  )
}
