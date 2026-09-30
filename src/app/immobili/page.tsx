import type { Metadata } from 'next'
import { Suspense } from 'react'
import { CustomSearchForm } from '@/components/forms/CustomSearchForm'
import { Section, SectionHeading } from '@/components/layout/Section'
import { PropertyExplorer } from '@/components/property/PropertyExplorer'
import { GalleryResults } from '@/components/property/PropertyResults'
import { getNeighborhoods, getProperties, toCardData } from '@/lib/content'
import { formatDate } from '@/lib/format'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Case in vendita a Venezia',
  description:
    'La selezione di IMMOBILIA: appartamenti, ultimi piani con altana, case con corte e ville al Lido. Ogni immobile visitato, misurato e raccontato con le sue “cose da sapere”.',
  path: '/immobili',
})

export default async function PropertiesPage() {
  const [properties, neighborhoods] = await Promise.all([getProperties(), getNeighborhoods()])
  const items = properties.map(toCardData)
  const zones = neighborhoods.map(({ slug, name, tagline }) => ({ slug, name, tagline }))
  const lastUpdate = formatDate(properties.reduce((max, p) => (p.publishedAt > max ? p.publishedAt : max), ''))

  const emptyState = (
    <div className="grid gap-6 border-y border-inchiostro/15 py-16 md:grid-cols-12">
      <p className="type-h2 md:col-span-7">Nessuna casa corrisponde, per ora.</p>
      <div className="md:col-span-5">
        <p className="text-ardesia">
          Molte case passano da noi prima di essere pubblicate. Diteci cosa cercate: se arriva, siete i primi a saperlo.
        </p>
        <a href="#su-misura" className="type-eyebrow link-line mt-6 inline-block pb-1">
          Affidateci la ricerca
        </a>
      </div>
    </div>
  )

  return (
    <>
      <section className="pb-10 pt-36 md:pt-44">
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="Case in vendita a Venezia"
            title="La selezione"
            lead={
              <>
                {items.length} case, scelte una a una. Per ognuna trovate anche ciò che di solito si scopre dopo: la quota
                dell’acqua, le scale, i lavori in programma.
              </>
            }
          />
          <p className="type-meta mt-6 text-ardesia">Aggiornata il {lastUpdate}</p>
        </div>
      </section>

      <div className="wrap pb-24 md:pb-32">
        <Suspense fallback={<GalleryResults items={items} />}>
          <PropertyExplorer items={items} zones={zones} emptyState={emptyState} />
        </Suspense>
      </div>

      <Section tone="calce-2" id="su-misura" labelledBy="su-misura-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading
              eyebrow="Ricerca su misura"
              title="Non avete trovato quello che cercate?"
              lead="Raccontateci la casa giusta per voi. La cerchiamo anche tra quelle non ancora pubblicate, e vi scriviamo solo quando ne vale la pena."
              id="su-misura-title"
            />
          </div>
          <div className="lg:col-span-7 lg:col-start-6">
            <CustomSearchForm />
          </div>
        </div>
      </Section>
    </>
  )
}
