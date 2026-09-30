import Link from 'next/link'
import type { ComponentProps, ReactNode } from 'react'
import { PortaAccesa } from '@/components/brand/Logo'
import { cn } from '@/lib/cn'
import { Icon } from './Icon'

type Variant = 'primary' | 'secondary' | 'ghost'
type Tone = 'light' | 'dark'
type Size = 'sm' | 'md' | 'lg'

const base =
  'group inline-flex items-center justify-center gap-3 font-sans font-medium uppercase tracking-[0.18em] transition-[background-color,border-color,color] duration-500 ease-(--ease-porta) disabled:cursor-not-allowed disabled:opacity-50'

const sizes: Record<Size, string> = {
  sm: 'h-10 px-4 text-[0.68rem]',
  md: 'h-12 px-6 text-[0.72rem]',
  lg: 'h-14 px-8 text-[0.75rem]',
}

const variants: Record<Variant, Record<Tone, string>> = {
  primary: {
    light: 'bg-notte-900 text-calce hover:bg-notte-700',
    dark: 'bg-calce text-notte-900 hover:bg-white',
  },
  secondary: {
    light: 'border border-inchiostro/25 text-inchiostro hover:border-inchiostro',
    dark: 'border border-argento/30 text-argento hover:border-argento',
  },
  ghost: {
    light: 'h-auto! px-0! text-inchiostro',
    dark: 'h-auto! px-0! text-argento',
  },
}

function Inner({ variant, tone, children, icon }: { variant: Variant; tone: Tone; children: ReactNode; icon?: boolean }) {
  if (variant === 'primary') {
    return (
      <>
        <PortaAccesa
          className={cn(
            tone === 'light' ? 'text-luce' : 'text-bronzo',
            'group-hover:shadow-[0_0_14px_3px_rgb(201_174_133/0.5)]',
          )}
        />
        <span>{children}</span>
      </>
    )
  }
  if (variant === 'ghost') {
    return (
      <>
        <span className="link-line pb-1">{children}</span>
        {icon !== false && (
          <Icon
            name="arrow-right"
            className="size-4 transition-transform duration-500 ease-(--ease-porta) group-hover:translate-x-1"
          />
        )}
      </>
    )
  }
  return <span>{children}</span>
}

interface CommonProps {
  variant?: Variant
  tone?: Tone
  size?: Size
  className?: string
  children: ReactNode
  icon?: boolean
}

export function ButtonLink({
  href,
  variant = 'primary',
  tone = 'light',
  size = 'md',
  className,
  children,
  icon,
  ...rest
}: CommonProps & Omit<ComponentProps<typeof Link>, 'className' | 'children'>) {
  return (
    <Link href={href} className={cn(base, sizes[size], variants[variant][tone], className)} {...rest}>
      <Inner variant={variant} tone={tone} icon={icon}>
        {children}
      </Inner>
    </Link>
  )
}

export function Button({
  variant = 'primary',
  tone = 'light',
  size = 'md',
  className,
  children,
  icon,
  type = 'button',
  ...rest
}: CommonProps & Omit<ComponentProps<'button'>, 'className' | 'children'>) {
  return (
    <button type={type} className={cn(base, sizes[size], variants[variant][tone], className)} {...rest}>
      <Inner variant={variant} tone={tone} icon={icon}>
        {children}
      </Inner>
    </button>
  )
}
