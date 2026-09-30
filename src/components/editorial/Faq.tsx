import { cn } from '@/lib/cn'

export function Faq({ items, className }: { items: Array<{ q: string; a: string }>; className?: string }) {
  return (
    <div className={cn('border-t border-current/15', className)}>
      {items.map((item) => (
        <details key={item.q} className="group border-b border-current/15">
          <summary className="flex cursor-pointer list-none items-start justify-between gap-6 py-6 [&::-webkit-details-marker]:hidden">
            <span className="type-h3 text-[1.35rem]!">{item.q}</span>
            <span aria-hidden className="mt-1 text-2xl font-light leading-none transition-transform duration-500 group-open:rotate-45">
              +
            </span>
          </summary>
          <p className="max-w-2xl pb-7 text-current/75">{item.a}</p>
        </details>
      ))}
    </div>
  )
}
