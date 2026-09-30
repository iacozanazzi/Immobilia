'use client'

import Link from 'next/link'
import { useState, type ReactNode } from 'react'
import { ChoiceChips, Consent, SubmitButton, TextArea, TextField } from './fields'
import { LeadForm } from './LeadForm'

const HINTS: Record<string, ReactNode> = {
  comprare: 'Diteci zona, budget e cosa non può mancare: vi rispondiamo con le case giuste, anche quelle non ancora online.',
  vendere: (
    <>
      Se volete già una stima, la{' '}
      <Link href="/vendi#valutazione" className="underline decoration-current/40 underline-offset-2">
        richiesta di valutazione
      </Link>{' '}
      è più rapida.
    </>
  ),
  altro: 'Una domanda su una zona, un consiglio, una collaborazione: scriveteci.',
}

export function ContactForm() {
  const [intent, setIntent] = useState('comprare')
  return (
    <LeadForm kind="contatto" className="grid gap-8">
      <div onChange={(e) => setIntent((e.target as HTMLInputElement).value)}>
        <ChoiceChips
          name="intent"
          type="radio"
          legend="Vi scrivo per"
          defaultValue="comprare"
          options={[
            { value: 'comprare', label: 'Comprare casa' },
            { value: 'vendere', label: 'Vendere casa' },
            { value: 'altro', label: 'Altro' },
          ]}
        />
        <p className="type-meta mt-3 text-ardesia" aria-live="polite">
          {HINTS[intent]}
        </p>
      </div>
      <TextArea name="message" label="Messaggio" required rows={4} />
      <div className="grid gap-8 md:grid-cols-2">
        <TextField name="name" label="Nome" autoComplete="name" required />
        <TextField name="phone" type="tel" label="Telefono" autoComplete="tel" inputMode="tel" optional />
      </div>
      <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" required />
      <Consent />
      <SubmitButton className="justify-self-start">Invia il messaggio</SubmitButton>
    </LeadForm>
  )
}
