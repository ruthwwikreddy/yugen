import { useEffect, useMemo, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  buildAllocationHtml,
  buildAllocationMailtoUrl,
  buildAllocationPlainText,
  type AllocationEmailData,
  type AllocationEmailTheme,
} from '../../lib/allocation-email'

type AllocationEmailPreviewProps = {
  data: AllocationEmailData
  onCopied?: (format: 'plain' | 'html') => void
}

type PreviewTheme = AllocationEmailTheme

const THEME_OPTIONS: { id: PreviewTheme; label: string }[] = [
  { id: 'light', label: 'Light' },
  { id: 'dark', label: 'Dark' },
  { id: 'auto', label: 'System' },
]

const PAGE_BG = {
  light: '#F5F5F5',
  dark: '#0A0A0A',
} as const

function useSystemPrefersDark(): boolean {
  const [prefersDark, setPrefersDark] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-color-scheme: dark)').matches
  })

  useEffect(() => {
    const mq = window.matchMedia('(prefers-color-scheme: dark)')
    const handler = (event: MediaQueryListEvent) => setPrefersDark(event.matches)
    mq.addEventListener('change', handler)
    return () => mq.removeEventListener('change', handler)
  }, [])

  return prefersDark
}

function resolvePreviewBackground(theme: PreviewTheme, systemDark: boolean): string {
  if (theme === 'light') return PAGE_BG.light
  if (theme === 'dark') return PAGE_BG.dark
  return systemDark ? PAGE_BG.dark : PAGE_BG.light
}

export function AllocationEmailPreview({ data, onCopied }: AllocationEmailPreviewProps) {
  const [tab, setTab] = useState<'preview' | 'plain' | 'html'>('preview')
  const [previewTheme, setPreviewTheme] = useState<PreviewTheme>('light')
  const [copied, setCopied] = useState<'plain' | 'html' | null>(null)
  const systemDark = useSystemPrefersDark()

  const plainText = buildAllocationPlainText(data)
  const htmlForCopy = buildAllocationHtml(data, { theme: 'auto' })

  const previewHtml = useMemo(() => {
    if (previewTheme === 'auto') {
      return buildAllocationHtml(data, { theme: 'auto' })
    }
    return buildAllocationHtml(data, { theme: previewTheme })
  }, [data, previewTheme])

  const previewBackground = resolvePreviewBackground(previewTheme, systemDark)
  const iframeColorScheme =
    previewTheme === 'auto' ? 'light dark' : previewTheme

  async function copyText(text: string, format: 'plain' | 'html') {
    try {
      if (format === 'html') {
        await navigator.clipboard.write([
          new ClipboardItem({
            'text/html': new Blob([htmlForCopy], { type: 'text/html' }),
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
      <div className="flex flex-wrap items-center gap-2">
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

        {tab === 'preview' && (
          <div className="ml-auto flex flex-wrap gap-1 rounded-full border border-yugen p-1">
            {THEME_OPTIONS.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => setPreviewTheme(id)}
                className={`rounded-full px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider transition-colors ${
                  previewTheme === id
                    ? 'bg-yugen-white text-yugen-black'
                    : 'text-dim hover:text-yugen-white'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        )}
      </div>

      <AnimatePresence mode="wait">
        {tab === 'preview' && (
          <motion.div
            key={`preview-${previewTheme}-${previewTheme === 'auto' ? (systemDark ? 'dark' : 'light') : ''}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="allocation-email-preview overflow-hidden rounded-2xl border border-yugen"
          >
            <div className="flex items-center justify-between border-b border-yugen bg-surface px-4 py-2.5">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-dim">
                Email preview
                {previewTheme === 'auto' && ` · ${systemDark ? 'dark' : 'light'} (system)`}
              </p>
              <p className="text-[10px] text-dim">600px max · Gmail-safe tables</p>
            </div>
            <div
              className="transition-colors duration-200"
              style={{ backgroundColor: previewBackground }}
            >
              <iframe
                title="Allocation email preview"
                srcDoc={previewHtml}
                sandbox="allow-same-origin"
                className="block h-[680px] w-full border-0"
                style={{
                  backgroundColor: previewBackground,
                  colorScheme: iframeColorScheme,
                }}
              />
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
              {htmlForCopy}
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
          onClick={() => copyText(htmlForCopy, 'html')}
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
