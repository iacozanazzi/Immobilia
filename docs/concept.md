# IMMOBILIA — Concept del sito

Documento di progetto per il sito di **IMMOBILIA di Francesco Casagrande**, agenzia immobiliare boutique a Venezia.
Accompagna il prototipo funzionante di questo repository (Next.js). Segue l'ordine del brief, punti 1–11. In fondo trovate l'implementazione, le verifiche fatte e cosa manca prima del lancio.

> **Stato.** È un concept funzionante: pagine, filtri, preferiti, confronto e form funzionano davvero. Immobili, prezzi, testimonianze, numeri e biografia sono **esempi dichiarati**, da sostituire. L'elenco completo è nel capitolo "Prima del lancio".

---

## In sintesi: le sei decisioni che contano

1. **Il concept è "La porta accesa".** Nel logo, tra linee argento, c'è una sola porta illuminata d'oro. Il sito fa lo stesso: tra migliaia di porte di Venezia, IMMOBILIA ne illumina una, quella giusta.
2. **L'oro si usa come luce, non come decorazione.** Al massimo un punto d'oro per schermata. Il blu notte con l'oro ovunque è il cliché del lusso immobiliare; il logo stesso usa l'oro con parsimonia.
3. **La trasparenza è una funzione del prodotto, non uno slogan.** Ogni scheda ha "Cose da sapere": acqua alta, scale, lavori, vincoli. È ciò che nessun portale fa e che crea fiducia.
4. **I dati veneziani sono dati di prima classe.** Ogni scheda riporta la quota dell'ingresso sul medio mare, la fermata del vaporetto con le linee, l'altana, l'accesso acqueo e il vincolo della Soprintendenza.
5. **La conversione più importante è l'incarico di vendita.** Per un'agenzia con una ventina di immobili il collo di bottiglia sono le case da vendere, non i compratori. La CTA fissa nell'header è quindi "Valuta la tua casa".
6. **Nessun contenuto inventato va pubblicato.** Il sito è costruito perché i segnaposto si vedano e si sostituiscano in un punto solo.

---

## 1. Interpretazione del brand, a partire dal logo

Il logo fornito (`docs/brand/logo-reference.jpg`, 145×60 px) è stato analizzato pixel per pixel.

| Elemento | Cosa c'è davvero | Cosa comunica |
|---|---|---|
| Fondo | Sfumatura radiale da `#001623` (petrolio profondo) al centro a `#02000B` ai bordi | Notte veneziana, profondità, discrezione |
| Linee | Argento e peltro, da `#455660` a `#91949B`, **non oro** | Struttura, precisione, architettura |
| Oro | Un solo elemento, `#CCAF87`: **la porta della casa centrale** | La casa giusta, "la luce accesa" |
| Due "M" | Due facciate a forma di M, che riprendono la **MM** di IMMOBILIA | Il nome costruito come un edificio |
| Tre case | Tetti a capanna sovrapposti, al centro dei due edifici | Casa, non "immobile" |
| Staffa | La linea di terra si piega e incornicia il nome | Pianta architettonica, ordine, cura |
| Nome | Sans geometrica maiuscola molto spaziata, argento-bianco | Modernità sobria |
| Firma | "di Francesco Casagrande" | **Brand personale**: la persona è la garanzia |

**Tre letture che orientano tutto il progetto:**

- **Struttura e luce.** Il logo è quasi tutto struttura (linee sottili, argento); la luce è un punto solo. Da qui la gerarchia visiva del sito: righe sottili, grandi spazi, un solo accento caldo.
- **Precisione architettonica.** Linee sottili, angoli netti, simmetria. Il sito usa filetti da 1 px, griglie rigorose e icone disegnate con la stessa grammatica, senza bordi arrotondati.
- **Una persona, non un marchio.** "di Francesco Casagrande" dice che si compra la fiducia in qualcuno. Il sito lo rende concreto: "Perché ci piace" è firmato, c'è un solo referente e le "Calli di Francesco" sono scritte da lui.

**Correzione al brief.** Il brief descrive "linee oro/bronzo"; il file mostra linee argento e un solo punto d'oro. È un'informazione preziosa: seguire il logo, e non la descrizione, evita il look da lusso generico.

**Limite tecnico.** A 145 px il file non è utilizzabile. Il logo è stato **ridisegnato in SVG** come versione provvisoria (`src/components/brand/Logo.tsx` e `public/brand/*.svg`), con tre varianti:
- completo, con staffa e firma;
- compatto orizzontale, per l'header;
- solo marchio, per favicon e immagini social.

