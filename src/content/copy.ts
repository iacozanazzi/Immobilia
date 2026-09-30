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
