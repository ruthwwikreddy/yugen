import { motion } from 'framer-motion'

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
      <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={onCancel} aria-hidden />
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="w-full max-w-md rounded-2xl border border-yugen bg-surface p-6 shadow-2xl"
        >
          <h2 className="font-heading text-lg font-semibold">{title}</h2>
          <p className="mt-2 text-sm text-muted">{message}</p>
          <div className="mt-6 flex gap-3">
            <button type="button" onClick={onCancel} disabled={loading} className="btn-ghost flex-1">
              {cancelLabel}
            </button>
            <button
              type="button"
              onClick={onConfirm}
              disabled={loading}
              className={`flex-1 rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider disabled:opacity-50 ${
                destructive
                  ? 'bg-red-600 text-white hover:bg-red-500'
                  : 'bg-yugen-white text-yugen-black hover:opacity-90'
              }`}
            >
              {loading ? 'Working…' : confirmLabel}
            </button>
          </div>
        </motion.div>
      </div>
    </>
  )
}
