import Link from 'next/link'
import { ImageFrame } from '@/components/ui/ImageFrame'
import type { Neighborhood } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatNumber, pluralize } from '@/lib/format'

export function NeighborhoodCard({
  n,
  available,
  className,
  tone = 'light',
}: {
  n: Neighborhood
  available: number
  className?: string
  tone?: 'light' | 'dark'
}) {
  const [min, max] = n.prices.ristrutturato
  return (
    <article className={cn('group relative flex flex-col', className)}>
      <ImageFrame image={n.image} sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 80vw" zoom className="aspect-[3/4]" />
      <div className="pt-5">
        <h3 className="type-h3">
          <Link href={`/quartieri/${n.slug}`} className="after:absolute after:inset-0">
            {n.name}
          </Link>
        </h3>
        <p className={cn('mt-2 font-serif italic leading-snug', tone === 'dark' ? 'text-peltro-300' : 'text-ardesia')}>
          {n.tagline}
        </p>
        <p className={cn('type-meta type-num mt-4 flex flex-wrap gap-x-3', tone === 'dark' ? 'text-peltro-300' : 'text-ardesia')}>
          <span>
            {formatNumber(min)}–{formatNumber(max)} €/m²
          </span>
          <span aria-hidden>·</span>
          <span>{available > 0 ? pluralize(available, 'casa in selezione', 'case in selezione') : 'Nessuna casa ora'}</span>
        </p>
      </div>
    </article>
  )
}
