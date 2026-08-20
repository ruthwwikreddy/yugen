import { Link } from 'react-router-dom'
import { LogoLockup } from './Logo'
import { YUGEN } from '../../lib/yugen'

export function Footer() {
  const { event, delegates, org } = YUGEN.footerLinks

  return (
    <footer className="relative bg-yugen-black">
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-accent-berry/30 to-transparent" />
      <div className="section-padding mx-auto max-w-7xl">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <LogoLockup />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-muted">
              {YUGEN.name} · {YUGEN.tagline}
            </p>
            <p className="mt-2 text-sm text-dim">
              Hosted at {YUGEN.venue}, {YUGEN.city}
            </p>
          </div>

          <div>
            <p className="label-caps mb-5 text-yugen-white/80">Event</p>
            <ul className="space-y-3 text-sm text-muted">
              {event.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="group relative inline-flex">
                    <span className="relative z-10 transition-colors group-hover:text-yugen-white">{link.label}</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-berry transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps mb-5 text-yugen-white/80">Delegates</p>
            <ul className="space-y-3 text-sm text-muted">
              {delegates.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="group relative inline-flex">
                    <span className="relative z-10 transition-colors group-hover:text-yugen-white">{link.label}</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-berry transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="label-caps mb-5 text-yugen-white/80">Organizing</p>
            <ul className="space-y-3 text-sm text-muted">
              {org.map((link) => (
                <li key={link.href}>
                  <Link to={link.href} className="group relative inline-flex">
                    <span className="relative z-10 transition-colors group-hover:text-yugen-white">{link.label}</span>
                    <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-berry transition-all duration-300 group-hover:w-full" />
                  </Link>
                </li>
              ))}
            </ul>
            <p className="label-caps mb-3 mt-8 text-yugen-white/80">Connect</p>
            <ul className="space-y-3 text-sm text-muted">
              <li>
                <a href={YUGEN.social.instagramUrl} target="_blank" rel="noopener noreferrer" className="group relative inline-flex">
                  <span className="relative z-10 transition-colors group-hover:text-yugen-white">{YUGEN.social.instagram}</span>
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-berry transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
              <li>
                <a href={`mailto:${YUGEN.email}`} className="group relative inline-flex">
                  <span className="relative z-10 transition-colors group-hover:text-yugen-white">{YUGEN.email}</span>
                  <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent-berry transition-all duration-300 group-hover:w-full" />
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-5 border-t border-yugen/50 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="mt-8 md:mt-0 md:text-right text-xs text-dim">
            <span>© {new Date().getFullYear()} Yūgen Summit.</span>
            <span className="opacity-50"> All rights reserved.</span>
            <div className="mt-1.5 opacity-50 hover:opacity-100 transition-opacity">
              Site by <a href="https://www.ruthwikreddy.live/" target="_blank" rel="noopener noreferrer" className="hover:text-yugen-white transition-colors">Ruthwik Reddy</a>
            </div>
          </div>
          <div className="flex flex-wrap gap-5 text-xs text-dim/80">
            <Link to="/privacy" className="hover:text-yugen-white transition-colors">Privacy</Link>
            <Link to="/terms" className="hover:text-yugen-white transition-colors">Terms</Link>
            <Link to="/refund" className="hover:text-yugen-white transition-colors">Refund</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
