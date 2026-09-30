'use client'

import { ChoiceChips, Consent, SubmitButton, TextArea, TextField } from './fields'
import { LeadForm } from './LeadForm'

const DAYS = [
  { value: 'lun', label: 'Lun' },
  { value: 'mar', label: 'Mar' },
  { value: 'mer', label: 'Mer' },
  { value: 'gio', label: 'Gio' },
  { value: 'ven', label: 'Ven' },
  { value: 'sab', label: 'Sab' },
]

/**
 * Prenotazione visita: si indicano preferenze, non slot "disponibili" che
 * un'agenzia di una o due persone non potrebbe garantire. Si conferma a voce.
 */
export function VisitRequestForm({ slug }: { slug: string }) {
  return (
    <LeadForm kind="visita" hidden={{ property: slug }} className="grid gap-7">
      <ChoiceChips name="days" legend="Giorni che preferite" options={DAYS} size="sm" />
      <ChoiceChips
        name="slot"
        type="radio"
        legend="Fascia oraria"
        options={[
          { value: 'mattina', label: 'Mattina' },
          { value: 'pomeriggio', label: 'Pomeriggio' },
          { value: 'sera', label: 'Tardo pomeriggio' },
        ]}
        size="sm"
      />
      <ChoiceChips
        name="mode"
        type="radio"
        legend="Come"
        defaultValue="presenza"
        options={[
          { value: 'presenza', label: 'In presenza' },
          { value: 'video', label: 'In videochiamata' },
        ]}
        size="sm"
      />
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="name" label="Nome" autoComplete="name" required />
        <TextField name="phone" type="tel" label="Telefono" autoComplete="tel" inputMode="tel" optional />
      </div>
      <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" required />
      <TextArea name="message" label="Qualcosa che dovremmo sapere" optional rows={2} />
      <Consent compact />
      <SubmitButton full>Chiedi la visita</SubmitButton>
      <p className="type-meta -mt-3 text-current/60">Vi richiamiamo per confermare giorno e ora.</p>
    </LeadForm>
  )
}

export function InfoRequestForm({ slug, reference }: { slug: string; reference: string }) {
  return (
    <LeadForm kind="informazioni" hidden={{ property: slug }} className="grid gap-7">
      <TextArea
        name="message"
        label="La vostra richiesta"
        required
        rows={3}
        defaultValue={`Vorrei ricevere la planimetria, i documenti e maggiori informazioni sull’immobile ${reference}.`}
      />
      <div className="grid gap-7 sm:grid-cols-2">
        <TextField name="name" label="Nome" autoComplete="name" required />
        <TextField name="phone" type="tel" label="Telefono" autoComplete="tel" inputMode="tel" optional />
      </div>
      <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" required />
      <Consent compact />
      <SubmitButton full>Invia la richiesta</SubmitButton>
    </LeadForm>
  )
}

/** Micro-conversione: una domanda sola, senza impegno. */
export function QuickQuestionForm({ slug }: { slug: string }) {
  return (
    <LeadForm kind="domanda" hidden={{ property: slug }} className="grid gap-7">
      <TextArea
        name="message"
        label="La vostra domanda"
        required
        rows={3}
        placeholder="Per esempio: quanto costa il riscaldamento d’inverno?"
      />
      <TextField name="email" type="email" label="Email per la risposta" autoComplete="email" inputMode="email" required />
      <Consent compact />
      <SubmitButton className="justify-self-start">Invia la domanda</SubmitButton>
    </LeadForm>
  )
}
