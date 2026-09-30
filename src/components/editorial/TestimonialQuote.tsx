import type { Testimonial } from '@/content/testimonials'
import { cn } from '@/lib/cn'

export function TestimonialQuote({ t, className, size = 'lg' }: { t: Testimonial; className?: string; size?: 'lg' | 'md' }) {
  return (
    <figure className={cn('max-w-4xl', className)}>
      <blockquote className={cn('font-serif leading-[1.2] tracking-[-0.01em]', size === 'lg' ? 'type-h2' : 'type-h3')}>
        <span aria-hidden className="mr-1 text-current/40">
          “
        </span>
        {t.quote}
        <span aria-hidden className="ml-1 text-current/40">
          ”
        </span>
      </blockquote>
      <figcaption className="type-meta mt-8 flex flex-wrap items-center gap-x-4 gap-y-2 text-current/70">
        <span className="type-eyebrow text-current">{t.author}</span>
        <span>{t.context}</span>
        {t.example && (
          <span className="border border-current/30 px-2 py-0.5 text-[0.7rem] uppercase tracking-[0.18em]">
            Testimonianza di esempio
          </span>
        )}
      </figcaption>
    </figure>
  )
}
