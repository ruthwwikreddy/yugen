import { useMemo, useState, type ChangeEvent } from 'react'
import { motion } from 'framer-motion'
import {
  buildImportItems,
  guessFieldMapping,
  IMPORT_FIELDS,
  parseCsvOrTsv,
  type FieldKey,
  type ParsedImportItem,
} from '../../lib/csv-importer'
import { bulkImportRegistrations, type RegistrationStatus } from '../../lib/registration'

const inputClass =
  'w-full rounded-lg border border-yugen bg-yugen-black px-4 py-2.5 text-sm text-yugen-white placeholder:text-dim focus:border-yugen-strong focus:outline-none'

const SAMPLE_GOOGLE_SHEET_PASTE = `Timestamp\tFull Name\tEmail Address\tPhone Number\tSchool / Institution\tGrade / Class\t1st Committee Choice\t2nd Committee Choice\t3rd Committee Choice\tCountry Preference\tMUN Experience
2026-07-21 14:30:00\tAarav Sharma\taarav.sharma@example.com\t+919876543210\tDelhi Public School\t11\tUNGA\tUNSC\tAIPPM\tUSA\tHyderabad MUN 2024 (Best Delegate)
2026-07-21 14:35:12\tAnanya Verma\tananya.verma@example.com\t+919812345678\tOakridge International\t10\tUNSC\tUNGA\tHCC\tUK\tFirst time delegate`

type ImportModalProps = {
  open: boolean
  onClose: () => void
  onSuccess: (count: number) => void
  onNavigateAllocations?: () => void
}

