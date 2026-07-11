import { Link } from 'react-router-dom'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { NotifyForm } from '../components/yugen/NotifyForm'
import { YUGEN } from '../lib/yugen'

export function RegisterPage() {
  return (
    <Shell>
      <SEO
        title="Registration | Yūgen Summit 6.0"
        description="Register for Yūgen Summit 6.0 at PORPS, Hyderabad. Internal registration now open."
        path="/register"
      />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl">
          <span className="coming-soon-pill">Registration</span>
          <h1 className="mt-4 font-display text-4xl uppercase tracking-tight sm:mt-6 sm:text-5xl md:text-6xl">
            Internal registration open
          </h1>
          <p className="mt-3 text-base leading-relaxed text-muted sm:mt-4 sm:text-lg">
            Round 1 internal registration is live at ₹1,000 for PORPS students. Complete the form,
            pay via UPI or cash, and save your registration ID. External registration coming soon.
          </p>

          <div className="mt-8 rounded-xl border border-yugen-strong bg-surface-raised p-5 sm:mt-10 sm:p-8">
            <p className="label-caps">Round 1 · Internal (PORPS)</p>
            <p className="mt-2 font-display text-3xl uppercase sm:text-4xl">₹1,000</p>
            <p className="mt-2 text-sm text-muted">
              Form → Choose payment (UPI/Cash) → complete registration
            </p>
            <Link to="/register/early-bird" className="btn-primary mt-5 inline-flex w-full justify-center sm:mt-6 sm:w-auto">
              Register now
            </Link>
          </div>

          <div className="mt-8 rounded-xl border border-yugen bg-surface-raised p-5 sm:mt-10 sm:p-8">
            <h2 className="font-heading text-xl font-bold">External registration</h2>
            <p className="mt-2 text-sm text-muted">Registration for external schools opens soon at ₹1,200.</p>
            <div className="mt-6">
              <NotifyForm id="register-notify" />
            </div>
          </div>

          <h2 className="label-caps mt-12 mb-6">Pricing tiers</h2>
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-lg border border-yugen-strong bg-surface-raised p-5">
              <p className="label-caps">Internal (PORPS)</p>
              <p className="mt-2 font-display text-3xl uppercase text-yugen-white">₹1,000</p>
              <p className="mt-1 text-xs text-dim">Round 1 · UPI or Cash</p>
              <ul className="mt-4 space-y-1">
                <li className="text-xs text-muted">— PORPS students only</li>
                <li className="text-xs text-muted">— UPI or cash payment</li>
                <li className="text-xs text-muted">— Instant registration ID</li>
              </ul>
              <Link to="/register/early-bird" className="btn-ghost mt-4 inline-flex w-full justify-center">
                Register
              </Link>
            </div>
            <div className="rounded-lg border border-yugen bg-surface p-5">
              <p className="label-caps">External</p>
              <p className="mt-2 font-display text-3xl uppercase text-yugen-white/80">₹1,200</p>
              <p className="mt-1 text-xs text-dim">Coming soon · UPI only</p>
              <ul className="mt-4 space-y-1">
                <li className="text-xs text-muted">— All schools</li>
                <li className="text-xs text-muted">— UPI payment via Gathrly</li>
                <li className="text-xs text-muted">— Opens Round 2</li>
              </ul>
              <span className="btn-ghost mt-4 inline-flex w-full justify-center opacity-50 cursor-not-allowed">
                Coming soon
              </span>
            </div>
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
