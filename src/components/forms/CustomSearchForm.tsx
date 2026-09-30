'use client'

import { neighborhoods } from '@/content/neighborhoods'
import { ChoiceChips, Consent, SelectField, SubmitButton, TextArea, TextField } from './fields'
import { LeadForm } from './LeadForm'

/** "Non hai trovato quello che cerchi?": una ricerca affidata a noi. */
export function CustomSearchForm({ defaultZone }: { defaultZone?: string }) {
  return (
    <LeadForm kind="ricerca" className="grid gap-8">
      <ChoiceChips
        name="zones"
        legend="Dove vi piacerebbe vivere"
        options={neighborhoods.map((n) => ({ value: n.slug, label: n.name }))}
        defaultValue={defaultZone ? [defaultZone] : undefined}
        size="sm"
      />
      <div className="grid gap-8 md:grid-cols-2">
        <SelectField
          name="budget"
          label="Budget indicativo"
          required
          options={[
            { value: 'fino-400', label: 'Fino a 400.000 €' },
            { value: '400-700', label: '400.000 – 700.000 €' },
            { value: '700-1000', label: '700.000 – 1.000.000 €' },
            { value: 'oltre-1000', label: 'Oltre 1.000.000 €' },
          ]}
        />
        <SelectField
          name="bedrooms"
          label="Camere"
          options={[
            { value: '1', label: 'Almeno una' },
            { value: '2', label: 'Almeno due' },
            { value: '3', label: 'Tre o più' },
          ]}
        />
      </div>
      <ChoiceChips
        name="features"
        legend="Irrinunciabile"
        options={[
          { value: 'esterno', label: 'Altana o terrazza' },
          { value: 'verde', label: 'Giardino o corte' },
          { value: 'acqua', label: 'Vista sull’acqua' },
          { value: 'ascensore', label: 'Ascensore' },
          { value: 'piano-terra-no', label: 'Niente piano terra' },
          { value: 'pronta', label: 'Pronta da abitare' },
        ]}
        size="sm"
      />
      <TextArea name="message" label="Raccontateci la casa che cercate" optional rows={3} />
      <div className="grid gap-8 md:grid-cols-3">
        <TextField name="name" label="Nome" autoComplete="name" required />
        <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" required />
        <TextField name="phone" type="tel" label="Telefono" autoComplete="tel" inputMode="tel" optional />
      </div>
      <Consent />
      <SubmitButton className="justify-self-start">Affidateci la ricerca</SubmitButton>
    </LeadForm>
  )
}
