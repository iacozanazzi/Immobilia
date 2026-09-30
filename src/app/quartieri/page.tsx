import type { Metadata } from 'next'
import Link from 'next/link'
import { Section, SectionHeading } from '@/components/layout/Section'
import { LifestyleMatrix } from '@/components/neighborhood/LifestyleMatrix'
import { Icon } from '@/components/ui/Icon'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { countByZone, getNeighborhoods } from '@/lib/content'
import { formatNumber, pluralize } from '@/lib/format'
import { buildMetadata } from '@/lib/seo'
import { cn } from '@/lib/cn'

export const metadata: Metadata = buildMetadata({
  title: 'Quartieri di Venezia: guide per chi cerca casa',
  description:
    'Dorsoduro, Cannaregio, San Marco, Castello, San Polo, Santa Croce, Giudecca e Lido: carattere, servizi, vaporetti, acqua alta e prezzi indicativi al metro quadro.',
  path: '/quartieri',
})

export default async function NeighborhoodsPage() {
  const neighborhoods = await getNeighborhoods()
  const counts = countByZone()

  return (
    <>
      <section className="pb-16 pt-36 md:pt-44">
        <div className="wrap">
          <SectionHeading
            as="h1"
            eyebrow="Guide di zona"
            title="Otto Venezie"
            lead="Venezia non è una città sola. Ogni sestiere ha il suo carattere, la sua quota sull’acqua, il suo ritmo. Queste guide servono a capire dove vivreste meglio, prima ancora di cercare casa."
          />
        </div>
      </section>

      <div className="wrap pb-24">
        <ul className="grid gap-20 md:gap-28">
          {neighborhoods.map((n, i) => {
            const [min, max] = n.prices.ristrutturato
            return (
              <li key={n.slug} className="group relative grid gap-8 md:grid-cols-12 md:items-center md:gap-12">
                <ImageFrame
                  image={n.image}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  zoom
                  className={cn('aspect-[4/3] md:col-span-6', i % 2 === 1 && 'md:order-2 md:col-start-7')}
                />
                <div className={cn('md:col-span-5', i % 2 === 1 ? 'md:order-1 md:col-start-1' : 'md:col-start-8')}>
                  <p className="type-num font-serif text-sm italic text-ardesia">0{i + 1}</p>
                  <h2 className="type-h1 mt-3">
                    <Link href={`/quartieri/${n.slug}`} className="after:absolute after:inset-0">
                      {n.name}
                    </Link>
                  </h2>
                  <p className="type-lead mt-4 italic text-ardesia">{n.tagline}</p>
                  <p className="mt-5 text-ardesia">{n.intro}</p>
                  <p className="type-meta type-num mt-6 flex flex-wrap gap-x-4 gap-y-1 border-t border-inchiostro/15 pt-4 text-ardesia">
                    <span>
                      {formatNumber(min)}–{formatNumber(max)} €/m² ristrutturato
                    </span>
                    <span>{counts[n.slug] > 0 ? pluralize(counts[n.slug], 'casa in selezione', 'case in selezione') : 'Nessuna casa in selezione'}</span>
                  </p>
                  <span className="type-eyebrow mt-6 inline-flex items-center gap-2">
                    <span className="link-line pb-1">Leggi la guida</span>
                    <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </span>
                </div>
              </li>
            )
          })}
        </ul>
      </div>

      <Section tone="calce-2" labelledBy="matrice-title">
        <div className="wrap">
          <SectionHeading
            eyebrow="Strumento"
            title="Quale zona fa per voi?"
            lead="Scegliete cosa conta di più: la tabella si riordina e vi suggerisce da dove cominciare."
            id="matrice-title"
          />
          <div className="mt-14">
            <LifestyleMatrix zones={neighborhoods.map(({ slug, name, lifestyle }) => ({ slug, name, lifestyle }))} />
          </div>
        </div>
      </Section>
    </>
  )
}
