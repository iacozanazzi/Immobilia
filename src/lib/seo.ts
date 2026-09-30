import type { Metadata } from 'next'
import { agency } from '@/content/agency'
import { photo } from '@/content/media'
import type { Neighborhood, Property } from '@/content/types'
import { zoneName } from './content'

export const siteUrl = agency.url.replace(/\/$/, '')

export function absoluteUrl(path = '/') {
  return `${siteUrl}${path.startsWith('/') ? path : `/${path}`}`
}

export function buildMetadata({
  title,
  description,
  path,
  image,
  noindex = false,
}: {
  title: string
  description: string
  path: string
  image?: string
  noindex?: boolean
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    robots: noindex ? { index: false, follow: true } : undefined,
    openGraph: {
      title,
      description,
      url: path,
      siteName: agency.legalName,
      locale: 'it_IT',
      type: 'website',
      ...(image ? { images: [{ url: `${image}?w=1200&h=630&fit=crop&auto=format`, width: 1200, height: 630 }] } : {}),
    },
    twitter: { card: 'summary_large_image', title, description },
  }
}

export function agencyJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateAgent',
    '@id': `${siteUrl}/#agenzia`,
    name: agency.legalName,
    url: siteUrl,
    logo: absoluteUrl('/brand/logo-full-dark.svg'),
    telephone: agency.phone.label,
    email: agency.email.label,
    founder: { '@type': 'Person', name: agency.founder },
    areaServed: { '@type': 'City', name: 'Venezia' },
    address: {
      '@type': 'PostalAddress',
      streetAddress: agency.address.street,
      postalCode: agency.address.postalCode,
      addressLocality: agency.address.city,
      addressCountry: 'IT',
    },
  }
}

export function propertyJsonLd(p: Property) {
  const url = absoluteUrl(`/immobili/${p.slug}`)
  return {
    '@context': 'https://schema.org',
    '@type': 'RealEstateListing',
    '@id': url,
    url,
    name: p.title,
    description: p.summary,
    datePosted: p.publishedAt,
    image: p.images.map((k) => photo(k).src),
    offers: {
      '@type': 'Offer',
      priceCurrency: 'EUR',
      ...(p.price !== null ? { price: p.price } : {}),
      availability: p.availability === 'disponibile' ? 'https://schema.org/InStock' : 'https://schema.org/LimitedAvailability',
      seller: { '@id': `${siteUrl}/#agenzia` },
    },
    about: {
      '@type': p.type === 'villa' || p.type === 'casa' ? 'SingleFamilyResidence' : 'Apartment',
      numberOfRooms: p.rooms,
      numberOfBedrooms: p.bedrooms,
      numberOfBathroomsTotal: p.bathrooms,
      floorSize: { '@type': 'QuantitativeValue', value: p.area.commercial, unitCode: 'MTK' },
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Venezia',
        addressRegion: 'VE',
        addressCountry: 'IT',
        streetAddress: `${p.microZone}, ${zoneName(p.zone)}`,
      },
    },
  }
}

export function neighborhoodJsonLd(n: Neighborhood) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Place',
    name: `${n.name}, Venezia`,
    description: n.intro,
    url: absoluteUrl(`/quartieri/${n.slug}`),
    containedInPlace: { '@type': 'City', name: 'Venezia' },
  }
}

export function breadcrumbJsonLd(items: Array<{ name: string; path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
