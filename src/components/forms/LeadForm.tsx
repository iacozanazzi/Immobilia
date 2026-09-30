'use client'

import { startTransition, useActionState, useMemo, useState, type FormEvent, type ReactNode } from 'react'
import { submitLead } from '@/app/actions/leads'
import { cn } from '@/lib/cn'
import { initialLeadState, type LeadKind } from '@/lib/schemas'
import { FormStatus, FormSuccess, Honeypot } from './fields'
import { LeadFormContext } from './lead-context'

/**
 * Contenitore dei form di contatto. L'invio passa da una Server Action;
 * con JavaScript attivo si intercetta il submit per non azzerare i campi
 * in caso di errore (React 19 resetta i form inviati con `action`).
 */
export function LeadForm(props: {
  kind: LeadKind
  children: ReactNode
  className?: string
  hidden?: Record<string, string>
  /** Validazione extra lato client prima dell'invio (es. passi del wizard). */
  validate?: (data: FormData) => Record<string, string>
  success?: ReactNode
}) {
  const [attempt, setAttempt] = useState(0)
  return <Inner key={attempt} {...props} onReset={() => setAttempt((n) => n + 1)} />
}

function Inner({
  kind,
  children,
  className,
  hidden,
  validate,
  success,
  onReset,
}: Parameters<typeof LeadForm>[0] & { onReset: () => void }) {
  const action = useMemo(() => submitLead.bind(null, kind), [kind])
  const [state, formAction, pending] = useActionState(action, initialLeadState)
  const [clientErrors, setClientErrors] = useState<Record<string, string>>({})

  const errors = { ...state.fieldErrors, ...clientErrors }

  if (state.status === 'success') {
    return success ?? <FormSuccess message={state.message} onReset={onReset} />
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const data = new FormData(e.currentTarget)
    const found = validate?.(data) ?? {}
    setClientErrors(found)
    if (Object.keys(found).length > 0) return
    startTransition(() => formAction(data))
  }

  return (
    <LeadFormContext value={{ errors, pending }}>
      <form action={formAction} onSubmit={onSubmit} noValidate className={cn('relative', className)}>
        <Honeypot />
        {hidden && Object.entries(hidden).map(([k, v]) => <input key={k} type="hidden" name={k} value={v} />)}
        {children}
        <FormStatus state={state} />
      </form>
    </LeadFormContext>
  )
}
