/*
 * Formattazione deterministica. Non si usa Intl: le versioni di ICU di Node
 * e dei browser raggruppano diversamente i numeri a quattro cifre in it-IT
 * ("1250" contro "1.250") e il testo non combacerebbe tra server e client.
 * Convenzione degli annunci italiani: separatore delle migliaia sempre.
 */

const NBSP = ' '

function group(integer: number) {
  return Math.trunc(Math.abs(integer))
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, '.')
}

export function formatNumber(value: number, decimals = 1) {
  const rounded = Math.round(value * 10 ** decimals) / 10 ** decimals
  const [int, dec] = Math.abs(rounded).toFixed(decimals).split('.')
  const sign = rounded < 0 ? '-' : ''
  const decimalPart = dec && Number(dec) !== 0 ? `,${dec.replace(/0+$/, '')}` : ''
  return `${sign}${group(Number(int))}${decimalPart}`
}

export function formatEuro(value: number) {
  return `€${NBSP}${group(Math.round(value))}`
}

export function formatPrice(price: number | null) {
  return price === null ? 'Trattativa riservata' : formatEuro(price)
}

export function formatPricePerSqm(price: number | null, area: number) {
  if (price === null) return '—'
  return `${formatEuro(Math.round(price / area / 10) * 10)}/m²`
}

export function formatArea(value: number) {
  return `${formatNumber(value)}${NBSP}m²`
}

/** Quota in cm sul medio mare (riferimento: mareografo di Punta della Salute). */
export function formatElevation(cm: number) {
  return `+${formatNumber(cm, 0)}${NBSP}cm`
}

export function formatRange(min: number, max: number) {
  return `${formatEuro(min)} – ${formatEuro(max)}`
}

export function pluralize(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`
}

const MONTHS = ['gennaio', 'febbraio', 'marzo', 'aprile', 'maggio', 'giugno', 'luglio', 'agosto', 'settembre', 'ottobre', 'novembre', 'dicembre']

/** "2026-09-27" → "27 settembre 2026" */
export function formatDate(iso: string) {
  const [y, m, d] = iso.split('-').map(Number)
  return `${d} ${MONTHS[(m ?? 1) - 1]} ${y}`
}
