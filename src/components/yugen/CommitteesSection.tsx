import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { getCommittees } from '../../lib/yugen'
import { CommitteeGrid } from './CommitteeCard'

export function CommitteesSection() {
  const committees = getCommittees()
  const preview = committees.slice(0, 4)

  return (
    <section id="committees" className="border-t border-yugen bg-surface section-padding">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <p className="label-caps mb-4">Committees</p>
          <h2 className="section-title">Councils &amp; agendas</h2>
          <p className="mt-4 max-w-xl text-muted">
          Explore the official councils and agendas for Yūgen Summit 6.0.
        </p>
      </motion.div>

      <div className="mt-12">
        <CommitteeGrid committees={preview} compact />
      </div>

      <div className="mt-10 flex flex-wrap gap-4">
        <Link to="/committees" className="btn-primary">
          View all {committees.length} committees
        </Link>
        <Link to="/resources" className="btn-ghost">
          Study guides
        </Link>
      </div>
    </div>
  </section>
  )
}
