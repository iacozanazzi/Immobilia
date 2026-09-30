/**
 * Registro unico delle immagini.
 *
 * CONCEPT: foto Unsplash usate come segnaposto d'atmosfera. Non ritraggono
 * gli immobili descritti. Prima del lancio vanno sostituite con lo shooting
 * professionale di ogni casa (e i testi alternativi riscritti di conseguenza).
 * Se un'immagine non si carica, ImageFrame mostra un ripiego grafico del marchio.
 */

export interface Photo {
  src: string
  alt: string
}

const u = (id: string) => `https://images.unsplash.com/${id}`

export const media = {
  // Città
  'venezia-rio': { src: u('photo-1514890547357-a9ee288728e0'), alt: 'Un rio veneziano tra facciate color terra' },
  'venezia-canal-grande': { src: u('photo-1523906834658-6e24ef2386f9'), alt: 'Palazzi affacciati sul Canal Grande' },
  'venezia-luce': { src: u('photo-1534113414509-0eec2bfb493f'), alt: 'Luce del mattino sull’acqua e sulle facciate' },
  'venezia-sera': { src: u('photo-1498307833015-e7b400441eb8'), alt: 'Venezia all’imbrunire vista dall’acqua' },

  // Interni
  'soggiorno-luce': { src: u('photo-1600210492486-724fe5c67fb0'), alt: 'Soggiorno chiaro con grandi finestre' },
  'soggiorno-quiete': { src: u('photo-1586023492125-27b2c045efd7'), alt: 'Angolo lettura con poltrona e luce naturale' },
  'soggiorno-ampio': { src: u('photo-1600607687939-ce8a6c25118c'), alt: 'Soggiorno ampio con toni neutri' },
  'soggiorno-caldo': { src: u('photo-1493809842364-78817add7ffb'), alt: 'Soggiorno con divano e parquet' },
  'soggiorno-alto': { src: u('photo-1600566753190-17f0baa2a6c3'), alt: 'Zona giorno con soffitti alti' },
  'interno-arioso': { src: u('photo-1502672260266-1c1ef2d93688'), alt: 'Interno luminoso con pavimento in legno' },
  'interno-studio': { src: u('photo-1522708323590-d24dbb6b0267'), alt: 'Zona giorno open space con tavolo' },
  'interno-dettaglio': { src: u('photo-1560448204-e02f11c3d0e2'), alt: 'Dettaglio di un interno arredato con cura' },
  'interno-pietra': { src: u('photo-1560185007-cde436f6a4d0'), alt: 'Interno con finiture chiare' },
  'interno-sera': { src: u('photo-1554995207-c18c203602cb'), alt: 'Soggiorno con luci soffuse' },
  'cucina-bianca': { src: u('photo-1484154218962-a197022b5858'), alt: 'Cucina bianca con piano di lavoro in legno' },
  'cucina-isola': { src: u('photo-1556912173-3bb406ef7e77'), alt: 'Cucina con isola centrale' },
  'camera-lino': { src: u('photo-1505691938895-1758d7feb511'), alt: 'Camera da letto con biancheria in lino' },
  'camera-calma': { src: u('photo-1540518614846-7eded433c457'), alt: 'Camera matrimoniale in toni caldi' },
  'bagno-pietra': { src: u('photo-1552321554-5fefe8c9ef14'), alt: 'Bagno con finiture in pietra' },

  // Esterni
  'casa-esterno': { src: u('photo-1564013799919-ab600027ffc6'), alt: 'Facciata di una casa con giardino' },
  'villa-esterno': { src: u('photo-1512917774080-9991f1c4c750'), alt: 'Villa con giardino e piscina' },
  'giardino-verde': { src: u('photo-1416879595882-3373a0480b5b'), alt: 'Giardino privato con piante' },
} satisfies Record<string, Photo>

export type MediaKey = keyof typeof media

export function photo(key: MediaKey): Photo {
  return media[key]
}
