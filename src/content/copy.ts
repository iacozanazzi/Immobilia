/**
 * Testi delle pagine principali, separati dai componenti: la versione
 * inglese (necessaria a Venezia) sarà un secondo dizionario, non un refactoring.
 */
import { agency } from './agency'

export const homeCopy = {
  hero: {
    eyebrow: 'Agenzia immobiliare boutique · Venezia',
    title: ['Venezia,', 'una casa alla volta.'],
    lead: 'Selezioniamo pochi immobili e li conosciamo fino all’ultimo dettaglio: la luce, la quota dell’acqua, il rumore del campo sotto casa. Così potete scegliere con calma, e con certezza.',
    primary: 'Scopri le case',
    secondary: 'Vendete casa? Parliamone',
    teaserSlug: 'dorsoduro-ultimo-piano-altana-zattere',
  },
  manifesto: {
    index: 'I',
    eyebrow: 'Il nostro metodo',
    statement:
      'Non vi mostreremo tante case. Vi mostreremo quelle giuste, e vi diremo tutto: anche quello che di solito non si dice.',
    pillars: [
      {
        title: 'Selezione',
        text: 'Seguiamo una ventina di immobili alla volta. Li visitiamo più volte, li misuriamo, li verifichiamo. Se una casa non ci convince, non la proponiamo.',
      },
      {
        title: 'Verità',
        text: 'Ogni scheda ha una sezione “Cose da sapere”: acqua alta, scale, lavori, vincoli. Meglio saperlo prima della visita che dopo il compromesso.',
      },
      {
        title: 'Territorio',
        text: 'Viviamo Venezia ogni giorno. Conosciamo le quote delle calli, gli orari dei vaporetti, i campi dove i bambini giocano ancora.',
      },
    ],
  },
  selection: {
    index: 'II',
    eyebrow: 'La selezione',
    title: 'Case scelte, una a una.',
    lead: 'Tre immobili che in questo momento ci sembrano speciali. Gli altri li trovate nella selezione completa, raccontati con la stessa cura.',
    cta: 'Tutta la selezione',
    /** Scelta editoriale: nel CMS diventa un campo ordinabile. */
    slugs: ['san-marco-piano-nobile-canal-grande', 'cannaregio-casa-corte-misericordia', 'giudecca-loft-sulla-laguna'],
  },
  why: {
    index: 'III',
    eyebrow: 'Perché IMMOBILIA',
    title: 'Quello che un annuncio dovrebbe sempre dire.',
    points: [
      {
        title: 'Visitiamo tutto, prima di voi',
        text: 'Nessun immobile va online senza che l’abbiamo visto, misurato e verificato con il nostro tecnico: conformità, catasto, APE.',
      },
      {
        title: 'Scriviamo anche i difetti',
        text: 'Le scale ripide, la calle che si bagna, i lavori deliberati. Vi fa risparmiare visite inutili; a noi porta clienti che si fidano.',
      },
      {
        title: 'Una presentazione all’altezza',
        text: 'Fotografia professionale, planimetria ridisegnata, un testo scritto per quella casa e non per tutte.',
      },
      {
        title: 'Un solo referente',
        text: `Dalla prima telefonata al rogito parlate sempre con la stessa persona, che vi risponde ${agency.responseTime}.`,
      },
    ],
    sampleLabel: 'Dalla scheda di un immobile in selezione',
  },
  territory: {
    index: 'IV',
    eyebrow: 'Il territorio',
    title: 'Otto Venezie, e le conosciamo tutte.',
    lead: 'Ogni sestiere ha un carattere, una quota sull’acqua, un ritmo. Le nostre guide vi aiutano a capire dove vivreste meglio, prima ancora di cercare casa.',
    cta: 'Esplora le guide di zona',
  },
  sellers: {
    index: 'V',
    eyebrow: 'Per chi vende',
    title: 'La vostra casa merita più di un annuncio.',
    lead: 'Accettiamo pochi incarichi, per seguirli davvero: fotografia professionale, planimetria ridisegnata, un racconto scritto per la vostra casa, visite solo con acquirenti selezionati e un report dopo ognuna.',
    points: ['Valutazione scritta, motivata con i dati', 'Presentazione editoriale e shooting professionale', 'Report dopo ogni visita'],
    formTitle: 'Iniziamo dalla zona',
    cta: 'Richiedi una valutazione',
  },
  closing: {
    buy: {
      eyebrow: 'Cercate casa',
      title: 'Non l’avete trovata qui?',
      text: 'Raccontateci cosa cercate. Molte case passano da noi prima di essere pubblicate: ve le segnaliamo per primi.',
      cta: 'Ricerca su misura',
      href: '/immobili#su-misura',
    },
    sell: {
      eyebrow: 'Vendete casa',
      title: 'Quanto vale davvero?',
      text: 'Una valutazione scritta, basata sulle compravendite reali della zona e su un sopralluogo. Senza impegno.',
      cta: 'Richiedi una valutazione',
      href: '/vendi#valutazione',
    },
  },
}

