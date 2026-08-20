import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'
import { Logo } from './Logo'
import { TornEdge } from './TornEdge'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 36 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.1 + i * 0.08, duration: 0.8, ease: EASE },
  }),
}

const MARQUEE_ITEMS = [
  YUGEN.tagline,
  YUGEN.venueShort,
  YUGEN.city,
  `Edition ${YUGEN.edition}`,
  YUGEN.datesHero,
  YUGEN.social.instagram,
  '22 & 23 August 2026',
  '297 Delegates',
  '7 Committees',
  '40+ Schools',
]

const EVENT_DATE = new Date('2026-08-22T08:00:00+05:30')

function useCountdown(target: Date) {
  const [t, setT] = useState({ d: 0, h: 0, m: 0, s: 0, past: false })
  useEffect(() => {
    const calc = () => {
      const diff = target.getTime() - Date.now()
      if (diff <= 0) return setT({ d: 0, h: 0, m: 0, s: 0, past: true })
      setT({
        d: Math.floor(diff / 86_400_000),
        h: Math.floor((diff % 86_400_000) / 3_600_000),
        m: Math.floor((diff % 3_600_000) / 60_000),
        s: Math.floor((diff % 60_000) / 1_000),
        past: false,
      })
    }
    calc()
    const id = setInterval(calc, 1000)
    return () => clearInterval(id)
  }, [target])
  return t
}

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0])
  const punchChars = YUGEN.teaserPunch.split('')
  const countdown = useCountdown(EVENT_DATE)

  return (
    <section
      ref={ref}
      className="hero-section relative flex min-h-[calc(100svh-4rem)] flex-col overflow-hidden bg-yugen-black"
    >
      {/* Atmosphere */}
      <div className="pointer-events-none absolute inset-0" aria-hidden="true">
        <div className="hero-grid absolute inset-0" />
        <div className="hero-vignette absolute inset-0" />
        <div className="hero-grain absolute inset-0" />
        {/* Animated glow orb */}
        <motion.div
          style={{ y: reduceMotion ? 0 : bgY }}
          className="absolute left-1/2 top-[40%] -translate-x-1/2 -translate-y-1/2 md:top-[44%]"
        >
          <Logo className="h-[min(72vw,520px)] w-[min(72vw,520px)] opacity-[0.03]" />
        </motion.div>
        <div className="hero-spotlight absolute inset-0" />
        {/* Extra ambient orbs */}
        <div className="absolute -left-32 top-1/3 h-64 w-64 rounded-full bg-accent-crimson/10 blur-[80px]" />
        <div className="absolute -right-20 bottom-1/4 h-48 w-48 rounded-full bg-accent-berry/8 blur-[60px]" />
      </div>

      {/* Marquee band */}
      <div className="relative z-10 border-b border-yugen bg-yugen-black/70 backdrop-blur-md">
        <div className="hero-marquee overflow-hidden py-2.5">
          <motion.div
            className="hero-marquee-track flex w-max gap-12"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 32, ease: 'linear' }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-12">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center gap-12 whitespace-nowrap">
                    <span className="font-body text-[9px] font-semibold uppercase tracking-[0.3em] text-yugen-white/40">
                      {item}
                    </span>
                    <span className="h-[3px] w-[3px] rounded-full bg-accent-berry/50" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Side rail — desktop */}
      <div
        className="pointer-events-none absolute left-5 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <p className="hero-side-rail font-body text-[9px] uppercase tracking-[0.35em] text-yugen-white/20">
          {YUGEN.venueShort} · {YUGEN.city}
        </p>
      </div>

      {/* Main content */}
      <motion.div
        style={{ y: reduceMotion ? 0 : contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start px-5 pt-16 pb-10 md:px-10 md:pt-20 md:pb-14 lg:px-16"
      >
        <div className="grid items-center gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:gap-12 xl:gap-20">

          {/* Copy column */}
          <div className="min-w-0">
            {/* Eyebrow */}
            <motion.div
              custom={0}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mb-6 flex items-center gap-4"
            >
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.3, duration: 0.9, ease: EASE }}
                className="h-px w-12 origin-left bg-gradient-to-r from-accent-berry to-accent-mauve"
              />
              <span className="label-caps text-accent-mauve">{YUGEN.tagline}</span>
            </motion.div>

            {/* Main title */}
            <motion.h1
              custom={1}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="hero-title font-display uppercase text-yugen-white"
            >
              YŪGEN
            </motion.h1>

            {/* Punch line — character-level stagger */}
            <div className="relative mt-4 md:mt-6">
              <div className="flex flex-wrap gap-x-1">
                {punchChars.map((char, i) => (
                  <motion.span
                    key={`${char}-${i}`}
                    initial={{ opacity: 0, y: 20, filter: 'blur(8px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.55 + i * 0.025, duration: 0.5, ease: EASE }}
                    className="font-display uppercase text-yugen-white/75"
                    style={{ fontSize: 'clamp(1.1rem, 3.5vw, 2.5rem)', letterSpacing: '0.08em' }}
                  >
                    {char === ' ' ? '\u00A0' : char}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.95, duration: 1, ease: EASE }}
                className="mt-3 block h-px max-w-[min(100%,22rem)] origin-left bg-gradient-to-r from-accent-crimson via-accent-berry to-transparent"
              />
            </div>

            {/* Description */}
            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-md text-base leading-relaxed text-muted md:mt-7"
            >
              Hyderabad&apos;s premier inter-school Model United Nations at {YUGEN.venueShort}. Sixth edition —
              bigger, bolder, and setting a new standard for delegate experience.
            </motion.p>

            {/* Date + venue pill */}
            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 flex flex-wrap items-center gap-3"
            >
              <span className="coming-soon-pill border-accent-light/40 bg-accent-berry/10 text-accent-mauve">
                {YUGEN.datesHero}
              </span>
              <span className="hidden h-3 w-px bg-yugen-border sm:block" />
              <span className="text-sm text-dim">{YUGEN.venueShort} · {YUGEN.city}</span>
            </motion.div>

            {/* Countdown strip (always visible in hero) */}
            {!countdown.past && (
              <motion.div
                custom={4.5}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="mt-5 inline-flex items-center gap-1 rounded-xl border border-yugen bg-white/[0.03] px-4 py-2.5"
              >
                <span className="label-caps mr-2 text-dim/70">Starts in</span>
                {[
                  { v: countdown.d, l: 'Days' },
                  { v: countdown.h, l: 'Hrs' },
                  { v: countdown.m, l: 'Min' },
                  { v: countdown.s, l: 'Sec' },
                ].map(({ v, l }, i) => (
                  <span key={l} className="flex items-baseline gap-0.5">
                    <span className="font-display text-xl text-yugen-white tabular-nums">
                      {String(v).padStart(2, '0')}
                    </span>
                    <span className="text-[9px] uppercase tracking-wider text-dim">{l}</span>
                    {i < 3 && <span className="mx-1.5 text-yugen-border font-light">:</span>}
                  </span>
                ))}
              </motion.div>
            )}

            {/* CTAs */}
            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 flex flex-wrap gap-3 md:mt-9"
            >
              <Link to="/committees" className="btn-primary hero-cta group inline-flex gap-2">
                Explore committees
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/allocations" className="btn-ghost hero-cta">
                View allocations
              </Link>
              <a
                href={YUGEN.social.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-ghost hero-cta"
              >
                {YUGEN.social.instagram}
              </a>
            </motion.div>

            {/* Micro stats */}
            <motion.div
              custom={6}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-x-6 gap-y-2"
            >
              {YUGEN.stats.map((s) => (
                <span key={s.label} className="flex items-baseline gap-1.5">
                  <span className="font-display text-lg uppercase text-yugen-white">{s.value}</span>
                  <span className="text-[10px] uppercase tracking-wider text-dim">{s.label}</span>
                </span>
              ))}
            </motion.div>
          </div>

          {/* Emblem column */}
          <motion.div
            initial={{ opacity: 0, y: 48, rotate: reduceMotion ? 0 : 2 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.4, duration: 1.1, ease: EASE }}
            className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div className="hero-emblem relative">
              <div className="hero-emblem-glow" aria-hidden="true" />
              <div className="hero-emblem-torn" aria-hidden="true" />
              {/* Animated gradient border wrapper */}
              <div className="relative p-px overflow-hidden rounded-b-lg"
                style={{
                  background: 'linear-gradient(135deg, rgba(191,173,168,0.25), rgba(126,87,88,0.08), rgba(191,173,168,0.2))',
                }}
              >
                <div className="relative overflow-hidden bg-surface-raised rounded-b-lg">
                  <div className="hero-emblem-shine absolute inset-0" aria-hidden="true" />
                  {/* Subtle shimmer overlay */}
                  <div
                    className="pointer-events-none absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: 'linear-gradient(135deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
                    }}
                    aria-hidden="true"
                  />
                  <div className="relative px-8 pb-10 pt-8 md:px-10 md:pb-12 md:pt-10">
                    <Logo className="relative mx-auto h-36 w-36 md:h-44 md:w-44 transition-transform duration-500 hover:scale-105" />
                    <div className="mt-6 text-center md:mt-8">
                      <p className="font-display text-2xl uppercase tracking-[0.18em] text-yugen-white/90">
                        SUMMIT 6.0
                      </p>
                      <p className="mt-1.5 font-body text-[10px] font-medium uppercase tracking-[0.22em] text-dim">
                        {YUGEN.dates}
                      </p>
                      <div className="mt-4 flex items-center justify-center gap-2">
                        <span className="h-px w-8 bg-gradient-to-r from-transparent to-accent-berry" />
                        <span className="text-[9px] uppercase tracking-[0.28em] text-dim/60">{YUGEN.venueShort}</span>
                        <span className="h-px w-8 bg-gradient-to-l from-transparent to-accent-berry" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="label-caps text-[9px] text-dim/60">Scroll</span>
        <div className="hero-scroll-track h-10 w-px overflow-hidden bg-yugen-border/50">
          <motion.div
            animate={reduceMotion ? undefined : { y: ['-100%', '120%'] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            className="h-1/2 w-full bg-gradient-to-b from-transparent via-yugen-white/60 to-transparent"
          />
        </div>
      </motion.div>

      <TornEdge className="relative z-10 mt-auto" />
    </section>
  )
}
