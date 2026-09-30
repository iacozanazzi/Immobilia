import type { Metadata } from 'next'
import { LegalPage } from '@/components/editorial/LegalPage'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Cookie',
  description: 'Quali cookie e tecnologie di memorizzazione usa il sito.',
  path: '/cookie',
})

export default function CookiePage() {
  return (
    <LegalPage title="Cookie" updated="[data]">
      <p>
        Nella versione attuale il sito non usa cookie di profilazione né strumenti di analisi di terze parti, e per questo non
        mostra un banner di consenso.
      </p>
      <h2>Memorizzazione locale</h2>
      <p>
        I preferiti e il confronto tra immobili sono salvati solo nel vostro browser (localStorage). Non vengono inviati a
        noi e potete cancellarli in qualsiasi momento dalle impostazioni del browser.
      </p>
      <h2>Se in futuro aggiungeremo strumenti di analisi</h2>
      <p>
        Preferiremo soluzioni rispettose della privacy, senza cookie. Se servisse un consenso, questa pagina e il sito
        verranno aggiornati prima dell’attivazione.
      </p>
    </LegalPage>
  )
}
