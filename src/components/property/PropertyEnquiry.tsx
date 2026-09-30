'use client'

import { useRef, useState } from 'react'
import { Cornice } from '@/components/layout/Cornice'
import { Button } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { InfoRequestForm, VisitRequestForm } from '@/components/forms/PropertyForms'
import { agency } from '@/content/agency'
import { formatPrice, formatPricePerSqm } from '@/lib/format'
import { CompareToggle, SaveButton } from './ShortlistButtons'

type Mode = 'visita' | 'informazioni'

/**
 * Box di contatto della scheda: fisso a lato su desktop, barra in basso su
 * mobile. Le due azioni aprono lo stesso pannello con il modulo giusto.
 */
export function PropertyEnquiry({
  slug,
  title,
  reference,
  price,
  area,
  availability,
}: {
  slug: string
  title: string
  reference: string
  price: number | null
  area: number
  availability: 'disponibile' | 'in-trattativa'
}) {
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [mode, setMode] = useState<Mode>('visita')

  const open = (next: Mode) => {
    setMode(next)
    dialogRef.current?.showModal()
  }

  return (
    <>
      <Cornice as="aside" className="bg-calce">
        <p className="type-eyebrow flex items-center justify-between gap-4 text-ardesia">
          <span>{availability === 'in-trattativa' ? 'In trattativa' : 'Disponibile'}</span>
          <span className="type-num">Rif. {reference}</span>
        </p>
        <p className="type-num mt-5 font-serif text-4xl">{formatPrice(price)}</p>
        {price !== null && <p className="type-meta type-num mt-1 text-ardesia">{formatPricePerSqm(price, area)}</p>}

        <div className="mt-7 grid gap-3">
          <Button size="lg" onClick={() => open('visita')} className="w-full">
            Prenota una visita
          </Button>
          <Button variant="secondary" size="lg" onClick={() => open('informazioni')} className="w-full">
            Chiedi informazioni
          </Button>
        </div>

        <div className="mt-5 flex items-center justify-between gap-4 border-b border-inchiostro/15 pb-5">
          <SaveButton slug={slug} title={title} withLabel />
          <CompareToggle slug={slug} title={title} />
        </div>

        <div className="mt-6 flex items-center gap-4">
          <span aria-hidden className="inline-flex size-12 shrink-0 items-center justify-center bg-notte-900 font-serif text-lg text-argento">
            FC
          </span>
          <div>
            <p className="font-medium">{agency.founder}</p>
            <p className="type-meta text-ardesia">Vi risponde {agency.responseTime}</p>
          </div>
        </div>
        <div className="type-meta mt-5 flex flex-wrap gap-x-6 gap-y-2">
          <a href={agency.phone.href} className="inline-flex items-center gap-2 hover:underline">
            <Icon name="phone" className="size-4" /> Chiamate
          </a>
          <a href={`${agency.whatsapp.href}?text=${encodeURIComponent(`Buongiorno, vi scrivo per l’immobile ${reference}.`)}`} className="inline-flex items-center gap-2 hover:underline">
            <Icon name="chat" className="size-4" /> WhatsApp
          </a>
        </div>
      </Cornice>

      {/* Barra mobile */}
      <div
        data-bottom-bar
        className="fixed inset-x-0 bottom-0 z-30 flex items-center justify-between gap-4 border-t border-inchiostro/10 bg-calce/95 px-5 py-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] backdrop-blur lg:hidden"
      >
        <div className="min-w-0">
          <p className="type-num truncate font-serif text-xl">{formatPrice(price)}</p>
          <button type="button" onClick={() => open('informazioni')} className="type-meta text-ardesia underline decoration-current/30 underline-offset-2">
            Chiedi informazioni
          </button>
        </div>
        <Button onClick={() => open('visita')} className="shrink-0">
          Prenota visita
        </Button>
      </div>

      <dialog
        ref={dialogRef}
        aria-labelledby="enquiry-title"
        className="m-0 mt-auto max-h-[92dvh] w-full max-w-none overflow-y-auto bg-calce p-0 text-inchiostro open:animate-fade md:m-auto md:max-w-xl"
      >
        <div className="sticky top-0 z-10 flex items-start justify-between gap-6 border-b border-inchiostro/10 bg-calce px-6 py-5 md:px-8">
          <div>
            <p className="type-eyebrow text-ardesia">Rif. {reference}</p>
            <h2 id="enquiry-title" className="type-h3 mt-2">
              {mode === 'visita' ? 'Prenota una visita' : 'Chiedi informazioni'}
            </h2>
            <p className="mt-1 font-serif italic text-ardesia">{title}</p>
          </div>
          <button type="button" onClick={() => dialogRef.current?.close()} className="-mr-2 inline-flex size-11 shrink-0 items-center justify-center">
            <Icon name="close" className="size-5" />
            <span className="sr-only">Chiudi</span>
          </button>
        </div>
        <div className="px-6 py-8 md:px-8">
          {mode === 'visita' ? <VisitRequestForm slug={slug} /> : <InfoRequestForm slug={slug} reference={reference} />}
        </div>
      </dialog>
    </>
  )
}
