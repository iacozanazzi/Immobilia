import type { Metadata } from 'next'
import Link from 'next/link'
import { ContactForm } from '@/components/forms/ContactForm'
import { Cornice } from '@/components/layout/Cornice'
import { SectionHeading } from '@/components/layout/Section'
import { Icon } from '@/components/ui/Icon'
import { agency } from '@/content/agency'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Contatti',
  description: `Telefono, WhatsApp, email e sede di ${agency.legalName}, agenzia immobiliare a Venezia. Si riceve su appuntamento.`,
  path: '/contatti',
})

export default function ContactPage() {
  const channels = [
    { icon: 'phone', label: 'Telefono', value: agency.phone.label, href: agency.phone.href },
    { icon: 'chat', label: 'WhatsApp', value: 'Scriveteci quando volete', href: agency.whatsapp.href },
    { icon: 'mail', label: 'Email', value: agency.email.label, href: agency.email.href },
  ] as const

  return (
    <section className="pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="wrap grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <SectionHeading
            as="h1"
            eyebrow="Contatti"
            title="Parliamone."
            lead={`Per comprare, per vendere, o anche solo per un consiglio su una zona. Vi rispondiamo ${agency.responseTime}.`}
          />
          <ul className="mt-12 grid border-t border-inchiostro/15">
            {channels.map((c) => (
              <li key={c.label} className="border-b border-inchiostro/15">
                <a href={c.href} className="group flex items-center gap-5 py-5">
                  <Icon name={c.icon} className="size-5 text-ardesia" />
                  <span className="flex-1">
                    <span className="type-eyebrow block text-ardesia">{c.label}</span>
                    <span className="mt-1 block font-serif text-xl">{c.value}</span>
                  </span>
                  <Icon name="arrow-up-right" className="size-4 text-ardesia transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
          <Cornice className="mt-12">
            <h2 className="type-eyebrow flex items-center gap-2 text-ardesia">
              <Icon name="pin" className="size-4" /> La sede
            </h2>
            <address className="mt-4 font-serif text-xl not-italic leading-snug">
              {agency.address.street}
              <br />
              {agency.address.postalCode} {agency.address.city}
            </address>
            <p className="type-meta mt-2 text-ardesia">{agency.address.note}</p>
            <dl className="mt-6 grid gap-2">
              {agency.hours.map((h) => (
                <div key={h.days} className="flex flex-wrap justify-between gap-x-6">
                  <dt className="text-ardesia">{h.days}</dt>
                  <dd className="type-num">{h.time}</dd>
                </div>
              ))}
            </dl>
          </Cornice>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <h2 className="type-h3">Scriveteci</h2>
          <p className="mt-3 text-ardesia">
            Cercate una casa che non trovate online?{' '}
            <Link href="/immobili#su-misura" className="underline decoration-current/40 underline-offset-2 hover:text-inchiostro">
              Affidateci la ricerca
            </Link>
            .
          </p>
          <div className="mt-10">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  )
}
