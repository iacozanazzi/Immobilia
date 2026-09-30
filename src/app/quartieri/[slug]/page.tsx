import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CustomSearchForm } from '@/components/forms/CustomSearchForm'
import { Cornice } from '@/components/layout/Cornice'
import { Section, SectionHeading } from '@/components/layout/Section'
import { RatingSquares } from '@/components/neighborhood/Ratings'
import { PropertyCard } from '@/components/property/PropertyCard'
import { Icon } from '@/components/ui/Icon'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { JsonLd } from '@/components/ui/JsonLd'
import { agency } from '@/content/agency'
import { photo } from '@/content/media'
import { LIFESTYLE_LABEL, type LifestyleKey } from '@/content/types'
import { getNeighborhood, getNeighborhoods, getPropertiesByZone, toCardData } from '@/lib/content'
import { formatNumber } from '@/lib/format'
import { breadcrumbJsonLd, buildMetadata, neighborhoodJsonLd } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false

export async function generateStaticParams() {
  return (await getNeighborhoods()).map((n) => ({ slug: n.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const n = await getNeighborhood(slug)
  if (!n) return {}
  return buildMetadata({
    title: `Vivere a ${n.name}, Venezia: guida e case in vendita`,
    description: `${n.intro} Servizi, vaporetti, acqua alta e prezzi indicativi al m² a ${n.name}.`,
    path: `/quartieri/${n.slug}`,
    image: photo(n.image).src,
  })
}

/** Scala comune a tutte le zone, così le barre dei prezzi sono confrontabili. */
const SCALE_MIN = 2500
const SCALE_MAX = 14000

export default async function NeighborhoodPage({ params }: Props) {
  const { slug } = await params
  const n = await getNeighborhood(slug)
  if (!n) notFound()
  const [all, available] = await Promise.all([getNeighborhoods(), getPropertiesByZone(n.slug)])
  const others = all.filter((z) => z.slug !== n.slug)

  const bands: Array<[string, [number, number]]> = [
    ['Da ristrutturare', n.prices.daRistrutturare],
    ['Ristrutturato', n.prices.ristrutturato],
    ['Di pregio', n.prices.pregio],
  ]

  return (
    <>
      <section aria-labelledby="zona-title" className="surface-dark relative isolate overflow-hidden bg-notte-950 text-argento">
        <ImageFrame image={n.image} eager plainFallback sizes="100vw" className="absolute! inset-0 -z-10 opacity-70" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(3_7_15/0.55)_0%,rgb(3_7_15/0.2)_40%,rgb(3_7_15/0.9)_100%)]" />
        <div className="wrap flex min-h-[80svh] flex-col justify-end pb-14 pt-36">
          <nav aria-label="Percorso" className="type-meta text-peltro-300">
            <Link href="/quartieri" className="hover:text-argento hover:underline">
              Guide di zona
            </Link>{' '}
            / <span aria-current="page">{n.name}</span>
          </nav>
          <h1 id="zona-title" className="type-display mt-8">
            {n.name}
          </h1>
          <p className="type-lead mt-6 max-w-2xl italic text-peltro-200">{n.tagline}</p>
        </div>
      </section>

      <Section labelledBy="panoramica-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow text-ardesia">Panoramica</p>
            <h2 id="panoramica-title" className="type-h2 mt-5">
              {n.intro}
            </h2>
            <div className="prose-immobilia mt-10 text-inchiostro/85">
              {n.overview.map((text) => (
                <p key={text.slice(0, 24)}>{text}</p>
              ))}
            </div>
          </div>
          <Cornice as="aside" className="self-start lg:col-span-4 lg:col-start-9">
            <h3 className="type-eyebrow text-ardesia">In breve</h3>
            <ul className="mt-5 grid gap-2">
              {n.character.map((c) => (
                <li key={c} className="font-serif text-lg leading-snug">
                  {c}
                </li>
              ))}
            </ul>
            <h3 className="type-eyebrow mt-8 text-ardesia">Ideale per</h3>
            <ul className="mt-4 grid gap-2 text-ardesia">
              {n.idealFor.map((c) => (
                <li key={c} className="flex gap-3">
                  <Icon name="check" className="mt-1 size-4 shrink-0" />
                  {c}
                </li>
              ))}
            </ul>
            <dl className="mt-8 grid gap-3 border-t border-inchiostro/15 pt-6">
              {(Object.keys(LIFESTYLE_LABEL) as LifestyleKey[]).map((k) => (
                <div key={k} className="flex items-center justify-between gap-4">
                  <dt className="type-meta text-ardesia">{LIFESTYLE_LABEL[k].label}</dt>
                  <dd>
                    <RatingSquares value={n.lifestyle[k]} label={LIFESTYLE_LABEL[k].label} />
                  </dd>
                </div>
              ))}
            </dl>
            <p className="type-meta mt-4 text-ardesia">Il nostro giudizio, da 1 a 5.</p>
          </Cornice>
        </div>
      </Section>

      <Section tone="calce-2" labelledBy="vita-title">
        <div className="wrap">
          <h2 id="vita-title" className="sr-only">
            Vivere a {n.name}
          </h2>
          <div className="grid gap-14 md:grid-cols-2 lg:grid-cols-3 lg:gap-12">
            <div>
              <h3 className="type-eyebrow text-ardesia">La vita di ogni giorno</h3>
              <ul className="mt-6 grid gap-4">
                {n.dailyLife.map((item) => (
                  <li key={item} className="border-t border-inchiostro/15 pt-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="type-eyebrow flex items-center gap-2 text-ardesia">
                <Icon name="vaporetto" className="size-5" /> Come ci si muove
              </h3>
              <ul className="mt-6 grid gap-4">
                {n.gettingAround.map((item) => (
                  <li key={item} className="border-t border-inchiostro/15 pt-4">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:col-span-2 lg:col-span-1">
              <h3 className="type-eyebrow text-ardesia">Da conoscere</h3>
              <ul className="mt-6 grid gap-4">
                {n.landmarks.map((l) => (
                  <li key={l.name} className="border-t border-inchiostro/15 pt-4">
                    <p className="font-serif text-lg">{l.name}</p>
                    <p className="type-meta text-ardesia">{l.note}</p>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-20 grid gap-px bg-inchiostro/15 md:grid-cols-2">
            <div className="bg-calce-2 p-8 md:p-10">
              <h3 className="type-h3">Perché sceglierla</h3>
              <ul className="mt-6 grid gap-3">
                {n.pros.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Icon name="check" className="mt-1 size-4 shrink-0 text-ardesia" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-calce-2 p-8 md:p-10">
              <h3 className="type-h3">Da mettere in conto</h3>
              <ul className="mt-6 grid gap-3">
                {n.particulars.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Icon name="minus" className="mt-1 size-4 shrink-0 text-ardesia" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </Section>

      <Section labelledBy="prezzi-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading
              eyebrow="Mercato"
              title={`Quanto costa vivere a ${n.name}`}
              lead="Fasce indicative di prezzo al metro quadro commerciale, per stato dell’immobile."
              id="prezzi-title"
            />
            <p className="mt-10 flex gap-4 border-l border-inchiostro/25 pl-5 text-ardesia">
              <Icon name="acqua" className="mt-0.5 size-5 shrink-0" />
              <span>
                <strong className="font-medium text-inchiostro">Acqua alta. </strong>
                {n.water}
              </span>
            </p>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <dl className="grid gap-8">
              {bands.map(([label, [min, max]]) => {
                const left = ((min - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100
                const width = ((max - min) / (SCALE_MAX - SCALE_MIN)) * 100
                return (
                  <div key={label} className="grid grid-cols-[1fr_auto] items-baseline gap-x-4">
                    <dt className="type-eyebrow text-ardesia">{label}</dt>
                    <dd className="type-num font-serif text-2xl">
                      {formatNumber(min)} – {formatNumber(max)} €/m²
                    </dd>
                    <dd aria-hidden className="relative col-span-2 mt-3 h-px bg-inchiostro/15">
                      <span className="absolute -top-[3px] h-[7px] bg-inchiostro" style={{ left: `${left}%`, width: `${width}%` }} />
                    </dd>
                  </div>
                )
              })}
            </dl>
            <p className="type-meta mt-6 flex justify-between text-ardesia" aria-hidden>
              <span>{formatNumber(SCALE_MIN)} €/m²</span>
              <span>{formatNumber(SCALE_MAX)} €/m²</span>
            </p>
            <p className="type-meta mt-6 text-ardesia">
              Stime IMMOBILIA su osservazione del mercato. Dati di esempio: prima della pubblicazione vanno validati con le
              quotazioni OMI dell’Agenzia delle Entrate e con le compravendite recenti.
            </p>
          </div>
        </div>
      </Section>

      <Section tone="calce-2" labelledBy="case-zona-title">
        <div className="wrap">
          <SectionHeading eyebrow="In selezione" title={`Le case di ${n.name}`} id="case-zona-title" />
          {available.length > 0 ? (
            <ul className="mt-14 grid gap-14 md:grid-cols-2 md:gap-x-8 lg:grid-cols-3 lg:gap-x-10">
              {available.map((p) => (
                <li key={p.slug}>
                  <PropertyCard p={toCardData(p)} />
                </li>
              ))}
            </ul>
          ) : (
            <p className="mt-10 max-w-xl text-ardesia">
              In questo momento non abbiamo case in selezione a {n.name}. Lasciateci i vostri criteri qui sotto: vi scriviamo
              quando entra quella giusta.
            </p>
          )}
        </div>
      </Section>

      <Section labelledBy="calli-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <p className="type-eyebrow text-ardesia">Il punto di vista di chi ci vive</p>
            <h2 id="calli-title" className="type-h2 mt-5">
              Le calli di Francesco
            </h2>
            <div className="mt-8 border border-dashed border-inchiostro/30 p-6">
              <p className="font-serif text-lg italic text-ardesia">
                Spazio riservato a {agency.founder}: la calle che preferisce, il bacaro dove si ferma, l’ora in cui il campo
                è più bello. Va scritto di suo pugno. È il contenuto che nessuno può copiare.
              </p>
            </div>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="type-eyebrow text-ardesia">Avvisatemi</p>
            <h3 className="type-h3 mt-4">Volete vivere a {n.name}?</h3>
            <p className="mt-3 text-ardesia">Diteci cosa cercate: vi scriviamo quando arriva la casa giusta, spesso prima che sia online.</p>
            <div className="mt-10">
              <CustomSearchForm defaultZone={n.slug} />
            </div>
          </div>
        </div>
      </Section>

      <nav aria-label="Altre zone" className="border-t border-inchiostro/15 bg-calce py-14">
        <div className="wrap">
          <p className="type-eyebrow text-ardesia">Altre zone</p>
          <ul className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
            {others.map((z) => (
              <li key={z.slug}>
                <Link href={`/quartieri/${z.slug}`} className="type-h3 link-line pb-0.5 text-[1.4rem]!">
                  {z.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <JsonLd
        data={[
          neighborhoodJsonLd(n),
          breadcrumbJsonLd([
            { name: 'Guide di zona', path: '/quartieri' },
            { name: n.name, path: `/quartieri/${n.slug}` },
          ]),
        ]}
      />
    </>
  )
}
