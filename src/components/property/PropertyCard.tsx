import Link from 'next/link'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { PROPERTY_TYPE_LABEL } from '@/content/types'
import { cn } from '@/lib/cn'
import type { PropertyCardData } from '@/lib/content'
import { formatArea, formatPrice } from '@/lib/format'
import { CompareToggle, SaveButton } from './ShortlistButtons'

export function EnergyBadge({ value, className }: { value: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-baseline gap-1', className)} title={`Classe energetica ${value}`}>
      <span className="text-current/60">APE</span>
      <span className="font-medium">{value}</span>
    </span>
  )
}

export function PropertyFacts({ p, className }: { p: PropertyCardData; className?: string }) {
  const items = [formatArea(p.area), `${p.rooms} locali`, p.floorLabel]
  return (
    <p className={cn('type-meta type-num flex flex-wrap items-center gap-x-3 gap-y-1 text-ardesia', className)}>
      {items.map((item) => (
        <span key={item} className="after:ml-3 after:text-current/30 after:content-['·']">
          {item}
        </span>
      ))}
      <EnergyBadge value={p.energyClass} />
    </p>
  )
}

function StatusTag({ availability }: { availability: PropertyCardData['availability'] }) {
  if (availability !== 'in-trattativa') return null
  return (
    <span className="type-eyebrow absolute left-3 top-3 bg-calce/90 px-3 py-1.5 text-[0.65rem] text-inchiostro backdrop-blur">
      In trattativa
    </span>
  )
}

/**
 * Card immobile. Tre formati per evitare la griglia di card tutte uguali:
 * feature (orizzontale, grande), standard (verticale), compact (riga).
 */
export function PropertyCard({
  p,
  variant = 'standard',
  eager = false,
  headingLevel = 'h3',
  className,
}: {
  p: PropertyCardData
  variant?: 'feature' | 'standard' | 'compact'
  eager?: boolean
  headingLevel?: 'h2' | 'h3'
  className?: string
}) {
  const H = headingLevel
  const href = `/immobili/${p.slug}`
  const cover = p.images[0] ?? 'venezia-rio'

  if (variant === 'compact') {
    return (
      <article className={cn('group relative grid grid-cols-[7rem_1fr] gap-5 md:grid-cols-[9rem_1fr]', className)}>
        <ImageFrame image={cover} sizes="144px" zoom className="aspect-[4/5]" />
        <div className="flex flex-col justify-center">
          <p className="type-eyebrow text-ardesia">{p.zoneName}</p>
          <H className="type-h3 mt-2 text-[1.3rem]!">
            <Link href={href} className="after:absolute after:inset-0">
              {p.title}
            </Link>
          </H>
          <p className="type-meta mt-2 text-ardesia">
            {formatArea(p.area)} · {formatPrice(p.price)}
          </p>
        </div>
      </article>
    )
  }

  if (variant === 'feature') {
    return (
      <article className={cn('group relative grid gap-8 lg:grid-cols-12 lg:items-end lg:gap-12', className)}>
        <div className="relative lg:col-span-7">
          <ImageFrame
            image={cover}
            eager={eager}
            sizes="(min-width: 1024px) 58vw, 100vw"
            zoom
            className="aspect-[4/5] sm:aspect-[3/2]"
          />
          <StatusTag availability={p.availability} />
          <SaveButton slug={p.slug} title={p.title} className="absolute right-3 top-3 z-10" />
        </div>
        <div className="lg:col-span-5 lg:pb-4">
          <p className="type-eyebrow text-ardesia">
            {p.zoneName} · {p.microZone}
          </p>
          <H className="type-h2 mt-5">
            <Link href={href} className="after:absolute after:inset-0">
              {p.title}
            </Link>
          </H>
          <p className="type-lead mt-5 italic text-ardesia">{p.hook}</p>
          <div className="mt-8 border-t border-inchiostro/15 pt-5">
            <PropertyFacts p={p} />
            <p className="mt-4 font-serif text-2xl type-num">{formatPrice(p.price)}</p>
          </div>
          <div className="relative z-10 mt-6">
            <CompareToggle slug={p.slug} title={p.title} />
          </div>
        </div>
      </article>
    )
  }

  return (
    <article className={cn('group relative flex flex-col', className)}>
      <div className="relative">
        <ImageFrame
          image={cover}
          eager={eager}
          sizes="(min-width: 1280px) 30vw, (min-width: 768px) 45vw, 100vw"
          zoom
          className="aspect-[4/5]"
        />
        <StatusTag availability={p.availability} />
        <SaveButton slug={p.slug} title={p.title} className="absolute right-3 top-3 z-10" />
      </div>
      <div className="flex flex-1 flex-col pt-6">
        <p className="type-eyebrow text-ardesia">
          {p.zoneName} · {PROPERTY_TYPE_LABEL[p.type]}
        </p>
        <H className="type-h3 mt-3">
          <Link href={href} className="after:absolute after:inset-0">
            {p.title}
          </Link>
        </H>
        <p className="mt-3 line-clamp-2 font-serif text-[1.075rem] italic leading-snug text-ardesia">{p.hook}</p>
        <div className="mt-auto pt-5">
          <div className="flex items-end justify-between gap-4 border-t border-inchiostro/15 pt-4">
            <PropertyFacts p={p} />
          </div>
          <div className="mt-3 flex items-center justify-between gap-4">
            <p className="font-serif text-xl type-num">{formatPrice(p.price)}</p>
            <CompareToggle slug={p.slug} title={p.title} className="relative z-10" />
          </div>
        </div>
      </div>
    </article>
  )
}