Il compatto è una **proposta nuova**: il logo originale non è leggibile a 30 px di altezza. Va validato con il grafico, a cui va chiesto il vettoriale originale (AI, SVG o PDF).

---

## 2. Concept creativo: "La porta accesa"

**Idea.** Venezia ha migliaia di porte, e quasi tutte sono chiuse a chi viene da fuori. IMMOBILIA è chi ne conosce una per una e vi accende quella giusta.

**Posizionamento.** Non "tante case", ma "le case giuste".
- Headline del sito: **"Venezia, una casa alla volta."**
- Messaggio implicito, detto esplicitamente nel manifesto: "Non vi mostreremo tante case. Vi mostreremo quelle giuste, e vi diremo tutto."

**Come il concept diventa interfaccia:**

| Regola | Dove si vede |
|---|---|
| **Il segno della porta accanto alla CTA principale:** un rettangolo d'oro, lo stesso della porta del logo | "Valuta la tua casa", "Prenota una visita", "Scopri le case" |
| **La cornice:** la staffa del logo diventa un contenitore, usato solo per ciò che conta | Box prezzo della scheda, "In evidenza" nell'hero, mini-form dei venditori, "In breve" dei quartieri |
| **Capitoli numerati I, II, III** come in una rivista | Sezioni di home, Vendi con noi, Chi siamo |
| **Il corsivo è la voce dell'agenzia**, ed è un richiamo locale: il corsivo nasce a Venezia con Aldo Manuzio (1501) | Frasi d'apertura delle schede, "Perché ci piace", sottotitoli delle zone |
| **Le "Cose da sapere"** | Scheda immobile, anteprima in home |

**Quattro riferimenti, una sintesi.** Apple, Airbnb Luxe, studio di architettura e magazine tirano in direzioni diverse; tutti insieme producono un sito indeciso. La sintesi:
- **magazine** per i contenuti (schede, quartieri, chi siamo);
- **Apple** per le parti operative (filtri, form, confronto);
- lo **studio di architettura** come grammatica comune: linee, griglie, planimetrie.

---

## 3. Direzione visiva

### Palette (nomi veneziani)

| Token | Hex | Ruolo | Contrasto |
|---|---|---|---|
| `notte-950` | `#03070F` | Fondo più profondo (footer, 404, menu) | — |
| `notte-900` | `#061423` | Fondo scuro principale, bottoni primari | argento 16,7:1 |
| `notte-800` | `#0B1E30` | Superfici scure secondarie | — |
| `peltro-700` → `peltro-300` | `#455660` → `#B4BBC2` | Linee e testi secondari su scuro | peltro-300 su notte-900: 9,6:1 |
| `argento` | `#F0F3FA` | Testo su scuro (il wordmark) | — |
| `luce` | `#C9AE85` | **L'oro della porta.** Solo su fondi scuri | 8,7:1 su notte-900 (su chiaro solo 2:1) |
| `bronzo` | `#7A5C34` | L'oro per testi e dettagli su fondi chiari | AA su calce (5,8), calce-2 (5,4), istria (4,6) |
| `calce` | `#FAF8F4` | Fondo chiaro principale, il marmorino | — |
| `calce-2` | `#F3EFE8` | Sezioni alternate | — |
| `istria` | `#E4DDD2` | La pietra d'Istria delle facciate: citazioni, "Perché ci piace" | — |
| `inchiostro` | `#0B1622` | Testo principale | 17,2:1 su calce |
| `ardesia` | `#4A5561` | Testo secondario | 7,2:1 su calce |
| `errore` | `#9A3B2E` | Rosso veneziano, solo per errori | 6,5:1 su calce |

Tutti i contrasti sono calcolati (WCAG 2.2). I token sono in `src/app/globals.css`.

### Tipografia

- **EB Garamond** per titoli e testi editoriali. Discende dal romano di Francesco Griffo, inciso per Aldo Manuzio a Venezia; il corsivo è riservato alla voce dell'agenzia. Usato grande e con spaziatura stretta, suona contemporaneo, non antico.
- **Jost** per interfaccia e testo corrente: geometrica, leggibile. In maiuscolo spaziato (0,24 em) richiama il wordmark.
- Scala fluida con `clamp()`: display da 44 a 108 px, H1 da 36 a 72 px, testo 17 px con interlinea 1,65.
- Font serviti dallo stesso dominio con `next/font`, solo subset latin: tre file in tutto.
- In produzione vale la pena valutare una coppia su licenza, per esempio una serif con optical size. Non è necessario per il lancio.

