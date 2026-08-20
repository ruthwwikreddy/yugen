import { Link } from 'react-router-dom'
import { YUGEN } from '../../lib/yugen'
import type { Committee } from '../../lib/yugen'

export function CommitteeCard({ committee }: { committee: Committee }) {
  const whatsappUrl = YUGEN.whatsapp.groups.find(g => g.id === committee.id)?.url

  const getDifficultyColor = (level?: string) => {
    if (!level) return 'text-zinc-400 bg-zinc-400/10 border-zinc-400/20'
    const l = level.toLowerCase()
    if (l.includes('beginner')) return 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20'
    if (l.includes('intermediate')) return 'text-amber-400 bg-amber-400/10 border-amber-400/20'
    return 'text-rose-400 bg-rose-400/10 border-rose-400/20'
  }

  return (
    <div className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-yugen/60 bg-yugen-surface card-hover shadow-lg">
      {/* Top animated gradient border */}
      <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-accent-berry via-accent-mauve to-accent-crimson opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

      {/* Hero Image Section */}
      <div className="relative aspect-[16/9] w-full overflow-hidden bg-yugen-black">
        {/* Abstract pattern fallback if no image */}
        <div className="absolute inset-0 dot-pattern opacity-20" />
        
        {/* Committee Acronym Watermark */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <span className="font-display text-[8rem] uppercase leading-none text-yugen-white/[0.04] group-hover:text-yugen-white/[0.08] transition-colors duration-500 transform-gpu group-hover:scale-110">
            {committee.id}
          </span>
        </div>

        {/* Gradient overlay for text legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-yugen-surface via-yugen-surface/40 to-transparent" />
        
        {/* Badges Overlay */}
        <div className="absolute left-4 top-4 flex flex-wrap gap-2 z-10">
          <span className={`rounded-full border px-2.5 py-1 text-[9px] font-bold uppercase tracking-widest backdrop-blur-md ${getDifficultyColor(committee.difficulty)}`}>
            {committee.difficulty}
          </span>
        </div>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-6 -mt-6">
        <h3 className="font-heading text-xl font-bold leading-tight text-yugen-white group-hover:text-accent-mauve transition-colors">
          {committee.name}
        </h3>
        <p className="mt-2 text-[10px] font-bold uppercase tracking-[0.2em] text-accent-berry">
          {committee.type}
        </p>

        <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted flex-1">
          {committee.description}
        </p>

        <div className="mt-6 flex flex-col gap-3">
          <Link
            to={`/committees/${committee.id}`}
            className="btn-primary w-full shadow-[0_4px_20px_rgba(93,33,40,0.3)]"
          >
            View committee
          </Link>
          
          {whatsappUrl && (
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="group/wa flex items-center justify-center gap-2 rounded-full border border-[#25D366]/30 bg-[#25D366]/5 px-4 py-2.5 text-[10px] font-bold uppercase tracking-widest text-[#25D366] transition-all hover:border-[#25D366]/80 hover:bg-[#25D366]/15 hover:text-[#25D366]"
            >
              <svg className="h-4 w-4 transition-transform group-hover/wa:scale-110" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
              </svg>
              Delegate group
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
