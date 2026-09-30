'use client'

import { Consent, SubmitButton, TextField } from './fields'
import { LeadForm } from './LeadForm'

/** "Anteprima": le nuove case arrivano prima agli iscritti. È la newsletter, detta meglio. */
export function PreviewSignup() {
  return (
    <LeadForm
      kind="anteprima"
      className="grid gap-5"
      success={
        <p role="status" className="type-lead text-argento">
          Iscrizione confermata. Le prossime case le vedrete prima di chiunque altro.
        </p>
      }
    >
      <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" required />
      <Consent compact />
      <SubmitButton tone="dark" className="justify-self-start">
        Voglio l’anteprima
      </SubmitButton>
    </LeadForm>
  )
}
