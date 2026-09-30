'use client'

import { useEffect, useRef, useState, type MouseEvent } from 'react'
import { Icon } from '@/components/ui/Icon'
import { neighborhoods } from '@/content/neighborhoods'
import { PROPERTY_TYPE_LABEL } from '@/content/types'
import { cn } from '@/lib/cn'
import { ChoiceChips, Consent, SelectField, SubmitButton, TextArea, TextField } from './fields'
import { LeadForm } from './LeadForm'

const STEPS = [
  { title: 'La casa', fields: ['zone', 'type', 'area', 'floor'] },
  { title: 'Com’è', fields: ['condition', 'timing'] },
  { title: 'I vostri contatti', fields: ['name', 'email', 'consent'] },
] as const

const MESSAGES: Record<string, string> = {
  zone: 'Indicate la zona',
  type: 'Indicate la tipologia',
  area: 'Indicate i metri quadri (almeno 15)',
  floor: 'Indicate il piano',
  condition: 'Indicate lo stato',
  timing: 'Indicate le tempistiche',
  name: 'Come possiamo chiamarvi?',
  email: 'Controllate l’indirizzo email',
  consent: 'Serve il consenso per potervi rispondere',
}

function check(data: FormData, fields: readonly string[]) {
  const errors: Record<string, string> = {}
  for (const field of fields) {
    const value = String(data.get(field) ?? '').trim()
    const invalid =
      !value ||
      (field === 'area' && !(Number(value) >= 15)) ||
      (field === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) ||
      (field === 'consent' && value !== 'on')
    if (invalid) errors[field] = MESSAGES[field] ?? 'Campo obbligatorio'
  }
  return errors
}

/**
 * Valutazione in tre passi: prima le domande facili sulla casa, i contatti
 * alla fine. Indirizzo e telefono facoltativi: meno attrito, più richieste.
 */
export function ValuationWizard({ defaultZone, defaultType }: { defaultZone?: string; defaultType?: string }) {
  const [step, setStep] = useState(0)
  const [errors, setErrors] = useState<Record<string, string>>({})
  const headingRef = useRef<HTMLHeadingElement>(null)
  const moved = useRef(false)

  useEffect(() => {
    // Porta il focus sul titolo del passo quando si cambia passo (non al primo render).
    if (moved.current) headingRef.current?.focus()
  }, [step])

  const goTo = (next: number) => {
    moved.current = true
    setStep(next)
  }

  const onNext = (e: MouseEvent<HTMLButtonElement>) => {
    const form = e.currentTarget.form
    if (!form) return
    const found = check(new FormData(form), STEPS[step]!.fields)
    setErrors(found)
    if (Object.keys(found).length === 0) goTo(step + 1)
  }

  const validateAll = (data: FormData) => {
    for (const [i, s] of STEPS.entries()) {
      const found = check(data, s.fields)
      if (Object.keys(found).length) {
        goTo(i)
        return found
      }
    }
    return {}
  }

  return (
    <div>
      <ol className="mb-10 grid grid-cols-3 gap-3" aria-label="Passi">
        {STEPS.map((s, i) => (
          <li key={s.title} aria-current={i === step ? 'step' : undefined}>
            <span className={cn('block h-px transition-colors duration-500', i <= step ? 'bg-inchiostro' : 'bg-inchiostro/20')} />
            <span className={cn('type-eyebrow mt-3 block', i === step ? 'text-inchiostro' : 'text-ardesia')}>
              <span className="type-num">{i + 1}</span> · {s.title}
            </span>
          </li>
        ))}
      </ol>

      <LeadForm kind="valutazione" validate={validateAll} errors={errors}>
        <h3 ref={headingRef} tabIndex={-1} className="type-h3 outline-none">
          {STEPS[step]!.title}
        </h3>

        <div hidden={step !== 0} className="mt-8 grid gap-8">
          <div className="grid gap-8 md:grid-cols-2">
            <SelectField
              name="zone"
              label="Zona"
              required
              defaultValue={defaultZone}
              options={[...neighborhoods.map((n) => ({ value: n.slug, label: n.name })), { value: 'altro', label: 'Altra zona' }]}
            />
            <SelectField
              name="type"
              label="Tipologia"
              required
              defaultValue={defaultType}
              options={Object.entries(PROPERTY_TYPE_LABEL).map(([value, label]) => ({ value, label }))}
            />
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <TextField name="area" type="number" inputMode="numeric" label="Superficie (m²)" required />
            <SelectField
              name="floor"
              label="Piano"
              required
              options={[
                { value: 'terra', label: 'Terra o rialzato' },
                { value: 'primo', label: 'Primo' },
                { value: 'secondo', label: 'Secondo' },
                { value: 'terzo-oltre', label: 'Terzo o superiore' },
                { value: 'piu-livelli', label: 'Su più livelli' },
              ]}
            />
          </div>
          <TextField
            name="address"
            label="Indirizzo o numero civico"
            optional
            hint="Ci aiuta a essere precisi: quota dell’acqua, affacci, vincoli. Resta riservato."
          />
        </div>

        <div hidden={step !== 1} className="mt-8 grid gap-8">
          <ChoiceChips
            name="condition"
            type="radio"
            legend="Stato"
            options={[
              { value: 'nuovo', label: 'Nuovo o ristrutturato di recente' },
              { value: 'buono', label: 'Buono stato' },
              { value: 'da-ristrutturare', label: 'Da ristrutturare' },
            ]}
          />
          <ChoiceChips
            name="features"
            legend="Cosa ha in più"
            options={[
              { value: 'altana', label: 'Altana o terrazza' },
              { value: 'giardino', label: 'Giardino o corte' },
              { value: 'vista', label: 'Vista sull’acqua' },
              { value: 'ascensore', label: 'Ascensore' },
              { value: 'accesso-acqua', label: 'Accesso acqueo' },
            ]}
          />
          <ChoiceChips
            name="timing"
            type="radio"
            legend="Quando vorreste vendere"
            options={[
              { value: 'subito', label: 'Il prima possibile' },
              { value: '6-mesi', label: 'Entro sei mesi' },
              { value: 'valutando', label: 'Sto solo valutando' },
            ]}
          />
        </div>

        <div hidden={step !== 2} className="mt-8 grid gap-8">
          <div className="grid gap-8 md:grid-cols-2">
            <TextField name="name" label="Nome" autoComplete="name" required />
            <TextField name="phone" type="tel" label="Telefono" autoComplete="tel" inputMode="tel" optional />
          </div>
          <TextField name="email" type="email" label="Email" autoComplete="email" inputMode="email" required />
          <TextArea name="message" label="Qualcosa da aggiungere" optional rows={3} />
          <Consent />
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-4">
          {step > 0 ? (
            <button type="button" onClick={() => goTo(step - 1)} className="type-eyebrow inline-flex items-center gap-2 text-ardesia hover:text-inchiostro">
              <Icon name="arrow-left" className="size-4" /> Indietro
            </button>
          ) : (
            <span />
          )}
          {step < STEPS.length - 1 ? (
            <button
              type="button"
              onClick={onNext}
              className="group inline-flex h-12 items-center gap-3 bg-notte-900 px-6 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-calce transition-colors hover:bg-notte-700"
            >
              Avanti
              <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
            </button>
          ) : (
            <SubmitButton>Richiedi la valutazione</SubmitButton>
          )}
        </div>
        <p className="type-meta mt-6 text-ardesia">Gratuita e senza impegno. Nessuna telefonata commerciale.</p>
      </LeadForm>
    </div>
  )
}
