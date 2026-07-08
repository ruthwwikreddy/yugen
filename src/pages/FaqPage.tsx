import type { ReactNode } from 'react'
import { PageLayout, FaqAccordion } from '../components/yugen/PageLayout'
import { YUGEN } from '../lib/yugen'
import { NotifyForm } from '../components/yugen/NotifyForm'
import { GATHRLY } from '../lib/partners'

const FAQ_ANSWER_OVERRIDES: Record<string, ReactNode> = {
  'When does registration open?': (
    <>
      Registration is not live yet. When it opens, delegate slots and UPI payment will run on{' '}
      <a href={GATHRLY.eventTechnology} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
        Gathrly
      </a>
      , our event registration technology partner. Use the Get Notified form and we will email you the moment registration goes live.
    </>
  ),
}

const faqItems = YUGEN.faq.map((item) => ({
  q: item.q,
  a: FAQ_ANSWER_OVERRIDES[item.q] ?? item.a,
}))

export function FaqPage() {
  return (
    <PageLayout
      title="FAQ | Yūgen Summit 6.0"
      description="Frequently asked questions about Yūgen Summit 6.0 — dates, registration, committees, dress code, and more."
      path="/faq"
      eyebrow="FAQ"
      headline="Questions answered"
      subheadline="Everything delegates, faculty advisors, and chairs need to know — updated as details are confirmed."
    >
      <FaqAccordion items={faqItems} />
      <div className="mt-16 rounded-xl border border-yugen bg-surface-raised p-8">
        <h2 className="font-heading text-xl font-bold">Still have questions?</h2>
        <p className="mt-2 text-sm text-muted">Join the notify list or email the secretariat.</p>
        <div className="mt-6 max-w-md">
          <NotifyForm id="faq-notify" compact />
        </div>
      </div>
    </PageLayout>
  )
}
