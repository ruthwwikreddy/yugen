import { useEffect, useId, useMemo, useRef, useState, type CSSProperties, type KeyboardEvent, type ReactNode } from 'react'

export type SearchSelectOption = {
  value: string
  label?: string
}

export type SearchSelectGroup = {
  label: string
  options: readonly string[] | SearchSelectOption[]
}

type SearchSelectProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  options: readonly string[] | SearchSelectOption[]
  /** Categorized options — shown with group headers when browsing */
  groups?: readonly SearchSelectGroup[]
  /** Shown at top when search is empty (e.g. popular picks) */
  featuredOptions?: readonly string[]
  featuredLabel?: string
  placeholder?: string
  emptyLabel?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  allowCustom?: boolean
  className?: string
  inputClassName?: string
  /** Max visible options in flat (non-grouped) mode */
  maxVisible?: number
  /** Show selected value below the input when closed */
  showSelected?: boolean
}

const defaultInputClass =
  'input-touch w-full rounded-xl border border-yugen bg-yugen-black px-4 py-3.5 pr-10 text-yugen-white placeholder:text-dim transition-colors focus:border-yugen-strong focus:outline-none focus:ring-1 focus:ring-yugen-strong/30 sm:text-sm'

type SelectableItem = {
  kind: 'empty' | 'option'
  option: SearchSelectOption
  groupLabel?: string
}

type DisplayRow =
  | { kind: 'empty'; option: SearchSelectOption }
  | { kind: 'section-header'; label: string }
  | { kind: 'option'; option: SearchSelectOption; groupLabel?: string }

function normalizeOptions(options: readonly string[] | SearchSelectOption[]): SearchSelectOption[] {
  return options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
}

function matchesQuery(option: SearchSelectOption, query: string): boolean {
  const q = query.trim().toLowerCase()
  if (!q) return true
  return option.value.toLowerCase().includes(q) || (option.label?.toLowerCase().includes(q) ?? false)
}

function buildAllOptions(
  options: readonly string[] | SearchSelectOption[],
  groups?: readonly SearchSelectGroup[],
): SearchSelectOption[] {
  if (groups?.length) {
    return groups.flatMap((g) => normalizeOptions(g.options))
  }
  return normalizeOptions(options)
}

function buildDisplayRows(params: {
  allOptions: SearchSelectOption[]
  groups?: readonly SearchSelectGroup[]
  featuredOptions?: readonly string[]
  featuredLabel: string
  query: string
  maxVisible: number
  showEmpty: boolean
  emptyLabel: string
}): { rows: DisplayRow[]; selectable: SelectableItem[]; totalMatches: number } {
  const { allOptions, groups, featuredOptions, featuredLabel, query, maxVisible, showEmpty, emptyLabel } = params
  const q = query.trim()
  const rows: DisplayRow[] = []
  const selectable: SelectableItem[] = []

  if (showEmpty) {
    const emptyOpt = { value: '', label: emptyLabel }
    rows.push({ kind: 'empty', option: emptyOpt })
    selectable.push({ kind: 'empty', option: emptyOpt })
  }

  if (q) {
    const matches = allOptions.filter((o) => matchesQuery(o, q))
    for (const option of matches.slice(0, maxVisible)) {
      rows.push({ kind: 'option', option })
      selectable.push({ kind: 'option', option })
    }
    return { rows, selectable, totalMatches: matches.length }
  }

  if (featuredOptions?.length) {
    rows.push({ kind: 'section-header', label: featuredLabel })
    for (const item of featuredOptions) {
      const option = typeof item === 'string' ? { value: item, label: item } : item
      rows.push({ kind: 'option', option })
      selectable.push({ kind: 'option', option })
    }
  }

  if (groups?.length) {
    for (const group of groups) {
      const groupOptions = normalizeOptions(group.options)
      if (groupOptions.length === 0) continue
      rows.push({ kind: 'section-header', label: group.label })
      for (const option of groupOptions) {
        rows.push({ kind: 'option', option, groupLabel: group.label })
        selectable.push({ kind: 'option', option, groupLabel: group.label })
      }
    }
    return { rows, selectable, totalMatches: allOptions.length }
  }

  for (const option of allOptions.slice(0, maxVisible)) {
    rows.push({ kind: 'option', option })
    selectable.push({ kind: 'option', option })
  }

  return { rows, selectable, totalMatches: allOptions.length }
}

