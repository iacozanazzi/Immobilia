/**
 * Logo IMMOBILIA ricostruito in vettoriale dal file di riferimento
 * (docs/brand/logo-reference.jpg, 145×60 px). È una ricostruzione
 * provvisoria: va sostituita con il vettoriale originale del grafico.
 *
 * Struttura del marchio: due "M" come facciate (richiamano la MM del
 * nome), tre case con tetto a capanna, una sola porta accesa in oro.
 * La linea di terra si piega a staffa e incornicia il nome.
 */

type Tone = 'light' | 'dark'
type Variant = 'full' | 'compact' | 'mark'

const TONES: Record<Tone, { line: string; word: string; sub: string; door: string }> = {
  // su fondo scuro
  light: { line: '#B4BBC2', word: '#F0F3FA', sub: '#B4BBC2', door: '#C9AE85' },
  // su fondo chiaro
  dark: { line: '#455660', word: '#0B1622', sub: '#4A5561', door: '#A8865A' },
}

/* Marchio in coordinate locali 507 × 325 (base delle facciate a y=325). */
const MARK_LINES = [
  'M0 325V0L107 107L213 25V150', // facciata M sinistra
  'M507 325V0L400 107L294 25V150', // facciata M destra
  'M63 110V325', // filo interno sinistro
  'M444 110V325', // filo interno destro
  'M82 275V191L130 151L178 191V275Z', // casa sinistra
  'M188 275V169L253.5 119L319 169V275Z', // casa centrale
  'M329 275V191L377 151L425 191V275Z', // casa destra
]
const DOOR = { x: 248, y: 229, width: 11, height: 46 }

/* Wordmark a tratto: altezza delle maiuscole 100, origine in alto a sinistra. */
const LETTERS: Array<{ d: string; width: number }> = [
  { d: 'M0 0V100', width: 0 }, // I
  { d: 'M0 100V0L35 62L70 0V100', width: 70 }, // M
  { d: 'M0 100V0L35 62L70 0V100', width: 70 }, // M
  { d: 'M48 0A48 50 0 1 1 48 100A48 50 0 1 1 48 0Z', width: 96 }, // O
  { d: 'M0 100V0H30A23 23 0 0 1 30 46H0M30 46H34A27 27 0 0 1 34 100H0', width: 61 }, // B
  { d: 'M0 0V100', width: 0 }, // I
  { d: 'M0 0V100H56', width: 56 }, // L
  { d: 'M0 0V100', width: 0 }, // I
  { d: 'M0 100L36 0L72 100M13 64H59', width: 72 }, // A
]
const wordWidth = (gap: number) => LETTERS.reduce((sum, l) => sum + l.width, 0) + gap * (LETTERS.length - 1)

function Wordmark({ color, strokeWidth, gap }: { color: string; strokeWidth: number; gap: number }) {
  let x = 0
  return (
    <g fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinejoin="miter" strokeMiterlimit={2.5}>
      {LETTERS.map((l, i) => {
        const path = <path key={i} d={l.d} transform={`translate(${x} 0)`} />
        x += l.width + gap
        return path
      })}
    </g>
  )
}

function Mark({
  line,
  door,
  strokeWidth,
  animate,
  ground = false,
}: {
  line: string
  door: string
  strokeWidth: number
  animate: boolean
  ground?: boolean
}) {
  const lines = ground ? [...MARK_LINES, 'M-40 325H547'] : MARK_LINES
  return (
    <g className={animate ? 'draw-lines' : undefined}>
      <g fill="none" stroke={line} strokeWidth={strokeWidth} strokeLinejoin="miter" strokeMiterlimit={4}>
        {lines.map((d, i) => (
          <path key={i} d={d} pathLength={animate ? 1 : undefined} />
        ))}
      </g>
      <rect className="porta" {...DOOR} fill={door} />
    </g>
  )
}

export function Logo({
  variant = 'compact',
  tone = 'dark',
  animate = false,
  className,
  title = 'IMMOBILIA di Francesco Casagrande',
}: {
  variant?: Variant
  tone?: Tone
  animate?: boolean
  className?: string
  title?: string
}) {
  const c = TONES[tone]

  if (variant === 'mark') {
    return (
      <svg viewBox="-48 -12 603 350" className={className} role="img" aria-label={title}>
        <Mark line={c.line} door={c.door} strokeWidth={9} animate={animate} ground />
      </svg>
    )
  }

  if (variant === 'compact') {
    // Marchio a sinistra, nome a destra, allineati sulla stessa linea di terra.
    const s = 0.8
    const gap = 78
    const wordX = 507 * s + 92
    return (
      <svg viewBox={`-40 -10 ${wordX + wordWidth(gap) + 92} 290`} className={className} role="img" aria-label={title}>
        <g transform={`scale(${s})`}>
          <Mark line={c.line} door={c.door} strokeWidth={11} animate={animate} ground />
        </g>
        <g transform={`translate(${wordX} ${325 * s - 100})`}>
          <Wordmark color={c.word} strokeWidth={10.5} gap={gap} />
        </g>
      </svg>
    )
  }

  // full: composizione originale con staffa e firma.
  const cx = 773.5
  const markScale = 1.18
  const markLeft = cx - (507 * markScale) / 2
  const markRight = cx + (507 * markScale) / 2
  const base = 428
  return (
    <svg viewBox="40 24 1467 668" className={className} role="img" aria-label={title}>
      <g transform={`translate(${markLeft} ${base - 325 * markScale}) scale(${markScale})`}>
        <Mark line={c.line} door={c.door} strokeWidth={5.5} animate={animate} />
      </g>
      <g fill="none" stroke={c.line} strokeWidth={6.5}>
        <path d={`M${markLeft} ${base}H60V596H86`} />
        <path d={`M${markRight} ${base}H1487V596H1461`} />
      </g>
      <g transform={`translate(${cx - wordWidth(100) / 2} 478)`}>
        <Wordmark color={c.word} strokeWidth={10} gap={100} />
      </g>
      <text
        x={cx}
        y={670}
        fill={c.sub}
        textAnchor="middle"
        fontSize={40}
        letterSpacing={12}
        style={{ fontFamily: 'var(--font-jost), system-ui, sans-serif', fontWeight: 400 }}
      >
        di Francesco Casagrande
      </text>
    </svg>
  )
}

/** Il segno della porta accesa: accompagna la CTA principale. */
export function PortaAccesa({ className = '' }: { className?: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-block h-[0.8em] w-[0.42em] shrink-0 bg-current transition-[box-shadow,transform] duration-500 ease-(--ease-porta) ${className}`}
    />
  )
}
