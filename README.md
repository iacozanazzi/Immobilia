# IMMOBILIA — sito web (concept)

Sito della boutique immobiliare **IMMOBILIA di Francesco Casagrande**, a Venezia.
Concept funzionante: tutte le pagine, i filtri, i preferiti, il confronto e i form funzionano. Immobili, prezzi e testimonianze sono esempi.

- **Documento di progetto** (brand, concept, direzione visiva, sitemap, wireframe, UX, copy, componenti): [`docs/concept.md`](docs/concept.md)
- **Logo di riferimento:** [`docs/brand/logo-reference.jpg`](docs/brand/logo-reference.jpg) · ricostruzione SVG in [`public/brand/`](public/brand)

## Avvio

Serve Node.js 20.9 o successivo.

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build di produzione, tutte le pagine statiche
npm start
npm run lint
npm run typecheck
```

Variabili d'ambiente, tutte facoltative (vedi `.env.example`):

| Variabile | A cosa serve |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | URL pubblico, usato per canonical, sitemap e Open Graph |
| `RESEND_API_KEY`, `LEADS_TO_EMAIL`, `LEADS_FROM_EMAIL` | Invio delle richieste via email con Resend. Senza queste variabili le richieste vengono solo registrate nei log, senza dati personali |

## Struttura

```
src/
  app/                  pagine (App Router) e Server Action dei form (actions/leads.ts)
  components/
    brand/              logo e segno della porta
    layout/             header, menu mobile, footer, sezioni, cornice
    property/           card, filtri, galleria, planimetria, box di contatto, confronto
    forms/              form con validazione lato server
    neighborhood/       card e matrice delle zone
    editorial/          processo, FAQ, testimonianze, pagine legali
    ui/                 bottoni, icone, immagini
  content/              dati: immobili, zone, agenzia, testi, foto
  lib/                  accesso ai contenuti, SEO, formattazione, preferiti, schemi
```

## Come modificare

- **Immobili e zone:** `src/content/properties.ts` e `src/content/neighborhoods.ts`, tipizzati in `src/content/types.ts`. Le planimetrie si descrivono come stanze rettangolari, in metri.
- **Testi delle pagine:** `src/content/copy.ts`. Dati dell'agenzia (contatti, orari, dati legali): `src/content/agency.ts`.
- **Foto:** si sostituiscono tutte in `src/content/media.ts`. Il loader in `src/lib/image-loader.ts` usa il ridimensionamento via URL di Unsplash; con un CMS va puntato al suo CDN immagini.
- **Colori e tipografia:** token in `src/app/globals.css`, font in `src/app/layout.tsx`.
- **Logo:** `src/components/brand/Logo.tsx` (ricostruzione provvisoria). Quando arriva il vettoriale originale basta sostituire i tracciati; le varianti statiche sono in `public/brand/`.
- **CMS:** le pagine leggono i contenuti solo tramite `src/lib/content.ts`. Per passare a un CMS headless (consigliato: Sanity) si riscrivono quelle funzioni.

## Prima di andare online

L'elenco completo è in [`docs/concept.md`](docs/concept.md#prima-del-lancio-cosa-sostituire-o-decidere). In breve:
- logo vettoriale;
- foto e planimetrie reali;
- dati reali degli immobili;
- prezzi di zona validati con OMI;
- testimonianze vere;
- dati legali, privacy e cookie;
- impegni di servizio confermati.
