import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Shell } from './Shell'
import { SEO } from './SEO'
import { EasterEggSecretary } from './EasterEggSecretary'

interface PageLayoutProps {
  title: string
  description: string
  path: string
  eyebrow?: string
  headline: string
  subheadline?: string
  children: ReactNode
  cta?: { label: string; href: string }
}

export function PageLayout({
  title,
  description,
  path,
  eyebrow = 'Yūgen 6.0',
  headline,
  subheadline,
  children,
  cta,
}: PageLayoutProps) {
  return (
    <Shell>
      <SEO title={title} description={description} path={path} />
      {/* Decorative dot pattern and glow for inner pages */}
      <div className="absolute inset-0 pointer-events-none h-[400px] overflow-hidden">
        <div className="absolute inset-0 dot-pattern opacity-50 mask-image:linear-gradient(to_bottom,black,transparent)" />
        <div className="absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 h-[500px] w-[500px] rounded-full bg-accent-berry/10 blur-[100px]" />
      </div>
      
      <div className="section-padding mx-auto max-w-7xl relative z-10">
        {/* Breadcrumb nav style */}
        <div className="mb-8 flex items-center gap-2 text-xs font-medium text-dim">
          <Link to="/" className="hover:text-yugen-white transition-colors">Home</Link>
          <span>/</span>
          <span className="text-yugen-white">{title.split('|')[0].trim()}</span>
        </div>

        <div className="max-w-3xl">
          <span className="coming-soon-pill">{eyebrow}</span>
          <h1 className="mt-6 section-title gradient-text-accent inline-block">{headline}</h1>
          {subheadline && <p className="mt-5 text-lg leading-relaxed text-muted">{subheadline}</p>}
          {cta && (
            <Link to={cta.href} className="btn-primary mt-8 inline-flex">
              {cta.label}
            </Link>
          )}
        </div>
        <div className="mt-14">{children}</div>
      </div>
    </Shell>
  )
}

interface FaqAccordionProps {
  items: readonly { q: string; a: ReactNode }[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="divide-y divide-yugen/40 border-y border-yugen/40">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="cursor-pointer list-none py-6 font-heading text-base font-semibold text-yugen-white marker:content-none md:text-lg [&::-webkit-details-marker]:hidden transition-colors hover:text-accent-mauve">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span className="shrink-0 text-dim transition-transform duration-300 group-open:rotate-45 group-hover:text-accent-mauve">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="5" x2="12" y2="19" />
                  <line x1="5" y1="12" x2="19" y2="12" />
                </svg>
              </span>
            </span>
          </summary>
          <div className="overflow-hidden transition-all duration-300">
            <p className="pb-6 text-sm leading-relaxed text-muted md:text-base pr-8">{item.a}</p>
          </div>
        </details>
      ))}
    </div>
  )
}

interface TeamCardProps {
  name: string
  role: string
  initials: string
  image?: string
}

export function TeamCard({ name, role, initials, image }: TeamCardProps) {
  return (
    <article className="group overflow-hidden rounded-xl border border-yugen bg-surface card-hover">
      <div className="relative aspect-[3/4] bg-surface-raised overflow-hidden">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-5xl uppercase text-yugen-white/10 group-hover:text-yugen-white/20 transition-colors duration-300">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-yugen-black/80 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
      <div className="relative border-t border-yugen bg-surface p-5 text-center transition-colors duration-300 group-hover:bg-surface-raised">
        {name === 'TBA' && <span className="coming-soon-pill text-[9px] mb-2">TBA</span>}
        <p className="font-heading text-sm font-bold uppercase tracking-wide text-accent-mauve">{role}</p>
        <div className="mt-1 text-sm font-medium text-yugen-white">
          {name === 'Dhruv Methukupally' && role === 'Secretary General' ? (
            <EasterEggSecretary text={name} />
          ) : (
            name
          )}
        </div>
      </div>
    </article>
  )
}

interface ResourceListProps {
  items: ReturnType<typeof import('../../lib/yugen').getResources>
}

export function ResourceList({ items }: ResourceListProps) {
  return (
    <div className="grid gap-5 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.id} className="overflow-hidden rounded-xl border border-yugen bg-surface-raised transition-all duration-300 hover:border-yugen-strong hover:shadow-lg">
          <div className="p-6">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-heading text-lg font-bold">{item.title}</p>
                <p className="mt-2 text-sm text-muted">{item.description}</p>
              </div>
              <span className="coming-soon-pill shrink-0 text-[9px]">
                {item.status === 'available' ? 'PDF' : 'Soon'}
              </span>
            </div>
          </div>
          {item.status === 'available' && item.url ? (
            <>
              <div className="border-t border-yugen bg-yugen-black">
                <iframe
                  src={item.url}
                  title={`${item.title} preview`}
                  className="h-[520px] w-full"
                  loading="lazy"
                />
              </div>
              <div className="flex flex-wrap gap-3 border-t border-yugen p-6 bg-surface">
                <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-ghost text-xs py-2 px-4 min-h-0">
                  Open tab
                </a>
                <a href={item.url} download className="btn-primary text-xs py-2 px-4 min-h-0">
                  Download
                </a>
              </div>
            </>
          ) : (
            <div className="border-t border-yugen px-6 py-5 bg-surface text-xs text-dim">
              <p>Publishes when confirmed by the organizing committee.</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
