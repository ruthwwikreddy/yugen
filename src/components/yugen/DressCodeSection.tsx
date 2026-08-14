import { motion } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import { ComingSoonBlock } from './ComingSoonBlock'

export function DressCodeSection() {
  const hasDressCode = YUGEN.dressCode.length > 0

  return (
    <section id="dress-code" className="section-padding mx-auto max-w-7xl relative overflow-hidden">
      {/* Subtle decorative glow */}
      <div className="pointer-events-none absolute -right-32 top-1/4 h-[350px] w-[350px] rounded-full bg-accent/5 blur-[100px]" />
      
      <div className="relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center md:text-left"
        >
          <p className="label-caps mb-4 tracking-[0.2em] text-accent">Dress code</p>
          <h2 className="section-title">Committee attire</h2>
          <p className="mt-4 max-w-xl text-muted">
            Dress to impress. Follow the guidelines for each day to maintain the decorum of the summit.
          </p>
        </motion.div>

        <div className="mt-12">
          {hasDressCode ? (
            <div className="grid gap-6 md:grid-cols-2">
              {YUGEN.dressCode.map((item, index) => {
                const isDay1 = item.title.toLowerCase().includes('day 1')
                
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="relative group rounded-2xl border border-yugen bg-surface-raised/40 backdrop-blur-md p-8 transition-all duration-300 hover:border-yugen-strong hover:bg-surface-raised/80 hover:shadow-[0_4px_30px_rgba(0,0,0,0.5)] hover:-translate-y-1 overflow-hidden"
                  >
                    {/* Decorative accent top/bottom bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${isDay1 ? 'from-accent to-accent-light' : 'from-accent-light to-accent'}`} />
                    
                    <div className="flex items-start gap-5">
                      {/* Attire Type Icon wrapper */}
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/10 border border-accent/20 text-accent group-hover:scale-110 group-hover:bg-accent group-hover:text-yugen-white transition-all duration-300 shadow-[0_0_15px_rgba(126,87,88,0.15)]">
                        {isDay1 ? (
                          // Western Formal Tie icon
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                          </svg>
                        ) : (
                          // Traditional/Cultural elegant star icon
                          <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                          </svg>
                        )}
                      </div>

                      <div className="space-y-2">
                        <span className="text-[10px] font-bold tracking-widest text-accent uppercase bg-accent/5 px-2.5 py-0.5 rounded border border-accent/15">
                          {isDay1 ? 'Day 1 Schedule' : 'Day 2 Schedule'}
                        </span>
                        <h3 className="font-heading text-xl font-bold text-yugen-white tracking-wide mt-1">
                          {item.title.replace('Day 1: ', '').replace('Day 2: ', '')}
                        </h3>
                        <p className="text-sm text-muted leading-relaxed pt-1">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                )
              })}
            </div>
          ) : (
            <ComingSoonBlock
              eyebrow="Dress code"
              title="Guidelines publishing soon"
              description="Western formal, cultural formal, and session-specific attire details will be shared before registration opens."
            />
          )}
        </div>
      </div>
    </section>
  )
}
