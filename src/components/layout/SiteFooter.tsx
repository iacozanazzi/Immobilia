import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { PreviewSignup } from '@/components/forms/PreviewSignup'
import { agency } from '@/content/agency'
import { neighborhoods } from '@/content/neighborhoods'

const agencyLinks = [
  { href: '/immobili', label: 'Tutti gli immobili' },
  { href: '/vendi', label: 'Vendi con noi' },
  { href: '/vendi#valutazione', label: 'Richiedi una valutazione' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/preferiti', label: 'Preferiti e confronto' },
  { href: '/contatti', label: 'Contatti' },
]

export function SiteFooter() {
  const year = new Date().getFullYear()
  return (
    <footer className="surface-dark relative overflow-hidden bg-notte-950 text-argento">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_50%_0%,#001623_0%,transparent_70%)]"
      />
      <div className="wrap relative">
        <div className="grid gap-16 border-b border-peltro-300/15 py-20 lg:grid-cols-12 lg:gap-10 lg:py-28">
          <div className="lg:col-span-5">
            <Logo variant="full" tone="light" className="w-64 max-w-full md:w-80" />
            <p className="type-lead mt-10 max-w-md text-peltro-300">
              Le nuove case, prima che siano online. Una email quando entra un immobile che vale la pena vedere, niente di
              più.
            </p>
            <div className="mt-8 max-w-md">
              <PreviewSignup />
            </div>
          </div>

          <nav aria-label="Zone" className="lg:col-span-2 lg:col-start-7">
            <h2 className="type-eyebrow text-peltro-400">Le zone</h2>
            <ul className="mt-6 grid gap-3">
              {neighborhoods.map((n) => (
                <li key={n.slug}>
                  <Link href={`/quartieri/${n.slug}`} className="link-line pb-0.5 text-peltro-300 hover:text-argento">
                    {n.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Agenzia" className="lg:col-span-2">
            <h2 className="type-eyebrow text-peltro-400">Agenzia</h2>
            <ul className="mt-6 grid gap-3">
              {agencyLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="link-line pb-0.5 text-peltro-300 hover:text-argento">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-2">
            <h2 className="type-eyebrow text-peltro-400">Contatti</h2>
            <address className="mt-6 grid gap-3 not-italic text-peltro-300">
              <span>
                {agency.address.street}
                <br />
                {agency.address.postalCode} {agency.address.city}
              </span>
              <span className="text-sm text-peltro-400">{agency.address.note}</span>
              <a href={agency.phone.href} className="link-line justify-self-start pb-0.5 hover:text-argento">
                {agency.phone.label}
              </a>
              <a href={agency.email.href} className="link-line justify-self-start pb-0.5 hover:text-argento">
                {agency.email.label}
              </a>
              <a href={agency.whatsapp.href} className="link-line justify-self-start pb-0.5 hover:text-argento">
                WhatsApp
              </a>
            </address>
            <dl className="mt-8 grid gap-2 text-sm text-peltro-400">
              {agency.hours.map((h) => (
                <div key={h.days}>
                  <dt className="text-peltro-300">{h.days}</dt>
                  <dd>{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="flex flex-col gap-6 py-10 text-sm text-peltro-400 md:flex-row md:items-end md:justify-between">
          <div className="grid gap-1">
            <p>
              © {year} {agency.legalName} · {agency.legal.vat} · {agency.legal.rea}
            </p>
            <p>{agency.legal.register}</p>
            <p className="text-peltro-500">
              Concept di progetto: immobili, prezzi e testimonianze sono esempi, non offerte reali.
            </p>
          </div>
          <ul className="flex flex-wrap gap-6">
            <li>
              <Link href="/privacy" className="link-line pb-0.5 hover:text-argento">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/cookie" className="link-line pb-0.5 hover:text-argento">
                Cookie
              </Link>
            </li>
            {agency.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="link-line pb-0.5 hover:text-argento" rel="noopener" target="_blank">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  )
}
