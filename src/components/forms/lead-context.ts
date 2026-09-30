'use client'

import { createContext, useContext } from 'react'

export interface LeadFormContextValue {
  errors: Record<string, string>
  pending: boolean
}

export const LeadFormContext = createContext<LeadFormContextValue>({ errors: {}, pending: false })

export function useFieldError(name: string, explicit?: string) {
  const { errors } = useContext(LeadFormContext)
  return explicit ?? errors[name]
}

export function useLeadPending() {
  return useContext(LeadFormContext).pending
}
