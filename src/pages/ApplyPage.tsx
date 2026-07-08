import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { YUGEN } from '../lib/yugen'
import { FEATURES } from '../config/features'

const visibleApplyRoles = YUGEN.apply.filter((role) => {
  if (role.id === 'oc') return FEATURES.ocApplications
  if (role.id === 'chair' || role.id === 'ip') return FEATURES.applyApplications
  return true
})

export function ApplyPage() {
  return (
    <PageLayout
      title="Apply | Yūgen Summit 6.0"
      description="Chair and International Press applications for Yūgen Summit 6.0 — opening soon."
      path="/apply"
      eyebrow="Apply"
      headline="Join the team"
      subheadline="Chair, International Press, and OC applications are not open yet. Delegate early bird registration is live."
    >
      <div className={`grid gap-6 ${visibleApplyRoles.length >= 3 ? 'md:grid-cols-3' : visibleApplyRoles.length === 2 ? 'md:grid-cols-2' : 'max-w-xl'}`}>
        {visibleApplyRoles.map((role) => (
          <div key={role.id} className="rounded-lg border border-yugen bg-surface-raised p-6">
            <span className="coming-soon-pill text-[9px]">Coming soon</span>
            <h2 className="mt-4 font-heading text-xl font-bold">{role.title}</h2>
            <p className="mt-3 text-sm text-muted">{role.description}</p>
            <p className="mt-6 text-xs text-dim">Applications opening soon</p>
          </div>
        ))}
      </div>

      {FEATURES.earlyBirdRegistration && (
        <div className="mt-10 rounded-lg border border-yugen-strong bg-surface-raised p-6">
          <p className="label-caps">Delegate registration</p>
          <h2 className="mt-3 font-heading text-xl font-bold">Early bird is open</h2>
          <p className="mt-2 text-sm text-muted">
            Looking to attend as a delegate? Round 1 early bird registration is live now.
          </p>
          <Link to="/register/early-bird" className="btn-primary mt-5 inline-flex">
            Register as delegate
          </Link>
        </div>
      )}

      <div className="mt-10 rounded-lg border border-yugen bg-surface p-6">
        <p className="text-sm text-muted">
          Questions about applications? Email{' '}
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
