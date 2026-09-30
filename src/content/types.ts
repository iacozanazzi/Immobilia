import type { MediaKey } from './media'

export type ZoneSlug =
  | 'dorsoduro'
  | 'san-marco'
  | 'cannaregio'
  | 'castello'
  | 'san-polo'
  | 'santa-croce'
  | 'giudecca'
  | 'lido'

export type PropertyType = 'appartamento' | 'attico' | 'piano-nobile' | 'casa' | 'villa' | 'loft'

export const PROPERTY_TYPE_LABEL: Record<PropertyType, string> = {
  appartamento: 'Appartamento',
  attico: 'Ultimo piano',
  'piano-nobile': 'Piano nobile',
  casa: 'Casa indipendente',
  villa: 'Villa',
  loft: 'Loft',
}

/** Caratteristiche che a Venezia spostano davvero il valore di una casa. */
export type Feature =
  | 'altana'
  | 'terrazza'
  | 'giardino'
  | 'corte'
  | 'vista-canale'
  | 'vista-laguna'
  | 'accesso-acqua'
  | 'ascensore'
  | 'piano-alto'
  | 'posto-auto'

export const FEATURE_LABEL: Record<Feature, string> = {
  altana: 'Altana',
  terrazza: 'Terrazza',
  giardino: 'Giardino',
  corte: 'Corte privata',
  'vista-canale': 'Vista canale',
  'vista-laguna': 'Vista laguna',
  'accesso-acqua': 'Accesso acqueo',
  ascensore: 'Ascensore',
  'piano-alto': 'Piano alto',
  'posto-auto': 'Posto auto',
}

export type EnergyClass = 'A4' | 'A3' | 'A2' | 'A1' | 'B' | 'C' | 'D' | 'E' | 'F' | 'G'
export type Condition = 'nuovo' | 'ristrutturato' | 'buono' | 'da-ristrutturare'
export type Availability = 'disponibile' | 'in-trattativa'

export const CONDITION_LABEL: Record<Condition, string> = {
  nuovo: 'Nuovo',
  ristrutturato: 'Ristrutturato',
  buono: 'Buono stato',
  'da-ristrutturare': 'Da ristrutturare',
}

/** Stanza della planimetria, in metri. */
export interface PlanRoom {
  name: string
  x: number
  y: number
  w: number
  h: number
  outdoor?: boolean
}

export interface PlanLevel {
  label: string
  rooms: PlanRoom[]
}

export type ThingToKnowKind = 'acqua' | 'accesso' | 'lavori' | 'vincoli' | 'costi' | 'impianti'

export interface ThingToKnow {
  kind: ThingToKnowKind
  title: string
  text: string
}

export interface Proximity {
  label: string
  minutes: number
  mode: 'a piedi' | 'in vaporetto' | 'in auto' | 'in bici'
}

export interface Property {
  slug: string
  ref: string
  title: string
  zone: ZoneSlug
  microZone: string
  type: PropertyType
  availability: Availability
  /** null = trattativa riservata */
  price: number | null
  area: { commercial: number; net: number; outdoor?: number }
  rooms: number
  bedrooms: number
  bathrooms: number
  floor: { label: string; level: number; buildingFloors: number; lift: boolean }
  /** Quota dell'ingresso sul medio mare, in cm. È il dato che dice quando si bagnano i piedi. */
  entranceElevationCm: number
  energy: { class: EnergyClass; ipe: number }
  heating: string
  built: string
  renovated?: number
  condition: Condition
  exposure: string
  listedBuilding: boolean
  /** €/mese; 0 se non c'è condominio */
  condoFees: number
  availableFrom: string
  features: Feature[]
  /** Frase d'apertura, in corsivo: la voce dell'agenzia. */
  hook: string
  summary: string
  description: string[]
  whyWeLikeIt: string[]
  thingsToKnow: ThingToKnow[]
  vaporetto: { stop: string; lines: string[]; minutes: number }
  proximity: Proximity[]
  images: MediaKey[]
  plan: PlanLevel[]
  featured?: boolean
  publishedAt: string
}

export type LifestyleKey = 'quiete' | 'servizi' | 'sera' | 'verde' | 'accesso' | 'riparo'

export const LIFESTYLE_LABEL: Record<LifestyleKey, { label: string; hint: string }> = {
  quiete: { label: 'Quiete', hint: 'Silenzio e poco passaggio turistico' },
  servizi: { label: 'Servizi', hint: 'Spesa, farmacie, scuole a pochi minuti' },
  sera: { label: 'Vita serale', hint: 'Bacari, ristoranti, cultura la sera' },
  verde: { label: 'Verde', hint: 'Giardini, parchi, spazi aperti' },
  accesso: { label: 'Accesso', hint: 'Vicinanza a Piazzale Roma, ferrovia, terraferma' },
  riparo: { label: 'Riparo dall’acqua', hint: 'Quote medie più alte rispetto alle maree' },
}

export interface Neighborhood {
  slug: ZoneSlug
  name: string
  tagline: string
  intro: string
  overview: string[]
  character: string[]
  idealFor: string[]
  dailyLife: string[]
  landmarks: Array<{ name: string; note: string }>
  gettingAround: string[]
  pros: string[]
  particulars: string[]
  water: string
  /** €/m², stime indicative: da validare con OMI prima della pubblicazione. */
  prices: { daRistrutturare: [number, number]; ristrutturato: [number, number]; pregio: [number, number] }
  lifestyle: Record<LifestyleKey, 1 | 2 | 3 | 4 | 5>
  image: MediaKey
}
