import Link from 'next/link'
import { Icon } from '@/components/ui/Icon'
import type { Neighborhood, ZoneSlug } from '@/content/types'
import type { PropertyCardData } from '@/lib/content'
import { PropertyCard } from './PropertyCard'

/**
 * Ritmo editoriale: una card grande ogni sette, le altre su tre colonne con
 * la colonna centrale sfalsata. Niente muro di card identiche.
 */
export function GalleryResults({ items }: { items: PropertyCardData[] }) {
  const groups: Array<{ feature: PropertyCardData; rest: PropertyCardData[] }> = []
  items.forEach((item, i) => {
    if (i % 7 === 0) groups.push({ feature: item, rest: [] })
    else groups.at(-1)!.rest.push(item)
  })

  return (
    <div className="grid gap-20 md:gap-28">
      {groups.map((group, g) => (
        <div key={group.feature.slug} className="grid gap-16 md:gap-20">
          <PropertyCard p={group.feature} variant="feature" eager={g === 0} headingLevel="h2" />
          {group.rest.length > 0 && (
            <ul className="grid gap-16 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
              {group.rest.map((p) => (
                <li key={p.slug} className="lg:nth-[3n+2]:mt-20">
                  <PropertyCard p={p} headingLevel="h2" />
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  )
}

export function ZoneResults({
  items,
  zones,
}: {
  items: PropertyCardData[]
  zones: Array<Pick<Neighborhood, 'slug' | 'name' | 'tagline'>>
}) {
  const byZone = new Map<ZoneSlug, PropertyCardData[]>()
  for (const p of items) byZone.set(p.zone, [...(byZone.get(p.zone) ?? []), p])

  return (
    <div className="grid gap-20 md:gap-24">
      {zones
        .filter((z) => byZone.has(z.slug))
        .map((z) => (
          <section key={z.slug} aria-labelledby={`zona-${z.slug}`}>
            <header className="flex flex-col gap-4 border-t border-inchiostro/20 pt-6 md:flex-row md:items-baseline md:justify-between">
              <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                <h2 id={`zona-${z.slug}`} className="type-h2">
                  {z.name}
                </h2>
                <p className="font-serif italic text-ardesia">{z.tagline}</p>
              </div>
              <Link href={`/quartieri/${z.slug}`} className="type-eyebrow group inline-flex shrink-0 items-center gap-2 text-ardesia hover:text-inchiostro">
                <span className="link-line pb-1">Guida a {z.name}</span>
                <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </header>
            <ul className="mt-10 grid gap-14 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
              {byZone.get(z.slug)!.map((p) => (
                <li key={p.slug}>
                  <PropertyCard p={p} headingLevel="h3" />
                </li>
              ))}
            </ul>
          </section>
        ))}
    </div>
  )
}
