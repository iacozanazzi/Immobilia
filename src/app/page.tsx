import Link from 'next/link'
import { TestimonialQuote } from '@/components/editorial/TestimonialQuote'
import { SellerStart } from '@/components/forms/SellerStart'
import { Cornice } from '@/components/layout/Cornice'
import { Section, SectionHeading } from '@/components/layout/Section'
import { NeighborhoodCard } from '@/components/neighborhood/NeighborhoodCard'
import { PropertyCard } from '@/components/property/PropertyCard'
import { ThingsToKnowList } from '@/components/property/ThingsToKnow'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { ImageFrame } from '@/components/ui/ImageFrame'
import { homeCopy as c } from '@/content/copy'
import { testimonials } from '@/content/testimonials'
import { countByZone, getNeighborhoods, getProperties, getProperty, getSelection, toCardData, zoneName } from '@/lib/content'
import { formatArea, formatPrice } from '@/lib/format'

export default async function HomePage() {
  const [all, selection, neighborhoods, teaser] = await Promise.all([
    getProperties(),
    getSelection(c.selection.slugs),
    getNeighborhoods(),
    getProperty(c.hero.teaserSlug),
  ])
  const counts = countByZone()
  const [lead, ...others] = selection
  const sample = teaser ?? all[0]!

  return (
    <>
      {/* HERO ---------------------------------------------------------- */}
      <section aria-labelledby="hero-title" className="surface-dark relative isolate min-h-[100svh] overflow-hidden bg-notte-950">
        <ImageFrame image="soggiorno-luce" eager plainFallback sizes="100vw" className="absolute! inset-0 -z-10" imgClassName="scale-[1.02]" />
        <div
          aria-hidden
          className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(3_7_15/0.55)_0%,rgb(3_7_15/0.15)_35%,rgb(3_7_15/0.85)_100%)]"
        />
        <div className="wrap flex min-h-[100svh] flex-col justify-end pb-10 pt-32 md:pb-14">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-8">
              <p className="type-eyebrow text-peltro-300">{c.hero.eyebrow}</p>
              <h1 id="hero-title" className="type-display mt-6 text-argento">
                {c.hero.title[0]}
                <br />
                <em className="italic">{c.hero.title[1]}</em>
              </h1>
              <p className="type-lead mt-8 max-w-xl text-peltro-200">{c.hero.lead}</p>
              <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-5">
                <ButtonLink href="/immobili" tone="dark" size="lg">
                  {c.hero.primary}
                </ButtonLink>
                <ButtonLink href="/vendi" variant="ghost" tone="dark" className="type-eyebrow">
                  {c.hero.secondary}
                </ButtonLink>
              </div>
            </div>

            {teaser && (
              <Cornice tone="dark" as="aside" className="bg-notte-950/35 backdrop-blur-sm lg:col-span-4">
                <p className="type-eyebrow text-peltro-300">In evidenza · {zoneName(teaser.zone)}</p>
                <p className="type-h3 mt-4">
                  <Link href={`/immobili/${teaser.slug}`} className="link-line pb-1">
                    {teaser.title}
                  </Link>
                </p>
                <p className="type-meta type-num mt-4 text-peltro-300">
                  {formatArea(teaser.area.commercial)} · {teaser.rooms} locali · {formatPrice(teaser.price)}
                </p>
              </Cornice>
            )}
          </div>

          <dl className="mt-14 grid grid-cols-3 gap-4 border-t border-peltro-300/20 pt-6 text-peltro-300">
            {[
              [String(all.length), 'immobili in selezione'],
              [String(neighborhoods.length), 'zone che conosciamo a fondo'],
              ['1', 'referente fino al rogito'],
            ].map(([n, label]) => (
              <div key={label} className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-3">
                <dt className="sr-only">{label}</dt>
                <dd className="font-serif text-3xl text-argento type-num md:text-4xl">{n}</dd>
                <dd className="type-meta leading-snug">{label}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* I. MANIFESTO -------------------------------------------------- */}
      <Section labelledBy="manifesto-title">
        <div className="wrap">
          <p className="type-eyebrow flex items-center gap-4 text-ardesia">
            <span className="font-serif text-base italic tracking-normal normal-case">{c.manifesto.index}</span>
            <span aria-hidden className="h-px w-10 bg-inchiostro/25" />
            {c.manifesto.eyebrow}
          </p>
          <h2 id="manifesto-title" className="type-h1 reveal mt-8 max-w-5xl">
            {c.manifesto.statement}
          </h2>
          <div className="mt-16 grid gap-10 border-t border-inchiostro/15 pt-10 md:grid-cols-3 md:gap-12 lg:mt-24">
            {c.manifesto.pillars.map((pillar, i) => (
              <div key={pillar.title} className="reveal">
                <p className="type-meta type-num text-ardesia">0{i + 1}</p>
                <h3 className="type-h3 mt-3">{pillar.title}</h3>
                <p className="mt-4 max-w-sm text-ardesia">{pillar.text}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* II. SELEZIONE ------------------------------------------------- */}
      <Section tone="calce-2" labelledBy="selezione-title">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading index={c.selection.index} eyebrow={c.selection.eyebrow} title={c.selection.title} lead={c.selection.lead} id="selezione-title" />
            <ButtonLink href="/immobili" variant="ghost" className="type-eyebrow shrink-0">
              {c.selection.cta}
            </ButtonLink>
          </div>

          {lead && <PropertyCard p={toCardData(lead)} variant="feature" className="reveal mt-16 lg:mt-24" />}
          <div className="mt-20 grid gap-16 md:grid-cols-12 md:gap-10">
            {others.map((p, i) => (
              <PropertyCard
                key={p.slug}
                p={toCardData(p)}
                className={i === 0 ? 'reveal md:col-span-6 lg:col-span-5' : 'reveal md:col-span-6 lg:col-span-5 lg:col-start-8 lg:mt-32'}
              />
            ))}
          </div>
        </div>
      </Section>

      {/* III. PERCHÉ IMMOBILIA ----------------------------------------- */}
      <Section tone="notte" labelledBy="perche-title">
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-5">
            <SectionHeading index={c.why.index} eyebrow={c.why.eyebrow} title={c.why.title} tone="dark" id="perche-title" />
            <ul className="mt-12 grid gap-8">
              {c.why.points.map((point) => (
                <li key={point.title} className="reveal border-t border-peltro-300/20 pt-6">
                  <h3 className="type-h3 text-[1.45rem]!">{point.title}</h3>
                  <p className="mt-3 text-peltro-300">{point.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="lg:col-span-6 lg:col-start-7 lg:pt-24">
            <Cornice tone="dark" as="figure" className="reveal bg-notte-800/60">
              <figcaption className="type-eyebrow flex items-center justify-between gap-4 text-peltro-300">
                <span>{c.why.sampleLabel}</span>
                <span className="text-peltro-400">{sample.ref}</span>
              </figcaption>
              <p className="type-h3 mt-6">Cose da sapere</p>
              <p className="mt-2 font-serif italic text-peltro-300">{sample.title}</p>
              <ThingsToKnowList items={sample.thingsToKnow.slice(0, 3)} headingLevel="h4" className="mt-8 text-argento" />
              <Link
                href={`/immobili/${sample.slug}#cose-da-sapere`}
                className="type-eyebrow mt-8 inline-flex items-center gap-2 text-peltro-300 hover:text-argento"
              >
                Leggi la scheda completa <Icon name="arrow-right" className="size-4" />
              </Link>
            </Cornice>
          </div>
        </div>
      </Section>

      {/* IV. TERRITORIO ------------------------------------------------ */}
      <Section labelledBy="territorio-title">
        <div className="wrap">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <SectionHeading index={c.territory.index} eyebrow={c.territory.eyebrow} title={c.territory.title} lead={c.territory.lead} id="territorio-title" />
            <ButtonLink href="/quartieri" variant="ghost" className="type-eyebrow shrink-0">
              {c.territory.cta}
            </ButtonLink>
          </div>
        </div>
        <div className="no-scrollbar mt-16 overflow-x-auto scroll-smooth [scroll-padding-inline:1.25rem] snap-x snap-mandatory md:overflow-visible">
          <ul className="wrap flex gap-6 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-14 lg:grid-cols-4">
            {neighborhoods.map((n) => (
              <li key={n.slug} className="w-[72vw] shrink-0 snap-start sm:w-[44vw] md:w-auto">
                <NeighborhoodCard n={n} available={counts[n.slug]} />
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* V. PROPRIETARI ------------------------------------------------ */}
      <section aria-labelledby="vendi-title" className="surface-dark relative isolate overflow-hidden bg-notte-950 py-20 text-argento md:py-28 lg:py-32">
        <ImageFrame image="venezia-rio" plainFallback sizes="100vw" className="absolute! inset-0 -z-10 opacity-35" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-[linear-gradient(90deg,rgb(3_7_15/0.95)_0%,rgb(3_7_15/0.7)_60%,rgb(3_7_15/0.5)_100%)]" />
        <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-12">
          <div className="lg:col-span-7">
            <SectionHeading index={c.sellers.index} eyebrow={c.sellers.eyebrow} title={c.sellers.title} lead={c.sellers.lead} tone="dark" id="vendi-title" />
            <ul className="mt-10 grid gap-4 text-peltro-200">
              {c.sellers.points.map((point) => (
                <li key={point} className="flex items-center gap-4">
                  <Icon name="check" className="size-4 text-peltro-300" />
                  {point}
                </li>
              ))}
            </ul>
            <ButtonLink href="/vendi" variant="ghost" tone="dark" className="type-eyebrow mt-10">
              Come lavoriamo con chi vende
            </ButtonLink>
          </div>
          <div className="lg:col-span-4 lg:col-start-9 lg:self-end">
            <Cornice tone="dark" className="bg-notte-950/60 backdrop-blur-sm">
              <SellerStart title={c.sellers.formTitle} cta={c.sellers.cta} />
            </Cornice>
          </div>
        </div>
      </section>

      {/* VI. TESTIMONIANZA -------------------------------------------- */}
      <Section tone="istria" labelledBy="voci-title">
        <div className="wrap">
          <h2 id="voci-title" className="type-eyebrow text-ardesia">
            Chi ha comprato con noi
          </h2>
          <TestimonialQuote t={testimonials[0]!} className="reveal mt-10" />
        </div>
      </Section>

      {/* CHIUSURA ------------------------------------------------------ */}
      <Section labelledBy="chiusura-title" className="pb-24!">
        <h2 id="chiusura-title" className="sr-only">
          Come possiamo aiutarvi
        </h2>
        <div className="wrap grid gap-px bg-inchiostro/15 md:grid-cols-2">
          {[c.closing.buy, c.closing.sell].map((block) => (
            <div key={block.title} className="group relative flex flex-col bg-calce p-8 md:p-12 lg:p-16">
              <p className="type-eyebrow text-ardesia">{block.eyebrow}</p>
              <h3 className="type-h2 mt-5">{block.title}</h3>
              <p className="mt-5 max-w-md text-ardesia">{block.text}</p>
              <Link href={block.href} className="type-eyebrow mt-10 inline-flex items-center gap-3 after:absolute after:inset-0">
                <span className="link-line pb-1">{block.cta}</span>
                <Icon name="arrow-right" className="size-4 transition-transform duration-500 group-hover:translate-x-1" />
              </Link>
            </div>
          ))}
        </div>
      </Section>
    </>
  )
}