export const sellCopy = {
  hero: {
    eyebrow: 'Vendere casa a Venezia',
    title: 'Vendere casa a Venezia richiede più di un annuncio.',
    lead: 'Una casa veneziana va capita prima di essere raccontata: la luce, l’acqua, i vincoli, la sua storia. Per questo accettiamo pochi incarichi e li seguiamo uno per uno, dalla valutazione al rogito.',
    primary: 'Richiedi una valutazione',
    secondary: 'Parlate con Francesco',
  },
  /** Impegni di servizio: vanno confermati con l'agenzia prima del lancio. */
  commitments: [
    ['20', 'incarichi al massimo, seguiti insieme'],
    ['7', 'giorni per la valutazione scritta'],
    ['15', 'giorni tra un report e l’altro'],
  ],
  benefits: {
    eyebrow: 'Cosa facciamo per la vostra casa',
    title: 'Sei cose che un portale non fa.',
    items: [
      {
        title: 'Una valutazione motivata',
        text: 'Partiamo dalle compravendite reali della zona e dalle quotazioni OMI, poi correggiamo con ciò che i dati non vedono: piano, luce, acqua, vincoli. Ricevete una valutazione scritta, con le ragioni.',
      },
      {
        title: 'Fotografia professionale',
        text: 'Uno shooting con luce naturale, nell’ora giusta per la vostra casa. Anche l’altana, la vista, la calle sotto casa.',
      },
      {
        title: 'La planimetria, ridisegnata',
        text: 'Rilievo e ridisegno della pianta, chiara e leggibile. È la seconda cosa che un acquirente guarda, subito dopo le foto.',
      },
      {
        title: 'Un racconto, non un elenco',
        text: 'Scriviamo la scheda come un articolo: cosa rende unica la vostra casa e, con onestà, cosa c’è da sapere. Le trattative che non saltano nascono qui.',
      },
      {
        title: 'Visite solo con chi ha senso',
        text: 'Prima di ogni visita parliamo con l’acquirente: budget, tempi, esigenze. Aprite la porta solo a persone davvero interessate.',
      },
      {
        title: 'Report e pratiche fino al rogito',
        text: 'Un resoconto dopo ogni visita e ogni quindici giorni. Con il nostro tecnico seguiamo conformità, catasto, APE e Soprintendenza.',
      },
    ],
  },
  process: {
    eyebrow: 'Come lavoriamo',
    title: 'Cinque passi, un solo referente.',
    steps: [
      { title: 'Primo incontro', text: 'Ci raccontate la casa e i vostri tempi. In agenzia, da voi o in videochiamata.', time: '30 minuti' },
      { title: 'Sopralluogo e valutazione', text: 'Visitiamo e misuriamo la casa. Entro una settimana ricevete la valutazione scritta.', time: '1 settimana' },
      { title: 'Preparazione', text: 'Verifica dei documenti, piccoli consigli di presentazione, shooting e planimetria.', time: '2 settimane' },
      { title: 'Presentazione e visite', text: 'Prima agli iscritti all’anteprima, poi online. Visite con acquirenti selezionati e report dopo ognuna.', time: 'Secondo il mercato' },
      { title: 'Trattativa e rogito', text: 'Vi affianchiamo nella proposta, nel compromesso e fino al rogito dal notaio.', time: 'Fino alla fine' },
    ],
  },
  compare: {
    eyebrow: 'La differenza',
    title: 'Lo stesso immobile, raccontato in due modi.',
    standard: {
      label: 'Annuncio tipico',
      items: [
        'Dodici foto scattate con il telefono',
        'Planimetria catastale scansionata',
        '“Luminoso, ben tenuto, zona servita”',
        'Nessuna parola su acqua alta o lavori',
        'Visite con chiunque chiami',
        'Aggiornamenti quando capita',
      ],
    },
    immobilia: {
      label: 'Scheda IMMOBILIA',
      items: [
        'Shooting professionale con luce naturale',
        'Planimetria ridisegnata e leggibile',
        'Un testo scritto per quella casa',
        '“Cose da sapere” dichiarate in anticipo',
        'Acquirenti selezionati prima della visita',
        'Un report dopo ogni visita',
      ],
    },
  },
  valuation: {
    eyebrow: 'Valutazione',
    title: 'Quanto vale la vostra casa?',
    lead: 'Tre domande sulla casa, poi i vostri contatti. Vi richiamiamo per fissare il sopralluogo: la valutazione scritta arriva dopo averla vista, non prima.',
    promise: ['Gratuita e senza impegno', 'Scritta e motivata, con i dati', 'Riservata: i vostri dati restano a noi'],
  },
  faq: [
    {
      q: 'Quanto costa?',
      a: 'La valutazione è gratuita. La provvigione si concorda per iscritto al momento dell’incarico ed è dovuta solo a vendita conclusa. Fotografie e planimetria sono incluse.',
    },
    {
      q: 'Serve l’incarico in esclusiva?',
      a: 'Sì, per un periodo definito, di solito sei mesi. È ciò che ci permette di investire nella presentazione e di presentare la casa al mercato con un solo prezzo e un solo racconto.',
    },
    {
      q: 'In quanto tempo si vende?',
      a: 'Dipende da zona, prezzo e stagione. Nella valutazione vi diamo una stima motivata, basata sulle vendite recenti di case simili alla vostra.',
    },
    {
      q: 'Quali documenti servono?',
      a: 'Atto di provenienza, planimetria catastale, APE ed eventuali pratiche edilizie. Se manca qualcosa, il nostro tecnico se ne occupa prima di andare online.',
    },
    {
      q: 'Vivo fuori Venezia: posso vendere a distanza?',
      a: 'Sì. Custodiamo le chiavi, facciamo le visite e vi aggiorniamo in videochiamata. Siete presenti al rogito, o nemmeno lì, con una procura.',
    },
  ],
}
