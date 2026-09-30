import type { Metadata } from 'next'
import { SectionHeading } from '@/components/layout/Section'
import { ShortlistView } from '@/components/property/ShortlistView'
import { getProperties, toCompareData } from '@/lib/content'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Preferiti e confronto',
  description: 'Gli immobili che avete salvato, e un confronto fianco a fianco.',
  path: '/preferiti',
  noindex: true,
})

export default async function ShortlistPage() {
  const all = (await getProperties()).map(toCompareData)
  return (
    <>
      <section className="pb-14 pt-36 md:pt-44">
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="La vostra lista"
            title="Preferiti e confronto"
            lead="Le case che avete messo da parte. Quando siete pronti, prenotiamo le visite una dopo l’altra, nello stesso giorno."
          />
        </div>
      </section>
      <ShortlistView all={all} />
    </>
  )
}
