import { Icon, type IconName } from '@/components/ui/Icon'
import type { ThingToKnow, ThingToKnowKind } from '@/content/types'
import { cn } from '@/lib/cn'

const ICON: Record<ThingToKnowKind, IconName> = {
  acqua: 'acqua',
  accesso: 'accesso',
  lavori: 'lavori',
  vincoli: 'vincoli',
  costi: 'costi',
  impianti: 'impianti',
}

/** "Cose da sapere": ciò che di solito si scopre dopo. Qui si dice prima. */
export function ThingsToKnowList({
  items,
  className,
  headingLevel = 'h3',
}: {
  items: ThingToKnow[]
  className?: string
  headingLevel?: 'h3' | 'h4'
}) {
  const H = headingLevel
  return (
    <ul className={cn('divide-y divide-current/15 border-y border-current/15', className)}>
      {items.map((item) => (
        <li key={item.title} className="grid grid-cols-[2rem_1fr] gap-4 py-6 md:grid-cols-[2.5rem_12rem_1fr] md:gap-6">
          <Icon name={ICON[item.kind]} className="size-6 opacity-70" />
          <H className="type-eyebrow pt-1">{item.title}</H>
          <p className="col-start-2 text-current/80 md:col-start-3">{item.text}</p>
        </li>
      ))}
    </ul>
  )
}
