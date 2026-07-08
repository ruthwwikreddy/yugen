import { useState, type FormEvent } from 'react'
import { YUGEN } from '../../lib/yugen'

interface NotifyFormProps {
  id?: string
  compact?: boolean
}

export function NotifyForm({ id = 'notify-form', compact = false }: NotifyFormProps) {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  async function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setStatus('loading')

    const endpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT

    try {
      if (endpoint) {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ email, name, _subject: 'Yūgen 6.0 — Notify request' }),
        })
        if (!res.ok) throw new Error('Submit failed')
      } else {
        await new Promise((r) => setTimeout(r, 600))
      }
      setSubmittedEmail(email)
      setStatus('success')
      setEmail('')
      setName('')
    } catch {
      setStatus('error')
    }
  }

  const [submittedEmail, setSubmittedEmail] = useState('')

  if (status === 'success') {
    return (
      <div className={`rounded-lg border border-yugen-strong bg-surface-raised ${compact ? 'p-6' : 'p-8'}`}>
        <p className="font-heading text-xl font-bold text-yugen-white">You&apos;re on the list.</p>
        <p className="mt-2 text-sm text-muted">
          We&apos;ll reach out at {submittedEmail} when registration opens for Yūgen 6.0.
        </p>
      </div>
    )
  }

  return (
    <form
      id={id}
      onSubmit={handleSubmit}
      className={`space-y-4 ${compact ? '' : 'max-w-md'}`}
    >
      <div>
        <label htmlFor={`${id}-name`} className="label-caps mb-2 block">
          Name
        </label>
        <input
          id={`${id}-name`}
          type="text"
          required
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          className="w-full rounded-lg border border-yugen bg-yugen-black px-4 py-3 text-sm text-yugen-white placeholder:text-dim focus:border-yugen-strong focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor={`${id}-email`} className="label-caps mb-2 block">
          Email
        </label>
        <input
          id={`${id}-email`}
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@school.edu"
          className="w-full rounded-lg border border-yugen bg-yugen-black px-4 py-3 text-sm text-yugen-white placeholder:text-dim focus:border-yugen-strong focus:outline-none"
        />
      </div>
      <button type="submit" disabled={status === 'loading'} className="btn-primary w-full disabled:opacity-50">
        {status === 'loading' ? 'Submitting…' : 'Get notified'}
      </button>
      {status === 'error' && (
        <p className="text-sm text-muted">Something went wrong. Email us at {YUGEN.email}.</p>
      )}
      {!import.meta.env.VITE_FORMSPREE_ENDPOINT && status === 'idle' && (
        <p className="text-xs text-dim">Demo mode — connect VITE_FORMSPREE_ENDPOINT for live submissions.</p>
      )}
    </form>
  )
}
