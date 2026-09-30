import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type Tone = 'calce' | 'calce-2' | 'istria' | 'notte'

const tones: Record<Tone, string> = {
  calce: 'bg-calce text-inchiostro',
  'calce-2': 'bg-calce-2 text-inchiostro',
  istria: 'bg-istria text-inchiostro',
  notte: 'surface-dark bg-notte-900 text-argento',
}

export function Section({
  children,
  tone = 'calce',
  className,
  id,
  labelledBy,
}: {
  children: ReactNode
  tone?: Tone
  className?: string
  id?: string
  labelledBy?: string
}) {
  return (
    <section id={id} aria-labelledby={labelledBy} className={cn('py-20 md:py-28 lg:py-32', tones[tone], className)}>
      {children}
    </section>
  )
}

/** Intestazione di capitolo: numero romano, occhiello, titolo, sottotitolo. */
export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  id,
  tone = 'light',
  className,
  as: Tag = 'h2',
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  id?: string
  tone?: 'light' | 'dark'
  className?: string
  as?: 'h1' | 'h2'
}) {
  return (
    <header className={cn('max-w-3xl', className)}>
      <p
        className={cn(
          'type-eyebrow flex items-center gap-4',
          tone === 'dark' ? 'text-peltro-300' : 'text-ardesia',
        )}
      >
        {index && (
          <>
            <span className="font-serif text-base italic tracking-normal normal-case">{index}</span>
            <span aria-hidden className={cn('h-px w-10', tone === 'dark' ? 'bg-peltro-300/40' : 'bg-inchiostro/25')} />
          </>
        )}
        <span>{eyebrow}</span>
      </p>
      <Tag id={id} className={cn(Tag === 'h1' ? 'type-h1' : 'type-h2', 'mt-6')}>
        {title}
      </Tag>
      {lead && (
        <div className={cn('type-lead mt-6 max-w-2xl', tone === 'dark' ? 'text-peltro-300' : 'text-ardesia')}>{lead}</div>
      )}
    </header>
  )
}
