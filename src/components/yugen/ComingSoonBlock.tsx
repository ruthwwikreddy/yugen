import type { ReactNode } from 'react'

interface ComingSoonBlockProps {
  eyebrow?: string
  title?: string
  description?: string
  children?: ReactNode
  compact?: boolean
}

export function ComingSoonBlock({
  eyebrow = 'Coming soon',
  title = 'Details dropping soon',
  description = 'Follow @yugenporps — we announce everything here first.',
  children,
  compact = false,
}: ComingSoonBlockProps) {
  return (
    <div
      className={`rounded-lg border border-yugen bg-surface-raised ${compact ? 'p-6' : 'p-8 md:p-10'}`}
    >
      <span className="coming-soon-pill">{eyebrow}</span>
      <h3 className={`font-heading font-bold text-yugen-white ${compact ? 'mt-4 text-xl' : 'mt-6 text-2xl md:text-3xl'}`}>
        {title}
      </h3>
      <p className={`text-muted max-w-xl ${compact ? 'mt-2 text-sm' : 'mt-3 text-base'}`}>{description}</p>
      {children && <div className="mt-6">{children}</div>}
    </div>
  )
}