### Mood fotografico

- **Sì:** la Venezia di chi ci vive. Luce radente sui pavimenti alla veneziana, riflessi dell'acqua sui soffitti, altane al tramonto, campi all'alba, dettagli di materiali (marmorino, pietra d'Istria, legno delle altane), finestre con vista inquadrata dall'interno.
- **No:** gondole, San Marco affollata, grandangoli deformanti, HDR, arredi da catalogo, foto di repertorio per il ritratto di Francesco.
- **Formati:** 4:5 per le card (editoriale, verticale), 3:2 e mosaico per le schede, a tutta pagina per hero e zone.

### Linguaggio dell'interfaccia

- Filetti da 1 px (`inchiostro/15` su chiaro, `peltro-300/20` su scuro). Nessun bordo arrotondato, nessuna ombra se non nella barra del confronto.
- **Bottoni:**
  - primario: pieno, maiuscolo spaziato, con il segno della porta, che al passaggio del mouse "si accende" con un alone;
  - secondario: solo il filetto;
  - testuale: filetto che si allunga e freccia che scorre.
- **Card in tre formati:**
  - *feature*, orizzontale e grande;
  - *standard*, verticale 4:5;
  - *compact*, a riga.
  - In elenco il ritmo è una card grande ogni sette e la colonna centrale sfalsata: niente muro di card identiche.
- **Icone** disegnate apposta, a tratto sottile, comprese quelle veneziane: acqua alta, altana, vaporetto, accesso, vincoli.
- **Movimento:**
  - curva unica `cubic-bezier(0.22, 1, 0.36, 1)`, durate tra 300 e 1200 ms;
  - zoom delle foto di 1,03 in 1,2 s;
  - il logo si disegna al primo caricamento;
  - comparsa allo scorrimento solo in CSS (`animation-timeline: view()`);
  - la linea del processo "si accende" scorrendo;
  - tutto disattivato con `prefers-reduced-motion`.

---

## 4. Sitemap e architettura

```
/                              Home
/immobili                      La selezione (filtri nell'URL, vista per zona)
/immobili/[slug]               Scheda immobile          es. /immobili/dorsoduro-ultimo-piano-altana-zattere
/preferiti                     Preferiti e confronto    (noindex)
/vendi                         Vendi con noi            #valutazione
/quartieri                     Guide di zona + "Quale zona fa per voi?"
/quartieri/[slug]              Guida di zona            dorsoduro, cannaregio, san-marco, castello,
                                                        san-polo, santa-croce, giudecca, lido
/chi-siamo                     L'agenzia e Francesco
/contatti                      Canali, sede, form che si adatta al motivo del contatto
/privacy  /cookie              Pagine legali (segnaposto)
/sitemap.xml  /robots.txt  /opengraph-image  /icon.svg
```

**Scelte di architettura:**

- **Slug parlanti** con zona, tipologia e punto forte: servono sia alla SEO sia a chi riceve il link.
- **I filtri vivono nell'URL** (`/immobili?zona=dorsoduro&extra=esterno`): una ricerca si può condividere su WhatsApp.
- **I quartieri sono pagine vere**, non filtri: sono il principale investimento SEO ("vivere a Cannaregio", "case in vendita Dorsoduro").
- **Da prevedere subito:**
  - `/en`: a Venezia una parte importante dei compratori è straniera;
  - un eventuale "Diario" editoriale, se l'agenzia ha tempo di scriverlo con costanza.
- **Non consigliato al lancio:** un blog lasciato vuoto dopo tre articoli danneggia la percezione più di quanto aiuti la SEO.

---

## 5. Wireframe ragionato della homepage

```
┌─────────────────────────────────────────────────────────────┐
│ [logo]   Immobili  Quartieri  Vendi  Chi siamo  Contatti  ▯ [▮ Valuta la tua casa]
│                                                             │
│  AGENZIA IMMOBILIARE BOUTIQUE · VENEZIA          (foto piena)│
│  Venezia,                                                   │
│  una casa alla volta.                     ┌ In evidenza ───┐│
│  Selezioniamo pochi immobili…             │ Ultimo piano…  ││
│  [▮ Scopri le case]  Vendete casa? →      │ 138 m² · €…    ││
│  ───────────────────────────────────────  └────────────────┘│
│  12 immobili in selezione · 8 zone · 1 referente            │
├─────────────────────────────────────────────────────────────┤
│ I — Il nostro metodo                                        │
│ "Non vi mostreremo tante case…"   (manifesto, grande serif) │
│ 01 Selezione   02 Verità   03 Territorio                    │
├─────────────────────────────────────────────────────────────┤
│ II — La selezione                         Tutta la selezione →│
│ [ card feature grande: foto 7 col | testo 5 col ]           │
│ [ card ]                               [ card, sfalsata ]   │
├─────────────────────────────────────────────────────────────┤
│ III — Perché IMMOBILIA (fondo notte)                        │
│ 4 impegni               ┌ Cose da sapere (da una scheda) ┐  │
│                         │ Acqua alta · Scale · Facciata   │  │
│                         └─────────────────────────────────┘  │
├─────────────────────────────────────────────────────────────┤
│ IV — Otto Venezie                   8 zone: carosello su mobile│
├─────────────────────────────────────────────────────────────┤
│ V — Per chi vende (foto scura)      ┌ Zona  [▾] ┐            │
│ "La vostra casa merita più…"        │ Tipo  [▾] │ → /vendi   │
│                                     └ [▮ Richiedi valutazione]│
├─────────────────────────────────────────────────────────────┤
│ VI — "Ci ha detto subito che la casa…" (testimonianza)      │
├─────────────────────────────────────────────────────────────┤
│ Cercate casa? Ricerca su misura │ Vendete? Quanto vale davvero?│
├─────────────────────────────────────────────────────────────┤
│ Footer: logo completo, Anteprima (newsletter), zone, contatti, legale│
└─────────────────────────────────────────────────────────────┘
```

**Perché quest'ordine:**

1. **Hero.** Fa due promesse: la scala ("una casa alla volta") e il territorio ("Venezia"). Offre due strade: chi compra e chi vende. La cornice "In evidenza" mostra subito un immobile vero: prova, non promessa.
2. **Manifesto prima degli immobili.** Chi arriva da un portale deve capire subito che qui le regole sono diverse; poi vede le case con occhi diversi.
3. **Tre immobili, non venti.** Il brief lo chiede e il concept lo impone: la selezione *si vede* dalla quantità.
4. **"Perché IMMOBILIA" mostra, non dice.** Invece di quattro icone con slogan, una vera "Cose da sapere" presa da una scheda: è l'argomento più forte dell'agenzia, reso visibile.
5. **Territorio prima dei venditori.** Chi vende sceglie l'agenzia che conosce la sua zona.
6. **Per chi vende.** Un micro-impegno con due domande facili, che precompila la valutazione su `/vendi`. Funziona anche senza JavaScript.
7. **Chiusura a due strade.** Nessuno esce dalla home senza un'azione possibile.

---

## 6. Scheda immobile (la pagina più importante)

**Struttura:**

1. **Galleria:**
   - mosaico su desktop (1 grande + 2), carosello a scorrimento su mobile con contatore;
   - visualizzazione a schermo intero con `<dialog>`: frecce, Esc, focus gestito.
2. **Percorso e intestazione:** zona · micro-zona · tipologia, titolo, frase d'apertura in corsivo, cioè la voce dell'agenzia.
3. **Dati chiave** in sei celle con filetto: superficie (+ esterni), locali/camere, bagni, piano con ascensore sì o no, **quota dell'ingresso sul medio mare**, **classe energetica con IPE**. L'APE va indicata per legge negli annunci.
4. **Indice interno:** La casa · Cose da sapere · Planimetria · Dettagli · La zona.
5. **La casa:** paragrafo d'apertura in serif grande, poi testo corrente. È scritta come un articolo, non come un elenco.
6. **Perché ci piace:** tre ragioni in corsivo, su pietra d'Istria, firmate da Francesco. È l'unico punto della pagina con il segno della porta.
7. **Cose da sapere:** difetti e informazioni scomode dichiarati prima. Icona per tipo: acqua, accesso, lavori, vincoli, costi, impianti.
8. **Planimetria:**
   - disegnata dai dati delle stanze: muri perimetrali spessi, esterni tratteggiati, scala grafica, nord;
   - livelli a schede e tabella "superfici stanza per stanza";
   - dichiarata come indicativa.
9. **Dettagli tecnici:** superficie commerciale e calpestabile, riscaldamento, costruzione e ristrutturazione, stato, esposizione, vincolo, spese condominiali, disponibilità, riferimento.
10. **La zona:** fermata del vaporetto con minuti e linee, distanze a piedi e in vaporetto, nota sull'acqua alta della zona, link alla guida.
11. **"Avete una domanda su questa casa?"** Un campo e un'email: la conversione più leggera possibile.
12. **Case simili:** stessa zona prima, poi fascia di prezzo vicina.

**Conversione:**
- **Desktop:** box fisso a destra (cornice) con prezzo, €/m², riferimento, "Prenota una visita" e "Chiedi informazioni", salva e confronta, Francesco con il tempo di risposta, telefono, WhatsApp con messaggio precompilato.
- **Mobile:** barra fissa in basso con prezzo e "Prenota visita", che apre un pannello dal basso.

**Prenotazione onesta.** Si indicano giorni, fascia oraria e modalità (in presenza o **in videochiamata**, utile per chi compra dall'estero). Non c'è un calendario con orari "liberi": un'agenzia di una o due persone non può garantirli, e un orario promesso e poi spostato è il modo più rapido per perdere fiducia.

**SEO:** `RealEstateListing` + `Offer` + `BreadcrumbList` in JSON-LD, metadata con prezzo e classe energetica, immagine Open Graph dalla foto di copertina.

**Modello dati** (`src/content/types.ts`), con i campi veneziani espliciti:
- `entranceElevationCm`;
- `vaporetto { stop, lines, minutes }`;
- `features` (altana, corte, accesso acqueo…);
- `listedBuilding`;
- `thingsToKnow[]`, `whyWeLikeIt[]`;
- `plan[]` con le stanze in metri.

---

## 7. Pagina "Vendi con noi"

**Struttura:**
1. **Hero:** "Vendere casa a Venezia richiede più di un annuncio." Due strade: la valutazione e una telefonata con Francesco.
2. **Tre impegni misurabili:** al massimo 20 incarichi, valutazione scritta in 7 giorni, un report ogni 15 giorni. *Da confermare con l'agenzia: una promessa non mantenuta costa più di una promessa non fatta.*
3. **Sei cose che un portale non fa:** valutazione motivata (OMI + compravendite + ciò che i dati non vedono), fotografia, planimetria ridisegnata, racconto editoriale, visite selezionate, report e pratiche fino al rogito (conformità, catasto, APE, Soprintendenza).
4. **Cinque passi, un solo referente,** su una linea che si accende scorrendo, ognuno con la sua durata.
5. **Lo stesso immobile raccontato in due modi:** annuncio tipico contro scheda IMMOBILIA. Il confronto è l'argomento più persuasivo per chi vende.
6. **Testimonianze** di chi ha venduto (segnaposto etichettati come esempio).
7. **Valutazione in tre passi** (`#valutazione`):
   - prima la casa (zona, tipologia, m², piano), poi com'è (stato, punti di forza, tempistiche), infine i contatti;
   - indirizzo e telefono facoltativi; consenso non preselezionato;
   - validazione passo per passo; se il server rifiuta un campo, il wizard torna al passo giusto;
   - si precompila da `?zona=&tipologia=` (dal mini-form della home).
8. **Domande frequenti:** costi, esclusiva, tempi, documenti, vendita a distanza.

**Perché così:** l'ordine è persuasione, poi prova, poi azione. I contatti chiesti alla fine aumentano i completamenti: chi ha già risposto a sei domande sulla propria casa finisce il modulo. La promessa "la valutazione scritta arriva dopo averla vista" filtra chi cerca solo un numero e qualifica il contatto.

---

## 8. Quartieri e guide locali

**Indice** (`/quartieri`):
- otto zone in righe editoriali alternate (foto e testo), con carattere, prezzo indicativo e case in selezione;
- lo strumento **"Quale zona fa per voi?"**: si scelgono le priorità (quiete, servizi, vita serale, verde, accesso dalla terraferma, riparo dall'acqua), la tabella si riordina e segnala "Per voi". È dichiaratamente "il nostro giudizio".

**Ogni zona** (`/quartieri/[slug]`):
- hero, panoramica e box "In breve" con giudizi da 1 a 5;
- vita di ogni giorno, come ci si muove (fermate e linee), da conoscere;
- perché sceglierla e cosa mettere in conto: i pro **e** i contro;
- acqua alta;
- prezzi al m² per stato (da ristrutturare, ristrutturato, di pregio) su una scala comune a tutte le zone, con fonte dichiarata;
- case in selezione;
- **"Le calli di Francesco"**;
- ricerca su misura precompilata con la zona;
- link alle altre zone.

**Suggerimenti di contenuto:**
- **"Le calli di Francesco" è la sezione più preziosa del sito e non può scriverla nessun altro.** La calle preferita, il bacaro, l'ora in cui il campo è più bello, la farmacia aperta la domenica. Tre o quattro righe per zona, in prima persona. È ciò che rende le guide impossibili da copiare e credibili per Google (esperienza diretta).
- **Prezzi sempre con data e fonte:** quotazioni OMI dell'Agenzia delle Entrate più le compravendite seguite dall'agenzia, aggiornati ogni semestre. Un prezzo senza data invecchia male e danneggia la credibilità.
- **Acqua alta:** frasi prudenti e verificabili. Sì a "per ogni casa indichiamo la quota dell'ingresso"; no a promesse generiche su intere zone.
- **SEO per zona:** "vivere a [zona]", "case in vendita [zona] Venezia", "[zona] acqua alta", "scuole [zona]". Una guida ben scritta per zona vale più di venti articoli di blog.
- **Evoluzione:** micro-zone (Zattere, Misericordia, Sant'Elena) come sotto-pagine quando ci sono abbastanza immobili e contenuti.

---

## 9. Copy principale

**Tono di voce:** elegante, concreto, rassicurante, mai snob.
- **Si dà del voi:** ci si rivolge spesso a coppie e famiglie, ed è caldo senza essere confidenziale.
- **Si evitano** "prestigioso", "esclusivo", "da non perdere", "a due passi da tutto". Al loro posto fatti precisi: "tre finestre a sud", "+128 cm", "3 minuti dalla fermata Zattere".
- **Frasi brevi, verbi attivi.** Il corsivo parla in prima persona plurale.

| Dove | Testo |
|---|---|
| Hero, titolo | **Venezia, una casa alla volta.** |
| Hero, sottotitolo | Selezioniamo pochi immobili e li conosciamo fino all'ultimo dettaglio: la luce, la quota dell'acqua, il rumore del campo sotto casa. Così potete scegliere con calma, e con certezza. |
| Manifesto | Non vi mostreremo tante case. Vi mostreremo quelle giuste, e vi diremo tutto: anche quello che di solito non si dice. |
| Selezione | Case scelte, una a una. |
| Perché IMMOBILIA | Quello che un annuncio dovrebbe sempre dire. |
| Territorio | Otto Venezie, e le conosciamo tutte. |
| Per chi vende | La vostra casa merita più di un annuncio. |
| Cose da sapere | Quello che di solito si scopre dopo. Preferiamo dirvelo prima. |
| Vendi, hero | Vendere casa a Venezia richiede più di un annuncio. |
| Vendi, vantaggi | Sei cose che un portale non fa. |
| Vendi, processo | Cinque passi, un solo referente. |
| Quartieri | Otto Venezie. Venezia non è una città sola. |
| Chi siamo | Un'agenzia piccola, per scelta. |
| Contatti | Parliamone. |
| Ricerca su misura | Non avete trovato quello che cercate? |
| Newsletter | Anteprima: le nuove case, prima che siano online. |
| 404 | Questa porta è chiusa. Le altre sono aperte. |

**Microcopy delle CTA:**
- Scopri le case
- Valuta la tua casa
- Prenota una visita
- Chiedi informazioni
- Affidateci la ricerca
- Voglio l'anteprima
- Richiedi la valutazione

Tutti i testi delle pagine principali sono in `src/content/copy.ts`; quelli degli immobili e delle zone in `src/content/`.

---

## 10. Linee guida UX/UI

1. **Una sola azione principale per schermata**, riconoscibile dal segno della porta. Le altre sono secondarie (filetto) o testuali.
2. **Contenuto editoriale e contenuto operativo separati.** Serif, corsivo e spazio largo per raccontare; sans, griglia stretta e controlli nativi per filtrare, confrontare, compilare.
3. **Mostrare invece di dichiarare.** Planimetrie, quote, minuti a piedi, "Cose da sapere": meno aggettivi, più dati.
4. **Form rispettosi:**
   - etichette sempre visibili, facoltativi dichiarati, consenso mai preselezionato;
   - errori in italiano accanto al campo, collegati via `aria-describedby`;
   - i dati inseriti restano dopo un errore;
   - honeypot anti-spam al posto dei captcha;
   - conferma che dice cosa succede dopo ("vi richiamiamo per confermare giorno e ora").
5. **Mobile prima.**
   - Scheda: barra fissa con prezzo e prenotazione.
   - Filtri: in un pannello dal basso.
   - Galleria: a scorrimento.
   - Zone: carosello.
   - Touch target di almeno 40–48 px.
6. **Accessibilità (WCAG 2.2 AA):**
   - contrasti verificati;
   - focus visibile, dorato su scuro e bronzo su chiaro;
   - skip link;
   - `<dialog>` nativi, tabelle con `caption` e `scope`;
   - `aria-pressed` sui toggle, `aria-live` sui risultati;
   - movimento ridotto rispettato.
7. **Prestazioni:**
   - pagine tutte statiche; immagini con proporzioni fisse (CLS 0);
   - foto hero con priorità alta; font serviti localmente, tre file;
   - nessuna libreria di UI, icone o animazioni; validazione solo sul server.
8. **Preferiti senza account.** Salvati nel browser; confronto al massimo di 3 immobili. Con 20 case, account e ricerche salvate sarebbero complessità inutile.
9. **Niente mappa finta.** Per ora la vista "per zona". La mappa vera, con MapLibre e uno stile blu notte e posizioni approssimate per privacy, arriva quando ci sono i dati e una chiave del provider.

---

## 11. Componenti principali

| Componente | Ruolo | File |
|---|---|---|
| `Logo`, `PortaAccesa` | Logo in 3 varianti e 2 toni; segno della porta per le CTA | `src/components/brand/Logo.tsx` |
| `SiteHeader`, `MobileNav`, `SiteFooter` | Header trasparente sugli hero scuri, che si nasconde scendendo; menu a tutto schermo; footer con Anteprima | `src/components/layout/` |
| `Section`, `SectionHeading`, `Cornice` | Ritmo delle sezioni, capitoli numerati, la staffa del logo | `src/components/layout/` |
| `Button`, `ButtonLink`, `Icon`, `ImageFrame` | Bottoni, icone su misura, foto con proporzioni fisse e ripiego se non si caricano | `src/components/ui/` |
| `PropertyCard` (feature, standard, compact) | Card immobile | `src/components/property/PropertyCard.tsx` |
| `PropertyExplorer`, `GalleryResults`, `ZoneResults` | Filtri nell'URL, ritmo editoriale, vista per zona | `src/components/property/` |
| `PropertyGallery`, `FloorPlan`, `ThingsToKnowList`, `PropertyEnquiry` | Galleria e lightbox, planimetria SVG, cose da sapere, box di contatto e barra mobile | `src/components/property/` |
| `SaveButton`, `CompareToggle`, `CompareTray`, `ShortlistView` | Preferiti, confronto, tabella | `src/components/property/`, `src/lib/shortlist-store.ts` |
| `LeadForm` e campi | Contenitore dei form con Server Action ed errori per campo | `src/components/forms/` |
| `VisitRequestForm`, `InfoRequestForm`, `QuickQuestionForm`, `ValuationWizard`, `CustomSearchForm`, `ContactForm`, `PreviewSignup`, `SellerStart` | I form del sito | `src/components/forms/` |
| `NeighborhoodCard`, `LifestyleMatrix`, `RatingSquares` | Zone e matrice interattiva | `src/components/neighborhood/` |
| `ProcessSteps`, `Faq`, `TestimonialQuote`, `LegalPage` | Blocchi editoriali | `src/components/editorial/` |

---

## 12. Implementazione

**Tecnologie:**
- Next.js 16 (App Router, tutte le pagine prerenderizzate), React 19, TypeScript strict;
- Tailwind CSS 4 con i token in CSS;
- zod solo sul server; Server Actions per i form.

**Contenuti:**
- `src/content/*.ts` sono dati tipizzati. Le pagine li leggono solo tramite `src/lib/content.ts`, che oggi legge i file.
- Passando a un CMS headless cambia solo quel file. **Consiglio: Sanity**, per tre motivi:
  - l'editor è in italiano e permette di definire campi specifici (quota, vaporetto, cose da sapere);
  - gestisce ritaglio e punto focale delle foto e ha un suo CDN immagini;
  - il piano gratuito basta per un'agenzia di queste dimensioni.

**Richieste:**
- Ogni form passa da `submitLead` (`src/app/actions/leads.ts`): validazione, honeypot e invio email tramite Resend quando sono configurate le variabili d'ambiente.
- Senza configurazione le richieste vengono registrate nei log **senza dati personali**.
- In produzione il passo successivo è un CRM leggero, oppure almeno una casella dedicata con risposta automatica.

**Verifiche eseguite su questo prototipo:**
- `tsc`, `eslint`, `next build`: puliti. 35 route statiche.
- **axe-core (WCAG 2.2 AA + best practice):** 0 violazioni su 13 pagine, a 1440 e 390 px.
- **Test end-to-end Playwright:** 29 su 29 superati. Coprono:
  - filtri e link diretti, stato vuoto;
  - preferiti e loro persistenza, confronto con limite di 3;
  - visita con errori, conservazione dei campi e invio;
  - lightbox da tastiera, livelli della planimetria;
  - valutazione precompilata dalla home e in 3 passi;
  - matrice delle zone, menu e filtri su mobile.
- **Lighthouse, home su mobile:**
  - performance 92 (throttling simulato) e 94 (throttling applicato);
  - accessibilità, best practice e SEO a 100; CLS 0–0,03.
  - LCP misurato nel browser con rete e CPU rallentate: circa 1,1 s.
  - Queste misure sono **senza foto** (Unsplash non era raggiungibile dall'ambiente di sviluppo): con le immagini l'LCP sarà la foto dell'hero.
- **JavaScript del primo caricamento:** circa 190 kB compressi, di cui circa 150 sono React e Next.js e circa 40 il codice del sito. L'obiettivo iniziale di 120 kB era irrealistico per l'App Router; il costo si vede nel TBT, 60–240 ms.

---

## Prima del lancio: cosa sostituire o decidere

**Brand e materiali:**
- [ ] Logo vettoriale originale dal grafico; validare la versione compatta orizzontale.
- [ ] Shooting professionale di ogni immobile e riscrittura dei testi alternativi. Le foto attuali sono segnaposto Unsplash e **non ritraggono le case descritte**; alcuni ID sono stati scritti a memoria e vanno verificati: se non si caricano compare un ripiego grafico.
- [ ] Ritratto di Francesco (niente foto di repertorio) e foto della sede.
- [ ] Planimetrie reali ridisegnate (oggi sono esempi generati dai dati).

**Contenuti:**
- [ ] Immobili reali: prezzi, quote degli ingressi, APE, spese, "Cose da sapere" verificate con il tecnico.
- [ ] "Perché ci piace" scritti o approvati da Francesco: portano la sua firma.
- [ ] "Le calli di Francesco" per ogni zona.
- [ ] Prezzi al m² per zona validati con le quotazioni OMI e le compravendite, con data.
- [ ] Giudizi della matrice delle zone confermati.
- [ ] Testimonianze vere con consenso scritto, meglio se collegate a recensioni verificabili. Oggi sono esempi etichettati.
- [ ] Lettera di "Chi siamo" (bozza di esempio).

**Impegni e politiche commerciali:**
- [ ] Tempo di risposta (oggi "entro 24 ore lavorative"), massimo di incarichi (20), valutazione in 7 giorni, report ogni 15 giorni: vanno confermati e poi **rispettati**.
- [ ] Provvigione, esclusiva e durata dell'incarico: le FAQ di Vendi assumono esclusiva di sei mesi e provvigione solo a vendita conclusa.

**Legale e tecnico:**
- [ ] Ragione sociale, P.IVA, REA, iscrizione al ruolo, indirizzo, telefono, email, WhatsApp (`src/content/agency.ts`).
- [ ] Informativa privacy e cookie redatte da un consulente.
- [ ] Dominio e `NEXT_PUBLIC_SITE_URL`; `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL`.
- [ ] Analytics rispettosi della privacy e senza cookie (Plausible o Umami), per non dover mostrare un banner di consenso.
- [ ] Versione inglese (`/en`), con dizionario dei testi e `hreflang`.
- [ ] CMS (Sanity) e mappa (MapLibre) nella fase 2.

---

## Rischi da guardare in faccia

- **Il sito promette cura; la cura costa tempo.** "Cose da sapere" oneste, report ogni 15 giorni e risposta entro 24 ore sono impegni operativi prima che di design. Se l'agenzia non riesce a sostenerli, meglio promettere meno.
- **Le foto decidono metà del risultato.** Con foto mediocri questo sito sembrerà un tema premium con case normali. Lo shooting va a budget prima di tutto il resto.
- **Brand personale, rischio personale.** Tutto ruota intorno a Francesco. Va benissimo oggi; se l'agenzia cresce, la "voce" va resa trasferibile: linee guida di scrittura, due o tre persone riconoscibili, "Perché ci piace" firmato da chi ha seguito la casa.
- **La SEO locale è lenta.** Le guide di zona portano risultati in mesi, non settimane, e solo se aggiornate. Il primo canale resta il passaparola, e il sito deve renderlo facile: link condivisibili, WhatsApp, anteprima.
