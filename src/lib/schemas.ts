import { z } from 'zod'

const name = z.string().trim().min(2, 'Come possiamo chiamarvi?').max(80)
const email = z.string().trim().email('Controllate l’indirizzo email').max(120)
const phone = z
  .string()
  .trim()
  .max(30)
  .regex(/^[+\d\s().-]*$/, 'Solo numeri, spazi e il segno +')
  .optional()
  .or(z.literal(''))
const consent = z.literal('on', { message: 'Serve il consenso per potervi rispondere' })
const text = (min: number, msg: string, max = 2000) => z.string().trim().min(min, msg).max(max)
const optionalText = z.string().trim().max(2000).optional().or(z.literal(''))

export const leadSchemas = {
  visita: z.object({
    property: z.string().min(1),
    days: z.array(z.string()).min(1, 'Indicate almeno un giorno'),
    slot: z.enum(['mattina', 'pomeriggio', 'sera'], { message: 'Scegliete una fascia oraria' }),
    mode: z.enum(['presenza', 'video']),
    name,
    email,
    phone,
    message: optionalText,
    consent,
  }),
  informazioni: z.object({
    property: z.string().min(1),
    name,
    email,
    phone,
    message: text(5, 'Scriveteci la vostra richiesta'),
    consent,
  }),
  domanda: z.object({
    property: z.string().min(1),
    email,
    message: text(5, 'Scriveteci la vostra domanda', 800),
    consent,
  }),
  valutazione: z.object({
    zone: z.string().min(1, 'Indicate la zona'),
    address: optionalText,
    type: z.string().min(1, 'Indicate la tipologia'),
    area: z.coerce.number({ message: 'Indicate i metri quadri' }).int().min(15, 'Almeno 15 m²').max(3000),
    floor: z.string().min(1, 'Indicate il piano'),
    condition: z.string().min(1, 'Indicate lo stato'),
    features: z.array(z.string()).optional(),
    timing: z.string().min(1, 'Indicate le tempistiche'),
    name,
    email,
    phone,
    message: optionalText,
    consent,
  }),
  ricerca: z.object({
    zones: z.array(z.string()).optional(),
    budget: z.string().min(1, 'Indicate un budget indicativo'),
    bedrooms: z.string().optional(),
    features: z.array(z.string()).optional(),
    message: optionalText,
    name,
    email,
    phone,
    consent,
  }),
  contatto: z.object({
    intent: z.enum(['comprare', 'vendere', 'altro']),
    name,
    email,
    phone,
    message: text(5, 'Scriveteci due righe'),
    consent,
  }),
  anteprima: z.object({
    email,
    consent,
  }),
} as const

export type LeadKind = keyof typeof leadSchemas

export interface LeadState {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Record<string, string>
}

export const initialLeadState: LeadState = { status: 'idle' }

/** Campi che possono avere più valori (checkbox con lo stesso name). */
export const multiValueFields = new Set(['days', 'features', 'zones'])
