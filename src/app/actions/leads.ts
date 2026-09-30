'use server'

import { leadSchemas, multiValueFields, type LeadKind, type LeadState } from '@/lib/schemas'

const SUBJECTS: Record<LeadKind, string> = {
  visita: 'Richiesta di visita',
  informazioni: 'Richiesta di informazioni',
  domanda: 'Domanda su un immobile',
  valutazione: 'Richiesta di valutazione',
  ricerca: 'Ricerca su misura',
  contatto: 'Nuovo contatto',
  anteprima: 'Iscrizione all’anteprima',
}

const SUCCESS: Record<LeadKind, string> = {
  visita: 'Grazie. Vi richiamiamo per confermare giorno e ora della visita.',
  informazioni: 'Grazie. Vi rispondiamo con tutte le informazioni.',
  domanda: 'Grazie. Vi rispondiamo per email.',
  valutazione: 'Grazie. Vi contattiamo per fissare un sopralluogo: la valutazione scritta arriva dopo averla vista.',
  ricerca: 'Grazie. Vi scriviamo appena entra una casa che corrisponde a ciò che cercate.',
  contatto: 'Grazie. Vi rispondiamo al più presto.',
  anteprima: 'Iscrizione confermata. Riceverete le nuove case prima della pubblicazione.',
}

function formToObject(formData: FormData) {
  const out: Record<string, string | string[]> = {}
  for (const key of new Set(formData.keys())) {
    if (key.startsWith('$')) continue // campi interni di React
    const values = formData.getAll(key).filter((v): v is string => typeof v === 'string')
    out[key] = multiValueFields.has(key) ? values : (values[0] ?? '')
  }
  return out
}

async function deliver(kind: LeadKind, data: Record<string, unknown>) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEADS_TO_EMAIL
  const from = process.env.LEADS_FROM_EMAIL
  if (!apiKey || !to || !from) {
    // Nessun servizio di invio configurato: si registra solo il tipo di richiesta,
    // senza dati personali nei log.
    console.info(`[lead] ${kind} ricevuta (${Object.keys(data).join(', ')}) — invio email non configurato`)
    return
  }
  const body = Object.entries(data)
    .map(([k, v]) => `${k}: ${Array.isArray(v) ? v.join(', ') : String(v ?? '')}`)
    .join('\n')
  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: { Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      from,
      to,
      subject: `${SUBJECTS[kind]} — IMMOBILIA`,
      text: body,
      reply_to: typeof data.email === 'string' ? data.email : undefined,
    }),
  })
  if (!res.ok) throw new Error(`Invio non riuscito (${res.status})`)
}

export async function submitLead(kind: LeadKind, _prev: LeadState, formData: FormData): Promise<LeadState> {
  // Honeypot: i bot compilano anche il campo nascosto.
  if (formData.get('website')) return { status: 'success', message: SUCCESS[kind] }

  const schema = leadSchemas[kind]
  if (!schema) return { status: 'error', message: 'Richiesta non valida.' }

  const raw = formToObject(formData)
  delete raw.website
  // I campi non inviati (select vuote, checkbox non spuntate) diventano vuoti,
  // così la validazione mostra i nostri messaggi e non quelli generici.
  for (const key of Object.keys(schema.shape)) {
    raw[key] ??= multiValueFields.has(key) ? [] : ''
  }
  const parsed = schema.safeParse(raw)
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {}
    for (const issue of parsed.error.issues) {
      const key = String(issue.path[0] ?? 'form')
      fieldErrors[key] ??= issue.message
    }
    return { status: 'error', message: 'Controllate i campi evidenziati.', fieldErrors }
  }

  try {
    await deliver(kind, parsed.data)
  } catch (error) {
    console.error('[lead] errore di invio', error)
    return {
      status: 'error',
      message: 'Non siamo riusciti a inviare la richiesta. Riprovate, oppure chiamateci.',
    }
  }
  return { status: 'success', message: SUCCESS[kind] }
}
