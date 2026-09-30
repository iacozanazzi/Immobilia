import type { Metadata } from 'next'
import { LegalPage } from '@/components/editorial/LegalPage'
import { agency } from '@/content/agency'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Informativa privacy',
  description: `Come ${agency.legalName} tratta i dati personali raccolti attraverso il sito.`,
  path: '/privacy',
})

export default function PrivacyPage() {
  return (
    <LegalPage title="Informativa privacy" updated="[data]">
      <p>
        Questa pagina descrive come {agency.legalName} tratta i dati personali di chi usa il sito, ai sensi del Regolamento
        (UE) 2016/679 (GDPR).
      </p>
      <h2>Titolare del trattamento</h2>
      <p>
        {agency.legalName}, {agency.address.street}, {agency.address.postalCode} {agency.address.city}. Email:{' '}
        {agency.email.label}.
      </p>
      <h2>Quali dati raccogliamo</h2>
      <ul>
        <li>I dati che inserite nei moduli: nome, email, telefono, messaggio e le preferenze sull’immobile.</li>
        <li>Per la valutazione: zona, tipologia, superficie e, se lo indicate, l’indirizzo dell’immobile.</li>
        <li>Nessun dato di navigazione a fini di profilazione.</li>
      </ul>
      <h2>Perché e per quanto tempo</h2>
      <p>
        Per rispondere alle vostre richieste e, se lo chiedete, per inviarvi l’anteprima delle nuove case. [Base giuridica,
        tempi di conservazione e destinatari da definire.]
      </p>
      <h2>I vostri diritti</h2>
      <p>
        Accesso, rettifica, cancellazione, limitazione, portabilità e opposizione, scrivendo a {agency.email.label}. Potete
        anche proporre reclamo al Garante per la protezione dei dati personali.
      </p>
    </LegalPage>
  )
}
