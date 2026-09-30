import type { Neighborhood } from './types'

/**
 * Guide di zona. I fatti (monumenti, fermate, linee) sono reali; i giudizi
 * e le fasce di prezzo sono ESEMPI da validare: i prezzi con i dati OMI
 * dell'Agenzia delle Entrate e con le compravendite dell'agenzia, i giudizi
 * con Francesco. La sezione "Le calli di Francesco" va scritta da lui.
 */
export const neighborhoods: Neighborhood[] = [
  {
    slug: 'dorsoduro',
    name: 'Dorsoduro',
    tagline: 'La luce delle Zattere, l’arte, l’università.',
    intro:
      'Il sestiere più luminoso di Venezia: fondamenta esposte a sud, musei, università e un ritmo quotidiano che resta veneziano.',
    overview: [
      'Dorsoduro si allunga tra il Canal Grande e il canale della Giudecca. A sud le Zattere, la passeggiata al sole per eccellenza; a est la punta della Dogana e la Salute; a ovest San Nicolò dei Mendicoli, popolare e silenziosa.',
      'In mezzo convivono due anime: quella museale, tra l’Accademia, la Collezione Guggenheim e Punta della Dogana, e quella universitaria di Campo Santa Margherita, dove Ca’ Foscari e lo IUAV tengono il sestiere giovane tutto l’anno.',
    ],
    character: [
      'Luminoso, con molte case esposte a sud',
      'Rii larghi e fondamenta percorribili al sole',
      'Equilibrio tra residenti, studenti e visitatori',
    ],
    idealFor: ['Chi cerca luce e affacci sull’acqua', 'Famiglie: scuole e campi dove giocare', 'Chi vuole l’arte sotto casa'],
    dailyLife: [
      'La barca della frutta e verdura sul rio di San Barnaba',
      'Supermercati tra Santa Margherita e le Zattere',
      'Bar e bacari aperti fino a tardi intorno al campo',
    ],
    landmarks: [
      { name: 'Gallerie dell’Accademia', note: 'La grande pittura veneziana' },
      { name: 'Collezione Peggy Guggenheim', note: 'Il Novecento sul Canal Grande' },
      { name: 'Punta della Dogana', note: 'Arte contemporanea all’ingresso del Canal Grande' },
      { name: 'Squero di San Trovaso', note: 'Uno degli ultimi cantieri di gondole' },
      { name: 'Campo Santa Margherita', note: 'Il campo più vivo del sestiere' },
    ],
    gettingAround: [
      'Linee 1 e 2 sul Canal Grande: Accademia, Ca’ Rezzonico, Salute',
      'Linee 2, 5.1 e 5.2 alle Zattere, per Giudecca, Lido e Fondamente Nove',
      'Piazzale Roma a 15–20 minuti a piedi dalla parte ovest',
    ],
    pros: [
      'Esposizione e luce tra le migliori della città',
      'Servizi quotidiani completi',
      'Piazzale Roma raggiungibile a piedi',
    ],
    particulars: [
      'Salute e Punta della Dogana molto frequentate nelle ore centrali',
      'Campo Santa Margherita animato fino a tardi: chi cerca silenzio non ci si affacci',
      'Case con giardino rare e molto richieste',
    ],
    water:
      'Quote variabili: alcune fondamenta interne sono basse, altre zone sono più riparate. Per ogni casa indichiamo la quota esatta dell’ingresso.',
    prices: { daRistrutturare: [4500, 6000], ristrutturato: [6000, 8500], pregio: [8500, 12000] },
    lifestyle: { quiete: 3, servizi: 4, sera: 4, verde: 2, accesso: 3, riparo: 3 },
    image: 'venezia-luce',
  },
  {
    slug: 'cannaregio',
    name: 'Cannaregio',
    tagline: 'La Venezia di chi ci vive.',
    intro:
      'Il sestiere più popoloso e residenziale: lunghe fondamenta sull’acqua, bacari, botteghe e una comunità viva tutto l’anno.',
    overview: [
      'Dalla stazione alle Fondamente Nove, Cannaregio è la parte di Venezia dove si vive davvero. Le fondamenta della Misericordia, degli Ormesini e della Sensa corrono parallele al nord della città, con case basse, orti nascosti e altane.',
      'Qui c’è il Ghetto, il primo al mondo, istituito nel 1516; c’è la Madonna dell’Orto, la chiesa di Tintoretto; c’è la Ca’ d’Oro sul Canal Grande. E c’è soprattutto una vita di quartiere fatta di negozi di vicinato e di vicini che si conoscono.',
    ],
    character: ['Residenziale e autentico', 'Fondamenta lunghe e rii larghi', 'Molte case con travi a vista e altane'],
    idealFor: [
      'Chi lavora in terraferma',
      'Chi vuole una vita di quartiere vera',
      'Chi cerca il miglior rapporto tra prezzo e qualità della vita',
    ],
    dailyLife: [
      'Rio Terà San Leonardo: mercato e negozi di ogni giorno',
      'Bacari e osterie frequentati da veneziani, lungo Misericordia e Ormesini',
      'Scuole, farmacie e servizi diffusi',
    ],
    landmarks: [
      { name: 'Ghetto', note: 'Il primo ghetto della storia, 1516' },
      { name: 'Madonna dell’Orto', note: 'La chiesa di Tintoretto' },
      { name: 'Ca’ d’Oro', note: 'Il gotico fiorito sul Canal Grande' },
      { name: 'Fondamenta della Misericordia', note: 'La sera dei veneziani' },
      { name: 'Fondamente Nove', note: 'La laguna aperta verso San Michele e Murano' },
    ],
    gettingAround: [
      'Stazione ferroviaria e Piazzale Roma a pochi minuti dalla parte ovest',
      'Linee 4.1/4.2 e 5.1/5.2 lungo il canale di Cannaregio e le Fondamente Nove',
      'Dalle Fondamente Nove: vaporetti per Murano, Burano e Alilaguna per l’aeroporto',
    ],
    pros: ['Vicinanza alla stazione e alla terraferma', 'Tessuto sociale vivo', 'Prezzi ancora equilibrati'],
    particulars: [
      'Strada Nova molto trafficata: meglio le fondamenta interne',
      'Misericordia animata la sera, soprattutto d’estate',
      'Alcune fondamenta si bagnano con le maree più alte',
    ],
    water:
      'Quote discrete in molte zone; alcuni tratti lungo le fondamenta interne si bagnano con le maree più alte. Controlliamo sempre la quota dell’ingresso.',
    prices: { daRistrutturare: [3600, 4800], ristrutturato: [4800, 6500], pregio: [6500, 9000] },
    lifestyle: { quiete: 4, servizi: 5, sera: 4, verde: 2, accesso: 5, riparo: 3 },
    image: 'venezia-rio',
  },
  {
    slug: 'san-marco',
    name: 'San Marco',
    tagline: 'Il centro monumentale, e i suoi piani nobili.',
    intro:
      'Il cuore di Venezia. Tra Campo Santo Stefano e il Canal Grande resistono indirizzi di rara eleganza, lontani dalle rotte più affollate.',
    overview: [
      'San Marco non è solo la Piazza. Verso ovest, tra Santo Stefano, San Maurizio e San Samuele, il sestiere si fa quieto e sorprendentemente residenziale: palazzi gotici sul Canal Grande, campi eleganti, la Fenice.',
      'È il sestiere dei piani nobili e degli immobili di rappresentanza, ma anche di piccole mansarde con altana sopra i tetti. Qui ogni casa ha una storia, e quasi sempre un vincolo della Soprintendenza.',
    ],
    character: [
      'Palazzi storici sul Canal Grande',
      'Flussi turistici intensi intorno a Piazza e Mercerie',
      'Angoli silenziosi verso Santo Stefano e San Samuele',
    ],
    idealFor: ['Chi cerca una casa di rappresentanza', 'Seconde case di pregio', 'Chi vuole teatro e musica a pochi passi'],
    dailyLife: [
      'Negozi di vicinato più rari: la spesa si fa verso Santo Stefano o Rialto',
      'La Fenice, gallerie e fondazioni a pochi minuti',
      'Molti servizi pensati per chi visita la città',
    ],
    landmarks: [
      { name: 'Teatro La Fenice', note: 'L’opera, a pochi passi' },
      { name: 'Campo Santo Stefano', note: 'Il campo più elegante della città' },
      { name: 'Palazzo Grassi', note: 'Arte contemporanea sul Canal Grande' },
      { name: 'Scala Contarini del Bovolo', note: 'La scala a chiocciola più fotografata' },
      { name: 'Piazza San Marco', note: 'Da vivere presto al mattino' },
    ],
    gettingAround: [
      'Linee 1 e 2 sul Canal Grande: San Samuele, Sant’Angelo, Giglio, Vallaresso',
      'Traghetti da parada per attraversare il Canal Grande',
      'Piazzale Roma a 25–30 minuti a piedi',
    ],
    pros: ['Prestigio e liquidità degli immobili di pregio', 'Tutto a piedi', 'Grande offerta culturale'],
    particulars: [
      'È la parte più bassa della città: la Piazza è la prima ad allagarsi',
      'Flussi turistici intensi nelle ore centrali',
      'Vincoli della Soprintendenza su gran parte degli edifici',
    ],
    water:
      'È l’area più bassa di Venezia: la Piazza si bagna già con maree moderate. Ingressi e piani terra vanno valutati con attenzione; i piani alti non ne risentono.',
    prices: { daRistrutturare: [5000, 6500], ristrutturato: [6500, 9000], pregio: [9000, 14000] },
    lifestyle: { quiete: 1, servizi: 3, sera: 4, verde: 1, accesso: 2, riparo: 1 },
    image: 'venezia-canal-grande',
  },
  {
    slug: 'castello',
    name: 'Castello',
    tagline: 'Dall’Arsenale ai Giardini, la Venezia più verde.',
    intro:
      'Il sestiere più esteso: dalla vivacità di Via Garibaldi alla quiete di Sant’Elena, con la Biennale come vicina di casa.',
    overview: [
      'Castello è tante città in una. Verso San Marco, intorno a San Zaccaria e Santa Maria Formosa, è centrale e animato; oltre l’Arsenale diventa popolare e vero, con Via Garibaldi, i panni stesi e il mercato.',
      'All’estremità orientale, i Giardini della Biennale e Sant’Elena offrono ciò che a Venezia manca quasi ovunque: alberi, prati, spazio. Un sestiere amatissimo dalle famiglie.',
    ],
    character: ['Il più verde del centro storico', 'Popolare e autentico oltre l’Arsenale', 'La Biennale come vicina di casa'],
    idealFor: ['Famiglie con bambini', 'Chi ama arte contemporanea e architettura', 'Chi cerca spazio a prezzi più accessibili'],
    dailyLife: [
      'Via Garibaldi: mercato, forni e botteghe di quartiere',
      'L’Ospedale Civile ai Santi Giovanni e Paolo',
      'Parchi e spazi per bambini ai Giardini e a Sant’Elena',
    ],
    landmarks: [
      { name: 'Arsenale', note: 'Il cantiere della Serenissima' },
      { name: 'Giardini della Biennale', note: 'Padiglioni tra gli alberi' },
      { name: 'Via Garibaldi', note: 'La strada più larga di Venezia' },
      { name: 'San Pietro di Castello', note: 'L’antica cattedrale, su un’isola quieta' },
      { name: 'Santi Giovanni e Paolo', note: 'Il grande campo gotico' },
    ],
    gettingAround: [
      'Fermate lungo la riva: San Zaccaria, Arsenale, Giardini, Sant’Elena',
      'Linee 1, 4.1/4.2 e 5.1/5.2, collegamento diretto con il Lido',
      'Piazzale Roma lontano: circa 30 minuti in vaporetto',
    ],
    pros: ['La zona più verde della città', 'Comunità di residenti', 'Prezzi più accessibili nella parte est'],
    particulars: [
      'Durante la Biennale, da primavera all’autunno, più movimento ai Giardini',
      'Distanza dalla stazione',
      'Riva degli Schiavoni molto turistica',
    ],
    water:
      'Quote molto diverse tra la zona di San Zaccaria, bassa, e la parte orientale. Valutiamo ogni ingresso.',
    prices: { daRistrutturare: [3500, 4600], ristrutturato: [4600, 6300], pregio: [6300, 9000] },
    lifestyle: { quiete: 4, servizi: 4, sera: 3, verde: 5, accesso: 1, riparo: 3 },
    image: 'venezia-sera',
  },
  {
    slug: 'san-polo',
    name: 'San Polo',
    tagline: 'Intorno a Rialto, il mercato e i campi più veneziani.',
    intro:
      'Il sestiere più piccolo e forse il più centrale: il mercato di Rialto, i Frari, San Rocco e uno dei campi più grandi della città.',
    overview: [
      'San Polo è il ventre di Venezia. Ogni mattina la Pescheria e l’Erbaria di Rialto riforniscono le cucine della città, e intorno al mercato i bacari aprono presto.',
      'Allontanandosi dal ponte, le calli si fanno quiete: Campo San Polo, la Basilica dei Frari con Tiziano, la Scuola Grande di San Rocco con Tintoretto. Un sestiere per chi vuole essere al centro di tutto.',
    ],
    character: ['Centrale e baricentrico', 'Il mercato come cucina di casa', 'Botteghe artigiane e librerie'],
    idealFor: ['Chi ama cucinare', 'Chi vuole tutto a piedi', 'Coppie e single che vivono la città'],
    dailyLife: [
      'Mercato di Rialto: frutta e verdura ogni mattina; la Pescheria chiude la domenica e il lunedì',
      'Bacari storici intorno all’Erbaria',
      'Botteghe artigiane e librerie indipendenti',
    ],
    landmarks: [
      { name: 'Mercato di Rialto', note: 'Pescheria ed Erbaria' },
      { name: 'Basilica dei Frari', note: 'L’Assunta di Tiziano' },
      { name: 'Scuola Grande di San Rocco', note: 'Il ciclo di Tintoretto' },
      { name: 'Campo San Polo', note: 'Uno dei campi più grandi' },
    ],
    gettingAround: [
      'Fermate Rialto Mercato e San Tomà, linee 1 e 2',
      'Piazzale Roma e stazione a circa 15 minuti a piedi',
      'Traghetti da parada per attraversare il Canal Grande',
    ],
    pros: ['Posizione centrale', 'Vita di quartiere intensa', 'Stazione raggiungibile a piedi'],
    particulars: [
      'Intorno al ponte di Rialto flussi turistici intensi',
      'Sestiere piccolo: poca offerta sul mercato',
      'Le rive del Canal Grande sono tra le zone più basse',
    ],
    water:
      'Rialto e le rive del Canal Grande sono tra le zone più basse; verso i Frari le quote migliorano.',
    prices: { daRistrutturare: [4300, 5500], ristrutturato: [5500, 7500], pregio: [7500, 10000] },
    lifestyle: { quiete: 2, servizi: 5, sera: 4, verde: 1, accesso: 4, riparo: 2 },
    image: 'venezia-canal-grande',
  },
  {
    slug: 'santa-croce',
    name: 'Santa Croce',
    tagline: 'La porta d’ingresso di Venezia, con i campi più tranquilli.',
    intro:
      'Da Piazzale Roma a San Giacomo dall’Orio: il sestiere più comodo per chi arriva dalla terraferma, con alcuni dei campi più residenziali della città.',
    overview: [
      'Santa Croce inizia dove finiscono le automobili. Piazzale Roma e il People Mover sono la porta di Venezia: chi lavora in terraferma o tiene l’auto in garage trova qui la soluzione più pratica.',
      'Pochi minuti più in là, il sestiere cambia volto. Campo San Giacomo dall’Orio, con la sua chiesa romanica e gli alberi, è uno dei luoghi più amati dai veneziani. Ca’ Pesaro e il Fondaco dei Turchi si affacciano sul Canal Grande.',
    ],
    character: ['L’accesso più comodo dalla terraferma', 'Campi residenziali e quieti', 'Musei affacciati sul Canal Grande'],
    idealFor: ['Pendolari e chi usa l’auto', 'Famiglie', 'Chi cerca quiete vicino a tutto'],
    dailyLife: [
      'Campo San Giacomo dall’Orio: bambini che giocano, panchine all’ombra, bar di quartiere',
      'Supermercati vicino a Piazzale Roma',
      'I Giardini Papadopoli, un raro polmone verde',
    ],
    landmarks: [
      { name: 'Campo San Giacomo dall’Orio', note: 'Il campo dei residenti' },
      { name: 'Ca’ Pesaro', note: 'Galleria d’Arte Moderna' },
      { name: 'Fondaco dei Turchi', note: 'Il Museo di Storia Naturale' },
      { name: 'Palazzo Mocenigo', note: 'Il museo del tessuto e del profumo' },
      { name: 'Giardini Papadopoli', note: 'Il verde accanto a Piazzale Roma' },
    ],
    gettingAround: [
      'Piazzale Roma: auto, autobus e tram per Mestre e l’aeroporto',
      'People Mover per il Tronchetto',
      'Fermate San Stae e Riva de Biasio, linea 1',
    ],
    pros: ['Il collegamento migliore con la terraferma', 'Garage a Piazzale Roma e Tronchetto', 'Campi tranquilli'],
    particulars: [
      'Vicino a Piazzale Roma traffico di valigie e passaggio',
      'La parte interna è molto quieta',
      'I garage si pagano a parte e hanno liste d’attesa',
    ],
    water: 'Quote generalmente medie; alcune rive sul Canal Grande sono più basse.',
    prices: { daRistrutturare: [3800, 5000], ristrutturato: [5000, 6800], pregio: [6800, 9000] },
    lifestyle: { quiete: 4, servizi: 4, sera: 3, verde: 2, accesso: 5, riparo: 3 },
    image: 'venezia-rio',
  },
  {
    slug: 'giudecca',
    name: 'Giudecca',
    tagline: 'La vista su Venezia, da Venezia.',
    intro:
      'Un’isola a cinque minuti di vaporetto dalle Zattere: spazi più ampi, giardini nascosti e un panorama unico sul bacino di San Marco.',
    overview: [
      'La Giudecca guarda Venezia da sud. La fondamenta nord è una lunga terrazza sul canale: il Redentore di Palladio, le Zitelle, il Molino Stucky. Dietro, un’isola sorprendente fatta di orti, giardini e ex fabbriche trasformate in case e atelier.',
      'È il posto dove si trovano metrature e altezze impensabili nel centro storico, e dove la vita è più lenta. A luglio, la notte del Redentore, tutta Venezia viene qui.',
    ],
    character: ['Vista sul bacino e sulle Zattere', 'Ex spazi produttivi trasformati in loft', 'Ritmo lento, da isola'],
    idealFor: ['Chi cerca spazio e luce', 'Artisti, architetti, chi lavora da casa', 'Chi ama il silenzio'],
    dailyLife: [
      'Fondamenta nord con forni, bar e piccoli supermercati',
      'Ex fabbriche trasformate in loft e atelier',
      'La festa del Redentore a luglio',
    ],
    landmarks: [
      { name: 'Il Redentore', note: 'La chiesa di Palladio' },
      { name: 'Le Zitelle', note: 'Palladio sul bacino di San Marco' },
      { name: 'Molino Stucky', note: 'Il grande mulino neogotico' },
      { name: 'Casa dei Tre Oci', note: 'Il liberty sulla fondamenta' },
    ],
    gettingAround: [
      'Fermate Palanca, Redentore, Zitelle e Sacca Fisola: linee 2 e 4.1/4.2',
      'Le Zattere a cinque minuti di vaporetto, San Marco a dieci',
      'Nessun ponte con il centro: tutto passa dall’acqua',
    ],
    pros: ['Metrature, giardini e altezze rare', 'Vista unica sul bacino', 'Prezzi ancora favorevoli'],
    particulars: [
      'Dipendenza dal vaporetto, anche di notte',
      'Fondamenta sud più esposta al vento',
      'Servizi più limitati rispetto al centro',
    ],
    water:
      'La fondamenta nord, sul canale, si bagna con le maree più alte; l’interno dell’isola varia molto da caso a caso.',
    prices: { daRistrutturare: [3300, 4500], ristrutturato: [4500, 6500], pregio: [6500, 10000] },
    lifestyle: { quiete: 5, servizi: 3, sera: 2, verde: 3, accesso: 2, riparo: 3 },
    image: 'venezia-sera',
  },
  {
    slug: 'lido',
    name: 'Lido',
    tagline: 'Il mare, le ville liberty e le automobili.',
    intro:
      'Undici chilometri tra laguna e Adriatico: ville d’epoca, viali alberati, spiagge e la vita di una piccola città, a un quarto d’ora da San Marco.',
    overview: [
      'Il Lido è la Venezia che si muove in bicicletta. Viali alberati, ville liberty e anni Trenta, giardini veri: qui la casa con il verde e il posto auto non è un’eccezione, è la regola.',
      'Da fine agosto a settembre la Mostra del Cinema porta il mondo al Palazzo del Cinema; il resto dell’anno il Lido è una città tranquilla, con scuole, sport e il mare a pochi minuti da ogni casa.',
    ],
    character: ['Ville d’epoca e giardini', 'Si circola in auto e in bici', 'Mare e laguna insieme'],
    idealFor: ['Famiglie', 'Chi vuole giardino e auto', 'Chi ama il mare e lo sport'],
    dailyLife: [
      'Supermercati, scuole di ogni grado e servizi da piccola città',
      'Spiagge attrezzate e libere, piste ciclabili',
      'La Mostra del Cinema tra fine agosto e settembre',
    ],
    landmarks: [
      { name: 'Gran Viale Santa Maria Elisabetta', note: 'Dalla laguna al mare' },
      { name: 'Palazzo del Cinema', note: 'La Mostra internazionale' },
      { name: 'Malamocco', note: 'Il borgo più antico dell’isola' },
      { name: 'Alberoni', note: 'Dune, pineta e il golf' },
    ],
    gettingAround: [
      'In auto e in bici; ferry-boat per le auto dal Tronchetto',
      'Vaporetti da Santa Maria Elisabetta per San Marco, Fondamente Nove e Punta Sabbioni',
      'Autobus lungo tutta l’isola',
    ],
    pros: ['Giardino, spazio e auto sotto casa', 'Qualità della vita per famiglie', 'Rapporto tra metri e prezzo favorevole'],
    particulars: [
      'D’inverno l’isola è molto quieta',
      'Per il centro storico si dipende dal vaporetto',
      'Molte ville sono vincolate: interventi da concordare con la Soprintendenza',
    ],
    water:
      'In larga parte al riparo dall’acqua alta che interessa il centro storico: qui il tema è semmai la manutenzione di giardini e seminterrati.',
    prices: { daRistrutturare: [2800, 3800], ristrutturato: [3800, 5200], pregio: [5200, 8000] },
    lifestyle: { quiete: 5, servizi: 4, sera: 2, verde: 5, accesso: 3, riparo: 5 },
    image: 'casa-esterno',
  },
]
