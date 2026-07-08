import { PageLayout } from '../components/yugen/PageLayout'
import { getAwards } from '../lib/yugen'

export function AwardsPage() {
  const awards = getAwards()

  return (
    <PageLayout
      title="Awards | Yūgen Summit 6.0"
      description="Awards and recognition at Yūgen Summit 6.0 — Best Delegate, High Commendation, Special Mention, and more."
      path="/awards"
      eyebrow="Awards"
      headline="Recognition &amp; awards"
      subheadline="Award categories and criteria publish with committee announcements. Placeholders below until confirmed."
    >
      <div className="grid gap-4 md:grid-cols-2">
        {awards.map((award) => (
          <div key={award.name} className="rounded-lg border border-yugen bg-surface-raised p-6">
            <div className="flex items-start justify-between gap-4">
              <h2 className="font-heading text-lg font-bold">{award.name}</h2>
              <span className="coming-soon-pill shrink-0 text-[9px]">TBA</span>
            </div>
            <p className="mt-3 text-sm text-muted">{award.description}</p>
            {award.criteria && (
              <p className="mt-3 text-xs text-dim">Criteria: {award.criteria}</p>
            )}
          </div>
        ))}
      </div>
    </PageLayout>
  )
}
