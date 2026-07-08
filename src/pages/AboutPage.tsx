import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { YUGEN } from '../lib/yugen'

export function AboutPage() {
  const { letterFromSG } = YUGEN.about

  return (
    <PageLayout
      title="About | Yūgen Summit 6.0"
      description="About Yūgen Summit 6.0 — Hyderabad's inter-school MUN at P. Obul Reddy Public School. Six editions of making every voice matter."
      path="/about"
      eyebrow="About"
      headline={YUGEN.about.headline}
      subheadline={YUGEN.tagline}
    >
      <div className="grid gap-12 lg:grid-cols-2">
        <div className="space-y-6">
          {YUGEN.about.paragraphs.map((p) => (
            <p key={p.slice(0, 30)} className="leading-relaxed text-muted">{p}</p>
          ))}
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: 'Host', value: YUGEN.venueShort },
              { label: 'Edition', value: YUGEN.edition },
              { label: 'City', value: YUGEN.city },
            ].map((item) => (
              <div key={item.label} className="rounded-lg border border-yugen bg-surface p-4">
                <p className="label-caps">{item.label}</p>
                <p className="mt-2 font-heading font-semibold">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        <blockquote className="rounded-xl border border-yugen bg-surface-raised p-8">
          <p className="label-caps">Letter from the Secretary General</p>
          <div className="mt-6 space-y-4">
            {letterFromSG.paragraphs.map((p) => (
              <p key={p.slice(0, 30)} className="text-sm leading-relaxed text-muted">{p}</p>
            ))}
          </div>
          <footer className="mt-8 border-t border-yugen pt-6">
            <p className="font-heading font-bold">{letterFromSG.signatoryName}</p>
            <p className="text-sm text-dim">{letterFromSG.signatory}</p>
          </footer>
        </blockquote>
      </div>

      <div className="mt-16 flex flex-wrap gap-4">
        <Link to="/team" className="btn-ghost">Meet the team</Link>
        <Link to="/#legacy" className="btn-ghost">Past editions</Link>
      </div>
    </PageLayout>
  )
}
