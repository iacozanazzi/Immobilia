const euro = new Intl.NumberFormat('it-IT', { style: 'currency', currency: 'EUR', maximumFractionDigits: 0 })
const number = new Intl.NumberFormat('it-IT', { maximumFractionDigits: 1 })

export function formatPrice(price: number | null) {
  return price === null ? 'Trattativa riservata' : euro.format(price)
}

export function formatPricePerSqm(price: number | null, area: number) {
  if (price === null) return '—'
  return `${euro.format(Math.round(price / area / 10) * 10)}/m²`
}

export function formatArea(value: number) {
  return `${number.format(value)} m²`
}

export function formatNumber(value: number) {
  return number.format(value)
}

/** Quota in cm sul medio mare (riferimento: mareografo di Punta della Salute). */
export function formatElevation(cm: number) {
  return `+${number.format(cm)} cm`
}

export function formatRange(min: number, max: number) {
  return `${euro.format(min)} – ${euro.format(max)}`
}

export function pluralize(n: number, one: string, many: string) {
  return `${n} ${n === 1 ? one : many}`
}
