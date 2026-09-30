import type { ReactNode } from 'react'

export function LegalPage({ title, updated, children }: { title: string; updated: string; children: ReactNode }) {
  return (
    <section className="pb-24 pt-36 md:pb-32 md:pt-44">
      <div className="wrap grid gap-12 lg:grid-cols-12">
        <header className="lg:col-span-4">
          <p className="type-eyebrow text-ardesia">Informazioni legali</p>
          <h1 className="type-h1 mt-5">{title}</h1>
          <p className="type-meta mt-6 text-ardesia">Ultimo aggiornamento: {updated}</p>
          <p className="type-meta mt-6 inline-block border border-errore/40 px-3 py-2 text-errore">
            Testo segnaposto: da redigere con un consulente privacy prima del lancio.
          </p>
        </header>
        <div className="prose-immobilia lg:col-span-7 lg:col-start-6 [&_h2]:type-h3 [&_h2]:mt-12 [&_h2]:mb-4 [&_p]:text-inchiostro/85 [&_ul]:mt-4 [&_ul]:grid [&_ul]:gap-2 [&_ul]:list-disc [&_ul]:pl-5">
          {children}
        </div>
      </div>
    </section>
  )
}
