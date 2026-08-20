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
      className={`block object-contain transition-transform duration-300 hover:rotate-3 ${className}`}
      aria-hidden="true"
      draggable={false}
      decoding="async"
    />
  )
}

export function LogoLockup({ to = '/', showWordmark = true }: { to?: string; showWordmark?: boolean }) {
  return (
    <Link to={to} className="group flex items-center gap-3">
      <Logo className="h-10 w-10 transition-all duration-300 group-hover:scale-105 group-hover:opacity-90" />
      {showWordmark && (
        <span className="font-display text-lg tracking-[0.15em] text-yugen-white transition-colors duration-300 group-hover:text-yugen-white/90">
          YUGEN
        </span>
      )}
    </Link>
  )
}
