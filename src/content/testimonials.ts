/**
 * Testimonianze di ESEMPIO: servono a mostrare il formato, non sono reali.
 * Pubblicare solo testimonianze vere, con consenso scritto (meglio se
 * collegate a recensioni verificabili). L'interfaccia le etichetta come esempio.
 */
export interface Testimonial {
  quote: string
  author: string
  context: string
  kind: 'acquisto' | 'vendita'
  example: true
}

export const testimonials: Testimonial[] = [
  {
    quote:
      'Ci ha detto subito che la casa che ci piaceva di più si sarebbe allagata due volte l’anno. Nessun altro l’aveva fatto. Abbiamo comprato quella accanto, e siamo felici.',
    author: 'Chiara e Tommaso',
    context: 'Acquisto a Cannaregio',
    kind: 'acquisto',
    example: true,
  },
  {
    quote:
      'Le foto, la planimetria ridisegnata, il testo: la nostra casa non era mai sembrata così bella. E alle visite è arrivato solo chi era davvero interessato.',
    author: 'Famiglia R.',
    context: 'Vendita a Dorsoduro',
    kind: 'vendita',
    example: true,
  },
  {
    quote:
      'Vivendo a Milano temevamo di dover seguire tutto a distanza. Report puntuali, videochiamate durante le visite e un rogito senza sorprese.',
    author: 'Andrea M.',
    context: 'Vendita a Castello',
    kind: 'vendita',
    example: true,
  },
]
