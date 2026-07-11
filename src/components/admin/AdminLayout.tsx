import { useState, type ReactNode } from 'react'
import { YUGEN } from '../../lib/yugen'
import type { RegistrationStats } from '../../lib/admin-utils'
import { AdminAtmosphere } from './admin-ui'

type AdminLayoutProps = {
  children: ReactNode
  activeNav: AdminNav
  onNavChange: (nav: AdminNav) => void
  onSignOut: () => void
  onRefresh: () => void
  onAdd?: () => void
  refreshing?: boolean
  stats?: RegistrationStats
}

export type AdminNav = 'overview' | 'registrations' | 'allocations' | 'revenue' | 'settings'

const PAGE_META: Record<AdminNav, { title: string }> = {
  overview: { title: 'Overview' },
  registrations: { title: 'Registrations' },
  allocations: { title: 'Allocations' },
  revenue: { title: 'Revenue' },
  settings: { title: 'Settings' },
}

const NAV: {
  id: AdminNav
  label: string
  icon: ReactNode
  badge?: (stats: RegistrationStats) => number | undefined
}[] = [
  {
    id: 'overview',
    label: 'Overview',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <rect x="1.5" y="1.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
        <rect x="9" y="1.5" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
        <rect x="1.5" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
        <rect x="9" y="9" width="5.5" height="5.5" rx="1" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
  },
  {
    id: 'registrations',
    label: 'Registrations',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2.5 4h11M2.5 8h11M2.5 12h7" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
    badge: (s) => (s.paid > 0 ? s.paid : undefined),
  },
  {
    id: 'allocations',
    label: 'Allocations',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M3 13V5l5-3 5 3v8" stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round" />
        <path d="M8 2v11M3 8h10" stroke="currentColor" strokeWidth="1.25" />
      </svg>
    ),
    badge: (s) => {
      const unallocated = s.verified - s.allocated - s.waitlisted
      return unallocated > 0 ? unallocated : undefined
    },
  },
  {
    id: 'revenue',
    label: 'Revenue',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <path d="M2.5 11.5V8.5M6 11.5V5.5M9.5 11.5V7M13 11.5V4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'settings',
    label: 'Settings',
    icon: (
      <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
        <circle cx="8" cy="8" r="2" stroke="currentColor" strokeWidth="1.25" />
        <path
          d="M8 1.5v1.2M8 13.3v1.2M1.5 8h1.2M13.3 8h1.2M3.4 3.4l.85.85M11.75 11.75l.85.85M3.4 12.6l.85-.85M11.75 4.25l.85-.85"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

export function AdminLayout({
  children,
  activeNav,
  onNavChange,
  onSignOut,
  onRefresh,
  onAdd,
  refreshing,
  stats,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const meta = PAGE_META[activeNav]

  function handleNav(id: AdminNav) {
    onNavChange(id)
    setSidebarOpen(false)
  }

  return (
    <div className="admin-shell flex min-h-[100dvh] bg-yugen-black text-yugen-white">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/70 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`admin-sidebar safe-top fixed inset-y-0 left-0 z-50 flex w-[min(100vw-2.5rem,16rem)] flex-col border-r border-yugen bg-surface transition-transform lg:w-64 lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminAtmosphere />
        <div className="relative border-b border-yugen px-5 py-6">
          <p className="font-display text-2xl uppercase tracking-wide">Yūgen</p>
          <p className="label-caps mt-1">Admin console</p>
          <p className="mt-3 text-[10px] uppercase tracking-[0.18em] text-dim">Edition {YUGEN.edition}</p>
        </div>

        <nav className="relative flex-1 space-y-1 p-3">
          {NAV.map((item) => {
            const active = activeNav === item.id
            const badge = stats && item.badge ? item.badge(stats) : undefined
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => handleNav(item.id)}
                className={`flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm transition-all ${
                  active
                    ? 'bg-yugen-white font-medium text-yugen-black shadow-lg shadow-black/20'
                    : 'text-muted hover:bg-surface-raised hover:text-yugen-white'
                }`}
              >
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg ${active ? 'bg-yugen-black/10' : 'bg-yugen-black/40'}`}>
                  {item.icon}
                </span>
                <span className="flex-1">{item.label}</span>
                {badge !== undefined && badge > 0 && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                      active ? 'bg-yugen-black/10 text-yugen-black' : 'bg-amber-500/20 text-amber-200'
                    }`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            )
          })}
        </nav>

        <div className="relative border-t border-yugen p-3">
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-yugen-white"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-yugen-black/40">
              <svg width="14" height="14" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                <path d="M6 2.5H3.5A1 1 0 0 0 2.5 3.5v9a1 1 0 0 0 1 1H6M10.5 11.5 13.5 8 10.5 4.5M13.5 8H6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-[100dvh] flex-1 flex-col lg:pl-64">
        <header className="safe-top sticky top-0 z-20 border-b border-yugen bg-yugen-black/85 backdrop-blur-xl">
          <div className="flex items-center justify-between gap-3 px-3 py-3 sm:px-6 sm:py-4">
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <button
                type="button"
                onClick={() => setSidebarOpen(true)}
                className="touch-target flex shrink-0 items-center justify-center rounded-xl border border-yugen bg-surface px-3 py-2 lg:hidden"
                aria-label="Open menu"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
                  <path d="M2.5 4.5h11M2.5 8h11M2.5 11.5h11" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                </svg>
              </button>
              <div className="min-w-0">
                <p className="label-caps truncate">{YUGEN.name}</p>
                <h1 className="truncate font-heading text-lg font-semibold sm:text-xl">{meta.title}</h1>
              </div>
            </div>
            <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
              {onAdd && activeNav === 'registrations' && (
                <button type="button" onClick={onAdd} className="btn-primary hidden text-xs sm:inline-flex">
                  + Add delegate
                </button>
              )}
              <button
                type="button"
                onClick={onRefresh}
                disabled={refreshing}
                className="btn-ghost min-h-10 gap-2 px-3 text-xs sm:min-h-0"
                title="Refresh data"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 16 16"
                  fill="none"
                  className={refreshing ? 'animate-spin' : ''}
                  aria-hidden="true"
                >
                  <path d="M13 8a5 5 0 1 1-1.46-3.54" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" />
                  <path d="M13 3v3.5H9.5" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                <span className="hidden sm:inline">{refreshing ? 'Syncing…' : 'Refresh'}</span>
              </button>
              <span className="hidden rounded-full border border-yugen bg-surface px-3 py-1.5 text-[10px] uppercase tracking-wider text-dim lg:inline">
                Early bird · R1
              </span>
            </div>
          </div>
        </header>

        <main className="relative flex-1 p-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:p-6">
          <AdminAtmosphere className="opacity-40" />
          <div className="relative mx-auto max-w-7xl">{children}</div>
        </main>
      </div>
    </div>
  )
}
