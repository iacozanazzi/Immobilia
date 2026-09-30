import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  poweredByHeader: false,
  images: {
    // Le foto del concept arrivano da Unsplash, che ridimensiona via URL:
    // nessun server di ottimizzazione necessario. In produzione il loader
    // punterà al CDN immagini del CMS (es. Sanity).
    loader: 'custom',
    loaderFile: './src/lib/image-loader.ts',
  },
}

export default nextConfig
