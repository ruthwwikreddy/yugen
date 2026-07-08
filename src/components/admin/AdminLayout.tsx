import { useState, type ReactNode } from 'react'

type AdminLayoutProps = {
  children: ReactNode
  activeNav: AdminNav
  onNavChange: (nav: AdminNav) => void
  onSignOut: () => void
  onRefresh: () => void
  onAdd?: () => void
  refreshing?: boolean
}

export type AdminNav = 'overview' | 'registrations' | 'settings'

const NAV: { id: AdminNav; label: string; icon: string }[] = [
  { id: 'overview', label: 'Overview', icon: '◫' },
  { id: 'registrations', label: 'Registrations', icon: '☰' },
  { id: 'settings', label: 'Settings', icon: '⚙' },
]

export function AdminLayout({
  children,
  activeNav,
  onNavChange,
  onSignOut,
  onRefresh,
  onAdd,
  refreshing,
}: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  function handleNav(id: AdminNav) {
    onNavChange(id)
    setSidebarOpen(false)
  }

  return (
    <div className="flex min-h-screen bg-yugen-black text-yugen-white">
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-label="Close menu"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-60 flex-col border-r border-yugen bg-surface transition-transform lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="border-b border-yugen px-5 py-6">
          <p className="font-display text-xl uppercase tracking-wide">Yūgen</p>
          <p className="label-caps mt-1">Admin console</p>
        </div>

        <nav className="flex-1 space-y-1 p-3">
          {NAV.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => handleNav(item.id)}
              className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors ${
                activeNav === item.id
                  ? 'bg-yugen-white font-medium text-yugen-black'
                  : 'text-muted hover:bg-surface-raised hover:text-yugen-white'
              }`}
            >
              <span className="text-base leading-none">{item.icon}</span>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="border-t border-yugen p-3">
          <button
            type="button"
            onClick={onSignOut}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-muted transition-colors hover:bg-surface-raised hover:text-yugen-white"
          >
            <span>↩</span>
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-h-screen flex-1 flex-col lg:pl-60">
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-yugen bg-yugen-black/90 px-4 py-4 backdrop-blur-md sm:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="rounded-lg border border-yugen px-2.5 py-1.5 text-sm lg:hidden"
              aria-label="Open menu"
            >
              ☰
            </button>
            <div>
              <p className="label-caps">Yūgen Summit 6.0</p>
              <h1 className="font-heading text-lg font-semibold capitalize">{activeNav}</h1>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {onAdd && (
              <button type="button" onClick={onAdd} className="btn-primary text-xs">
                + Add
              </button>
            )}
            <button type="button" onClick={onRefresh} disabled={refreshing} className="btn-ghost text-xs">
              {refreshing ? '…' : 'Refresh'}
            </button>
            <span className="hidden rounded-full border border-yugen px-3 py-1 text-[10px] uppercase tracking-wider text-dim sm:inline">
              Early bird · Round 1
            </span>
          </div>
        </header>

        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </div>
    </div>
  )
}
