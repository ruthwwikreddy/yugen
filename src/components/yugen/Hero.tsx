import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from 'framer-motion'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { EARLY_BIRD_REGISTER_PATH } from '../../config/features'
import { YUGEN } from '../../lib/yugen'
import { Logo } from './Logo'
import { TornEdge } from './TornEdge'

const EASE = [0.22, 1, 0.36, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: 0.12 + i * 0.07, duration: 0.75, ease: EASE },
  }),
}

const MARQUEE_ITEMS = [
  YUGEN.tagline,
  YUGEN.venueShort,
  YUGEN.city,
  `Edition ${YUGEN.edition}`,
  YUGEN.datesHero,
  YUGEN.social.instagram,
]

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], [0, 140])
  const contentY = useTransform(scrollYProgress, [0, 1], [0, 80])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const punchWords = YUGEN.teaserPunch.split(' ')

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
        <motion.div
          style={{ y: reduceMotion ? 0 : bgY }}
          className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 md:top-[46%]"
        >
          <Logo className="h-[min(72vw,520px)] w-[min(72vw,520px)] opacity-[0.035]" />
        </motion.div>
        <div className="hero-spotlight absolute inset-0" />
      </div>

      {/* Marquee band */}
      <div className="relative z-10 border-b border-yugen bg-yugen-black/80 backdrop-blur-sm">
        <div className="hero-marquee overflow-hidden py-3">
          <motion.div
            className="hero-marquee-track flex w-max gap-10"
            animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
            transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
          >
            {[0, 1].map((copy) => (
              <div key={copy} className="flex shrink-0 items-center gap-10">
                {MARQUEE_ITEMS.map((item) => (
                  <span key={`${copy}-${item}`} className="flex items-center gap-10 whitespace-nowrap">
                    <span className="font-body text-[10px] font-medium uppercase tracking-[0.28em] text-yugen-white/45">
                      {item}
                    </span>
                    <span className="h-1 w-1 rounded-full bg-yugen-white/20" />
                  </span>
                ))}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Side rail — desktop */}
      <div
        className="pointer-events-none absolute left-6 top-1/2 z-10 hidden -translate-y-1/2 lg:block"
        aria-hidden="true"
      >
        <p className="hero-side-rail font-body text-[10px] uppercase tracking-[0.32em] text-yugen-white/25">
          {YUGEN.venueShort} · {YUGEN.city}
        </p>
      </div>

      <motion.div
        style={{ y: reduceMotion ? 0 : contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex w-full max-w-7xl flex-1 flex-col justify-start px-5 pt-20 pb-12 md:px-10 md:pt-24 md:pb-16 lg:px-16"
      >
        <div className="grid items-center gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-10 xl:gap-16">
          {/* Copy column */}
          <div className="min-w-0">
            <div className="mb-6">
              <motion.div
                custom={0}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="relative z-20 mb-8 flex items-center gap-4"
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
                  className="hero-rule h-px w-10 origin-left bg-accent-berry md:w-14"
                />
                <span className="label-caps">{YUGEN.tagline}</span>
              </motion.div>

              <motion.h1
                custom={1}
                variants={fadeUp}
                initial="hidden"
                animate="visible"
                className="relative z-10 hero-title font-display uppercase leading-[0.92] tracking-[-0.03em] text-yugen-white"
              >
                YŪGEN
              </motion.h1>
            </div>

            {/* Punch line */}
            <div className="relative mt-5 md:mt-7">
              <div className="flex flex-wrap gap-x-3 gap-y-1 md:gap-x-4">
                {punchWords.map((word, i) => (
                  <motion.span
                    key={`${word}-${i}`}
                    initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
                    animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                    transition={{ delay: 0.5 + i * 0.09, duration: 0.6, ease: EASE }}
                    className="font-display uppercase tracking-[0.05em] text-yugen-white/80"
                    style={{ fontSize: 'clamp(1.25rem, 4vw, 3rem)' }}
                  >
                    {word}
                  </motion.span>
                ))}
              </div>
              <motion.span
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 0.85, duration: 0.9, ease: EASE }}
                className="hero-rule mt-4 block h-px max-w-[min(100%,20rem)] origin-left bg-accent-crimson"
              />
            </div>

            <motion.p
              custom={3}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-6 max-w-lg text-sm leading-relaxed text-muted md:mt-8 md:text-base"
            >
              Hyderabad&apos;s inter-school Model United Nations at {YUGEN.venueShort}. Sixth edition.
              Dates, councils, and registration — dropping here first.
            </motion.p>

            <motion.div
              custom={4}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-7 flex flex-wrap items-center gap-3 md:mt-9"
            >
              <span className="coming-soon-pill border-accent-light bg-accent-light/10">{YUGEN.datesHero}</span>
              <span className="hidden h-4 w-px bg-yugen-border sm:block" />
              <span className="text-sm text-muted">{YUGEN.venueShort} · {YUGEN.city}</span>
            </motion.div>

            <motion.div
              custom={5}
              variants={fadeUp}
              initial="hidden"
              animate="visible"
              className="mt-8 flex flex-wrap gap-3 md:mt-10"
            >
              <Link to={EARLY_BIRD_REGISTER_PATH} className="btn-primary hero-cta group inline-flex gap-2">
                Register now
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </Link>
              <Link to="/committees" className="btn-ghost hero-cta">
                Committees
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
          </div>

          {/* Emblem column */}
          <motion.div
            initial={{ opacity: 0, y: 40, rotate: reduceMotion ? 0 : 1.5 }}
            animate={{ opacity: 1, y: 0, rotate: 0 }}
            transition={{ delay: 0.45, duration: 1, ease: EASE }}
            className="mx-auto w-full max-w-sm lg:mx-0 lg:max-w-none"
          >
            <div className="hero-emblem relative">
              <div className="hero-emblem-glow" aria-hidden="true" />
              <div className="hero-emblem-torn" aria-hidden="true" />
              <div className="relative overflow-hidden border border-yugen border-t-0 bg-surface-raised">
                <div className="hero-emblem-shine absolute inset-0" aria-hidden="true" />
                <div className="relative px-8 pb-8 pt-8 md:px-10 md:pb-10 md:pt-10">
                  <Logo className="relative mx-auto h-36 w-36 md:h-40 md:w-40" />
                  <div className="mt-6 text-center md:mt-8">
                    <p className="mt-2 font-body text-[10px] font-medium uppercase tracking-[0.2em] text-dim">
                      Summit · {YUGEN.venueShort}
                    </p>
                  </div>
                  <div className="mt-8 grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-yugen bg-yugen-border">
                    {YUGEN.stats.map((stat) => (
                      <div key={stat.label} className="bg-surface-raised px-4 py-4 text-center">
                        <p className="font-display text-2xl uppercase tracking-tight">{stat.value}</p>
                        <p className="mt-1 label-caps text-[9px]">{stat.label}</p>
                      </div>
                    ))}
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
        transition={{ delay: 1.2, duration: 0.8 }}
        className="absolute bottom-10 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex"
        aria-hidden="true"
      >
        <span className="label-caps text-[9px]">Scroll</span>
        <div className="hero-scroll-track h-12 w-px overflow-hidden bg-yugen-border">
          <motion.div
            animate={reduceMotion ? undefined : { y: ['-100%', '120%'] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
            className="h-1/2 w-full bg-yugen-white/70"
          />
        </div>
      </motion.div>

      <TornEdge className="relative z-10 mt-auto" />
    </section>
  )
}
