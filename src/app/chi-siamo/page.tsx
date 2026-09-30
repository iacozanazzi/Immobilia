import type { Metadata } from 'next'
import { Cornice } from '@/components/layout/Cornice'
import { Section, SectionHeading } from '@/components/layout/Section'
import { ButtonLink } from '@/components/ui/Button'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { agency } from '@/content/agency'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Chi siamo',
  description: `${agency.legalName}: un’agenzia immobiliare piccola per scelta, a Venezia. Poche case alla volta, seguite di persona.`,
  path: '/chi-siamo',
})

const values = [
  { title: 'Selezione', text: 'Una ventina di case alla volta. Preferiamo dire di no a un incarico che seguirlo male.' },
  { title: 'Trasparenza', text: 'Scriviamo anche i difetti. Una trattativa che parte dalla verità arriva al rogito.' },
  { title: 'Territorio', text: 'Conosciamo le quote delle calli, gli orari dei vaporetti, i vicini di casa. Non si impara da un portale.' },
  { title: 'Relazione', text: 'Una sola persona dall’inizio alla fine, che risponde al telefono e si ricorda di voi.' },
]

const method = [
  'La visitiamo e la misuriamo, di persona, prima di accettarla.',
  'Il nostro tecnico verifica conformità urbanistica e catastale, APE e vincoli.',
  'Rileviamo la quota dell’ingresso e lo stato dell’edificio: tetto, facciata, lavori deliberati.',
  'Se non la compreremmo noi a quel prezzo, lo diciamo al proprietario. Anche a costo di perdere l’incarico.',
]

export default function AboutPage() {
  return (
    <>
      <section aria-labelledby="chi-title" className="surface-dark relative isolate overflow-hidden bg-notte-950 text-argento">
        <div aria-hidden className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_70%_70%_at_30%_40%,#001623_0%,#02000b_100%)]" />
        <div className="wrap grid min-h-[80svh] items-end gap-14 pb-16 pt-36 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <p className="type-eyebrow text-peltro-300">Chi siamo</p>
            <h1 id="chi-title" className="type-display mt-6">
              Un’agenzia piccola, <em>per scelta.</em>
            </h1>
            <p className="type-lead mt-8 max-w-xl text-peltro-200">
              IMMOBILIA è l’agenzia di {agency.founder}. Poche case alla volta, seguite di persona, in una città che
              conosciamo calle per calle.
            </p>
          </div>
          <Cornice tone="dark" as="figure" className="lg:col-span-4 lg:col-start-9">
            <div className="flex aspect-[4/5] items-center justify-center border border-dashed border-peltro-300/30 text-center">
              <p className="type-meta max-w-[14rem] text-peltro-300">
                Ritratto di {agency.founder}, da scattare con lo stesso fotografo degli immobili. Mai una foto di repertorio.
              </p>
            </div>
            <figcaption className="mt-5">
              <p className="font-serif text-xl">{agency.founder}</p>
              <p className="type-meta text-peltro-300">{agency.founderRole}</p>
            </figcaption>
          </Cornice>
        </div>
      </section>

      <Section labelledBy="lettera-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="type-eyebrow text-ardesia">Una lettera</p>
            <h2 id="lettera-title" className="type-h2 mt-5">
              Perché IMMOBILIA
            </h2>
            <p className="type-meta mt-6 inline-block border border-inchiostro/25 px-2 py-0.5 uppercase tracking-[0.18em]">Bozza di esempio</p>
          </div>
          <div className="prose-immobilia lg:col-span-7 lg:col-start-6">
            <p className="type-lead">
              Ho aperto IMMOBILIA perché a Venezia comprare casa è una scelta di vita prima che un investimento, e merita
              qualcuno che la tratti come tale.
            </p>
            <p className="text-inchiostro/85">
              Ogni casa che vedete qui l’ho visitata, misurata, discussa con il proprietario. Di ognuna so dirvi dove batte
              il sole a febbraio, quanto dista il vaporetto con le valigie, cosa succede quando la marea sale. E quando
              qualcosa non va, ve lo scrivo.
            </p>
            <p className="text-inchiostro/85">
              Seguo poche case per poterle seguire bene. È una scelta che si vede nelle fotografie, nei testi, nelle visite
              e, alla fine, nelle trattative che arrivano al rogito senza sorprese.
            </p>
            <p className="type-meta mt-8! text-ardesia">— {agency.founder}</p>
          </div>
        </div>
      </Section>

      <Section tone="calce-2" labelledBy="valori-title">
        <div className="wrap">
          <SectionHeading index="I" eyebrow="Quello in cui crediamo" title="Quattro regole, sempre." id="valori-title" />
          <ul className="mt-16 grid gap-12 border-t border-inchiostro/15 pt-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
            {values.map((v) => (
              <li key={v.title} className="reveal">
                <h3 className="type-h3">{v.title}</h3>
                <p className="mt-4 text-ardesia">{v.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="notte" labelledBy="metodo-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading index="II" eyebrow="Il metodo" title="Come scegliamo una casa" tone="dark" id="metodo-title" />
          </div>
          <ol className="grid gap-0 lg:col-span-6 lg:col-start-7">
            {method.map((m, i) => (
              <li key={m} className="grid grid-cols-[3rem_1fr] gap-4 border-t border-peltro-300/20 py-7">
                <span className="type-num font-serif text-lg italic text-peltro-400">0{i + 1}</span>
                <p className="type-lead text-argento">{m}</p>
              </li>
            ))}
          </ol>
        </div>
      </Section>

      <Section labelledBy="sede-title">
        <div className="wrap grid gap-12 lg:grid-cols-12 lg:items-center">
          <ImageFrame image="venezia-luce" sizes="(min-width: 1024px) 50vw, 100vw" className="aspect-[4/3] lg:col-span-6" />
          <div className="lg:col-span-5 lg:col-start-8">
            <p className="type-eyebrow text-ardesia">La sede</p>
            <h2 id="sede-title" className="type-h2 mt-5">
              Venite a trovarci
            </h2>
            <p className="mt-6 text-ardesia">
              Riceviamo su appuntamento, per potervi dedicare il tempo che serve. Portate le vostre domande: su una casa, su
              una zona, su come si vive davvero a Venezia.
            </p>
            <dl className="type-meta mt-8 grid gap-2 text-ardesia">
              <div>
                <dt className="sr-only">Iscrizioni</dt>
                <dd>{agency.legal.register}</dd>
              </div>
              <div>
                <dt className="sr-only">Partita IVA</dt>
                <dd>
                  {agency.legal.vat} · {agency.legal.rea}
                </dd>
              </div>
            </dl>
            <ButtonLink href="/contatti" className="mt-10">
              Fissa un appuntamento
            </ButtonLink>
          </div>
        </div>
      </Section>
    </>
  )
}
