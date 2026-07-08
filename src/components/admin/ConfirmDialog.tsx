import { motion } from 'framer-motion'
import { AdminAtmosphere } from './admin-ui'

type ConfirmDialogProps = {
  open: boolean
  title: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  destructive?: boolean
  loading?: boolean
  onConfirm: () => void
  onCancel: () => void
}

export function ConfirmDialog({
  open,
  title,
  message,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  destructive,
  loading,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/75 backdrop-blur-sm" onClick={onCancel} aria-hidden />
      <div className="fixed inset-0 z-[70] flex items-end justify-center p-0 sm:items-center sm:p-4">
        <motion.div
          initial={{ opacity: 0, y: 24, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="relative w-full max-w-md overflow-hidden rounded-t-2xl border border-yugen bg-surface shadow-2xl sm:rounded-2xl"
        >
          <AdminAtmosphere className="opacity-50" />
          <div className="relative p-6">
            <p className="label-caps">{destructive ? 'Destructive action' : 'Confirm action'}</p>
            <h2 className="mt-2 font-heading text-xl font-semibold">{title}</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted">{message}</p>
            <div className="mt-6 flex gap-3">
              <button type="button" onClick={onCancel} disabled={loading} className="btn-ghost flex-1">
                {cancelLabel}
              </button>
              <button
                type="button"
                onClick={onConfirm}
                disabled={loading}
                className={`flex-1 rounded-full px-4 py-2.5 text-[10px] font-semibold uppercase tracking-wider disabled:opacity-50 ${
                  destructive
                    ? 'bg-red-600 text-white hover:bg-red-500'
                    : 'bg-yugen-white text-yugen-black hover:opacity-90'
                }`}
              >
                {loading ? 'Working…' : confirmLabel}
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </>
  )
}
