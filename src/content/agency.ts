/**
 * Dati dell'agenzia. I valori tra parentesi quadre sono SEGNAPOSTO:
 * vanno sostituiti con i dati reali prima del lancio (vedi docs/concept.md).
 */
export const agency = {
  name: 'IMMOBILIA',
  legalName: 'IMMOBILIA di Francesco Casagrande',
  founder: 'Francesco Casagrande',
  founderRole: 'Fondatore e agente immobiliare',
  city: 'Venezia',
  url: process.env.NEXT_PUBLIC_SITE_URL ?? 'https://www.immobilia.example',
  address: {
    street: '[Indirizzo della sede]',
    postalCode: '30100',
    city: 'Venezia',
    note: 'Si riceve su appuntamento',
  },
  phone: { label: '+39 041 000 0000', href: 'tel:+390410000000' },
  whatsapp: { label: 'WhatsApp', href: 'https://wa.me/390000000000' },
  email: { label: 'info@immobilia.example', href: 'mailto:info@immobilia.example' },
  hours: [
    { days: 'Lunedì – Venerdì', time: '9:30 – 13:00 · 15:00 – 19:00' },
    { days: 'Sabato', time: 'Su appuntamento' },
  ],
  /** Impegno di risposta: va deciso con l'agenzia e poi rispettato. */
  responseTime: 'entro 24 ore lavorative',
  legal: {
    vat: 'P.IVA [da inserire]',
    rea: 'REA VE-[da inserire]',
    register: 'Iscrizione ruolo agenti d’affari in mediazione [da inserire]',
  },
  social: [
    { label: 'Instagram', href: 'https://www.instagram.com/' },
    { label: 'LinkedIn', href: 'https://www.linkedin.com/' },
  ],
} as const

export const mainNav = [
  { href: '/immobili', label: 'Immobili' },
  { href: '/quartieri', label: 'Quartieri' },
  { href: '/vendi', label: 'Vendi con noi' },
  { href: '/chi-siamo', label: 'Chi siamo' },
  { href: '/contatti', label: 'Contatti' },
] as const
