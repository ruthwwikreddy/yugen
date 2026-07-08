import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Shell } from './Shell'
import { SEO } from './SEO'

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
      <div className="section-padding mx-auto max-w-7xl">
        <div className="max-w-3xl">
          <span className="coming-soon-pill">{eyebrow}</span>
          <h1 className="mt-6 section-title">{headline}</h1>
          {subheadline && <p className="mt-4 text-lg text-muted">{subheadline}</p>}
          {cta && (
            <Link to={cta.href} className="btn-primary mt-8 inline-flex">
              {cta.label}
            </Link>
          )}
        </div>
        <div className="mt-12">{children}</div>
      </div>
    </Shell>
  )
}

interface FaqAccordionProps {
  items: readonly { q: string; a: ReactNode }[]
}

export function FaqAccordion({ items }: FaqAccordionProps) {
  return (
    <div className="divide-y divide-yugen border-y border-yugen">
      {items.map((item) => (
        <details key={item.q} className="group">
          <summary className="cursor-pointer list-none py-5 font-heading text-base font-semibold text-yugen-white marker:content-none md:text-lg [&::-webkit-details-marker]:hidden">
            <span className="flex items-start justify-between gap-4">
              {item.q}
              <span className="shrink-0 text-dim transition-transform group-open:rotate-45">+</span>
            </span>
          </summary>
          <p className="pb-5 text-sm leading-relaxed text-muted md:text-base">{item.a}</p>
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
    <article className="overflow-hidden rounded-lg border border-yugen bg-yugen-black">
      <div className="relative aspect-[3/4] bg-surface-raised">
        {image ? (
          <img src={image} alt={name} className="h-full w-full object-cover grayscale" />
        ) : (
          <div className="flex h-full items-center justify-center">
            <span className="font-display text-5xl uppercase text-yugen-white/20">{initials}</span>
          </div>
        )}
        <div className="absolute inset-0 bg-black/45" aria-hidden="true" />
      </div>
      <div className="border-t border-yugen bg-surface-raised p-4 text-center">
        {name === 'TBA' && <span className="coming-soon-pill text-[9px]">TBA</span>}
        <p className="mt-2 font-heading text-sm font-bold uppercase tracking-wide">{role}</p>
        <p className="mt-1 text-xs text-dim">{name}</p>
      </div>
    </article>
  )
}

interface ResourceListProps {
  items: ReturnType<typeof import('../../lib/yugen').getResources>
}

export function ResourceList({ items }: ResourceListProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      {items.map((item) => (
        <div key={item.id} className="rounded-lg border border-yugen bg-surface-raised p-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="font-heading text-lg font-bold">{item.title}</p>
              <p className="mt-2 text-sm text-muted">{item.description}</p>
            </div>
            <span className="coming-soon-pill shrink-0 text-[9px]">
              {item.status === 'available' ? 'PDF' : 'Soon'}
            </span>
          </div>
          {item.status === 'available' && item.url ? (
            <a href={item.url} target="_blank" rel="noopener noreferrer" className="btn-ghost mt-4 inline-flex">
              Download
            </a>
          ) : (
            <p className="mt-4 text-xs text-dim">Publishes when confirmed by the organizing committee.</p>
          )}
        </div>
      ))}
    </div>
  )
}
