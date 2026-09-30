import Link from 'next/link'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'

export default function NotFound() {
  return (
    <section className="surface-dark bg-notte-950 text-argento">
      <div className="wrap flex min-h-[90svh] flex-col items-start justify-center gap-8 pb-20 pt-36">
        <Logo variant="mark" tone="light" className="h-20 w-auto" title="" />
        <p className="type-eyebrow text-peltro-300">Errore 404</p>
        <h1 className="type-display">Questa porta è chiusa.</h1>
        <p className="type-lead max-w-xl text-peltro-200">
          La pagina che cercate non esiste più, oppure l’immobile è stato venduto. Le altre porte sono aperte.
        </p>
        <div className="flex flex-wrap items-center gap-x-8 gap-y-4">
          <ButtonLink href="/immobili" tone="dark">
            Vedi la selezione
          </ButtonLink>
          <Link href="/" className="type-eyebrow link-line pb-1">
            Torna alla home
          </Link>
        </div>
      </div>
    </section>
  )
}
