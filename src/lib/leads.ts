/**
 * Tipi e costanti dei form condivisi con il client. Niente zod qui:
 * la validazione vive solo sul server (schemas.ts), così la libreria
 * non finisce nel JavaScript scaricato dal browser.
 */

export type LeadKind = 'visita' | 'informazioni' | 'domanda' | 'valutazione' | 'ricerca' | 'contatto' | 'anteprima'

export interface LeadState {
  status: 'idle' | 'success' | 'error'
  message?: string
  fieldErrors?: Record<string, string>
}

export const initialLeadState: LeadState = { status: 'idle' }

/** Campi che possono avere più valori (checkbox con lo stesso name). */
export const multiValueFields = new Set(['days', 'features', 'zones'])
