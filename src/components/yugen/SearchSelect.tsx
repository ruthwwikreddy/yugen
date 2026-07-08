import { useEffect, useId, useRef, useState, type KeyboardEvent } from 'react'

export type SearchSelectOption = {
  value: string
  label?: string
}

type SearchSelectProps = {
  id?: string
  value: string
  onChange: (value: string) => void
  options: readonly string[] | SearchSelectOption[]
  placeholder?: string
  emptyLabel?: string
  helperText?: string
  required?: boolean
  disabled?: boolean
  allowCustom?: boolean
  className?: string
  inputClassName?: string
  /** Max visible options in dropdown */
  maxVisible?: number
}

const defaultInputClass =
  'input-touch w-full rounded-xl border border-yugen bg-yugen-black px-4 py-3.5 pr-10 text-yugen-white placeholder:text-dim transition-colors focus:border-yugen-strong focus:outline-none focus:ring-1 focus:ring-yugen-strong/30 sm:text-sm'

function normalizeOptions(options: readonly string[] | SearchSelectOption[]): SearchSelectOption[] {
  return options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o))
}

function filterOptions(options: SearchSelectOption[], query: string, maxVisible: number): SearchSelectOption[] {
  const q = query.trim().toLowerCase()
  if (!q) return options.slice(0, maxVisible)
  return options.filter((o) => o.value.toLowerCase().includes(q) || o.label?.toLowerCase().includes(q)).slice(0, maxVisible)
}

export function SearchSelect({
  id: idProp,
  value,
  onChange,
  options,
  placeholder = 'Search or select…',
  emptyLabel = 'No preference',
  helperText,
  required,
  disabled,
  allowCustom = false,
  className = '',
  inputClassName = defaultInputClass,
  maxVisible = 50,
}: SearchSelectProps) {
  const autoId = useId()
  const id = idProp ?? autoId
  const listId = `${id}-listbox`

  const normalized = normalizeOptions(options)
  const containerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)

  const filtered = filterOptions(normalized, query, maxVisible)
  const showEmpty = !required && !query.trim()
  const displayItems: SearchSelectOption[] = showEmpty
    ? [{ value: '', label: emptyLabel }, ...filtered]
    : filtered

  // Sync query when value changes externally
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

  function selectOption(opt: SearchSelectOption) {
    onChange(opt.value)
    setQuery(opt.value)
    setOpen(false)
    setHighlight(0)
  }

  function handleInputChange(text: string) {
    setQuery(text)
    setOpen(true)
    setHighlight(0)
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
        setHighlight((h) => Math.min(h + 1, displayItems.length - 1))
        break
      case 'ArrowUp':
        e.preventDefault()
        setHighlight((h) => Math.max(h - 1, 0))
        break
      case 'Enter':
        e.preventDefault()
        if (open && displayItems[highlight]) {
          selectOption(displayItems[highlight])
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

  return (
    <div ref={containerRef} className={`relative ${className}`}>
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
          value={open ? query : value || ''}
          placeholder={placeholder}
          onChange={(e) => handleInputChange(e.target.value)}
          onFocus={() => {
            setOpen(true)
            setQuery(value)
          }}
          onKeyDown={handleKeyDown}
          className={inputClassName}
        />

        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center gap-1 pr-3">
          {hasValue && !disabled && (
            <button
              type="button"
              tabIndex={-1}
              onClick={handleClear}
              className="pointer-events-auto touch-target flex h-7 w-7 items-center justify-center rounded-md text-dim transition-colors hover:bg-surface-raised hover:text-yugen-white"
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

      {helperText && <p className="mt-1.5 text-xs text-dim">{helperText}</p>}

      {open && displayItems.length > 0 && (
        <ul
          id={listId}
          role="listbox"
          className="absolute z-50 mt-1.5 max-h-60 w-full overflow-y-auto overscroll-contain rounded-xl border border-yugen-strong bg-surface-raised py-1 shadow-xl"
        >
          {displayItems.map((opt, i) => {
            const selected = opt.value === value
            const active = i === highlight
            return (
              <li
                key={opt.value || '__empty__'}
                role="option"
                aria-selected={selected}
                onMouseEnter={() => setHighlight(i)}
                onMouseDown={(e) => {
                  e.preventDefault()
                  selectOption(opt)
                }}
                className={`cursor-pointer px-4 py-2.5 text-sm transition-colors ${
                  active ? 'bg-yugen-white/10 text-yugen-white' : 'text-muted hover:bg-surface hover:text-yugen-white'
                } ${selected ? 'font-medium' : ''} ${!opt.value ? 'text-dim italic' : ''}`}
              >
                {opt.label ?? opt.value}
              </li>
            )
          })}
        </ul>
      )}

      {open && displayItems.length === 0 && query.trim() && (
        <div className="absolute z-50 mt-1.5 w-full rounded-xl border border-yugen bg-surface-raised px-4 py-3 text-sm text-dim shadow-xl">
          {allowCustom ? (
            <button
              type="button"
              className="w-full text-left text-yugen-white hover:underline"
              onMouseDown={(e) => {
                e.preventDefault()
                onChange(query.trim())
                setOpen(false)
              }}
            >
              Use &ldquo;{query.trim()}&rdquo;
            </button>
          ) : (
            'No matches — try a different search'
          )}
        </div>
      )}
    </div>
  )
}
