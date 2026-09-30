import type { MetadataRoute } from 'next'
import { getNeighborhoods, getProperties } from '@/lib/content'
import { absoluteUrl } from '@/lib/seo'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [properties, neighborhoods] = await Promise.all([getProperties(), getNeighborhoods()])
  const latest = properties.reduce((max, p) => (p.publishedAt > max ? p.publishedAt : max), '')
  const staticRoutes = ['/', '/immobili', '/vendi', '/quartieri', '/chi-siamo', '/contatti'].map((path) => ({
    url: absoluteUrl(path),
    lastModified: latest,
    changeFrequency: 'weekly' as const,
    priority: path === '/' ? 1 : 0.8,
  }))
  return [
    ...staticRoutes,
    ...properties.map((p) => ({
      url: absoluteUrl(`/immobili/${p.slug}`),
      lastModified: p.publishedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    })),
    ...neighborhoods.map((n) => ({
      url: absoluteUrl(`/quartieri/${n.slug}`),
      lastModified: latest,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),
  ]
}
