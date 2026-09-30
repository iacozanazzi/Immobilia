import type { Metadata } from 'next'
import { Suspense } from 'react'
import { Faq } from '@/components/editorial/Faq'
import { ProcessSteps } from '@/components/editorial/ProcessSteps'
import { TestimonialQuote } from '@/components/editorial/TestimonialQuote'
import { ValuationFromQuery } from '@/components/forms/ValuationFromQuery'
import { ValuationWizard } from '@/components/forms/ValuationWizard'
import { Cornice } from '@/components/layout/Cornice'
import { Section, SectionHeading } from '@/components/layout/Section'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { agency } from '@/content/agency'
import { sellCopy as c } from '@/content/copy'
import { testimonials } from '@/content/testimonials'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Vendere casa a Venezia',
  description:
    'Valutazione scritta e motivata, fotografia professionale, planimetria ridisegnata, visite con acquirenti selezionati e report puntuali. Vendete casa a Venezia con IMMOBILIA.',
  path: '/vendi',
})

export default function SellPage() {
  const sellerVoices = testimonials.filter((t) => t.kind === 'vendita')

  return (
    <>
      <section aria-labelledby="vendi-title" className="surface-dark relative isolate overflow-hidden bg-notte-950 text-argento">
        <ImageFrame image="venezia-canal-grande" eager plainFallback sizes="100vw" className="absolute! inset-0 -z-10 opacity-60" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(3_7_15/0.6)_0%,rgb(3_7_15/0.35)_40%,rgb(3_7_15/0.92)_100%)]" />
        <div className="wrap flex min-h-[88svh] flex-col justify-end pb-12 pt-36 md:pb-16">
          <p className="type-eyebrow text-peltro-300">{c.hero.eyebrow}</p>
          <h1 id="vendi-title" className="type-display mt-6 max-w-5xl text-[clamp(2.5rem,1.3rem+4.4vw,5.75rem)]!">
            {c.hero.title}
          </h1>
          <p className="type-lead mt-8 max-w-2xl text-peltro-200">{c.hero.lead}</p>
          <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
            <ButtonLink href="#valutazione" tone="dark" size="lg">
              {c.hero.primary}
            </ButtonLink>
            <a href={agency.phone.href} className="type-eyebrow group inline-flex items-center gap-3">
              <Icon name="phone" className="size-4" />
              <span className="link-line pb-1">{c.hero.secondary}</span>
            </a>
          </div>
          <dl className="mt-16 grid grid-cols-3 gap-4 border-t border-peltro-300/20 pt-6 text-peltro-300">
            {c.commitments.map(([n, label]) => (
              <div key={label} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
                <dt className="sr-only">{label}</dt>
                <dd className="type-num font-serif text-3xl text-argento md:text-4xl">{n}</dd>
                <dd className="type-meta leading-snug">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <Section labelledBy="vantaggi-title">
        <div className="wrap">
          <SectionHeading index="I" eyebrow={c.benefits.eyebrow} title={c.benefits.title} id="vantaggi-title" />
          <ul className="mt-16 grid gap-x-12 gap-y-14 border-t border-inchiostro/15 pt-12 md:grid-cols-2 lg:grid-cols-3">
            {c.benefits.items.map((item, i) => (
              <li key={item.title} className="reveal">
                <p className="type-num font-serif text-sm italic text-ardesia">0{i + 1}</p>
                <h3 className="type-h3 mt-3">{item.title}</h3>
                <p className="mt-4 text-ardesia">{item.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section tone="notte" labelledBy="processo-title">
        <div className="wrap">
          <SectionHeading index="II" eyebrow={c.process.eyebrow} title={c.process.title} tone="dark" id="processo-title" />
          <div className="mt-16 md:mt-24">
            <ProcessSteps steps={c.process.steps} />
          </div>
        </div>
      </Section>

      <Section tone="calce-2" labelledBy="differenza-title">
        <div className="wrap">
          <SectionHeading index="III" eyebrow={c.compare.eyebrow} title={c.compare.title} id="differenza-title" />
          <div className="mt-16 grid gap-px bg-inchiostro/15 md:grid-cols-2">
            {[c.compare.standard, c.compare.immobilia].map((col, k) => (
              <div key={col.label} className={k === 0 ? 'bg-calce-2 p-8 md:p-12' : 'surface-dark bg-notte-900 p-8 text-argento md:p-12'}>
                <h3 className={k === 0 ? 'type-eyebrow text-ardesia' : 'type-eyebrow text-peltro-300'}>{col.label}</h3>
                <ul className="mt-8 grid gap-4">
                  {col.items.map((item) => (
                    <li key={item} className="flex items-start gap-4">
                      <Icon name={k === 0 ? 'minus' : 'check'} className={k === 0 ? 'mt-1 size-4 shrink-0 text-ardesia' : 'mt-1 size-4 shrink-0 text-peltro-300'} />
                      <span className={k === 0 ? 'text-ardesia' : ''}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section tone="istria" labelledBy="voci-vendita-title">
        <div className="wrap">
          <h2 id="voci-vendita-title" className="type-eyebrow text-ardesia">
            Chi ha venduto con noi
          </h2>
          <div className="mt-10 grid gap-16 lg:grid-cols-2 lg:gap-12">
            {sellerVoices.map((t) => (
              <TestimonialQuote key={t.author} t={t} size="md" className="reveal" />
            ))}
          </div>
        </div>
      </Section>

      <Section id="valutazione" labelledBy="valutazione-title">
        <div className="wrap grid gap-14 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-4">
            <SectionHeading index="IV" eyebrow={c.valuation.eyebrow} title={c.valuation.title} lead={c.valuation.lead} id="valutazione-title" />
            <ul className="mt-10 grid gap-3 text-ardesia">
              {c.valuation.promise.map((item) => (
                <li key={item} className="flex items-center gap-3">
                  <Icon name="check" className="size-4" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <Cornice className="lg:col-span-7 lg:col-start-6">
            <Suspense fallback={<ValuationWizard />}>
              <ValuationFromQuery />
            </Suspense>
          </Cornice>
        </div>
      </Section>

      <Section tone="calce-2" labelledBy="faq-title">
        <div className="wrap grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading eyebrow="Domande frequenti" title="Prima di iniziare" id="faq-title" />
          </div>
          <Faq items={c.faq} className="lg:col-span-7 lg:col-start-6" />
        </div>
      </Section>
    </>
  )
}