export function ImportModal({ open, onClose, onSuccess, onNavigateAllocations }: ImportModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [rawInput, setRawInput] = useState('')
  const [fileName, setFileName] = useState('')
  const [headers, setHeaders] = useState<string[]>([])
  const [dataRows, setDataRows] = useState<string[][]>([])
  const [columnMap, setColumnMap] = useState<Record<number, FieldKey>>({})
  const [defaultStatus, setDefaultStatus] = useState<RegistrationStatus>('verified')
  const [flowSlug] = useState('delegate-r1-early-bird')
  const [importing, setImporting] = useState(false)
  const [progress, setProgress] = useState({ current: 0, total: 0 })
  const [result, setResult] = useState<{ success: number; failed: number } | null>(null)

  const parsedItems: ParsedImportItem[] = useMemo(() => {
    if (headers.length === 0 || dataRows.length === 0) return []
    return buildImportItems(headers, dataRows, columnMap, defaultStatus)
  }, [headers, dataRows, columnMap, defaultStatus])

  const validItems = useMemo(() => parsedItems.filter((i) => i.valid), [parsedItems])

  const mappedRequiredFields = useMemo(() => {
    const values = Object.values(columnMap)
    return {
      name: values.includes('name'),
      email: values.includes('email'),
      phone: values.includes('phone'),
      school: values.includes('school'),
    }
  }, [columnMap])

  if (!open) return null

  function resetAll() {
    setStep(1)
    setRawInput('')
    setFileName('')
    setHeaders([])
    setDataRows([])
    setColumnMap({})
    setImporting(false)
    setProgress({ current: 0, total: 0 })
    setResult(null)
  }

  function handleClose() {
    resetAll()
    onClose()
  }

  function processParsedRows(rows: string[][], nameHint?: string) {
    if (rows.length < 2) {
      alert('The CSV/Sheets data must contain at least 1 header row and 1 data row.')
      return
    }

    const headerRow = rows[0]
    const bodyRows = rows.slice(1)

    const initialMap: Record<number, FieldKey> = {}
    headerRow.forEach((h, colIdx) => {
      initialMap[colIdx] = guessFieldMapping(h, colIdx)
    })

    setHeaders(headerRow)
    setDataRows(bodyRows)
    setColumnMap(initialMap)
    if (nameHint) setFileName(nameHint)
    setStep(2)
  }

  function handleFileUpload(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    const reader = new FileReader()
    reader.onload = (evt) => {
      const content = evt.target?.result as string
      if (content) {
        setRawInput(content)
        const parsed = parseCsvOrTsv(content)
        processParsedRows(parsed, file.name)
      }
    }
    reader.readAsText(file)
  }

  function handleParsePastedText() {
    if (!rawInput.trim()) return
    const parsed = parseCsvOrTsv(rawInput)
    processParsedRows(parsed, 'Pasted Google Sheets Data')
  }

  function handleLoadSample() {
    setRawInput(SAMPLE_GOOGLE_SHEET_PASTE)
    const parsed = parseCsvOrTsv(SAMPLE_GOOGLE_SHEET_PASTE)
    processParsedRows(parsed, 'Sample Google Sheet Data')
  }

  function handleMapChange(colIdx: number, field: FieldKey) {
    setColumnMap((prev) => ({ ...prev, [colIdx]: field }))
  }

  const missingRequired = !mappedRequiredFields.name || !mappedRequiredFields.email

  async function handleStartImport() {
    if (validItems.length === 0) return
    setStep(4)
    setImporting(true)
    setProgress({ current: 0, total: validItems.length })

    const entries = validItems.map((item) => ({
      input: item.input,
      status: item.status,
      adminNotes: item.adminNotes ? `[Google Sheets Import] ${item.adminNotes}` : '[Google Sheets Import]',
    }))

    const res = await bulkImportRegistrations(flowSlug, entries, (current, total) => {
      setProgress({ current, total })
    })

    setImporting(false)
    setResult({ success: res.successCount, failed: res.failedCount })
    onSuccess(res.successCount)
  }

  return (
    <>
      <div className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm" onClick={handleClose} aria-hidden />
      <div className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-3 pt-[6vh] sm:p-4 sm:pt-[8vh]">
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          className="w-full max-w-4xl rounded-2xl border border-yugen bg-surface shadow-2xl overflow-hidden flex flex-col max-h-[88vh]"
        >
          {/* Modal Header */}
          <div className="flex items-center justify-between border-b border-yugen px-6 py-4 bg-surface-raised/60">
            <div>
              <div className="flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-lg bg-yugen-white text-yugen-black text-xs font-bold">
                  📊
                </span>
                <h2 className="font-heading text-lg font-semibold sm:text-xl">Import Google Form Responses</h2>
              </div>
              <p className="mt-0.5 text-xs text-dim">
                Import applicants directly from Google Sheets / CSV into Yūgen for allocation
              </p>
            </div>

            <div className="flex items-center gap-3">
              {step > 1 && step < 4 && (
                <button
                  type="button"
                  onClick={() => setStep((s) => (s - 1) as typeof step)}
                  className="btn-ghost py-1.5 px-3 text-xs"
                >
                  ← Back
                </button>
              )}
              <button
                type="button"
                onClick={handleClose}
                className="rounded-lg border border-yugen px-3 py-1.5 text-xs text-muted hover:text-yugen-white"
              >
                Close
              </button>
            </div>
          </div>

          {/* Stepper Bar */}
          <div className="flex items-center justify-between border-b border-yugen bg-yugen-black/40 px-6 py-2.5 text-xs">
            <div className="flex items-center gap-4">
              <span className={`flex items-center gap-1.5 font-medium ${step === 1 ? 'text-yugen-white font-semibold' : 'text-dim'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 1 ? 'bg-yugen-white text-yugen-black' : 'bg-yugen'}`}>
                  1
                </span>
                Upload / Paste
              </span>
              <span className="text-yugen">/</span>
              <span className={`flex items-center gap-1.5 font-medium ${step === 2 ? 'text-yugen-white font-semibold' : 'text-dim'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 2 ? 'bg-yugen-white text-yugen-black' : 'bg-yugen'}`}>
                  2
                </span>
                Map Columns
              </span>
              <span className="text-yugen">/</span>
              <span className={`flex items-center gap-1.5 font-medium ${step === 3 ? 'text-yugen-white font-semibold' : 'text-dim'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 3 ? 'bg-yugen-white text-yugen-black' : 'bg-yugen'}`}>
                  3
                </span>
                Preview & Confirm
              </span>
              <span className="text-yugen">/</span>
              <span className={`flex items-center gap-1.5 font-medium ${step === 4 ? 'text-yugen-white font-semibold' : 'text-dim'}`}>
                <span className={`flex h-5 w-5 items-center justify-center rounded-full text-[10px] ${step === 4 ? 'bg-yugen-white text-yugen-black' : 'bg-yugen'}`}>
                  4
                </span>
                Import Status
              </span>
            </div>
            {fileName && <span className="hidden sm:inline font-mono text-[11px] text-muted truncate max-w-[200px]">{fileName}</span>}
          </div>

          {/* Modal Body */}
          <div className="flex-1 overflow-y-auto p-6 space-y-6">
            {/* STEP 1: Upload or Paste */}
            {step === 1 && (
              <div className="space-y-6">
                {/* Drag & Drop File */}
                <div className="relative flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-yugen bg-surface-raised/40 p-8 text-center transition-colors hover:border-yugen-strong">
                  <input
                    type="file"
                    accept=".csv,.tsv,.txt"
                    onChange={handleFileUpload}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-yugen/40 text-2xl">
                    📁
                  </div>
                  <p className="font-heading font-medium text-yugen-white">
                    Upload Google Sheets CSV or TSV File
                  </p>
                  <p className="mt-1 text-xs text-dim">
                    Click to browse or drop your exported <code className="text-yugen-white">.csv</code> file here
                  </p>
                </div>

                <div className="relative flex items-center justify-center">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-yugen" /></div>
                  <span className="relative bg-surface px-4 text-xs font-semibold uppercase tracking-wider text-dim">
                    OR Paste Direct Data
                  </span>
                </div>

                {/* Paste Area */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="label-caps block">Paste Rows from Google Sheets</label>
                    <button
                      type="button"
                      onClick={handleLoadSample}
                      className="text-xs text-dim underline hover:text-yugen-white"
                    >
                      Try with sample data
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={rawInput}
                    onChange={(e) => setRawInput(e.target.value)}
                    placeholder="Copy all rows (including headers) from your Google Sheet and paste here…"
                    className={`${inputClass} font-mono text-xs`}
                  />
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleParsePastedText}
                    disabled={!rawInput.trim()}
                    className="btn-primary px-6 disabled:opacity-50"
                  >
                    Continue to Column Mapping →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Map Columns */}
            {step === 2 && (
              <div className="space-y-6">
                <div className="rounded-xl border border-amber-500/30 bg-amber-950/20 p-4 text-xs text-amber-200 leading-relaxed">
                  <p className="font-semibold text-amber-300">Smart Mapping Detected {headers.length} Columns</p>
                  <p className="mt-0.5 text-muted">
                    We've auto-matched your Google Sheet headers. Please review the mappings below and assign any unmapped columns if needed.
                  </p>
                </div>

                {missingRequired && (
                  <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-3 text-xs text-red-300 font-medium">
                    ⚠️ Required fields missing: {!mappedRequiredFields.name && ' Full Name '} {!mappedRequiredFields.email && ' Email Address '}. Please map these columns.
                  </div>
                )}

                <div className="grid gap-3 sm:grid-cols-2">
                  {headers.map((header, colIdx) => {
                    const currentMapping = columnMap[colIdx] ?? 'ignore'
                    const isRequired = currentMapping === 'name' || currentMapping === 'email'
                    return (
                      <div
                        key={colIdx}
                        className={`rounded-xl border p-3 bg-surface-raised/40 transition-colors ${
                          currentMapping !== 'ignore' ? 'border-yugen-strong' : 'border-yugen/60'
                        }`}
                      >
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          <span className="font-mono text-xs font-semibold truncate text-yugen-white" title={header}>
                            {header}
                          </span>
                          <span className="text-[10px] font-mono text-dim shrink-0">Col {colIdx + 1}</span>
                        </div>

                        {/* First row sample preview */}
                        {dataRows.length > 0 && (
                          <p className="text-[11px] text-dim truncate mb-2.5 italic">
                            Sample: "{dataRows[0][colIdx] ?? ''}"
                          </p>
                        )}

                        <select
                          value={currentMapping}
                          onChange={(e) => handleMapChange(colIdx, e.target.value as FieldKey)}
                          className={`${inputClass} text-xs ${isRequired ? 'border-amber-400/60' : ''}`}
                        >
                          {IMPORT_FIELDS.map((f) => (
                            <option key={f.key} value={f.key}>
                              {f.label} {f.required ? ' *' : ''}
                            </option>
                          ))}
                        </select>
                      </div>
                    )
                  })}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-yugen">
                  <span className="text-xs text-dim">
                    {Object.values(columnMap).filter((v) => v !== 'ignore').length} of {headers.length} columns mapped
                  </span>
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    disabled={missingRequired}
                    className="btn-primary px-6 disabled:opacity-50"
                  >
                    Preview Records ({dataRows.length}) →
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Preview & Confirm */}
            {step === 3 && (
              <div className="space-y-6">
                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="rounded-xl border border-yugen bg-surface-raised/40 p-4">
                    <p className="text-xs text-dim">Total Rows</p>
                    <p className="mt-1 font-heading text-2xl font-bold">{dataRows.length}</p>
                  </div>
                  <div className="rounded-xl border border-green-500/30 bg-green-950/20 p-4">
                    <p className="text-xs text-green-300">Ready for Allocation</p>
                    <p className="mt-1 font-heading text-2xl font-bold text-green-400">{validItems.length}</p>
                  </div>
                  <div className="rounded-xl border border-yugen bg-surface-raised/40 p-4">
                    <p className="text-xs text-dim">Default Import Status</p>
                    <select
                      value={defaultStatus}
                      onChange={(e) => setDefaultStatus(e.target.value as RegistrationStatus)}
                      className="mt-1.5 w-full rounded-lg border border-yugen bg-yugen-black px-2.5 py-1.5 text-xs text-yugen-white focus:border-yugen-strong focus:outline-none"
                    >
                      <option value="verified">Verified (Approved for Allocation)</option>
                      <option value="pending">Pending Payment</option>
                      <option value="paid">Awaiting Payment Verification</option>
                    </select>
                  </div>
                </div>

                <div>
                  <h3 className="font-heading font-semibold text-sm mb-3">Preview First 10 Records</h3>
                  <div className="overflow-x-auto rounded-xl border border-yugen">
                    <table className="w-full text-left text-xs">
                      <thead className="border-b border-yugen bg-surface-raised font-mono text-[11px] text-muted">
                        <tr>
                          <th className="px-3 py-2.5">#</th>
                          <th className="px-3 py-2.5">Delegate Name</th>
                          <th className="px-3 py-2.5">Email</th>
                          <th className="px-3 py-2.5">Phone</th>
                          <th className="px-3 py-2.5">School</th>
                          <th className="px-3 py-2.5">Pref 1</th>
                          <th className="px-3 py-2.5">Pref 2</th>
                          <th className="px-3 py-2.5">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-yugen">
                        {parsedItems.slice(0, 10).map((item, idx) => (
                          <tr key={idx} className={item.valid ? 'bg-surface' : 'bg-red-950/20'}>
                            <td className="px-3 py-2.5 text-dim">{idx + 1}</td>
                            <td className="px-3 py-2.5 font-medium">{item.input.name || <span className="text-red-400">Missing</span>}</td>
                            <td className="px-3 py-2.5 text-dim">{item.input.email || <span className="text-red-400">Missing</span>}</td>
                            <td className="px-3 py-2.5 text-muted">{item.input.phone || '—'}</td>
                            <td className="px-3 py-2.5 text-muted">{item.input.school || '—'}</td>
                            <td className="px-3 py-2.5 text-muted">{item.input.committeePreference || '—'}</td>
                            <td className="px-3 py-2.5 text-muted">{item.input.committeePreference2 || '—'}</td>
                            <td className="px-3 py-2.5">
                              <span className="inline-flex rounded-full bg-yugen-white text-yugen-black px-2 py-0.5 text-[10px] font-semibold uppercase">
                                {item.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  {parsedItems.length > 10 && (
                    <p className="mt-2 text-[11px] text-dim text-center">
                      + {parsedItems.length - 10} more records will be imported
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-yugen">
                  <span className="text-xs text-dim">Ready to import into Yūgen Admin console</span>
                  <button
                    type="button"
                    onClick={handleStartImport}
                    disabled={validItems.length === 0}
                    className="btn-primary px-8 py-3 font-semibold text-sm disabled:opacity-50"
                  >
                    Confirm & Import {validItems.length} Delegates 🎉
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Import Progress & Complete */}
            {step === 4 && (
              <div className="space-y-6 py-6 text-center">
                {importing ? (
                  <div className="space-y-4 max-w-md mx-auto py-8">
                    <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-yugen border-t-yugen-white" />
                    <h3 className="font-heading text-lg font-semibold">Importing Google Form Responses…</h3>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-surface-raised">
                      <div
                        className="h-full bg-yugen-white transition-all duration-200"
                        style={{ width: `${progress.total ? (progress.current / progress.total) * 100 : 0}%` }}
                      />
                    </div>
                    <p className="text-xs text-dim">
                      Processing {progress.current} of {progress.total} delegate records…
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 max-w-lg mx-auto py-4">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500/20 text-3xl text-green-400">
                      ✓
                    </div>
                    <div>
                      <h3 className="font-heading text-2xl font-bold">Import Completed!</h3>
                      <p className="mt-2 text-sm text-muted">
                        Successfully imported <span className="font-bold text-yugen-white">{result?.success}</span> delegates from Google Sheets.
                      </p>
                      {result?.failed ? (
                        <p className="mt-1 text-xs text-red-300">{result.failed} records failed to import.</p>
                      ) : null}
                    </div>

                    <div className="rounded-xl border border-yugen bg-surface-raised/40 p-4 text-left space-y-2 text-xs">
                      <p className="font-semibold text-yugen-white">Next Steps:</p>
                      <p className="text-dim">• Imported delegates are now listed under the Registrations tab.</p>
                      <p className="text-dim">• Head over to the Allocations panel to assign Committees & Countries!</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-2">
                      <button
                        type="button"
                        onClick={handleClose}
                        className="btn-ghost flex-1 py-3"
                      >
                        View Registrations
                      </button>
                      {onNavigateAllocations && (
                        <button
                          type="button"
                          onClick={() => {
                            handleClose()
                            onNavigateAllocations()
                          }}
                          className="btn-primary flex-1 py-3 font-semibold"
                        >
                          Go to Allocations →
                        </button>
                      )}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </>
  )
}
