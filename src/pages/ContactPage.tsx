import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { NotifyForm } from '../components/yugen/NotifyForm'
import { YUGEN } from '../lib/yugen'

export function ContactPage() {
  return (
    <Shell>
      <SEO
        title="Contact | Yūgen Summit 6.0"
        description="Get in touch with the Yūgen Summit 6.0 organizing committee at PORPS, Hyderabad."
        path="/contact"
      />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <span className="coming-soon-pill">Contact</span>
            <h1 className="mt-6 section-title">Reach the secretariat</h1>
            <p className="mt-4 text-muted">
              For partnerships, press, or general inquiries about Yūgen 6.0 — we&apos;re here.
              Registration and check-in details will be provided to confirmed delegates.
            </p>

            <div className="mt-10 space-y-6">
              <div className="rounded-lg border border-yugen bg-surface p-6">
                <p className="label-caps">Email</p>
                <a
                  href={`mailto:${YUGEN.email}`}
                  className="mt-2 block font-heading text-xl font-semibold hover:opacity-80"
                >
                  {YUGEN.email}
                </a>
              </div>
              <div className="rounded-lg border border-yugen bg-surface p-6">
                <p className="label-caps">Instagram</p>
                <a
                  href={YUGEN.social.instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-2 block font-heading text-xl font-semibold hover:opacity-80"
                >
                  {YUGEN.social.instagram}
                </a>
              </div>
              <div className="rounded-lg border border-yugen bg-surface p-6">
                <p className="label-caps">Registration</p>
                <p className="text-dim">
                  Registration details and platforms will be announced soon. Keep an eye on our social media for updates.
                </p>
              </div>
              <div className="rounded-lg border border-yugen bg-surface p-6">
                <p className="label-caps">Venue</p>
                <p className="mt-2 font-heading text-lg font-semibold">{YUGEN.venue}</p>
                <p className="text-sm text-muted">{YUGEN.city}, {YUGEN.country}</p>
              </div>
            </div>
          </div>

          <div className="rounded-xl border border-yugen bg-surface-raised p-8">
            <h2 className="font-heading text-2xl font-bold">Stay in the loop</h2>
            <p className="mt-2 text-sm text-muted">
              Prefer email updates? Join the notify list for registration and committee announcements.
            </p>
            <div className="mt-6">
              <NotifyForm id="contact-notify" />
            </div>
          </div>
        </div>
      </div>
    </Shell>
  )
}
