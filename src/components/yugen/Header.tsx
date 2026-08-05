import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogoLockup } from './Logo'
import { YUGEN } from '../../lib/yugen'

export function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setOpen(false)
  }, [location])

  return (
    <header className="safe-top fixed top-0 left-0 right-0 z-50 pt-2 sm:pt-4">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ 
          duration: 0.5, 
          ease: [0.22, 1, 0.36, 1]
        }}
        className={`mx-auto w-[90%] sm:w-[85%] max-w-4xl border border-yugen bg-yugen-black/95 backdrop-blur-xl shadow-2xl transition-all duration-300 ${
          scrolled 
            ? ' rounded-xl py-1 px-4' 
            : ' rounded-2xl py-2 px-4'
        }`}
      >
        <div className="flex h-12 md:h-14 items-center justify-between">
          <LogoLockup />

          <nav className="hidden items-center gap-6 lg:flex xl:gap-8" aria-label="Main">
            {YUGEN.nav.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="label-caps text-yugen-muted transition-all duration-200 hover:text-accent-light hover:scale-105"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/portfolio-guide"
              className="label-caps hidden text-yugen-muted transition-all duration-200 hover:text-accent-light hover:scale-105 md:inline-flex"
            >
              Portfolios
            </Link>
            <Link to="/contact" className="btn-primary hidden sm:inline-flex">
              Contact
            </Link>
            <button
              type="button"
              className="touch-target flex h-11 w-11 items-center justify-center rounded-full border border-yugen md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-1.5">
                <span className={`block h-px w-4 bg-white transition-all duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`} />
                <span className={`block h-px w-4 bg-white transition-all duration-200 ${open ? 'opacity-0 scale-75' : ''}`} />
                <span className={`block h-px w-4 bg-white transition-all duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0, scale: 0.95 }}
              animate={{ opacity: 1, height: 'auto', scale: 1 }}
              exit={{ opacity: 0, height: 0, scale: 0.95 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-yugen bg-yugen-black rounded-b-2xl md:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-4 py-4" aria-label="Mobile">
                {YUGEN.nav.map((item) => (
                  <Link
                    key={item.href}
                    to={item.href}
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-lg px-4 py-3.5 label-caps text-yugen-muted transition-colors hover:bg-surface hover:text-accent-light"
                  >
                    {item.label}
                  </Link>
                ))}
                <Link
                  to="/portfolio-guide"
                  onClick={() => setOpen(false)}
                  className="flex min-h-12 items-center rounded-lg px-4 py-3.5 label-caps text-yugen-muted transition-colors hover:bg-surface hover:text-accent-light"
                >
                  Portfolio guide
                </Link>
                <Link
                  to="/contact"
                  onClick={() => setOpen(false)}
                  className="btn-primary mt-3 w-full"
                >
                  Contact secretariat
                </Link>
                {!isHome && (
                  <Link
                    to="/"
                    onClick={() => setOpen(false)}
                    className="btn-ghost mt-2 w-full"
                  >
                    Home
                  </Link>
                )}
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
