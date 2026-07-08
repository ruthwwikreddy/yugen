import type { ReactNode } from 'react'
import { Header } from './Header'
import { Footer } from './Footer'

interface ShellProps {
  children: ReactNode
}

export function Shell({ children }: ShellProps) {
  return (
    <div className="flex min-h-screen flex-col bg-yugen-black">
      <Header />
      <main className="flex-1 pt-24">{children}</main>
      <Footer />
    </div>
  )
}
