import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { YUGEN } from '../../lib/yugen'
import {
  buildAllocationHtml,
  buildAllocationMailtoUrl,
  buildAllocationPlainText,
  type AllocationEmailData,
} from '../../lib/allocation-email'

type AllocationEmailPreviewProps = {
  data: AllocationEmailData
  onCopied?: (format: 'plain' | 'html') => void
}

export function AllocationEmailPreview({ data, onCopied }: AllocationEmailPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'plain' | 'html'>('preview')
  const [copied, setCopied] = useState<'plain' | 'html' | null>(null)

  const plainText = buildAllocationPlainText(data)
  const html = buildAllocationHtml(data)

  async function copyText(text: string, format: 'plain' | 'html') {
    try {
      if (format === 'html') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([text], { type: 'text/html' }),
            'text/plain': new Blob([buildAllocationPlainText(data)], { type: 'text/plain' }),
          }),
        ])
      } else {
        await navigator.clipboard.writeText(text)
      }
      setCopied(format)
      onCopied?.(format)
      setTimeout(() => setCopied(null), 2000)
    } catch {
      await navigator.clipboard.writeText(text)
      setCopied(format)
      onCopied?.(format)
      setTimeout(() => setCopied(null), 2000)
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap gap-2">
        {(['preview', 'plain', 'html'] as const).map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={`rounded-full px-4 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
              tab === t ? 'bg-yugen-white text-yugen-black' : 'border border-yugen text-muted hover:text-yugen-white'
            }`}
          >
            {t === 'preview' ? 'Preview' : t === 'plain' ? 'Plain text' : 'HTML'}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'preview' && (
          <motion.div
            key="preview"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="allocation-email-preview relative overflow-hidden rounded-2xl border border-yugen bg-yugen-black"
          >
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
              <div className="hero-grid absolute inset-0" />
              <div className="hero-vignette absolute inset-0" />
              <div className="hero-grain absolute inset-0" />
              <div className="hero-spotlight absolute inset-0" />
            </div>

            <div className="relative border-b border-yugen bg-yugen-black/80 px-6 py-5 backdrop-blur-sm">
              <p className="label-caps">Yūgen Summit · Edition {YUGEN.edition}</p>
              <h3 className="mt-2 font-display text-3xl uppercase tracking-wide text-yugen-white">
                Committee Allocation
              </h3>
            </div>

            <div className="relative space-y-5 px-6 py-6">
              <p className="text-sm leading-relaxed text-muted">
                Dear <span className="font-semibold text-yugen-white">{data.delegateName}</span>,
              </p>
              <p className="text-sm leading-relaxed text-muted">
                Congratulations — we are pleased to confirm your committee allocation for{' '}
                <span className="text-yugen-white">Yūgen Summit 6.0</span>.
              </p>

              <div className="rounded-xl border border-yugen-strong bg-surface-raised p-5">
                <p className="label-caps">Your committee</p>
                <p className="mt-2 font-heading text-xl font-bold leading-snug">{data.committee}</p>
                {data.country && (
                  <p className="mt-3 text-sm text-muted">
                    <span className="label-caps mr-2">Country</span>
                    <span className="text-yugen-white">{data.country}</span>
                  </p>
                )}
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <DetailChip label="Registration ID" value={data.registrationId} mono />
                <DetailChip label="School" value={data.school} />
              </div>

              <div>
                <p className="label-caps mb-3">Next steps</p>
                <ul className="space-y-2 text-sm text-muted">
                  <li className="flex gap-2">
                    <span className="text-dim">·</span>
                    Review your committee study guide on our website
                  </li>
                  <li className="flex gap-2">
                    <span className="text-dim">·</span>
                    Prepare position papers per committee guidelines
                  </li>
                  <li className="flex gap-2">
                    <span className="text-dim">·</span>
                    Watch for further updates from the secretariat
                  </li>
                </ul>
              </div>

              <div className="rounded-lg border border-yugen bg-surface/80 px-4 py-3">
                <p className="text-xs leading-relaxed text-dim">
                  {YUGEN.datesHero}
                  <br />
                  {YUGEN.venue}, {YUGEN.city}
                </p>
              </div>

              <div className="border-t border-yugen pt-4">
                <p className="text-sm font-semibold">Yūgen Summit Secretariat</p>
                <p className="mt-1 text-sm text-dim">{YUGEN.email}</p>
              </div>
            </div>
          </motion.div>
        )}

        {tab === 'plain' && (
          <motion.div
            key="plain"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <pre className="max-h-72 overflow-auto rounded-xl border border-yugen bg-surface p-4 font-mono text-xs leading-relaxed text-muted whitespace-pre-wrap">
              {plainText}
            </pre>
          </motion.div>
        )}

        {tab === 'html' && (
          <motion.div
            key="html"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            <pre className="max-h-72 overflow-auto rounded-xl border border-yugen bg-surface p-4 font-mono text-[10px] leading-relaxed text-dim whitespace-pre-wrap">
              {html}
            </pre>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => copyText(plainText, 'plain')}
          className="btn-ghost text-xs"
        >
          {copied === 'plain' ? 'Copied' : 'Copy plain text'}
        </button>
        <button
          type="button"
          onClick={() => copyText(html, 'html')}
          className="btn-ghost text-xs"
        >
          {copied === 'html' ? 'Copied' : 'Copy HTML'}
        </button>
        <a
          href={buildAllocationMailtoUrl(data)}
          className="btn-primary text-xs"
          target="_blank"
          rel="noopener noreferrer"
        >
          Open in mail client
        </a>
      </div>
    </div>
  )
}

function DetailChip({
  label,
  value,
  mono,
}: {
  label: string
  value: string
  mono?: boolean
}) {
  return (
    <div className="rounded-lg border border-yugen bg-surface px-4 py-3">
      <p className="label-caps">{label}</p>
      <p className={`mt-1 text-sm text-yugen-white ${mono ? 'font-mono text-xs' : ''}`}>{value}</p>
    </div>
  )
}
