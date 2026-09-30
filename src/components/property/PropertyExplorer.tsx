'use client'

import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useRef, useState, type ReactNode } from 'react'
import { Icon } from '@/components/ui/Icon'
import { FEATURE_LABEL, PROPERTY_TYPE_LABEL, type Feature, type Neighborhood } from '@/content/types'
import { cn } from '@/lib/cn'
import type { PropertyCardData } from '@/lib/content'
import { pluralize } from '@/lib/format'
import { GalleryResults, ZoneResults } from './PropertyResults'

/* Filtri pochi e utili: zona, tipologia, budget, metratura e le caratteristiche
   che a Venezia contano davvero. Lo stato vive nell'URL: si può condividere. */

const PRICE_OPTIONS = [
  { value: 'fino-400', label: 'Fino a 400.000 €', range: [0, 400_000] },
  { value: '400-700', label: '400.000 – 700.000 €', range: [400_000, 700_000] },
  { value: '700-1000', label: '700.000 – 1.000.000 €', range: [700_000, 1_000_000] },
  { value: 'oltre-1000', label: 'Oltre 1.000.000 €', range: [1_000_000, Infinity] },
] as const

const AREA_OPTIONS = [60, 90, 120, 180].map((n) => ({ value: String(n), label: `Da ${n} m²` }))

const EXTRAS: Record<string, { label: string; features: Feature[] }> = {
  esterno: { label: 'Altana o terrazza', features: ['altana', 'terrazza'] },
  verde: { label: 'Giardino o corte', features: ['giardino', 'corte'] },
  acqua: { label: 'Vista sull’acqua', features: ['vista-canale', 'vista-laguna'] },
  'accesso-acqua': { label: FEATURE_LABEL['accesso-acqua'], features: ['accesso-acqua'] },
  ascensore: { label: FEATURE_LABEL.ascensore, features: ['ascensore'] },
  auto: { label: FEATURE_LABEL['posto-auto'], features: ['posto-auto'] },
}

const SORTS = [
  { value: 'evidenza', label: 'In evidenza' },
  { value: 'recenti', label: 'Più recenti' },
  { value: 'prezzo-asc', label: 'Prezzo crescente' },
  { value: 'prezzo-desc', label: 'Prezzo decrescente' },
  { value: 'superficie', label: 'Superficie' },
]

type View = 'galleria' | 'zona'

interface Filters {
  zona: string
  tipo: string
  prezzo: string
  mq: string
  extra: string[]
  ordine: string
  vista: View
}

function readFilters(params: URLSearchParams): Filters {
  return {
    zona: params.get('zona') ?? '',
    tipo: params.get('tipo') ?? '',
    prezzo: params.get('prezzo') ?? '',
    mq: params.get('mq') ?? '',
    extra: (params.get('extra') ?? '').split(',').filter((e) => e in EXTRAS),
    ordine: params.get('ordine') ?? 'evidenza',
    vista: params.get('vista') === 'zona' ? 'zona' : 'galleria',
  }
}

function applyFilters(items: PropertyCardData[], f: Filters) {
  const price = PRICE_OPTIONS.find((o) => o.value === f.prezzo)
  const filtered = items.filter((p) => {
    if (f.zona && p.zone !== f.zona) return false
    if (f.tipo && p.type !== f.tipo) return false
    if (f.mq && p.area < Number(f.mq)) return false
    if (price) {
      // "Trattativa riservata" rientra solo nella fascia più alta.
      const value = p.price ?? Infinity
      if (value < price.range[0] || value > price.range[1]) return false
    }
    return f.extra.every((key) => EXTRAS[key]!.features.some((feat) => p.features.includes(feat)))
  })
  const sorted = [...filtered]
  switch (f.ordine) {
    case 'recenti':
      sorted.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt))
      break
    case 'prezzo-asc':
      sorted.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity))
      break
    case 'prezzo-desc':
      sorted.sort((a, b) => (b.price ?? Infinity) - (a.price ?? Infinity))
      break
    case 'superficie':
      sorted.sort((a, b) => b.area - a.area)
      break
  }
  return sorted
}

