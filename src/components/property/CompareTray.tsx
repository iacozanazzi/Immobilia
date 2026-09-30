'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Icon } from '@/components/ui/Icon'
import { COMPARE_LIMIT, clearCompare, useShortlist } from '@/lib/shortlist-store'

/** Barra discreta che compare quando si scelgono immobili da confrontare. */
export function CompareTray() {
  const { compare } = useShortlist()
  const pathname = usePathname()
  if (compare.length === 0 || pathname === '/preferiti') return null

  return (
    <div
      role="region"
      aria-label="Confronto immobili"
      className="compare-tray surface-dark fixed inset-x-4 bottom-4 z-30 mx-auto flex max-w-md animate-fade items-center justify-between gap-4 bg-notte-900/95 px-5 py-3 text-argento shadow-[0_20px_60px_-20px_rgb(3_7_15/0.6)] backdrop-blur md:bottom-6"
    >
      <p className="type-meta">
        <span className="type-num text-luce">{compare.length}</span> di {COMPARE_LIMIT} da confrontare
      </p>
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={clearCompare}
          className="inline-flex size-10 items-center justify-center text-peltro-300 hover:text-argento"
        >
          <Icon name="close" className="size-4" />
          <span className="sr-only">Svuota il confronto</span>
        </button>
        <Link
          href="/preferiti#confronto"
          className="type-eyebrow inline-flex h-10 items-center gap-2 border border-argento/30 px-4 hover:border-argento"
        >
          Confronta <Icon name="arrow-right" className="size-4" />
        </Link>
      </div>
    </div>
  )
}
