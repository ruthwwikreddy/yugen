import { Link } from 'react-router-dom'
import { PageLayout } from '../components/yugen/PageLayout'
import { ComingSoonBlock } from '../components/yugen/ComingSoonBlock'
import { YUGEN } from '../lib/yugen'

export function SchedulePage() {
  const hasSchedule = YUGEN.schedule.length > 0

  return (
    <PageLayout
      title="Schedule | Yūgen Summit 6.0"
      description="Full schedule for Yūgen Summit 6.0 — opening ceremony, committee sessions, socials, and closing."
      path="/schedule"
      eyebrow="Schedule"
      headline="Conference schedule"
      subheadline="Opening ceremony, committee sessions, socials, and closing — the full run of show lands when dates are confirmed."
    >
      {hasSchedule ? (
        <div className="space-y-8">
          {YUGEN.schedule.map((day) => (
            <div key={day.day} className="rounded-lg border border-yugen bg-surface-raised p-6 md:p-8">
              <h2 className="font-heading text-2xl font-bold">{day.day}</h2>
              <ul className="mt-6 space-y-0 divide-y divide-yugen">
                {day.items.map((item) => (
                  <li key={`${item.time}-${item.title}`} className="flex gap-6 py-4 first:pt-0 last:pb-0">
                    <span className="label-caps w-24 shrink-0 pt-1">{item.time}</span>
                    <div>
                      <p className="font-medium text-yugen-white">{item.title}</p>
                      {item.location && <p className="mt-1 text-sm text-dim">{item.location}</p>}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <ComingSoonBlock
          eyebrow="Schedule"
          title="Timeline coming soon"
          description="Day 0 registration, Day 1–2 committees, social events, and closing ceremony — all times publish with confirmed dates."
        />
      )}

      <div className="mt-10">
        <Link to="/" className="btn-ghost">← Back to home</Link>
      </div>
    </PageLayout>
  )
}
