import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

/**
 * La "cornice": la staffa del logo che incornicia il nome, trasformata in
 * componente. Si usa poco e solo per ciò che conta (prezzo, CTA, hero).
 */
export function Cornice({
  children,
  className,
  tone = 'light',
  as: Tag = 'div',
}: {
  children: ReactNode
  className?: string
  tone?: 'light' | 'dark'
  as?: 'div' | 'aside' | 'section' | 'figure'
}) {
  const line = tone === 'dark' ? 'bg-peltro-300/45' : 'bg-inchiostro/25'
  return (
    <Tag className={cn('relative px-6 pb-6 pt-7 md:px-8 md:pb-7 md:pt-8', className)}>
      <span aria-hidden className={cn('absolute inset-x-0 top-0 h-px', line)} />
      <span aria-hidden className={cn('absolute bottom-0 left-0 top-0 w-px', line)} />
      <span aria-hidden className={cn('absolute bottom-0 right-0 top-0 w-px', line)} />
      <span aria-hidden className={cn('absolute bottom-0 left-0 h-px w-3', line)} />
      <span aria-hidden className={cn('absolute bottom-0 right-0 h-px w-3', line)} />
      {children}
    </Tag>
  )
}
