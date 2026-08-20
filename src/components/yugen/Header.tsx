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
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [location])

  return (
    <header className="safe-top fixed top-0 left-0 right-0 z-50 pt-3 sm:pt-4 pointer-events-none">
      <motion.div
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className={`mx-auto w-[94%] max-w-6xl pointer-events-auto glass-card-strong transition-all duration-400 ${
          scrolled ? 'rounded-2xl py-1.5 px-4 shadow-[0_8px_40px_rgba(0,0,0,0.6)] border-yugen-strong' : 'rounded-[20px] py-2.5 px-5 shadow-[0_4px_24px_rgba(0,0,0,0.35)]'
        }`}
      >
        <div className="flex h-12 md:h-14 items-center justify-between gap-4">
          <LogoLockup />

          {/* Desktop nav - Hidden on md and below, visible on lg */}
          <nav className="hidden items-center gap-1.5 lg:flex" aria-label="Main">
            {YUGEN.nav.map((item) => {
              const active = location.pathname === item.href
              return (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`relative px-3 py-2 label-caps transition-colors duration-200 whitespace-nowrap ${
                    active ? 'text-yugen-white' : 'text-yugen-muted hover:text-accent-mauve'
                  }`}
                >
                  {item.label}
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-x-3 bottom-1.5 h-[2px] rounded-full bg-accent-berry"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/portfolio-guide"
              className="label-caps hidden whitespace-nowrap text-yugen-muted transition-colors duration-200 hover:text-accent-mauve lg:inline-flex px-2 py-2"
            >
              Portfolios
            </Link>
            <Link
              to="/contact"
              className="btn-primary hidden whitespace-nowrap sm:inline-flex text-[10px] py-2 px-5 min-h-[36px]"
            >
              Contact
            </Link>
            
            {/* Hamburger - Visible below lg */}
            <button
              type="button"
              className="touch-target flex h-10 w-10 items-center justify-center rounded-full border border-yugen bg-white/[0.03] transition-colors hover:bg-white/[0.08] lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen(!open)}
            >
              <span className="sr-only">Menu</span>
              <div className="flex flex-col gap-[5px]">
                <span className={`block h-[1.5px] w-[18px] bg-white origin-center transition-all duration-300 ${open ? 'translate-y-[6.5px] rotate-45' : ''}`} />
                <span className={`block h-[1.5px] w-[18px] bg-white transition-all duration-200 ${open ? 'opacity-0' : ''}`} />
                <span className={`block h-[1.5px] w-[18px] bg-white origin-center transition-all duration-300 ${open ? '-translate-y-[6.5px] -rotate-45' : ''}`} />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile drawer */}
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
              className="border-t border-yugen mt-2 lg:hidden overflow-hidden"
            >
              <nav className="flex flex-col gap-1 px-1 py-4" aria-label="Mobile">
                {YUGEN.nav.map((item, i) => {
                  const active = location.pathname === item.href
                  return (
                    <motion.div
                      key={item.href}
                      initial={{ opacity: 0, x: -12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04, duration: 0.25 }}
                    >
                      <Link
                        to={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex min-h-12 items-center rounded-xl px-4 py-2.5 label-caps transition-colors ${
                          active
                            ? 'bg-accent-crimson/20 text-yugen-white border border-accent-berry/30'
                            : 'text-yugen-muted hover:bg-white/[0.05] hover:text-accent-mauve'
                        }`}
                      >
                        {item.label}
                      </Link>
                    </motion.div>
                  )
                })}
                <motion.div
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: YUGEN.nav.length * 0.04, duration: 0.25 }}
                >
                  <Link
                    to="/portfolio-guide"
                    onClick={() => setOpen(false)}
                    className="flex min-h-12 items-center rounded-xl px-4 py-2.5 label-caps text-yugen-muted transition-colors hover:bg-white/[0.05] hover:text-accent-mauve"
                  >
                    Portfolio guide
                  </Link>
                </motion.div>
                <div className="mt-4 flex flex-col gap-3 px-2">
                  <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary w-full py-3.5">
                    Contact secretariat
                  </Link>
                  {!isHome && (
                    <Link to="/" onClick={() => setOpen(false)} className="btn-ghost w-full py-3.5">
                      ← Home
                    </Link>
                  )}
                </div>
              </nav>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </header>
  )
}
