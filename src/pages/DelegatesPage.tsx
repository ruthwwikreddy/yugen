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

      <section className="mt-16">
        <p className="label-caps mb-4">{YUGEN.whatsapp.label}</p>
        <h2 className="font-heading text-2xl font-bold sm:text-3xl">
          Join your committee&apos;s WhatsApp group
        </h2>
        <p className="mt-3 max-w-2xl text-muted">{YUGEN.whatsapp.description}</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {YUGEN.whatsapp.groups.map((group) => (
            <a
              key={group.id}
              href={group.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between rounded-xl border border-yugen bg-surface-raised p-5 transition-all hover:border-accent-light hover:bg-surface"
            >
              <div>
                <p className="font-display text-lg uppercase tracking-wide text-yugen-white group-hover:text-accent-light">
                  {group.acronym}
                </p>
                <p className="mt-1 text-xs text-dim">{group.name}</p>
              </div>
              <span className="label-caps text-accent-light">Join ↗</span>
            </a>
          ))}
        </div>
      </section>
    </PageLayout>
  )
}
