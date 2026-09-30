'use client'

import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { cn } from '@/lib/cn'
import { COMPARE_LIMIT, toggleCompare, toggleSaved, useShortlist } from '@/lib/shortlist-store'

export function SaveButton({
  slug,
  title,
  className,
  withLabel = false,
}: {
  slug: string
  title: string
  className?: string
  withLabel?: boolean
}) {
  const { saved } = useShortlist()
  const active = saved.includes(slug)
  return (
    <button
      type="button"
      onClick={() => toggleSaved(slug)}
      aria-pressed={active}
      aria-label={withLabel ? undefined : active ? `Rimuovi “${title}” dai preferiti` : `Salva “${title}” nei preferiti`}
      className={cn(
        'inline-flex items-center justify-center gap-2 transition-colors duration-300',
        withLabel ? 'type-eyebrow h-11' : 'size-10 bg-calce/85 text-inchiostro backdrop-blur hover:bg-calce',
        className,
      )}
    >
      <Icon name="bookmark" className={cn('size-[18px] transition-[fill] duration-300', active && 'fill-current')} />
      {withLabel && <span>{active ? 'Salvato' : 'Salva'}</span>}
    </button>
  )
}

export function CompareToggle({ slug, title, className }: { slug: string; title: string; className?: string }) {
  const { compare } = useShortlist()
  const [full, setFull] = useState(false)
  const active = compare.includes(slug)
  return (
    <span className={cn('inline-flex items-center gap-3', className)}>
      <button
        type="button"
        aria-pressed={active}
        aria-label={active ? `Togli “${title}” dal confronto` : `Aggiungi “${title}” al confronto`}
        onClick={() => setFull(!toggleCompare(slug))}
        className="type-meta group inline-flex items-center gap-2 text-current/75 transition-colors hover:text-current"
      >
        <span
          aria-hidden
          className={cn(
            'inline-flex size-4 items-center justify-center border border-current/50 transition-colors',
            active && 'border-current bg-current',
          )}
        >
          {active && <Icon name="check" className="size-3 text-calce [.surface-dark_&]:text-notte-900" strokeWidth={2} />}
        </span>
        Confronta
      </button>
      {full && !active && (
        <span role="status" className="type-meta text-errore [.surface-dark_&]:text-errore-chiaro">
          Massimo {COMPARE_LIMIT}
        </span>
      )}
    </span>
  )
}
