import { Link } from 'react-router-dom'
import { LogoLockup } from './Logo'
import { YUGEN } from '../../lib/yugen'
import { GATHRLY, RUTHWIK } from '../../lib/partners'

export function Footer() {
  const { event, delegates, org } = YUGEN.footerLinks

  return (
    <footer className="border-t border-yugen bg-yugen-black">
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <LogoLockup />
            <p className="mt-4 max-w-sm text-sm text-muted">
              {YUGEN.name} · {YUGEN.tagline}
            </p>
            <p className="mt-2 text-sm text-dim">
              Hosted at {YUGEN.venue}, {YUGEN.city}
            </p>
          </div>

          <div>
            <p className="label-caps mb-4">Event</p>
            <ul className="space-y-2 text-sm text-muted">
              {event.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-yugen-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps mb-4">Delegates</p>
            <ul className="space-y-2 text-sm text-muted">
              {delegates.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-yugen-white">{link.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps mb-4">Organizing</p>
            <ul className="space-y-2 text-sm text-muted">
              {org.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="hover:text-yugen-white">{link.label}</Link>
                </li>
              ))}
            </ul>
            <p className="label-caps mb-2 mt-6">Connect</p>
            <ul className="space-y-2 text-sm text-muted">
              <li>
                <a href={YUGEN.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="hover:text-yugen-white">
                  {YUGEN.social.instagram}
                </a>
              </li>
              <li>
                <a href={`mailto:${YUGEN.email}`} className="hover:text-yugen-white">{YUGEN.email}</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-4 border-t border-yugen pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1 text-xs text-dim">
            <p>
              © {new Date().getFullYear()} Yūgen Summit · P. Obul Reddy Public School
            </p>
            <p>
              Site by{' '}
              <a href={RUTHWIK.url} target="_blank" rel="noopener noreferrer" className="hover:text-yugen-white">
                {RUTHWIK.name}
              </a>
              {' · '}
              Event technology by{' '}
              <a href={GATHRLY.homepage} target="_blank" rel="noopener noreferrer" className="hover:text-yugen-white">
                {GATHRLY.name}
              </a>
            </p>
          </div>
          <div className="flex flex-wrap gap-4 text-xs text-dim">
            <Link to="/privacy" className="hover:text-yugen-white">Privacy</Link>
            <Link to="/terms" className="hover:text-yugen-white">Terms</Link>
            <Link to="/refund" className="hover:text-yugen-white">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
