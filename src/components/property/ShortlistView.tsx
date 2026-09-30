'use client'

import Link from 'next/link'
import { ButtonLink } from '@/components/ui/Button'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { CONDITION_LABEL, FEATURE_LABEL } from '@/content/types'
import type { PropertyCompareData } from '@/lib/content'
import { formatArea, formatElevation, formatEuro, formatPrice, formatPricePerSqm } from '@/lib/format'
import { COMPARE_LIMIT, toggleCompare, useShortlist } from '@/lib/shortlist-store'
import { PropertyCard } from './PropertyCard'

const ROWS: Array<{ label: string; value: (p: PropertyCompareData) => string }> = [
  { label: 'Prezzo', value: (p) => formatPrice(p.price) },
  { label: 'Prezzo al m²', value: (p) => formatPricePerSqm(p.price, p.area) },
  { label: 'Superficie', value: (p) => formatArea(p.area) + (p.outdoor ? ` + ${formatArea(p.outdoor)} esterni` : '') },
  { label: 'Locali', value: (p) => `${p.rooms} · ${p.bedroomsLabel}` },
  { label: 'Piano', value: (p) => `${p.floorLabel}${p.lift ? ', con ascensore' : ', senza ascensore'}` },
  { label: 'Quota ingresso', value: (p) => `${formatElevation(p.entranceElevationCm)} s.m.m.` },
  { label: 'Classe energetica', value: (p) => p.energyClass },
  { label: 'Stato', value: (p) => CONDITION_LABEL[p.condition] },
  { label: 'Spese condominiali', value: (p) => (p.condoFees ? `${formatEuro(p.condoFees)} al mese` : 'Nessuna') },
  { label: 'Vaporetto', value: (p) => `${p.vaporetto.stop}, ${p.vaporetto.minutes} min a piedi` },
  { label: 'Caratteristiche', value: (p) => p.features.map((f) => FEATURE_LABEL[f]).join(', ') || '—' },
  { label: 'Vincolo', value: (p) => (p.listedBuilding ? 'Edificio vincolato' : 'No') },
]

export function ShortlistView({ all }: { all: PropertyCompareData[] }) {
  const { saved, compare } = useShortlist()
  const savedItems = saved.map((s) => all.find((p) => p.slug === s)).filter((p): p is PropertyCompareData => Boolean(p))
  const compareItems = compare.map((s) => all.find((p) => p.slug === s)).filter((p): p is PropertyCompareData => Boolean(p))

  return (
    <>
      <section aria-labelledby="salvati-title" className="wrap pb-24">
        <h2 id="salvati-title" className="type-eyebrow border-t border-inchiostro/15 pt-6 text-ardesia">
          Salvati · <span className="type-num">{savedItems.length}</span>
        </h2>
        {savedItems.length === 0 ? (
          <div className="mt-10 grid gap-6 md:grid-cols-12">
            <p className="type-h3 md:col-span-6">Non avete ancora salvato nessuna casa.</p>
            <div className="md:col-span-5 md:col-start-8">
              <p className="text-ardesia">
                Toccate il segnalibro sulle foto per tenere da parte gli immobili che vi interessano. Restano salvati su
                questo dispositivo, senza bisogno di registrarsi.
              </p>
              <ButtonLink href="/immobili" variant="ghost" className="type-eyebrow mt-6">
                Vai alla selezione
              </ButtonLink>
            </div>
          </div>
        ) : (
          <ul className="mt-12 grid gap-14 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
            {savedItems.map((p) => (
              <li key={p.slug}>
                <PropertyCard p={p} />
              </li>
            ))}
          </ul>
        )}
      </section>

      <section id="confronto" aria-labelledby="confronto-title" className="bg-calce-2 py-20 md:py-28">
        <div className="wrap">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="type-eyebrow text-ardesia">Confronto</p>
              <h2 id="confronto-title" className="type-h2 mt-4">
                Fianco a fianco
              </h2>
            </div>
            <p className="max-w-md text-ardesia">
              Fino a {COMPARE_LIMIT} immobili. Abbiamo messo in tabella i dati che a Venezia fanno la differenza, non solo
              metri e prezzo.
            </p>
          </div>

          {compareItems.length === 0 ? (
            <p className="mt-12 border-t border-inchiostro/15 pt-8 text-ardesia">
              Nessun immobile da confrontare. Usate “Confronta” sotto le card{savedItems.length > 0 ? ' qui sopra' : ''} per
              aggiungerne fino a {COMPARE_LIMIT}.
            </p>
          ) : (
            <div className="no-scrollbar -mx-5 mt-12 overflow-x-auto px-5 md:mx-0 md:px-0">
              <table className="w-full min-w-[40rem] border-collapse text-left">
                <caption className="sr-only">Confronto tra gli immobili selezionati</caption>
                <thead>
                  <tr>
                    <th scope="col" className="w-40 align-bottom">
                      <span className="sr-only">Caratteristica</span>
                    </th>
                    {compareItems.map((p) => (
                      <th key={p.slug} scope="col" className="w-1/3 px-4 pb-6 align-top font-normal">
                        <ImageFrame image={p.images[0] ?? 'venezia-rio'} sizes="320px" className="aspect-[3/2]" />
                        <p className="type-eyebrow mt-4 text-ardesia">{p.zoneName}</p>
                        <Link href={`/immobili/${p.slug}`} className="type-h3 link-line mt-2 inline text-[1.3rem]!">
                          {p.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => toggleCompare(p.slug)}
                          className="type-meta mt-3 block text-ardesia underline decoration-current/30 underline-offset-2 hover:text-inchiostro"
                        >
                          Togli dal confronto
                        </button>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ROWS.map((row) => (
                    <tr key={row.label} className="border-t border-inchiostro/15">
                      <th scope="row" className="type-eyebrow sticky left-0 bg-calce-2 py-4 pr-4 align-top font-medium text-ardesia">
                        {row.label}
                      </th>
                      {compareItems.map((p) => (
                        <td key={p.slug} className="type-num px-4 py-4 align-top">
                          {row.value(p)}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