export function PropertyExplorer({
  items,
  zones,
  emptyState,
}: {
  items: PropertyCardData[]
  zones: Array<Pick<Neighborhood, 'slug' | 'name' | 'tagline'>>
  emptyState: ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const query = searchParams.toString()
  const filters = useMemo(() => readFilters(new URLSearchParams(query)), [query])
  const results = useMemo(() => applyFilters(items, filters), [items, filters])
  const dialogRef = useRef<HTMLDialogElement>(null)
  const [announce, setAnnounce] = useState('')

  const types = [...new Set(items.map((p) => p.type))]
  const activeCount = [filters.zona, filters.tipo, filters.prezzo, filters.mq].filter(Boolean).length + filters.extra.length

  function update(patch: Partial<Filters>) {
    const next = { ...filters, ...patch }
    const params = new URLSearchParams()
    if (next.zona) params.set('zona', next.zona)
    if (next.tipo) params.set('tipo', next.tipo)
    if (next.prezzo) params.set('prezzo', next.prezzo)
    if (next.mq) params.set('mq', next.mq)
    if (next.extra.length) params.set('extra', next.extra.join(','))
    if (next.ordine !== 'evidenza') params.set('ordine', next.ordine)
    if (next.vista !== 'galleria') params.set('vista', next.vista)
    const qs = params.toString()
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false })
    const count = applyFilters(items, next).length
    setAnnounce(`${pluralize(count, 'immobile', 'immobili')} corrispondono alla ricerca`)
  }

  function reset() {
    update({ zona: '', tipo: '', prezzo: '', mq: '', extra: [] })
  }

  const controls = (
    <>
      <FilterSelect
        label="Zona"
        value={filters.zona}
        onChange={(zona) => update({ zona })}
        allLabel="Tutte le zone"
        options={zones.map((z) => ({ value: z.slug, label: z.name }))}
      />
      <FilterSelect
        label="Tipologia"
        value={filters.tipo}
        onChange={(tipo) => update({ tipo })}
        allLabel="Tutte"
        options={types.map((t) => ({ value: t, label: PROPERTY_TYPE_LABEL[t] }))}
      />
      <FilterSelect
        label="Budget"
        value={filters.prezzo}
        onChange={(prezzo) => update({ prezzo })}
        allLabel="Qualsiasi"
        options={PRICE_OPTIONS.map(({ value, label }) => ({ value, label }))}
      />
      <FilterSelect
        label="Superficie"
        value={filters.mq}
        onChange={(mq) => update({ mq })}
        allLabel="Qualsiasi"
        options={AREA_OPTIONS}
      />
    </>
  )

  const extras = (
    <fieldset>
      <legend className="type-eyebrow mb-3 text-ardesia">Caratteristiche</legend>
      <div className="flex flex-wrap gap-2">
        {Object.entries(EXTRAS).map(([key, extra]) => {
          const on = filters.extra.includes(key)
          return (
            <button
              key={key}
              type="button"
              aria-pressed={on}
              onClick={() => update({ extra: on ? filters.extra.filter((e) => e !== key) : [...filters.extra, key] })}
              className={cn(
                'inline-flex h-10 items-center gap-2 border px-4 text-[0.95rem] transition-colors duration-300',
                on ? 'border-inchiostro bg-inchiostro text-calce' : 'border-inchiostro/20 hover:border-inchiostro/60',
              )}
            >
              {on && <Icon name="check" className="size-3.5" strokeWidth={1.75} />}
              {extra.label}
            </button>
          )
        })}
      </div>
    </fieldset>
  )

  return (
    <div>
      <p aria-live="polite" className="sr-only">
        {announce}
      </p>

      {/* Desktop: barra filtri sempre visibile */}
      <div className="hidden border-y border-inchiostro/15 py-8 lg:block">
        <div className="grid grid-cols-4 gap-8">{controls}</div>
        <div className="mt-8">{extras}</div>
      </div>

      {/* Mobile: filtri in un pannello */}
      <dialog
        ref={dialogRef}
        aria-label="Filtri"
        className="m-0 mt-auto max-h-[88dvh] w-full max-w-none overflow-y-auto bg-calce p-0 text-inchiostro open:animate-fade lg:hidden"
      >
        <div className="sticky top-0 flex items-center justify-between border-b border-inchiostro/15 bg-calce px-5 py-4">
          <p className="type-eyebrow">Filtri</p>
          <button type="button" onClick={() => dialogRef.current?.close()} className="-mr-2 inline-flex size-11 items-center justify-center">
            <Icon name="close" className="size-5" />
            <span className="sr-only">Chiudi i filtri</span>
          </button>
        </div>
        <div className="grid gap-8 px-5 py-8">
          {controls}
          {extras}
        </div>
        <div className="sticky bottom-0 grid grid-cols-2 gap-3 border-t border-inchiostro/15 bg-calce px-5 py-4">
          <button type="button" onClick={reset} className="type-eyebrow h-12 border border-inchiostro/25">
            Azzera
          </button>
          <button type="button" onClick={() => dialogRef.current?.close()} className="type-eyebrow h-12 bg-notte-900 text-calce">
            Mostra {results.length}
          </button>
        </div>
      </dialog>

      <div className="mt-8 flex flex-wrap items-center justify-between gap-x-6 gap-y-4 border-b border-inchiostro/15 pb-6 lg:border-0 lg:pb-0">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => dialogRef.current?.showModal()}
            className="type-eyebrow inline-flex h-11 items-center gap-2 border border-inchiostro/25 px-4 lg:hidden"
          >
            <Icon name="sliders" className="size-4" />
            Filtri{activeCount > 0 && <span className="type-num">({activeCount})</span>}
          </button>
          <p className="type-meta type-num text-ardesia">
            {pluralize(results.length, 'immobile', 'immobili')}
            {activeCount > 0 && (
              <>
                {' · '}
                <button type="button" onClick={reset} className="link-line pb-0.5 text-inchiostro">
                  Azzera i filtri
                </button>
              </>
            )}
          </p>
        </div>
        <div className="flex items-center gap-6">
          <label className="type-meta flex items-center gap-2 text-ardesia">
            <span className="hidden sm:inline">Ordina per</span>
            <select
              value={filters.ordine}
              onChange={(e) => update({ ordine: e.target.value })}
              className="cursor-pointer border-0 border-b border-inchiostro/25 bg-transparent py-1 pr-1 text-inchiostro"
            >
              {SORTS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </label>
          <div role="group" aria-label="Vista" className="flex border border-inchiostro/20">
            {(
              [
                ['galleria', 'grid', 'Galleria'],
                ['zona', 'rows', 'Per zona'],
              ] as const
            ).map(([value, icon, label]) => (
              <button
                key={value}
                type="button"
                aria-pressed={filters.vista === value}
                onClick={() => update({ vista: value })}
                className={cn(
                  'inline-flex h-10 items-center gap-2 px-3 text-sm transition-colors',
                  filters.vista === value ? 'bg-inchiostro text-calce' : 'text-ardesia hover:text-inchiostro',
                )}
              >
                <Icon name={icon} className="size-4" />
                <span className="hidden sm:inline">{label}</span>
                <span className="sr-only sm:hidden">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-14 md:mt-20">
        {results.length === 0 ? (
          emptyState
        ) : filters.vista === 'zona' ? (
          <ZoneResults items={results} zones={zones} />
        ) : (
          <GalleryResults items={results} />
        )}
      </div>
    </div>
  )
}

function FilterSelect({
  label,
  value,
  onChange,
  options,
  allLabel,
}: {
  label: string
  value: string
  onChange: (value: string) => void
  options: Array<{ value: string; label: string }>
  allLabel: string
}) {
  return (
    <label className="block">
      <span className="type-eyebrow block text-ardesia">{label}</span>
      <span className="relative mt-2 block">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'block w-full cursor-pointer appearance-none rounded-none border-0 border-b bg-transparent py-3 pr-8 text-base',
            value ? 'border-inchiostro' : 'border-inchiostro/25',
          )}
        >
          <option value="">{allLabel}</option>
          {options.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        <Icon name="chevron-down" className="pointer-events-none absolute right-0 top-1/2 size-4 -translate-y-1/2 opacity-60" />
      </span>
    </label>
  )
}
