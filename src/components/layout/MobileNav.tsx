'use client'

import Link from 'next/link'
import { useEffect, useRef } from 'react'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { agency, mainNav } from '@/content/agency'
import { cn } from '@/lib/cn'

const ROMAN = ['I', 'II', 'III', 'IV', 'V', 'VI']

export function MobileNav({ open, onClose, pathname }: { open: boolean; onClose: () => void; pathname: string }) {
  const ref = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const dialog = ref.current
    if (!dialog) return
    if (open && !dialog.open) dialog.showModal()
    if (!open && dialog.open) dialog.close()
  }, [open])

  return (
    <dialog
      ref={ref}
      onClose={onClose}
      aria-label="Menu"
      className="surface-dark fixed inset-0 m-0 h-dvh max-h-none w-full max-w-none overflow-y-auto bg-notte-950 p-0 text-argento backdrop:bg-transparent open:animate-fade lg:hidden"
    >
      <div className="wrap flex min-h-full flex-col">
        <div className="flex h-18 items-center justify-between md:h-20">
          <Link href="/" onClick={onClose} aria-label="IMMOBILIA, torna alla home" className="-m-2 p-2">
            <Logo variant="compact" tone="light" className="h-7 w-auto md:h-8" />
          </Link>
          <button type="button" onClick={onClose} className="-mr-2 inline-flex size-11 items-center justify-center">
            <Icon name="close" className="size-6" />
            <span className="sr-only">Chiudi il menu</span>
          </button>
        </div>

        <nav aria-label="Principale" className="mt-10 flex-1">
          <ul className="border-t border-peltro-300/20">
            {mainNav.map((item, i) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
              return (
                <li key={item.href} className="border-b border-peltro-300/20">
                  <Link
                    href={item.href}
                    onClick={onClose}
                    aria-current={active ? 'page' : undefined}
                    className="flex items-baseline gap-5 py-5"
                  >
                    <span className={cn('w-8 font-serif text-sm', active ? 'text-luce' : 'text-peltro-400')}>{ROMAN[i]}</span>
                    <span className="type-h2">{item.label}</span>
                  </Link>
                </li>
              )
            })}
            <li className="border-b border-peltro-300/20">
              <Link href="/preferiti" onClick={onClose} className="flex items-baseline gap-5 py-5">
                <span className="w-8 font-serif text-sm text-peltro-400">—</span>
                <span className="type-h3 text-peltro-300">Preferiti e confronto</span>
              </Link>
            </li>
          </ul>
        </nav>

        <div className="grid gap-8 py-10">
          <ButtonLink href="/vendi#valutazione" tone="dark" size="lg" onClick={onClose} className="w-full">
            Valuta la tua casa
          </ButtonLink>
          <div className="grid gap-3 text-peltro-300">
            <a href={agency.phone.href} className="inline-flex items-center gap-3">
              <Icon name="phone" className="size-4" /> {agency.phone.label}
            </a>
            <a href={agency.whatsapp.href} className="inline-flex items-center gap-3">
              <Icon name="chat" className="size-4" /> Scriveteci su WhatsApp
            </a>
            <a href={agency.email.href} className="inline-flex items-center gap-3">
              <Icon name="mail" className="size-4" /> {agency.email.label}
            </a>
          </div>
        </div>
      </div>
    </dialog>
  )
}
