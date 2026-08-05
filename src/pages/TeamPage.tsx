import { PageLayout, TeamCard } from '../components/yugen/PageLayout'
import { YUGEN, getExecutiveBoard } from '../lib/yugen'

export function TeamPage() {
  const executiveBoard = getExecutiveBoard()

  return (
    <PageLayout
      title="Team | Yūgen Summit 6.0"
      description="Yūgen Summit 6.0 secretariat, USGs, and organizing committee — the team behind the conference."
      path="/team"
      eyebrow="Team"
      headline="Secretariat &amp; organizing team"
      subheadline="Meet the team driving the vision and operations of Yūgen Summit 6.0."
    >
      <section>
        <h2 className="label-caps mb-6">Secretariat</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {YUGEN.secretariat.map((member) => (
            <TeamCard key={`${member.role}-${member.name}`} {...member} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="label-caps mb-6">Organizing Committee &amp; USGs</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {YUGEN.team.usgs.map((member) => (
            <TeamCard key={`${member.role}-${member.name}`} name={member.name} role={member.role} initials={member.initials} image={member.image} />
          ))}
        </div>
      </section>

      <section className="mt-16">
        <h2 className="label-caps mb-6">Executive Board</h2>
        {executiveBoard.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {executiveBoard.map((member) => (
              <TeamCard
                key={`${member.committee}-${member.role}`}
                name={member.name}
                role={`${member.role} · ${member.committee}`}
                initials={member.initials}
                image={member.image}
              />
            ))}
          </div>
        ) : (
          <div className="rounded-lg border border-yugen bg-surface-raised p-8 text-center">
            <span className="coming-soon-pill">Coming soon</span>
            <p className="mt-4 font-heading text-xl font-bold">Chairs &amp; Vice-Chairs announcing soon</p>
            <p className="mt-2 text-sm text-muted">Executive board roster publishes with committee announcements.</p>
          </div>
        )}
      </section>
    </PageLayout>
  )
}
