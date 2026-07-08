import { useState, type FormEvent } from 'react'
import { adminPassword, setAdminAuthed } from '../../lib/admin-utils'

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
    <div className="flex min-h-screen items-center justify-center bg-yugen-black px-4">
      <div className="w-full max-w-md rounded-2xl border border-yugen bg-surface p-8">
        <div className="mb-8 text-center">
          <p className="font-display text-3xl uppercase">Yūgen</p>
          <p className="label-caps mt-2">Admin console</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
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
              className="w-full rounded-lg border border-yugen bg-yugen-black px-4 py-3 text-sm focus:border-yugen-strong focus:outline-none"
            />
          </div>
          <button type="submit" className="btn-primary w-full">
            Sign in
          </button>
          {error && <p className="text-center text-sm text-muted">{error}</p>}
        </form>

        <p className="mt-6 text-center text-xs text-dim">Not linked in site navigation · local access only</p>
      </div>
    </div>
  )
}
