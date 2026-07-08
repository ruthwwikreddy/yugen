import { useState, type FormEvent } from 'react'
import { motion } from 'framer-motion'
import { adminPassword, setAdminAuthed } from '../../lib/admin-utils'
import { YUGEN } from '../../lib/yugen'
import { AdminAtmosphere } from './admin-ui'

type AdminLoginProps = {
  onSuccess: () => void
}

export function AdminLogin({ onSuccess }: AdminLoginProps) {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    if (!adminPassword) {
      setError('Set VITE_ADMIN_PASSWORD in your local .env file')
      return
    }
    if (password === adminPassword) {
      setAdminAuthed(true)
      onSuccess()
    } else {
      setError('Incorrect password')
    }
  }

  return (
    <div className="relative flex min-h-[100dvh] items-center justify-center overflow-hidden bg-yugen-black px-4">
      <AdminAtmosphere />

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="relative w-full max-w-md"
      >
        <div className="mb-8 text-center">
          <p className="label-caps">Yūgen Summit · Edition {YUGEN.edition}</p>
          <h1 className="mt-3 font-display text-5xl uppercase tracking-wide">Yūgen</h1>
          <p className="mt-2 font-heading text-sm text-muted">Registration admin console</p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-yugen bg-surface/90 shadow-2xl backdrop-blur-xl">
          <div className="border-b border-yugen px-8 py-5">
            <p className="font-heading font-semibold">Sign in</p>
            <p className="mt-1 text-xs text-dim">Authorized secretariat access only</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5 px-8 py-6">
            <div>
              <label htmlFor="admin-password" className="label-caps mb-2 block">
                Password
              </label>
              <input
                id="admin-password"
                type="password"
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                className="input-field"
              />
            </div>
            <button type="submit" className="btn-primary w-full">
              Enter console
            </button>
            {error && (
              <p className="rounded-lg border border-red-500/30 bg-red-950/20 px-3 py-2 text-center text-sm text-red-200">
                {error}
              </p>
            )}
          </form>

          <div className="border-t border-yugen px-8 py-4">
            <p className="text-center text-[10px] uppercase tracking-[0.18em] text-dim">
              Not linked in site navigation · local access only
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  )
}
