import { Link } from 'react-router-dom'
import { YUGEN_LOGO } from '../../lib/yugen'

interface LogoProps {
  className?: string
  /** Kept for API compatibility — all variants use the same asset */
  variant?: 'white' | 'dark'
}

export function Logo({ className = 'h-8 w-8' }: LogoProps) {
  return (
    <img
      src={YUGEN_LOGO.white2x}
      alt=""
      className={`block object-contain ${className}`}
      aria-hidden="true"
      draggable={false}
      decoding="async"
    />
  )
}

export function LogoLockup({ to = '/', showWordmark = true }: { to?: string; showWordmark?: boolean }) {
  return (
    <Link to={to} className="group flex items-center gap-3">
      <Logo className="h-10 w-10 transition-opacity group-hover:opacity-80" />
      {showWordmark && (
        <span className="font-display text-lg tracking-[0.12em] text-yugen-white">YUGEN</span>
      )}
    </Link>
  )
}
