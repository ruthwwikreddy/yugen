import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'

export function RegisterPage() {
  return (
    <Shell>
      <SEO
        title="Register | Yūgen Summit 6.0"
        description="This site is a showcase build — registration is handled by the Yūgen Summit secretariat."
        path="/register"
      />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <span className="coming-soon-pill">Showcase mode</span>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-tight sm:mt-6 sm:text-5xl md:text-6xl">
            Registration handled by the secretariat
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
            Yūgen Summit 6.0 is a showcase build. All delegate, chair, and OC onboarding
            runs through the secretariat directly — there is no public registration flow on this site.
          </p>

          <div className="mt-8 grid gap-4 sm:mt-10 sm:grid-cols-3">
            <div className="rounded-lg border border-yugen bg-surface-raised p-5">
              <p className="label-caps">Delegates</p>
              <p className="mt-2 text-sm text-muted">
                Slots are allocated via partner schools and the Gathrly organiser dashboard.
              </p>
            </div>
            <div className="rounded-lg border border-yugen bg-surface-raised p-5">
              <p className="label-caps">Chairs &amp; IP</p>
              <p className="mt-2 text-sm text-muted">
                Chair and International Press roles are filled through invited applications.
              </p>
            </div>
            <div className="rounded-lg border border-yugen bg-surface-raised p-5">
              <p className="label-caps">OC</p>
              <p className="mt-2 text-sm text-muted">
                OC members onboard through the secretariat&apos;s internal portal.
              </p>
            </div>
          </div>

          <div className="mt-10 rounded-xl border border-yugen bg-yugen-black p-8 text-center">
            <p className="label-caps">Need access?</p>
            <p className="mt-3 text-sm text-muted">
              For registration queries, contact the secretariat directly.
            </p>
            <a href="mailto:hello@yugenporps.in" className="btn-primary mt-6 inline-flex">
              Email the secretariat
            </a>
          </div>
        </div>
      </div>
    </Shell>
  )
}
