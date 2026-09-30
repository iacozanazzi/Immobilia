'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Icon } from '@/components/ui/Icon'
import { LIFESTYLE_LABEL, type LifestyleKey, type Neighborhood } from '@/content/types'
import { cn } from '@/lib/cn'
import { RatingSquares } from './Ratings'

const KEYS = Object.keys(LIFESTYLE_LABEL) as LifestyleKey[]

/**
 * "Quale zona fa per voi?": si scelgono le priorità, la tabella si riordina.
 * È dichiaratamente il nostro giudizio, non una classifica oggettiva.
 */
export function LifestyleMatrix({ zones }: { zones: Array<Pick<Neighborhood, 'slug' | 'name' | 'lifestyle'>> }) {
  const [priorities, setPriorities] = useState<LifestyleKey[]>([])

  const score = (z: (typeof zones)[number]) =>
    priorities.length ? priorities.reduce((sum, k) => sum + z.lifestyle[k], 0) / priorities.length : 0
  const sorted = priorities.length ? [...zones].sort((a, b) => score(b) - score(a)) : zones
  const best = priorities.length ? score(sorted[0]!) : null

  return (
    <div>
      <fieldset>
        <legend className="type-eyebrow text-ardesia">Cosa conta di più per voi?</legend>
        <div className="mt-4 flex flex-wrap gap-2">
          {KEYS.map((k) => {
            const on = priorities.includes(k)
            return (
              <button
                key={k}
                type="button"
                aria-pressed={on}
                title={LIFESTYLE_LABEL[k].hint}
                onClick={() => setPriorities(on ? priorities.filter((p) => p !== k) : [...priorities, k])}
                className={cn(
                  'inline-flex h-10 items-center gap-2 border px-4 text-[0.95rem] transition-colors duration-300',
                  on ? 'border-inchiostro bg-inchiostro text-calce' : 'border-inchiostro/20 hover:border-inchiostro/60',
                )}
              >
                {on && <Icon name="check" className="size-3.5" strokeWidth={1.75} />}
                {LIFESTYLE_LABEL[k].label}
              </button>
            )
          })}
        </div>
      </fieldset>

      <div className="no-scrollbar -mx-5 mt-10 overflow-x-auto px-5 md:mx-0 md:px-0">
        <table className="w-full min-w-[44rem] border-collapse text-left">
          <caption className="sr-only">
            Giudizio di IMMOBILIA sulle zone di Venezia, da 1 a 5, per quiete, servizi, vita serale, verde, accesso e riparo dall’acqua alta
          </caption>
          <thead>
            <tr className="border-b border-inchiostro/25">
              <th scope="col" className="type-eyebrow py-4 pr-6 font-medium text-ardesia">
                Zona
              </th>
              {KEYS.map((k) => (
                <th
                  key={k}
                  scope="col"
                  className={cn('type-eyebrow px-3 py-4 font-medium', priorities.includes(k) ? 'text-inchiostro' : 'text-ardesia')}
                >
                  {LIFESTYLE_LABEL[k].label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody aria-live="polite">
            {sorted.map((z) => {
              const top = best !== null && score(z) === best
              return (
                <tr key={z.slug} className={cn('border-b border-inchiostro/10 transition-colors', top && 'bg-istria/60')}>
                  <th scope="row" className="py-4 pr-6 font-normal">
                    <Link href={`/quartieri/${z.slug}`} className="type-h3 link-line pb-0.5 text-[1.25rem]!">
                      {z.name}
                    </Link>
                    {top && <span className="type-eyebrow ml-3 text-bronzo">Per voi</span>}
                  </th>
                  {KEYS.map((k) => (
                    <td key={k} className={cn('px-3 py-4', !priorities.includes(k) && priorities.length > 0 && 'opacity-40')}>
                      <RatingSquares value={z.lifestyle[k]} label={LIFESTYLE_LABEL[k].label} />
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <p className="type-meta mt-6 max-w-2xl text-ardesia">
        È il nostro giudizio, costruito visitando case e vivendo la città: non una classifica. “Riparo dall’acqua” indica
        quote medie più favorevoli; per ogni casa conta la quota esatta dell’ingresso, che trovate nella scheda.
      </p>
    </div>
  )
}
