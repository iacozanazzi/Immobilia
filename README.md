# IMMOBILIA di Francesca Cavagnaro

Pagina unica dell'agenzia: logo, contatti, link agli annunci e mappa dell'ufficio in Campo San Tomà.

## Aprirla

Doppio clic su `index.html`: si apre nel browser, non serve installare nulla.

## File

| File | Cosa contiene |
|---|---|
| `index.html` | La pagina: testi, stile e il piccolo script che carica la mappa al clic |
| `logo.svg` | Logo ricostruito in vettoriale, versione per fondo scuro |
| `favicon.svg` | Icona della scheda del browser |
| `docs/brand/logo-reference.jpg` | Il logo originale da cui è stata fatta la ricostruzione |

## Modificare i dati

Aprite `index.html` con un editor di testo.

- **Telefono, email e link** compaiono più volte. Per cambiarli usate "Trova e sostituisci", senza dimenticare i dati per Google nel blocco `application/ld+json` in alto.
- **Testi:** sono scritti direttamente nella pagina. Gli orari non sono indicati di proposito: si riceve su appuntamento.

## Privacy

La pagina non usa cookie né strumenti di tracciamento, quindi non serve il banner dei cookie. La mappa di Google non si carica da sola: compare solo quando il visitatore preme "Mostra la mappa". Il link "Apri in Google Maps" funziona sempre.

## Metterla online

Basta un qualsiasi hosting di siti statici: si caricano i tre file (`index.html`, `logo.svg`, `favicon.svg`) nella cartella principale del dominio.
