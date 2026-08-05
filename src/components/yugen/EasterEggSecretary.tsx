import { useEffect, useState, useRef } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const STORAGE_KEY = 'yugen.egg.sg-revealed.v2'
const REVEALED_NAME = 'Ruthwik Reddy'
const TOAST_TEXT = 'nene real sec gen'
const REVEAL_CLICKS = 5
const RESET_CLICKS = 2

interface EasterEggSecretaryProps {
  /** Original text to display */
  text: string
  /** Optional className passed through to the visible span */
  className?: string
}

export function EasterEggSecretary({ text, className = '' }: EasterEggSecretaryProps) {
  const [revealed, setRevealed] = useState(false)
  const [toast, setToast] = useState<string | null>(null)
  const clicksRef = useRef(0)
  const timerRef = useRef<number | null>(null)

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.localStorage.getItem(STORAGE_KEY) === '1') {
        setRevealed(true)
      }
    } catch {
      /* no-op */
    }
  }, [])

  function handleClick() {
    clicksRef.current += 1
    if (timerRef.current) window.clearTimeout(timerRef.current)
    timerRef.current = window.setTimeout(() => {
      clicksRef.current = 0
    }, 1800)

    // Not yet revealed → need REVEAL_CLICKS to trigger the prank
    if (!revealed && clicksRef.current >= REVEAL_CLICKS) {
      setRevealed(true)
      setToast(TOAST_TEXT)
      clicksRef.current = 0
      try {
        window.localStorage.setItem(STORAGE_KEY, '1')
      } catch {
        /* no-op */
      }
      window.setTimeout(() => setToast(null), 5200)
      return
    }

    // Already revealed → RESET_CLICKS to revert to the original name
    if (revealed && clicksRef.current >= RESET_CLICKS) {
      setRevealed(false)
      clicksRef.current = 0
      try {
        window.localStorage.removeItem(STORAGE_KEY)
      } catch {
        /* no-op */
      }
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        className={`group cursor-pointer text-left transition-colors hover:text-accent-light ${
          revealed ? 'text-accent-light' : ''
        } ${className}`}
        aria-label={
          revealed
            ? `Secretary General — ${REVEALED_NAME} (easter egg unlocked, click ${RESET_CLICKS}× to reset)`
            : `Secretary General — ${text}`
        }
      >
        <span className="block">{revealed ? REVEALED_NAME : text}</span>
        {revealed && (
          <span
            aria-hidden="true"
            className="mt-1 block text-[9px] uppercase leading-none tracking-[0.18em] text-accent-light/80 transition-colors group-hover:text-accent-light"
          >
            confirmed by sec members
          </span>
        )}
      </button>

      <AnimatePresence>
        {toast ? (
          <motion.div
            key="egg-toast"
            initial={{ opacity: 0, x: 24, y: 12, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 24, y: 12, scale: 0.96 }}
            transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
            className="pointer-events-none fixed bottom-5 right-5 z-[100] sm:bottom-7 sm:right-7"
            role="status"
            aria-live="polite"
          >
            <div className="relative w-[min(22rem,calc(100vw-2.5rem))] overflow-hidden rounded-xl border border-yugen-border-strong bg-yugen-black/95 shadow-[0_18px_60px_-12px_rgba(0,0,0,0.7)] backdrop-blur-xl">
              {/* crimson accent rule */}
              <div className="absolute inset-x-0 top-0 h-px bg-accent-crimson" aria-hidden="true" />

              <div className="relative flex items-start gap-3 px-4 py-3 sm:px-5 sm:py-4">
                <div className="min-w-0 flex-1">
                  <p className="flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[0.22em] text-dim">
                    <span className="font-display text-[10px] tracking-normal text-accent-light">Sec Gen</span>
                    <span className="h-px flex-1 bg-yugen-border" aria-hidden="true" />
                    <span>Yūgen 6.0</span>
                  </p>
                  <p className="mt-1.5 font-heading text-base font-bold leading-snug text-yugen-white sm:text-lg">
                    {toast}
                  </p>
                  <p className="mt-1 text-[10px] uppercase tracking-[0.16em] text-dim">
                    THE REAL SG IS STILL VERY REAL
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  )
}
