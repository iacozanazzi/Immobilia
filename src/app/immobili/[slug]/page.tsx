import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { ReactNode } from 'react'
import { PortaAccesa } from '@/components/brand/Logo'
import { QuickQuestionForm } from '@/components/forms/PropertyForms'
import { FloorPlan } from '@/components/property/FloorPlan'
import { PropertyCard } from '@/components/property/PropertyCard'
import { PropertyEnquiry } from '@/components/property/PropertyEnquiry'
import { PropertyGallery } from '@/components/property/PropertyGallery'
import { ThingsToKnowList } from '@/components/property/ThingsToKnow'
import { Icon } from '@/components/ui/Icon'
import { JsonLd } from '@/components/ui/JsonLd'
import { agency } from '@/content/agency'
import { photo } from '@/content/media'
import { CONDITION_LABEL, FEATURE_LABEL, PROPERTY_TYPE_LABEL } from '@/content/types'
import { getNeighborhood, getProperties, getProperty, getSimilarProperties, toCardData, zoneName } from '@/lib/content'
import { formatArea, formatElevation, formatEuro, formatPrice } from '@/lib/format'
import { breadcrumbJsonLd, buildMetadata, propertyJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getProperties()).map((p) => ({ slug: p.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const p = await getProperty(slug)
  if (!p) return {}
  return buildMetadata({
    title: `${p.title} · ${zoneName(p.zone)}`,
    description: `${p.summary} ${p.price ? formatPrice(p.price) : 'Trattativa riservata'}. Classe energetica ${p.energy.class}.`,
    path: `/immobili/${p.slug}`,
    image: photo(p.images[0]!).src,
  })
}

const SECTIONS = [
  ['descrizione', 'La casa'],
  ['cose-da-sapere', 'Cose da sapere'],
  ['planimetria', 'Planimetria'],
  ['dettagli', 'Dettagli'],
  ['zona', 'La zona'],
] as const

export default async function PropertyPage({ params }: Props) {
  const { slug } = await params
  const p = await getProperty(slug)
  if (!p) notFound()
  const [zone, similar] = await Promise.all([getNeighborhood(p.zone), getSimilarProperties(p, 3)])
  const zName = zoneName(p.zone)

  const facts: Array<[string, ReactNode, string?]> = [
    ['Superficie', formatArea(p.area.commercial), p.area.outdoor ? `+ ${formatArea(p.area.outdoor)} esterni` : 'commerciale'],
    ['Locali', p.rooms, `${p.bedrooms} camere`],
    ['Bagni', p.bathrooms],
    ['Piano', p.floor.level === 0 ? 'Terra' : `${p.floor.level}°`, p.floor.lift ? 'con ascensore' : 'senza ascensore'],
    ['Quota ingresso', formatElevation(p.entranceElevationCm), 'sul medio mare'],
    ['Classe energetica', p.energy.class, `${p.energy.ipe} kWh/m² anno`],
  ]

  const specs: Array<[string, string]> = [
    ['Tipologia', PROPERTY_TYPE_LABEL[p.type]],
    ['Superficie commerciale', formatArea(p.area.commercial)],
    ['Superficie calpestabile', formatArea(p.area.net)],
    ...(p.area.outdoor ? ([['Spazi esterni', formatArea(p.area.outdoor)]] as Array<[string, string]>) : []),
    ['Piano', `${p.floor.label}, su ${p.floor.buildingFloors} ${p.floor.buildingFloors === 1 ? 'piano' : 'piani'}`],
    ['Ascensore', p.floor.lift ? 'Sì' : 'No'],
    ['Quota dell’ingresso', `${formatElevation(p.entranceElevationCm)} sul medio mare`],
    ['Riscaldamento', p.heating],
    ['Classe energetica', `${p.energy.class} · ${p.energy.ipe} kWh/m² anno`],
    ['Costruzione', p.built],
    ['Ultima ristrutturazione', p.renovated ? String(p.renovated) : '—'],
    ['Stato', CONDITION_LABEL[p.condition]],
    ['Esposizione', p.exposure],
    ['Vincolo della Soprintendenza', p.listedBuilding ? 'Sì' : 'No'],
    ['Spese condominiali', p.condoFees ? `${formatEuro(p.condoFees)} al mese` : 'Nessuna'],
    ['Disponibilità', p.availableFrom],
    ['Caratteristiche', p.features.map((f) => FEATURE_LABEL[f]).join(', ') || '—'],
    ['Riferimento', p.ref],
  ]

  const [leadParagraph, ...paragraphs] = p.description

  return (
    <article>
      <div className="pt-18 md:pt-20">
        <div className="md:wrap md:pt-6">
          <PropertyGallery images={p.images} title={p.title} />
        </div>
      </div>

      <div className="wrap grid gap-14 pb-24 pt-10 md:pt-14 lg:grid-cols-12 lg:gap-12">
        <div className="min-w-0 lg:col-span-7">
          <nav aria-label="Percorso" className="type-meta text-ardesia">
            <ol className="flex flex-wrap items-center gap-2">
              <li>
                <Link href="/immobili" className="hover:text-inchiostro hover:underline">
                  Immobili
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href={`/quartieri/${p.zone}`} className="hover:text-inchiostro hover:underline">
                  {zName}
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-inchiostro">
                {p.microZone}
              </li>
            </ol>
          </nav>

          <header className="mt-8">
            <p className="type-eyebrow text-ardesia">
              {zName} · {p.microZone} · {PROPERTY_TYPE_LABEL[p.type]}
            </p>
            <h1 className="type-h1 mt-5">{p.title}</h1>
            <p className="type-lead mt-6 max-w-2xl italic text-ardesia">{p.hook}</p>
          </header>

          <dl className="mt-12 grid grid-cols-2 border-l border-t border-inchiostro/15 sm:grid-cols-3">
            {facts.map(([label, value, hint]) => (
              <div key={label} className="border-b border-r border-inchiostro/15 p-5">
                <dt className="type-eyebrow text-ardesia">{label}</dt>
                <dd className="type-num mt-3 font-serif text-3xl">{value}</dd>
                {hint && <dd className="type-meta mt-1 text-ardesia">{hint}</dd>}
              </div>
            ))}
          </dl>

          <nav aria-label="In questa scheda" className="mt-10 hidden md:block">
            <ul className="flex flex-wrap gap-x-8 gap-y-3">
              {SECTIONS.map(([id, label]) => (
                <li key={id}>
                  <a href={`#${id}`} className="type-eyebrow link-line pb-1 text-ardesia hover:text-inchiostro">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* La casa */}
          <section id="descrizione" aria-labelledby="descrizione-title" className="mt-20">
            <h2 id="descrizione-title" className="type-eyebrow text-ardesia">
              La casa
            </h2>
            <div className="prose-immobilia mt-6">
              <p className="type-lead">{leadParagraph}</p>
              {paragraphs.map((text) => (
                <p key={text.slice(0, 24)} className="text-inchiostro/85">
                  {text}
                </p>
              ))}
            </div>
          </section>

          {/* Perché ci piace */}
          <section aria-labelledby="perche-title" className="mt-20 bg-istria px-6 py-10 md:px-10 md:py-12">
            <h2 id="perche-title" className="type-eyebrow flex items-center gap-3 text-ardesia">
              <PortaAccesa className="text-bronzo" />
              Perché ci piace
            </h2>
            <ol className="mt-8 grid gap-7">
              {p.whyWeLikeIt.map((reason, i) => (
                <li key={reason} className="grid grid-cols-[2rem_1fr] gap-3">
                  <span className="type-num font-serif text-lg italic text-ardesia">{i + 1}.</span>
                  <p className="font-serif text-[1.35rem] italic leading-snug">{reason}</p>
                </li>
              ))}
            </ol>
            <p className="type-meta mt-8 text-ardesia">— {agency.founder}</p>
          </section>

          {/* Cose da sapere */}
          <section id="cose-da-sapere" aria-labelledby="sapere-title" className="mt-20">
            <h2 id="sapere-title" className="type-h2">
              Cose da sapere
            </h2>
            <p className="mt-4 max-w-xl text-ardesia">
              Quello che di solito si scopre dopo. Preferiamo dirvelo prima: vi risparmia visite inutili e a noi fa arrivare
              le persone giuste.
            </p>
            <ThingsToKnowList items={p.thingsToKnow} className="mt-10" />
          </section>

          {/* Planimetria */}
          <section id="planimetria" aria-labelledby="planimetria-title" className="mt-20">
            <div className="flex flex-wrap items-baseline justify-between gap-4">
              <h2 id="planimetria-title" className="type-h2">
                Planimetria
              </h2>
              <p className="type-meta text-ardesia">Ridisegnata da noi · indicativa, non in scala esecutiva</p>
            </div>
            <div className="mt-10 border border-inchiostro/15 bg-calce-2 p-4 md:p-8">
              <FloorPlan levels={p.plan} title={p.title} />
            </div>
          </section>

          {/* Dettagli tecnici */}
          <section id="dettagli" aria-labelledby="dettagli-title" className="mt-20">
            <h2 id="dettagli-title" className="type-h2">
              Dettagli tecnici
            </h2>
            <dl className="mt-10 grid border-t border-inchiostro/15">
              {specs.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[minmax(0,9rem)_1fr] gap-4 border-b border-inchiostro/15 py-4 sm:grid-cols-[14rem_1fr]">
                  <dt className="text-ardesia">{label}</dt>
                  <dd className="type-num">{value}</dd>
                </div>
              ))}
            </dl>
          </section>

          {/* La zona */}
          {zone && (
            <section id="zona" aria-labelledby="zona-title" className="mt-20">
              <p className="type-eyebrow text-ardesia">La zona</p>
              <h2 id="zona-title" className="type-h2 mt-4">
                {zone.name}, {p.microZone}
              </h2>
              <p className="type-lead mt-5 max-w-2xl text-ardesia">{zone.intro}</p>

              <div className="mt-10 grid gap-10 md:grid-cols-2">
                <div>
                  <h3 className="type-eyebrow flex items-center gap-2 text-ardesia">
                    <Icon name="vaporetto" className="size-5" /> Vaporetto
                  </h3>
                  <p className="type-h3 mt-4">{p.vaporetto.stop}</p>
                  <p className="type-meta type-num mt-2 text-ardesia">
                    {p.vaporetto.minutes} minuti a piedi · linee {p.vaporetto.lines.join(', ')}
                  </p>
                </div>
                <div>
                  <h3 className="type-eyebrow flex items-center gap-2 text-ardesia">
                    <Icon name="clock" className="size-5" /> A pochi minuti
                  </h3>
                  <ul className="mt-4 grid gap-2">
                    {p.proximity.map((item) => (
                      <li key={item.label} className="flex items-baseline justify-between gap-4 border-b border-inchiostro/10 pb-2">
                        <span>{item.label}</span>
                        <span className="type-meta type-num shrink-0 text-ardesia">
                          {item.minutes} min {item.mode}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <p className="mt-10 flex max-w-2xl gap-4 border-l border-inchiostro/25 pl-5 text-ardesia">
                <Icon name="acqua" className="mt-0.5 size-5 shrink-0" />
                <span>{zone.water}</span>
              </p>
              <Link href={`/quartieri/${zone.slug}`} className="type-eyebrow group mt-10 inline-flex items-center gap-2">
                <span className="link-line pb-1">Leggi la guida di {zone.name}</span>
                <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </section>
          )}

          {/* Domanda veloce */}
          <section aria-labelledby="domanda-title" className="mt-20 border-t border-inchiostro/15 pt-12">
            <div className="grid gap-10 md:grid-cols-5">
              <div className="md:col-span-2">
                <h2 id="domanda-title" className="type-h3">
                  Avete una domanda su questa casa?
                </h2>
                <p className="mt-4 text-ardesia">Scriveteci: risponde {agency.founder}, di persona.</p>
              </div>
              <div className="md:col-span-3">
                <QuickQuestionForm slug={p.slug} />
              </div>
            </div>
          </section>
        </div>

        <div className="lg:col-span-4 lg:col-start-9">
          <div className="lg:sticky lg:top-28">
            <PropertyEnquiry
              slug={p.slug}
              title={p.title}
              reference={p.ref}
              price={p.price}
              area={p.area.commercial}
              availability={p.availability}
            />
          </div>
        </div>
      </div>

      {similar.length > 0 && (
        <section aria-labelledby="simili-title" className="bg-calce-2 py-20 md:py-28">
          <div className="wrap">
            <p className="type-eyebrow text-ardesia">Potrebbe interessarvi anche</p>
            <h2 id="simili-title" className="type-h2 mt-4">
              Case simili
            </h2>
            <ul className="mt-14 grid gap-14 md:grid-cols-3 md:gap-8 lg:gap-10">
              {similar.map((s) => (
                <li key={s.slug}>
                  <PropertyCard p={toCardData(s)} />
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <JsonLd
        data={[
          propertyJsonLd(p),
          breadcrumbJsonLd([
            { name: 'Immobili', path: '/immobili' },
            { name: zName, path: `/quartieri/${p.zone}` },
            { name: p.title, path: `/immobili/${p.slug}` },
          ]),
        ]}
      />
    </article>
  )
}
