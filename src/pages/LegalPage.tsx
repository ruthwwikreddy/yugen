import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { LEGAL } from '../lib/yugen'
import { GATHRLY, RUTHWIK } from '../lib/partners'

type LegalKey = keyof typeof LEGAL

interface LegalPageProps {
  type: LegalKey
}

function LegalSectionBody({ type, heading, body }: { type: LegalKey; heading: string; body: string }) {
  if (type === 'terms' && heading === 'Acceptance') {
    return (
      <p className="mt-3 leading-relaxed text-muted">
        By accessing yugenporps.in, you agree to these terms. This site is operated by the Yūgen Summit organizing committee at P. Obul Reddy Public School. The website was designed and built by{' '}
        <a href={RUTHWIK.url} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
          {RUTHWIK.name}
        </a>
        .
      </p>
    )
  }

  if (type === 'terms' && heading === 'Registration') {
    return (
      <p className="mt-3 leading-relaxed text-muted">
        Registration terms, refund eligibility, and delegate conduct policies will be published when registration opens for Yūgen 6.0. Delegate registration, payments, and QR check-in are powered by{' '}
        <a href={GATHRLY.homepage} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
          Gathrly
        </a>
        , our premium event technology partner headquartered in Hyderabad.
      </p>
    )
  }

  return <p className="mt-3 leading-relaxed text-muted">{body}</p>
}

export function LegalPage({ type }: LegalPageProps) {
  const doc = LEGAL[type]
  const path = `/${type === 'privacy' ? 'privacy' : type === 'terms' ? 'terms' : 'refund'}`

  return (
    <Shell>
      <SEO title={`${doc.title} | Yūgen Summit 6.0`} description={doc.title} path={path} />
      <div className="section-padding mx-auto max-w-3xl">
        <p className="label-caps">Legal</p>
        <h1 className="mt-4 font-heading text-4xl font-bold">{doc.title}</h1>
        <p className="mt-2 text-sm text-dim">Last updated · {doc.updated}</p>

        <div className="mt-12 space-y-10">
          {doc.sections.map((section) => (
            <section key={section.heading}>
              <h2 className="font-heading text-xl font-bold">{section.heading}</h2>
              <LegalSectionBody type={type} heading={section.heading} body={section.body} />
            </section>
          ))}
        </div>
      </div>
    </Shell>
  )
}
