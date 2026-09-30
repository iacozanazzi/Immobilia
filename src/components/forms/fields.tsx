'use client'

import Link from 'next/link'
import { useId, type ReactNode } from 'react'
import { PortaAccesa } from '@/components/brand/Logo'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import type { LeadState } from '@/lib/schemas'
import { useFieldError, useLeadPending } from './lead-context'

/*
 * Campi dei form. Usano currentColor: funzionano su fondi chiari e scuri
 * senza varianti. Etichette sempre visibili, errori collegati via aria.
 */

const inputBase =
  'block w-full rounded-none border-0 border-b border-current/25 bg-transparent px-0 py-3 text-base text-current placeholder:text-current/40 transition-colors duration-300 focus:border-current focus:outline-none focus-visible:outline-none aria-invalid:border-errore'

function Label({ htmlFor, children, optional }: { htmlFor: string; children: ReactNode; optional?: boolean }) {
  return (
    <label htmlFor={htmlFor} className="type-eyebrow block text-current/75">
      {children}
      {optional && <span className="ml-2 normal-case tracking-normal text-current/55">(facoltativo)</span>}
    </label>
  )
}

function ErrorText({ id, error }: { id: string; error?: string }) {
  if (!error) return null
  return (
    <p id={id} className="mt-2 text-sm text-errore [.surface-dark_&]:text-errore-chiaro">
      {error}
    </p>
  )
}

export function TextField({
  name,
  label,
  type = 'text',
  required,
  optional,
  autoComplete,
  inputMode,
  placeholder,
  defaultValue,
  error,
  hint,
  className,
}: {
  name: string
  label: string
  type?: 'text' | 'email' | 'tel' | 'number'
  required?: boolean
  optional?: boolean
  autoComplete?: string
  inputMode?: 'text' | 'email' | 'tel' | 'numeric'
  placeholder?: string
  defaultValue?: string
  error?: string
  hint?: string
  className?: string
}) {
  const id = useId()
  const errorId = `${id}-error`
  const hintId = `${id}-hint`
  const fieldError = useFieldError(name, error)
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <input
        id={id}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        inputMode={inputMode}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={fieldError ? true : undefined}
        aria-describedby={cn(fieldError && errorId, hint && hintId) || undefined}
        className={inputBase}
      />
      {hint && (
        <p id={hintId} className="mt-2 text-sm text-current/60">
          {hint}
        </p>
      )}
      <ErrorText id={errorId} error={fieldError} />
    </div>
  )
}

export function TextArea({
  name,
  label,
  required,
  optional,
  rows = 4,
  placeholder,
  defaultValue,
  error,
  className,
}: {
  name: string
  label: string
  required?: boolean
  optional?: boolean
  rows?: number
  placeholder?: string
  defaultValue?: string
  error?: string
  className?: string
}) {
  const id = useId()
  const errorId = `${id}-error`
  const fieldError = useFieldError(name, error)
  return (
    <div className={className}>
      <Label htmlFor={id} optional={optional}>
        {label}
      </Label>
      <textarea
        id={id}
        name={name}
        rows={rows}
        required={required}
        placeholder={placeholder}
        defaultValue={defaultValue}
        aria-invalid={fieldError ? true : undefined}
        aria-describedby={fieldError ? errorId : undefined}
        className={cn(inputBase, 'resize-y leading-relaxed')}
      />
      <ErrorText id={errorId} error={fieldError} />
    </div>
  )
}

export function SelectField({
  name,
  label,
  options,
  required,
  defaultValue,
  placeholder = 'Scegliete',
  error,
  className,
}: {
  name: string
  label: string
  options: Array<{ value: string; label: string }>
  required?: boolean
  defaultValue?: string
  placeholder?: string
  error?: string
  className?: string
}) {
  const id = useId()
  const errorId = `${id}-error`
  const fieldError = useFieldError(name, error)
  return (
    <div className={className}>
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <select
          id={id}
          name={name}
          required={required}
          defaultValue={defaultValue ?? ''}
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? errorId : undefined}
          className={cn(inputBase, 'cursor-pointer appearance-none pr-8 [&>option]:text-inchiostro')}
        >
          <option value="" disabled>
            {placeholder}
          </option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 opacity-60" />
      </div>
      <ErrorText id={errorId} error={fieldError} />
    </div>
  )
}

