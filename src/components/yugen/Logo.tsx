import { Link } from 'react-router-dom'

interface LogoProps {
  className?: string
  /** `white` = transparent PNG for dark UI (default) */
  variant?: 'white' | 'dark'
}

export function Logo({ className = 'h-8 w-8', variant = 'white' }: LogoProps) {
  const src = variant === 'dark' ? '/logo-transparent.png' : '/logo-white.png'

  return (
    <img
      src={src}
      alt=""
      className={`block object-contain ${className}`}
      aria-hidden="true"
      draggable={false}
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
