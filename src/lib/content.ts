/**
 * Accesso ai contenuti. Oggi legge i file in src/content; con un CMS
 * headless (consigliato: Sanity) cambia solo l'implementazione di queste
 * funzioni, non le pagine che le usano.
 */
import { neighborhoods } from '@/content/neighborhoods'
import { properties } from '@/content/properties'
import type { Neighborhood, Property, ZoneSlug } from '@/content/types'

const byRelevance = (a: Property, b: Property) =>
  Number(a.availability !== 'disponibile') - Number(b.availability !== 'disponibile') ||
  b.publishedAt.localeCompare(a.publishedAt)

export async function getProperties(): Promise<Property[]> {
  return [...properties].sort(byRelevance)
}

export async function getProperty(slug: string): Promise<Property | undefined> {
  return properties.find((p) => p.slug === slug)
}

export async function getFeaturedProperties(limit = 3): Promise<Property[]> {
  return properties.filter((p) => p.featured).slice(0, limit)
}

export async function getPropertiesByZone(zone: ZoneSlug): Promise<Property[]> {
  return properties.filter((p) => p.zone === zone).sort(byRelevance)
}

/** Stessa zona prima, poi fascia di prezzo vicina. */
export async function getSimilarProperties(property: Property, limit = 3): Promise<Property[]> {
  const ref = property.price ?? 1_500_000
  return properties
    .filter((p) => p.slug !== property.slug)
    .map((p) => ({
      p,
      score: (p.zone === property.zone ? 0 : 1) + Math.abs((p.price ?? 1_500_000) - ref) / ref,
    }))
    .sort((a, b) => a.score - b.score)
    .slice(0, limit)
    .map(({ p }) => p)
}

export async function getNeighborhoods(): Promise<Neighborhood[]> {
  return neighborhoods
}

export async function getNeighborhood(slug: string): Promise<Neighborhood | undefined> {
  return neighborhoods.find((n) => n.slug === slug)
}

export function zoneName(slug: ZoneSlug): string {
  return neighborhoods.find((n) => n.slug === slug)?.name ?? slug
}

export function countByZone(): Record<ZoneSlug, number> {
  const counts = Object.fromEntries(neighborhoods.map((n) => [n.slug, 0])) as Record<ZoneSlug, number>
  for (const p of properties) if (p.availability === 'disponibile') counts[p.zone] += 1
  return counts
}

/** Dati minimi per card e filtri lato client: niente testi lunghi nel bundle. */
export interface PropertyCardData {
  slug: string
  ref: string
  title: string
  zone: ZoneSlug
  zoneName: string
  microZone: string
  type: Property['type']
  availability: Property['availability']
  price: number | null
  area: number
  rooms: number
  bedrooms: number
  bathrooms: number
  floorLabel: string
  lift: boolean
  energyClass: Property['energy']['class']
  entranceElevationCm: number
  features: Property['features']
  hook: string
  images: Property['images']
  publishedAt: string
}

export function toCardData(p: Property): PropertyCardData {
  return {
    slug: p.slug,
    ref: p.ref,
    title: p.title,
    zone: p.zone,
    zoneName: zoneName(p.zone),
    microZone: p.microZone,
    type: p.type,
    availability: p.availability,
    price: p.price,
    area: p.area.commercial,
    rooms: p.rooms,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    floorLabel: p.floor.label,
    lift: p.floor.lift,
    energyClass: p.energy.class,
    entranceElevationCm: p.entranceElevationCm,
    features: p.features,
    hook: p.hook,
    images: p.images.slice(0, 2),
    publishedAt: p.publishedAt,
  }
}
