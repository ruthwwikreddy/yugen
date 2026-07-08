import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { YUGEN } from '../lib/yugen'

export function ApplyPage() {
  return (
    <PageLayout
      title="Apply | Yūgen Summit 6.0"
      description="Apply to chair, join the International Press, or the organizing committee at Yūgen Summit 6.0."
      path="/apply"
      eyebrow="Apply"
      headline="Join the team"
      subheadline="Chair, International Press, and OC applications open when the secretariat announces recruitment."
    >
      <div className="grid gap-6 md:grid-cols-3">
        {YUGEN.apply.map((role) => (
          <div key={role.id} className="rounded-lg border border-yugen bg-surface-raised p-6">
            <span className="coming-soon-pill text-[9px]">Opens soon</span>
            <h2 className="mt-4 font-heading text-xl font-bold">{role.title}</h2>
            <p className="mt-3 text-sm text-muted">{role.description}</p>
            <p className="mt-6 text-xs text-dim">Application form URL — add to yugen.ts when live.</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-lg border border-yugen bg-surface p-6">
        <p className="text-sm text-muted">
          Interested before applications open? Email{' '}
          <a href={`mailto:${YUGEN.email}`} className="text-yugen-white hover:underline">
            {YUGEN.email}
          </a>{' '}
          with your role of interest.
        </p>
      </div>

      <Link to="/team" className="btn-ghost mt-8 inline-flex">View team structure</Link>
    </PageLayout>
  )
}
