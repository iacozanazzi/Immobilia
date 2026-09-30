'use client'

import { useSearchParams } from 'next/navigation'
import { ValuationWizard } from './ValuationWizard'

/** Legge ?zona=&tipologia= (dal mini-form della home) e precompila il primo passo. */
export function ValuationFromQuery() {
  const params = useSearchParams()
  const zona = params.get('zona') ?? undefined
  const tipologia = params.get('tipologia') ?? undefined
  return <ValuationWizard key={`${zona}-${tipologia}`} defaultZone={zona} defaultType={tipologia} />
}
