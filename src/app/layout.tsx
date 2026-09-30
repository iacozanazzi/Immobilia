import type { Metadata, Viewport } from 'next'
import { EB_Garamond, Jost } from 'next/font/google'
import { SiteFooter } from '@/components/layout/SiteFooter'
import { SiteHeader } from '@/components/layout/SiteHeader'
import { CompareTray } from '@/components/property/CompareTray'
import { JsonLd } from '@/components/ui/JsonLd'
import { agency } from '@/content/agency'
import { agencyJsonLd, siteUrl } from '@/lib/seo'
import './globals.css'

const garamond = EB_Garamond({
  subsets: ['latin'],
  style: ['normal', 'italic'],
  variable: '--font-garamond',
  display: 'swap',
})

const jost = Jost({
  subsets: ['latin'],
  variable: '--font-jost',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: 'IMMOBILIA — Agenzia immobiliare boutique a Venezia',
    template: '%s · IMMOBILIA Venezia',
  },
  description:
    'IMMOBILIA di Francesco Casagrande: poche case a Venezia, scelte una a una e raccontate con onestà. Compravendite nei sestieri, alla Giudecca e al Lido.',
  applicationName: agency.legalName,
  authors: [{ name: agency.founder }],
  formatDetection: { telephone: false },
  openGraph: { siteName: agency.legalName, locale: 'it_IT', type: 'website' },
}

export const viewport: Viewport = {
  themeColor: '#061423',
  colorScheme: 'light',
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="it" className={`${garamond.variable} ${jost.variable}`}>
      <body>
        <a
          href="#contenuto"
          className="type-eyebrow fixed left-4 top-4 z-50 -translate-y-24 bg-notte-900 px-4 py-3 text-calce transition-transform focus:translate-y-0"
        >
          Vai al contenuto
        </a>
        <SiteHeader />
        <main id="contenuto">{children}</main>
        <SiteFooter />
        <CompareTray />
        <JsonLd data={agencyJsonLd()} />
      </body>
    </html>
  )
}
