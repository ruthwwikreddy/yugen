import { Link } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { NotifyForm } from '../components/yugen/NotifyForm'
import { getPricing, YUGEN } from '../lib/yugen'
import { EARLY_BIRD_AMOUNT } from '../lib/registration'
import { GATHRLY } from '../lib/partners'

export function RegisterPage() {
  const tiers = getPricing()

  return (
    <Shell>
      <SEO
        title="Registration | Yūgen Summit 6.0"
        description="Register for Yūgen Summit 6.0 at PORPS, Hyderabad. Early bird round 1 now open."
        path="/register"
      />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <span className="coming-soon-pill">Registration</span>
          <h1 className="mt-6 font-display text-5xl uppercase tracking-tight md:text-6xl">
            Early bird open
          </h1>
          <p className="mt-4 text-lg text-muted">
            Round 1 early bird registration is live at ₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}. Complete the form,
            pay via UPI, and save your registration ID. Standard and late tiers open later on{' '}
            <a href={GATHRLY.eventTechnology} target="_blank" rel="noopener noreferrer" className="text-yugen-white hover:underline">
              Gathrly
            </a>
            .
          </p>

          <div className="mt-10 rounded-xl border border-yugen-strong bg-surface-raised p-8">
            <p className="label-caps">Round 1 · Early bird</p>
            <p className="mt-2 font-display text-4xl uppercase">₹{EARLY_BIRD_AMOUNT.toLocaleString('en-IN')}</p>
            <p className="mt-2 text-sm text-muted">
              Form → UPI QR (pre-filled amount & ID) → screenshot your registration ID
            </p>
            <Link to="/register/early-bird" className="btn-primary mt-6 inline-flex">
              Register now
            </Link>
          </div>

          <div className="mt-10 rounded-xl border border-yugen bg-surface-raised p-8">
            <h2 className="font-heading text-xl font-bold">Get notified for other tiers</h2>
            <p className="mt-2 text-sm text-muted">Standard and late registration — we&apos;ll email you when they open.</p>
            <div className="mt-6">
              <NotifyForm id="register-notify" />
            </div>
          </div>

          <h2 className="label-caps mt-12 mb-6">Pricing tiers</h2>
          <div className="grid gap-4 md:grid-cols-3">
            {tiers.map((tier) => (
              <div
                key={tier.tier}
                className={`rounded-lg border p-5 ${
                  tier.tier === 'Early bird' ? 'border-yugen-strong bg-surface-raised' : 'border-yugen bg-surface'
                }`}
              >
                <p className="label-caps">{tier.tier}</p>
                <p className="mt-2 font-display text-3xl uppercase text-yugen-white/80">{tier.price}</p>
                <p className="mt-1 text-xs text-dim">{tier.note}</p>
                <ul className="mt-4 space-y-1">
                  {tier.features.map((f) => (
                    <li key={f} className="text-xs text-muted">— {f}</li>
                  ))}
                </ul>
                {tier.tier === 'Early bird' && (
                  <Link to="/register/early-bird" className="btn-ghost mt-4 inline-flex w-full justify-center">
                    Register
                  </Link>
                )}
              </div>
            ))}
          </div>

          <p className="mt-10 text-sm text-dim">
            Questions?{' '}
            <Link to="/faq" className="text-yugen-white underline-offset-4 hover:underline">FAQ</Link>
            {' · '}
            <Link to="/contact" className="text-yugen-white underline-offset-4 hover:underline">Contact</Link>
            {' · '}
            <Link to="/delegates" className="text-yugen-white underline-offset-4 hover:underline">Delegate guide</Link>
            {' · '}
            <a href={`mailto:${YUGEN.email}`} className="text-yugen-white underline-offset-4 hover:underline">{YUGEN.email}</a>
          </p>
        </div>
      </div>
    </Shell>
  )
}
