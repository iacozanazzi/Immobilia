import { PortaAccesa } from '@/components/brand/Logo'
import { neighborhoods } from '@/content/neighborhoods'
import { PROPERTY_TYPE_LABEL } from '@/content/types'
import { SelectField } from './fields'

/**
 * Primo passo della valutazione, direttamente in home: due domande facili
 * (zona, tipologia) e si prosegue su /vendi con i campi già compilati.
 * È un semplice form GET: funziona anche senza JavaScript.
 */
export function SellerStart({ title, cta }: { title: string; cta: string }) {
  return (
    <form action="/vendi#valutazione" method="get" className="grid gap-6">
      <p className="type-eyebrow text-peltro-300">{title}</p>
      <SelectField
        name="zona"
        label="Dove si trova"
        options={neighborhoods.map((n) => ({ value: n.slug, label: n.name }))}
        placeholder="Zona"
      />
      <SelectField
        name="tipologia"
        label="Che tipo di casa è"
        options={Object.entries(PROPERTY_TYPE_LABEL).map(([value, label]) => ({ value, label }))}
        placeholder="Tipologia"
      />
      <button
        type="submit"
        className="group mt-2 inline-flex h-12 items-center justify-center gap-3 bg-calce px-6 font-sans text-[0.72rem] font-medium uppercase tracking-[0.18em] text-notte-900 transition-colors duration-500 hover:bg-white"
      >
        <PortaAccesa className="text-bronzo group-hover:shadow-[0_0_14px_3px_rgb(201_174_133/0.5)]" />
        {cta}
      </button>
    </form>
  )
}
