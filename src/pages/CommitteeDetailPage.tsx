import { Navigate, useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Shell } from '../components/yugen/Shell'
import { SEO } from '../components/yugen/SEO'
import { CommitteeDetailContent } from '../components/yugen/CommitteeDetailContent'
import { getCommitteeById } from '../lib/yugen'

export function CommitteeDetailPage() {
  const { id } = useParams<{ id: string }>()
  const committee = id ? getCommitteeById(id) : undefined

  if (!committee) {
    return <Navigate to="/committees" replace />
  }

  const getDifficultyColor = (level?: string) => {
    if (!level) return 'text-zinc-400 border-zinc-400/20 bg-zinc-400/10'
    const l = level.toLowerCase()
    if (l.includes('beginner')) return 'text-emerald-400 border-emerald-400/20 bg-emerald-400/10'
    if (l.includes('intermediate')) return 'text-amber-400 border-amber-400/20 bg-amber-400/10'
    return 'text-rose-400 border-rose-400/20 bg-rose-400/10'
  }

  return (
    <Shell>
      <SEO
        title={`${committee.acronym !== 'TBA' ? committee.acronym : committee.name} | Yūgen Summit 6.0`}
        description={`${committee.name} — ${committee.topic}. ${committee.type} at Yūgen Summit 6.0, PORPS Hyderabad.`}
        path={`/committees/${committee.id}`}
      />
      
      {/* Premium Hero Section */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-48 md:pb-32 border-b border-yugen/40">
        <div className="absolute inset-0 bg-yugen-black">
          <div className="absolute inset-0 dot-pattern opacity-40 mix-blend-overlay" />
          {/* Animated glow orbs */}
          <div className="absolute -left-1/4 top-0 h-[600px] w-[600px] rounded-full bg-accent-crimson/15 blur-[128px] mix-blend-screen animate-[pulse-glow_8s_ease-in-out_infinite]" />
          <div className="absolute -right-1/4 bottom-0 h-[600px] w-[600px] rounded-full bg-accent-berry/15 blur-[128px] mix-blend-screen animate-[pulse-glow_10s_ease-in-out_infinite_reverse]" />
        </div>

        {/* Huge Acronym Watermark */}
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center overflow-hidden" aria-hidden="true">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="font-display text-[clamp(10rem,35vw,28rem)] uppercase leading-none text-yugen-white/[0.03] select-none"
          >
            {committee.acronym}
          </motion.span>
        </div>
        
        <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="max-w-4xl"
          >
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <Link to="/committees" className="text-xs font-bold uppercase tracking-widest text-dim hover:text-yugen-white transition-colors flex items-center gap-1">
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back to Committees
              </Link>
              <span className="text-dim/30">|</span>
              <span className={`rounded-full border px-3 py-1 text-[10px] font-bold uppercase tracking-widest backdrop-blur-md ${getDifficultyColor(committee.difficulty)}`}>
                {committee.difficulty}
              </span>
              <span className="rounded-full border border-yugen-strong bg-white/[0.03] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-yugen-white backdrop-blur-md">
                {committee.type}
              </span>
            </div>

            <h1 className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold uppercase tracking-tight text-yugen-white leading-[1.1]">
              {committee.name}
            </h1>
            
            <div className="mt-8">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-accent-berry mb-2">Agenda</p>
              <p className="text-xl md:text-2xl text-muted font-light leading-relaxed max-w-3xl">
                {committee.topic}
              </p>
            </div>
            
            <div className="mt-10 flex flex-wrap gap-4">
              {committee.studyGuideUrl ? (
                <a href={committee.studyGuideUrl} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[52px] px-8 text-sm shadow-[0_8px_32px_rgba(93,33,40,0.4)]">
                  Download Study Guide
                </a>
              ) : committee.studyGuideUrls && committee.studyGuideUrls.length > 0 ? (
                <a href={committee.studyGuideUrls[0]} target="_blank" rel="noopener noreferrer" className="btn-primary min-h-[52px] px-8 text-sm shadow-[0_8px_32px_rgba(93,33,40,0.4)]">
                  Download Primary Guide
                </a>
              ) : (
                <span className="coming-soon-pill">Study Guide Coming Soon</span>
              )}
            </div>
          </motion.div>
        </div>
      </section>

      <div className="section-padding mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 -mt-8">
        <CommitteeDetailContent committee={committee} />
      </div>
    </Shell>
  )
}