function HighlightMatch({ text, query }: { text: string; query: string }) {
  const q = query.trim()
  if (!q) return <>{text}</>

  const lower = text.toLowerCase()
  const idx = lower.indexOf(q.toLowerCase())
  if (idx === -1) return <>{text}</>

  return (
    <>
      {text.slice(0, idx)}
      <mark className="rounded bg-yugen-white/20 px-0.5 text-yugen-white not-italic">{text.slice(idx, idx + q.length)}</mark>
      {text.slice(idx + q.length)}
    </>
  )
}

export function SearchSelect({
  id: idProp,
  value,
  onChange,
  options,
  groups,
  featuredOptions,
  featuredLabel = 'Popular',
  placeholder = 'Search or select…',
  emptyLabel = 'No preference',
  helperText,
  required,
  disabled,
  allowCustom = false,
  className = '',
  inputClassName = defaultInputClass,
  maxVisible = 50,
  showSelected = true,
}: SearchSelectProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const listId = `${id}-listbox`

  const allOptions = useMemo(() => buildAllOptions(options, groups), [options, groups])
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listRef = useRef<HTMLUListElement>(null)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const [dropdownStyle, setDropdownStyle] = useState<CSSProperties>({})
  const [useFixedDropdown, setUseFixedDropdown] = useState(false)

  const showEmpty = !required && !query.trim()
  const { rows, selectable, totalMatches } = buildDisplayRows({
    allOptions,
    groups,
    featuredOptions,
    featuredLabel,
    query,
    maxVisible,
    showEmpty,
    emptyLabel,
  })

  const statusText = useMemo(() => {
    if (!open) return null
    if (query.trim() && selectable.length === 0) return null
    if (query.trim()) {
      const n = totalMatches
      return n === 1 ? '1 result' : `${n} results`
    }
    if (groups?.length) {
      return 'Type to search'
    }
    return null
  }, [open, query, selectable.length, totalMatches, groups])

  useEffect(() => {
    if (!open) {
      setQuery(value)
    }
  }, [value, open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery(value)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [value])

  useEffect(() => {
    if (!open || !listRef.current) return
    const active = listRef.current.querySelector('[data-active="true"]')
    active?.scrollIntoView({ block: 'nearest' })
  }, [highlight, open])

  useEffect(() => {
    setHighlight(0)
  }, [query, open])

  useEffect(() => {
    if (!open) {
      setDropdownStyle({})
      setUseFixedDropdown(false)
      return
    }

    function updateDropdownPosition() {
      const input = inputRef.current
      if (!input) return

      const isMobile = window.matchMedia('(max-width: 639px)').matches
      if (!isMobile) {
        setUseFixedDropdown(false)
        setDropdownStyle({})
        return
      }

      const rect = input.getBoundingClientRect()
      const viewport = window.visualViewport
      const viewportHeight = viewport?.height ?? window.innerHeight
      const maxHeight = Math.min(viewportHeight * 0.45, 288)
      const spaceBelow = viewportHeight - rect.bottom - 8
      const spaceAbove = rect.top - 8
      const openAbove = spaceBelow < 160 && spaceAbove > spaceBelow

      setUseFixedDropdown(true)
      setDropdownStyle({
        position: 'fixed',
        left: Math.max(8, rect.left),
        width: Math.min(rect.width, window.innerWidth - 16),
        maxHeight,
        zIndex: 9999,
        ...(openAbove
          ? { bottom: viewportHeight - rect.top + 6 }
          : { top: rect.bottom + 6 }),
      })
    }

    updateDropdownPosition()
    const viewport = window.visualViewport
    viewport?.addEventListener('resize', updateDropdownPosition)
    viewport?.addEventListener('scroll', updateDropdownPosition)
    window.addEventListener('resize', updateDropdownPosition)
    window.addEventListener('scroll', updateDropdownPosition, true)

    return () => {
      viewport?.removeEventListener('resize', updateDropdownPosition)
      viewport?.removeEventListener('scroll', updateDropdownPosition)
      window.removeEventListener('resize', updateDropdownPosition)
      window.removeEventListener('scroll', updateDropdownPosition, true)
    }
  }, [open])

  function selectOption(opt: SearchSelectOption) {
    onChange(opt.value)
    setQuery(opt.value)
    setOpen(false)
    setHighlight(0)
  }

  function handleInputChange(text: string) {
    setQuery(text)
    setOpen(true)
    if (allowCustom) {
      onChange(text)
    } else if (!text.trim() && !required) {
      onChange('')
    }
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (!open && (e.key === 'ArrowDown' || e.key === 'Enter')) {
      setOpen(true)
      return
    }

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault()
        if (selectable.length > 0) {
          setHighlight((h) => Math.min(h + 1, selectable.length - 1))
        }
        break
      case 'ArrowUp':
        e.preventDefault()
        if (selectable.length > 0) {
          setHighlight((h) => Math.max(h - 1, 0))
        }
        break
      case 'Enter':
        e.preventDefault()
        if (open && selectable[highlight]) {
          selectOption(selectable[highlight].option)
        } else if (allowCustom && query.trim()) {
          onChange(query.trim())
          setOpen(false)
        }
        break
      case 'Escape':
        e.preventDefault()
        setOpen(false)
        setQuery(value)
        break
      case 'Tab':
        setOpen(false)
        setQuery(value)
        break
    }
  }

  function handleClear() {
    onChange('')
    setQuery('')
    setOpen(false)
    inputRef.current?.focus()
  }

  const hasValue = Boolean(value)

  const displayValue = open ? query : value || ''

  // Pre-compute the selectable index for each row in a single pass so the
  // render below stays pure (no `let` mutation mid-map).
  const selectableIndexByRow = useMemo(() => {
    const map = new Map<number, number>()
    let idx = -1
    rows.forEach((row, i) => {
      if (row.kind !== 'section-header') {
        idx += 1
        map.set(i, idx)
      }
    })
    return map
  }, [rows])

  return (
    <div ref={containerRef} className={`relative min-w-0 ${className}`}>
      <div className="relative">
        <input
          ref={inputRef}
          id={id}
          type="text"
          role="combobox"
          aria-expanded={open}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-required={required}
          autoComplete="off"
          disabled={disabled}
          value={displayValue}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setOpen(true)
            setQuery(value)
          }}
          onKeyDown={handleKeyDown}
          className={`${inputClassName} ${!open && hasValue ? 'font-medium' : ''}`}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-0.5 pr-2 sm:pr-3">
          {hasValue && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="pointer-events-auto touch-target flex h-9 w-9 items-center justify-center rounded-lg text-dim transition-colors hover:bg-surface-raised hover:text-yugen-white sm:h-7 sm:w-7 sm:rounded-md"
              aria-label="Clear selection"
            >
              ✕
            </button>
          )}
          <svg
            className={`h-4 w-4 shrink-0 text-dim transition-transform ${open ? 'rotate-180' : ''}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
            aria-hidden
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {showSelected && hasValue && !open && (
        <p className="mt-1.5 flex items-start gap-1.5 text-xs sm:text-sm">
          <span className="mt-0.5 shrink-0 rounded bg-yugen-white/10 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-dim">
            Selected
          </span>
          <span className="min-w-0 break-words text-yugen-white/90">{value}</span>
        </p>
      )}

      {helperText && open && <p className="mt-1 text-xs text-dim">{helperText}</p>}

      {open && rows.length > 0 && (
        <div
          className={`${useFixedDropdown ? '' : 'absolute mt-1.5 w-full'} z-50 overflow-hidden rounded-xl border border-yugen-strong bg-surface-raised shadow-xl`}
          style={useFixedDropdown ? dropdownStyle : undefined}
        >
          <ul
            id={listId}
            ref={listRef}
            role="listbox"
            className="max-h-[min(45dvh,18rem)] overflow-y-auto overscroll-contain py-1 sm:max-h-60"
          >
            {rows.map((row, i) => {
              if (row.kind === 'section-header') {
                return (
                  <li
                    key={`header-${row.label}-${i}`}
                    role="presentation"
                    className="sticky top-0 z-10 border-b border-yugen/50 bg-surface-raised/95 px-4 py-2 text-[11px] font-semibold uppercase tracking-wider text-dim backdrop-blur-sm"
                  >
                    {row.label}
                  </li>
                )
              }

              if (row.kind === 'empty') {
                const idx = selectableIndexByRow.get(i) ?? -1
                const selected = row.option.value === value
                const active = idx === highlight
                return (
                  <OptionRow
                    key="__empty__"
                    active={active}
                    selected={selected}
                    italic
                    onMouseEnter={() => setHighlight(idx)}
                    onSelect={() => selectOption(row.option)}
                  >
                    {row.option.label ?? row.option.value}
                  </OptionRow>
                )
              }

              const idx = selectableIndexByRow.get(i) ?? -1
              const selected = row.option.value === value
              const active = idx === highlight

              return (
                <OptionRow
                  key={`opt-${i}-${row.option.value}`}
                  active={active}
                  selected={selected}
                  onMouseEnter={() => setHighlight(idx)}
                  onSelect={() => selectOption(row.option)}
                >
                  <HighlightMatch text={row.option.label ?? row.option.value} query={query} />
                </OptionRow>
              )
            })}
          </ul>
          {statusText && (
            <div className="hidden border-t border-yugen/50 px-4 py-1.5 text-xs text-dim sm:block">{statusText}</div>
          )}
        </div>
      )}

      {open && rows.length === 0 && query.trim() && (
        <div
          className={`${useFixedDropdown ? '' : 'absolute mt-1.5 w-full'} z-50 rounded-xl border border-yugen bg-surface-raised px-4 py-4 text-sm shadow-xl`}
          style={useFixedDropdown ? dropdownStyle : undefined}
        >
          {allowCustom ? (
            <button
              type="button"
              className="touch-target w-full rounded-lg py-2 text-left text-yugen-white hover:underline"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(query.trim())
                setOpen(false)
              }}
            >
              Use &ldquo;{query.trim()}&rdquo;
            </button>
          ) : (
            <p className="text-dim">No matches — try another search</p>
          )}
        </div>
      )}
    </div>
  )
}

function OptionRow({
  children,
  active,
  selected,
  italic,
  onMouseEnter,
  onSelect,
}: {
  children: ReactNode
  active: boolean
  selected: boolean
  italic?: boolean
  onMouseEnter: () => void
  onSelect: () => void
}) {
  return (
    <li
      role="option"
      aria-selected={selected}
      data-active={active ? 'true' : undefined}
      onMouseEnter={onMouseEnter}
      onMouseDown={(e) => {
        e.preventDefault()
        onSelect()
      }}
      className={`cursor-pointer px-4 py-3.5 text-sm transition-colors sm:py-2.5 ${
        active ? 'bg-yugen-white/10 text-yugen-white' : 'text-muted hover:bg-surface hover:text-yugen-white'
      } ${selected ? 'font-medium' : ''} ${italic ? 'text-dim italic' : ''}`}
    >
      <span className="block break-words">{children}</span>
    </li>
  )
}
