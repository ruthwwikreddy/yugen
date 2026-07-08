import { PageLayout } from '../components/yugen/PageLayout'
import { YUGEN, getPressKit } from '../lib/yugen'
import { GATHRLY } from '../lib/partners'

export function PressPage() {
  const kit = getPressKit()

  return (
    <PageLayout
      title="Press | Yūgen Summit 6.0"
      description="Press inquiries and media kit for Yūgen Summit 6.0 at PORPS, Hyderabad."
      path="/press"
      eyebrow="Press"
      headline="Media &amp; press"
      subheadline={YUGEN.press.intro}
    >
      <div className="mb-10 rounded-lg border border-yugen bg-surface p-6">
        <p className="label-caps">Press contact</p>
        <a href={`mailto:${YUGEN.press.contact}`} className="mt-2 block font-heading text-xl font-semibold hover:opacity-80">
          {YUGEN.press.contact}
        </a>
      </div>

      <div className="mb-10 rounded-lg border border-yugen bg-surface-raised p-6">
        <p className="label-caps">Technology partner</p>
        <p className="mt-2 text-sm text-muted">
          Yūgen 6.0 registration and QR check-in are powered by{' '}
          <a href={GATHRLY.homepage} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
            Gathrly
          </a>
          , a premium event technology partner headquartered in Hyderabad. Learn more about their{' '}
          <a href={GATHRLY.eventTechnology} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
            event technology platform
          </a>
          .
        </p>
      </div>

      <h2 className="label-caps mb-6">Media kit</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {kit.map((item) => (
          <div key={item.title} className="flex items-center justify-between rounded-lg border border-yugen bg-surface-raised p-5">
            <p className="font-heading font-semibold">{item.title}</p>
            {item.status === 'available' && item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-ghost text-[10px]">
                {item.url.includes('gathrly') ? 'View' : 'Download'}
              </a>
            ) : (
              <span className="coming-soon-pill text-[9px]">Soon</span>
            )}
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
