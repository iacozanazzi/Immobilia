import { cn } from '@/lib/cn'

/** Giudizio da 1 a 5 con cinque quadrati: sobrio, leggibile, niente stelline. */
export function RatingSquares({ value, label, className }: { value: number; label: string; className?: string }) {
  return (
    <span role="img" aria-label={`${label}: ${value} su 5`} className={cn('inline-flex gap-1', className)}>
      {[1, 2, 3, 4, 5].map((i) => (
        <span key={i} aria-hidden className={cn('size-2 border border-current', i <= value ? 'bg-current' : 'opacity-30')} />
      ))}
    </span>
  )
}
