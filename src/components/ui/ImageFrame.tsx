'use client'

import Image from 'next/image'
import { useState } from 'react'
import { media, type MediaKey } from '@/content/media'
import { cn } from '@/lib/cn'

/**
 * Cornice per le foto: proporzioni fisse (niente salti di layout) e un
 * ripiego grafico del marchio se l'immagine non si carica.
 */
export function ImageFrame({
  image,
  alt,
  sizes,
  className,
  imgClassName,
  eager = false,
  zoom = false,
  plainFallback = false,
}: {
  image: MediaKey
  alt?: string
  sizes: string
  className?: string
  imgClassName?: string
  eager?: boolean
  zoom?: boolean
  /** Solo sfumatura, senza segno: per le foto di sfondo sotto il testo. */
  plainFallback?: boolean
}) {
  const [failed, setFailed] = useState(false)
  const photo = media[image]

  return (
    <div className={cn('relative overflow-hidden bg-notte-800', className)}>
      <Fallback plain={plainFallback} />
      {!failed && (
        <Image
          src={photo.src}
          alt={alt ?? photo.alt}
          fill
          sizes={sizes}
          loading={eager ? 'eager' : 'lazy'}
          fetchPriority={eager ? 'high' : undefined}
          onError={() => setFailed(true)}
          className={cn(
            'object-cover',
            zoom && 'transition-transform duration-[1200ms] ease-(--ease-porta) group-hover:scale-[1.03]',
            imgClassName,
          )}
        />
      )}
    </div>
  )
}

function Fallback({ plain }: { plain: boolean }) {
  return (
    <div aria-hidden className="absolute inset-0 flex items-center justify-center bg-[radial-gradient(ellipse_at_center,#0b1e30_0%,#03070f_100%)]">
      {!plain && <svg viewBox="0 0 120 80" className="h-1/3 max-h-24 w-auto opacity-60" fill="none" stroke="#455660" strokeWidth="0.75">
        <path d="M10 70V10l20 20 20-16v24M110 70V10L90 30 70 14v24M38 64V44l12-9 12 9v20zM10 70h100" />
        <rect x="48.5" y="54" width="3" height="10" fill="#C9AE85" stroke="none" />
      </svg>}
    </div>
  )
}
