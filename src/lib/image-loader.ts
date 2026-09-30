'use client'

/**
 * Loader per next/image. Unsplash (concept) e i CDN dei CMS headless
 * ridimensionano via URL: il browser scarica direttamente la misura
 * giusta, senza passare da un server di ottimizzazione.
 */
export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  if (src.startsWith('https://images.unsplash.com/')) {
    const url = new URL(src)
    url.searchParams.set('w', String(width))
    url.searchParams.set('q', String(quality ?? 70))
    url.searchParams.set('auto', 'format')
    url.searchParams.set('fit', 'crop')
    return url.toString()
  }
  return src
}
