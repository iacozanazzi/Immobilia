'use client'

import { useSyncExternalStore } from 'react'

/**
 * Preferiti e confronto, senza account: vivono nel browser (localStorage).
 * Ogni accesso è protetto: in navigazione privata o con storage bloccato
 * il sito funziona lo stesso, solo senza memoria.
 */

export const COMPARE_LIMIT = 3
const STORAGE_KEY = 'immobilia:shortlist:v1'

interface Shortlist {
  saved: string[]
  compare: string[]
}

const EMPTY: Shortlist = { saved: [], compare: [] }
let state: Shortlist = EMPTY
let hydrated = false
const listeners = new Set<() => void>()

function read(): Shortlist {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return EMPTY
    const parsed = JSON.parse(raw) as Partial<Shortlist>
    return {
      saved: Array.isArray(parsed.saved) ? parsed.saved.filter((s) => typeof s === 'string') : [],
      compare: Array.isArray(parsed.compare)
        ? parsed.compare.filter((s) => typeof s === 'string').slice(0, COMPARE_LIMIT)
        : [],
    }
  } catch {
    return EMPTY
  }
}

function write(next: Shortlist) {
  state = next
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    // storage non disponibile: la lista resta in memoria per questa sessione
  }
  listeners.forEach((l) => l())
}

function subscribe(listener: () => void) {
  listeners.add(listener)
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = read()
      listener()
    }
  }
  window.addEventListener('storage', onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener('storage', onStorage)
  }
}

function getSnapshot() {
  if (!hydrated) {
    hydrated = true
    state = read()
  }
  return state
}

const getServerSnapshot = () => EMPTY

export function toggleSaved(slug: string) {
  const s = getSnapshot()
  const saved = s.saved.includes(slug) ? s.saved.filter((x) => x !== slug) : [...s.saved, slug]
  write({ ...s, saved })
}

/** Restituisce false se il confronto è già pieno. */
export function toggleCompare(slug: string): boolean {
  const s = getSnapshot()
  if (s.compare.includes(slug)) {
    write({ ...s, compare: s.compare.filter((x) => x !== slug) })
    return true
  }
  if (s.compare.length >= COMPARE_LIMIT) return false
  write({ ...s, compare: [...s.compare, slug] })
  return true
}

export function clearCompare() {
  write({ ...getSnapshot(), compare: [] })
}

export function useShortlist() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
}
