'use client'

import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { media, type MediaKey } from '@/content/media'
import { cn } from '@/lib/cn'

/**
 * Galleria della scheda: mosaico su desktop, carosello a scorrimento su
 * mobile, visualizzazione a schermo intero con tastiera (← → Esc).
 */
export function PropertyGallery({ images, title }: { images: MediaKey[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const trackRef = useRef<HTMLUListElement>(null)
  const [index, setIndex] = useState(0)
  const [slide, setSlide] = useState(0)
  const total = images.length

  const open = (i: number) => {
    setIndex(i)
    dialogRef.current?.showModal()
  }
  const go = useCallback((delta: number) => setIndex((i) => (i + delta + total) % total), [total])

  useEffect(() => {
    const dialog = dialogRef.current
    if (!dialog) return
    const onKey = (e: KeyboardEvent) => {
      if (!dialog.open) return
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [go])

  const onTrackScroll = () => {
    const track = trackRef.current
    if (!track) return
    setSlide(Math.round(track.scrollLeft / track.clientWidth))
  }

  const [first, second, third] = images
  const current = media[images[index] ?? images[0]!]

  return (
    <div className="relative">
      {/* Mobile: carosello */}
      <div className="relative md:hidden">
        <ul
          ref={trackRef}
          onScroll={onTrackScroll}
          className="no-scrollbar flex snap-x snap-mandatory overflow-x-auto"
          aria-label={`Foto di ${title}`}
        >
          {images.map((key, i) => (
            <li key={`${key}-${i}`} className="w-full shrink-0 snap-center">
              <button type="button" onClick={() => open(i)} className="block w-full" aria-label={`Apri la foto ${i + 1} di ${total}`}>
                <ImageFrame image={key} eager={i === 0} sizes="100vw" className="aspect-[4/3.4]" />
              </button>
            </li>
          ))}
        </ul>
        <p className="type-meta type-num absolute bottom-3 right-3 bg-notte-950/70 px-2.5 py-1 text-argento backdrop-blur">
          {slide + 1} / {total}
        </p>
      </div>

      {/* Desktop: mosaico */}
      <div className="hidden gap-2 md:grid md:h-[min(78vh,760px)] md:grid-cols-3 md:grid-rows-2">
        {first && (
          <button type="button" onClick={() => open(0)} className="group relative col-span-2 row-span-2" aria-label={`Apri la foto 1 di ${total}`}>
            <ImageFrame image={first} eager sizes="66vw" zoom className="absolute! inset-0" />
          </button>
        )}
        {[second, third].map(
          (key, i) =>
            key && (
              <button
                key={`${key}-${i}`}
                type="button"
                onClick={() => open(i + 1)}
                className="group relative"
                aria-label={`Apri la foto ${i + 2} di ${total}`}
              >
                <ImageFrame image={key} sizes="33vw" zoom className="absolute! inset-0" />
              </button>
            ),
        )}
      </div>

      <button
        type="button"
        onClick={() => open(0)}
        className="type-eyebrow absolute bottom-4 left-4 hidden items-center gap-2 bg-calce/90 px-4 py-2.5 text-inchiostro backdrop-blur hover:bg-calce md:inline-flex"
      >
        <Icon name="camera" className="size-4" />
        Tutte le {total} foto
      </button>

      <dialog
        ref={dialogRef}
        aria-label={`Foto di ${title}`}
        className="surface-dark m-0 h-dvh max-h-none w-full max-w-none bg-notte-950 p-0 text-argento open:animate-fade"
      >
        <div className="flex h-full flex-col">
          <div className="wrap flex h-16 shrink-0 items-center justify-between">
            <p className="type-meta type-num text-peltro-300" aria-live="polite">
              {index + 1} / {total}
            </p>
            <button
              type="button"
              onClick={() => dialogRef.current?.close()}
              className="-mr-2 inline-flex size-11 items-center justify-center"
              autoFocus
            >
              <Icon name="close" className="size-6" />
              <span className="sr-only">Chiudi la galleria</span>
            </button>
          </div>
          <figure className="relative mx-auto flex min-h-0 w-full max-w-7xl flex-1 flex-col px-4 pb-6 md:px-20">
            <div className="relative min-h-0 flex-1 bg-notte-900">
              <Image
                key={current.src}
                src={current.src}
                alt={current.alt}
                fill
                sizes="(min-width: 1280px) 1200px, 100vw"
                className="animate-fade object-contain"
              />
            </div>
            <figcaption className="type-meta mt-4 text-center text-peltro-300">{current.alt}</figcaption>
            {total > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className={cn(navButton, 'left-2 md:left-6')}
                >
                  <Icon name="chevron-left" className="size-6" />
                  <span className="sr-only">Foto precedente</span>
                </button>
                <button type="button" onClick={() => go(1)} className={cn(navButton, 'right-2 md:right-6')}>
                  <Icon name="chevron-right" className="size-6" />
                  <span className="sr-only">Foto successiva</span>
                </button>
              </>
            )}
          </figure>
        </div>
      </dialog>
    </div>
  )
}

const navButton =
  'absolute top-1/2 inline-flex size-12 -translate-y-1/2 items-center justify-center border border-argento/25 bg-notte-950/60 backdrop-blur transition-colors hover:border-argento'
