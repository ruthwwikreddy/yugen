import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { ComingSoonBlock } from '../components/yugen/ComingSoonBlock'
import { EARLY_BIRD_REGISTER_PATH } from '../config/features'
import { YUGEN } from '../lib/yugen'
import { GATHRLY } from '../lib/partners'

export function DelegatesPage() {
  const hasDressCode = YUGEN.dressCode.length > 0

  return (
    <PageLayout
      title="Delegate Guide | Yūgen Summit 6.0"
      description="Delegate handbook for Yūgen Summit 6.0 — what to bring, code of conduct, registration, and dress code."
      path="/delegates"
      eyebrow="Delegates"
      headline="Delegate handbook"
      subheadline={YUGEN.delegatesGuide.intro}
      cta={{ label: 'Register now', href: EARLY_BIRD_REGISTER_PATH }}
    >
      <div className="grid gap-8 lg:grid-cols-3">
        {YUGEN.delegatesGuide.sections.map((section) => (
          <div key={section.title} className="rounded-lg border border-yugen bg-surface-raised p-6">
            <h2 className="font-heading text-lg font-bold">{section.title}</h2>
            <ul className="mt-4 space-y-2">
              {section.items.map((item) => (
                <li key={item} className="flex gap-2 text-sm text-muted">
                  <span className="text-dim">—</span>
                  {item}
                </li>
              ))}
            </ul>
            {section.title === 'Registration process' && (
              <p className="mt-4 text-sm text-muted">
                Registration opens on{' '}
                <a href={GATHRLY.homepage} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
                  Gathrly
                </a>
                , our event registration technology partner for Yūgen 6.0.
              </p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12">
        {hasDressCode ? (
          <div className="grid gap-4 md:grid-cols-2">
            {YUGEN.dressCode.map((item) => (
              <div key={item.title} className="rounded-lg border border-yugen bg-surface p-6">
                <h3 className="font-heading font-bold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
            ))}
          </div>
        ) : (
          <ComingSoonBlock
            eyebrow="Dress code"
            title="Attire guidelines publishing soon"
            description="Western formal, cultural formal, and session-specific rules will appear here and on the home page."
          />
        )}
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/resources" className="btn-ghost">Resources &amp; PDFs</Link>
        <Link to="/faq" className="btn-ghost">FAQ</Link>
        <Link to="/accommodation" className="btn-ghost">Accommodation</Link>
      </div>
    </PageLayout>
  )
}
