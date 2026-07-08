import { EARLY_BIRD_AMOUNT, UPI_ID, UPI_PAYEE_NAME } from '../../lib/registration'
import { firebaseEnabled } from '../../lib/firebase'
import { adminPassword, formatInr } from '../../lib/admin-utils'
import { listLocalRegistrations } from '../../lib/registration-storage'
import { AdminCard } from './admin-ui'

export function AdminSettingsPanel() {
  const localCount = listLocalRegistrations().length
  const unsynced = listLocalRegistrations().filter((r) => !r.syncedToCloud).length

  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <AdminCard title="Registration config" description="Current early bird round settings">
        <div className="divide-y divide-yugen text-sm">
          <Row label="Early bird fee" value={formatInr(EARLY_BIRD_AMOUNT)} />
          <Row label="Tier" value="Round 1 · Early bird" />
          <Row label="ID format" value="YG6-EB-XXXXXX" mono />
        </div>
      </AdminCard>

      <AdminCard title="UPI payment" description="Delegate payment identifiers">
        <div className="divide-y divide-yugen text-sm">
          <Row label="UPI ID" value={UPI_ID || 'Not set'} mono />
          <Row label="Payee name" value={UPI_PAYEE_NAME} />
          <Row label="Payment note" value="Yugen6 {registration-id}" mono />
        </div>
      </AdminCard>

      <AdminCard title="Storage" description="Firebase and local fallback status">
        <div className="divide-y divide-yugen text-sm">
          <Row label="Firebase" value={firebaseEnabled ? 'Configured' : 'Not configured'} />
          <Row label="Local registrations" value={String(localCount)} />
          <Row label="Pending cloud sync" value={String(unsynced)} />
          <Row label="Collection" value="registrations" mono />
        </div>
        {!firebaseEnabled && (
          <p className="mt-4 rounded-lg border border-amber-500/25 bg-amber-950/15 px-3 py-2 text-xs text-dim">
            Enable Firestore at{' '}
            <a
              href="https://console.firebase.google.com/project/yugen-porps/firestore"
              target="_blank"
              rel="noopener noreferrer"
              className="text-yugen-white underline"
            >
              Firebase Console
            </a>
            , then run <code className="text-yugen-white">firebase deploy --only firestore:rules</code>
          </p>
        )}
      </AdminCard>

      <AdminCard title="Access" description="Admin authentication">
        <div className="divide-y divide-yugen text-sm">
          <Row label="Admin password" value={adminPassword ? 'Configured' : 'Not set'} />
          <Row label="Public nav" value="Hidden" />
          <Row label="Session" value="Browser session storage" />
        </div>
      </AdminCard>
    </div>
  )
}

function Row({ label, value, mono }: { label: string; value: string; mono?: boolean }) {
  return (
    <div className="flex justify-between gap-4 py-3 first:pt-0 last:pb-0">
      <span className="text-muted">{label}</span>
      <span className={`text-right ${mono ? 'font-mono text-xs' : ''}`}>{value}</span>
    </div>
  )
}