/** Gruppo di scelte come "chip": checkbox (più valori) o radio (uno). */
export function ChoiceChips({
  name,
  legend,
  options,
  type = 'checkbox',
  defaultValue,
  error,
  className,
  size = 'md',
}: {
  name: string
  legend: string
  options: Array<{ value: string; label: string }>
  type?: 'checkbox' | 'radio'
  defaultValue?: string | string[]
  error?: string
  className?: string
  size?: 'sm' | 'md'
}) {
  const id = useId()
  const errorId = `${id}-error`
  const fieldError = useFieldError(name, error)
  const defaults = Array.isArray(defaultValue) ? defaultValue : defaultValue ? [defaultValue] : []
  return (
    <fieldset className={className} aria-describedby={fieldError ? errorId : undefined}>
      <legend className="type-eyebrow mb-3 text-current/75">{legend}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={o.value} className="relative cursor-pointer">
            <input
              type={type}
              name={name}
              value={o.value}
              defaultChecked={defaults.includes(o.value)}
              className="peer absolute inset-0 cursor-pointer opacity-0"
            />
            <span
              className={cn(
                'inline-flex items-center gap-2 border border-current/25 transition-colors duration-300 peer-checked:border-current peer-checked:bg-current/[0.07] peer-hover:border-current/60 peer-focus-visible:outline peer-focus-visible:outline-[1.5px] peer-focus-visible:outline-offset-2 peer-focus-visible:outline-(--focus)',
                size === 'sm' ? 'h-9 px-3 text-sm' : 'h-11 px-4 text-[0.95rem]',
              )}
            >
              {o.label}
            </span>
          </label>
        ))}
      </div>
      <ErrorText id={errorId} error={fieldError} />
    </fieldset>
  )
}

export function Consent({ error, compact = false }: { error?: string; compact?: boolean }) {
  const id = useId()
  const errorId = `${id}-error`
  const fieldError = useFieldError('consent', error)
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id}
          type="checkbox"
          name="consent"
          required
          aria-invalid={fieldError ? true : undefined}
          aria-describedby={fieldError ? errorId : undefined}
          className="mt-1 size-4 shrink-0 cursor-pointer appearance-none border border-current/50 bg-transparent checked:border-current checked:bg-[linear-gradient(currentColor,currentColor)] checked:bg-[length:8px_8px] checked:bg-center checked:bg-no-repeat"
        />
        <label htmlFor={id} className={cn('text-current/75', compact ? 'text-xs leading-relaxed' : 'text-sm leading-relaxed')}>
          Acconsento al trattamento dei dati per ricevere una risposta, come descritto nell’
          <Link href="/privacy" className="underline decoration-current/40 underline-offset-2 hover:decoration-current">
            informativa privacy
          </Link>
          . Niente newsletter se non la chiedete.
        </label>
      </div>
      <ErrorText id={errorId} error={fieldError} />
    </div>
  )
}

/** Campo trappola per i bot: invisibile e fuori dal flusso del tab. */
export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
      <label>
        Lasciate vuoto questo campo
        <input type="text" name="website" tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  )
}

export function SubmitButton({
  children,
  tone = 'light',
  className,
  full = false,
}: {
  children: ReactNode
  tone?: 'light' | 'dark'
  className?: string
  full?: boolean
}) {
  const pending = useLeadPending()
  return (
    <button
      type="submit"
      disabled={pending}
      className={cn(
        'group inline-flex h-12 items-center justify-center gap-3 px-6 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] transition-colors duration-500 ease-(--ease-porta) disabled:cursor-wait disabled:opacity-70',
        tone === 'light' ? 'bg-notte-900 text-calce hover:bg-notte-700' : 'bg-calce text-notte-900 hover:bg-white',
        full && 'w-full',
        className,
      )}
    >
      <PortaAccesa
        className={cn(
          tone === 'light' ? 'text-luce' : 'text-bronzo',
          pending ? 'animate-pulse' : 'group-hover:shadow-[0_0_14px_3px_rgb(201_174_133/0.5)]',
        )}
      />
      <span>{pending ? 'Invio in corso…' : children}</span>
    </button>
  )
}

export function FormStatus({ state }: { state: LeadState }) {
  return (
    <div aria-live="polite" className="min-h-0">
      {state.status === 'error' && state.message && (
        <p className="text-sm text-errore [.surface-dark_&]:text-errore-chiaro">{state.message}</p>
      )}
    </div>
  )
}

export function FormSuccess({ message, onReset }: { message?: string; onReset?: () => void }) {
  return (
    <div role="status" className="flex flex-col items-start gap-5 py-4">
      <span className="inline-flex size-10 items-center justify-center border border-current/30">
        <Icon name="check" className="size-5" />
      </span>
      <p className="type-h3 max-w-md">{message ?? 'Grazie, abbiamo ricevuto la vostra richiesta.'}</p>
      {onReset && (
        <button type="button" onClick={onReset} className="type-eyebrow link-line pb-1 text-current/75">
          Invia un’altra richiesta
        </button>
      )}
    </div>
  )
}
