'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef, useState } from 'react'
import { Logo } from '@/components/brand/Logo'
import { ButtonLink } from '@/components/ui/Button'
import { Icon } from '@/components/ui/Icon'
import { mainNav } from '@/content/agency'
import { cn } from '@/lib/cn'
import { useShortlist } from '@/lib/shortlist-store'
import { MobileNav } from './MobileNav'

/** Pagine che si aprono con una foto scura a tutta pagina: header trasparente in cima. */
function hasDarkHero(pathname: string) {
  return pathname === '/' || pathname === '/vendi' || pathname === '/chi-siamo' || /^\/quartieri\/[^/]+$/.test(pathname)
}

export function SiteHeader() {
  const pathname = usePathname()
  const { saved } = useShortlist()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const lastY = useRef(0)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      // Si nasconde scendendo, riappare appena si risale.
      if (y <= 480 || y < lastY.current - 4) setHidden(false)
      else if (y > lastY.current + 4) setHidden(true)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const overlay = hasDarkHero(pathname) && !scrolled && !menuOpen
  const tone = overlay ? 'light' : 'dark'

  return (
    <>
      <header
        onFocusCapture={() => setHidden(false)}
        className={cn(
          'fixed inset-x-0 top-0 z-40 transition-[background-color,border-color,transform,color] duration-500 ease-(--ease-porta)',
          overlay
            ? 'surface-dark border-b border-transparent bg-transparent text-argento'
            : 'border-b border-inchiostro/10 bg-calce/92 text-inchiostro backdrop-blur-md',
          hidden && !menuOpen && '-translate-y-full',
        )}
      >
        <div className="wrap flex h-18 items-center justify-between gap-6 md:h-20">
          <Link href="/" aria-label="IMMOBILIA, torna alla home" className="-m-2 p-2">
            <Logo variant="compact" tone={tone} animate className="h-7 w-auto md:h-8" />
          </Link>

          <nav aria-label="Principale" className="hidden lg:block">
            <ul className="flex items-center gap-9">
              {mainNav.map((item) => {
                const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      aria-current={active ? 'page' : undefined}
                      className={cn(
                        'type-eyebrow relative py-2 transition-opacity duration-300 hover:opacity-100',
                        active ? 'opacity-100' : 'opacity-75',
                        "after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-current after:transition-transform after:duration-500 after:content-['']",
                        active ? 'after:scale-x-100' : 'after:scale-x-0 hover:after:scale-x-100',
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-2 md:gap-4">
            <Link
              href="/preferiti"
              className="relative -m-1 inline-flex items-center gap-2 p-2 opacity-80 transition-opacity hover:opacity-100"
              aria-label={`Preferiti${saved.length ? `: ${saved.length} immobili salvati` : ''}`}
            >
              <Icon name="bookmark" className="size-5" />
              {saved.length > 0 && <span className="type-meta type-num">{saved.length}</span>}
            </Link>
            <span className="hidden sm:block">
              <ButtonLink href="/vendi#valutazione" size="sm" tone={overlay ? 'dark' : 'light'}>
                Valuta la tua casa
              </ButtonLink>
            </span>
            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-haspopup="dialog"
              aria-expanded={menuOpen}
              className="-mr-2 inline-flex size-11 items-center justify-center lg:hidden"
            >
              <Icon name="menu" className="size-6" />
              <span className="sr-only">Apri il menu</span>
            </button>
          </div>
        </div>
      </header>
      <MobileNav open={menuOpen} onClose={() => setMenuOpen(false)} pathname={pathname} />
    </>
  )
}
