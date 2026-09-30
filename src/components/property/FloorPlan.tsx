'use client'

import { useId, useState } from 'react'
import type { PlanLevel } from '@/content/types'
import { cn } from '@/lib/cn'
import { formatArea, formatNumber } from '@/lib/format'

/**
 * Planimetria disegnata dai dati delle stanze (in metri), con lo stesso
 * tratto del logo: muri perimetrali più spessi, esterni tratteggiati.
 */
export function FloorPlan({ levels, title }: { levels: PlanLevel[]; title: string }) {
  const [active, setActive] = useState(0)
  const baseId = useId()
  const level = levels[active] ?? levels[0]!

  return (
    <div>
      {levels.length > 1 && (
        <div role="tablist" aria-label="Livelli" className="mb-8 flex flex-wrap gap-2">
          {levels.map((l, i) => (
            <button
              key={l.label}
              id={`${baseId}-tab-${i}`}
              role="tab"
              type="button"
              aria-selected={i === active}
              aria-controls={`${baseId}-panel`}
              onClick={() => setActive(i)}
              className={cn(
                'type-eyebrow h-10 border px-4 transition-colors',
                i === active ? 'border-inchiostro bg-inchiostro text-calce' : 'border-inchiostro/20 text-ardesia hover:border-inchiostro/60',
              )}
            >
              {l.label}
            </button>
          ))}
        </div>
      )}
      <div id={`${baseId}-panel`} role={levels.length > 1 ? 'tabpanel' : undefined} aria-labelledby={levels.length > 1 ? `${baseId}-tab-${active}` : undefined}>
        <PlanDrawing level={level} title={`Planimetria di ${title}, ${level.label.toLowerCase()}`} />
        <RoomTable level={level} />
      </div>
    </div>
  )
}

function PlanDrawing({ level, title }: { level: PlanLevel; title: string }) {
  const hatchId = useId()
  const pad = 0.9
  const maxX = Math.max(...level.rooms.map((r) => r.x + r.w))
  const maxY = Math.max(...level.rooms.map((r) => r.y + r.h))
  const indoor = level.rooms.filter((r) => !r.outdoor)
  const bounds = indoor.length
    ? {
        x: Math.min(...indoor.map((r) => r.x)),
        y: Math.min(...indoor.map((r) => r.y)),
        w: Math.max(...indoor.map((r) => r.x + r.w)) - Math.min(...indoor.map((r) => r.x)),
        h: Math.max(...indoor.map((r) => r.y + r.h)) - Math.min(...indoor.map((r) => r.y)),
      }
    : null
  const width = maxX + pad * 2
  const height = maxY + pad * 2 + 1

  return (
    <svg
      viewBox={`${-pad} ${-pad} ${width} ${height}`}
      role="img"
      aria-label={title}
      className="h-auto max-h-[34rem] w-full text-inchiostro"
    >
      <defs>
        <pattern id={hatchId} width="0.3" height="0.3" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="0.3" stroke="currentColor" strokeWidth="0.02" opacity="0.35" />
        </pattern>
      </defs>

      {level.rooms.map((r, i) => {
        const small = r.w < 2.4 || r.h < 2
        const area = r.w * r.h
        return (
          <g key={`${r.name}-${i}`} className="group">
            <rect
              x={r.x}
              y={r.y}
              width={r.w}
              height={r.h}
              fill={r.outdoor ? `url(#${hatchId})` : 'transparent'}
              stroke="currentColor"
              strokeWidth={1}
              strokeDasharray={r.outdoor ? '4 3' : undefined}
              vectorEffect="non-scaling-stroke"
              className="transition-[fill] duration-300 group-hover:fill-[rgb(11_22_34/0.04)]"
            />
            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2 - (small ? 0.05 : 0.12)}
              textAnchor="middle"
              fontSize={small ? 0.22 : 0.3}
              letterSpacing={small ? 0.02 : 0.05}
              fill="currentColor"
              style={{ fontFamily: 'var(--font-jost)', textTransform: 'uppercase' }}
            >
              {r.name}
            </text>
            <text
              x={r.x + r.w / 2}
              y={r.y + r.h / 2 + (small ? 0.25 : 0.34)}
              textAnchor="middle"
              fontSize={small ? 0.2 : 0.26}
              fill="currentColor"
              opacity={0.6}
              style={{ fontFamily: 'var(--font-jost)' }}
            >
              {formatNumber(Math.round(area * 10) / 10)} m²
            </text>
          </g>
        )
      })}

      {bounds && (
        <rect
          x={bounds.x}
          y={bounds.y}
          width={bounds.w}
          height={bounds.h}
          fill="none"
          stroke="currentColor"
          strokeWidth={3}
          vectorEffect="non-scaling-stroke"
        />
      )}

      {/* Scala grafica: 2 metri */}
      <g transform={`translate(0 ${maxY + 0.7})`} fill="currentColor" opacity={0.7}>
        <path d="M0 0H2M0 -0.08V0.08M1 -0.05V0.05M2 -0.08V0.08" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <text x={2.2} y={0.09} fontSize={0.24} style={{ fontFamily: 'var(--font-jost)' }}>
          2 m
        </text>
      </g>
      {/* Nord */}
      <g transform={`translate(${maxX - 0.3} ${maxY + 0.62})`} opacity={0.7}>
        <path d="M0 0.25V-0.25M-0.1 -0.12L0 -0.25L0.1 -0.12" fill="none" stroke="currentColor" strokeWidth={1} vectorEffect="non-scaling-stroke" />
        <text x={0.18} y={0.08} fontSize={0.24} fill="currentColor" style={{ fontFamily: 'var(--font-jost)' }}>
          N
        </text>
      </g>
    </svg>
  )
}

function RoomTable({ level }: { level: PlanLevel }) {
  const indoor = level.rooms.filter((r) => !r.outdoor)
  const outdoor = level.rooms.filter((r) => r.outdoor)
  const total = indoor.reduce((sum, r) => sum + r.w * r.h, 0)
  return (
    <details className="group mt-8 border-t border-inchiostro/15">
      <summary className="type-eyebrow flex cursor-pointer list-none items-center justify-between py-4 text-ardesia hover:text-inchiostro [&::-webkit-details-marker]:hidden">
        Superfici stanza per stanza
        <span aria-hidden className="text-lg transition-transform group-open:rotate-45">
          +
        </span>
      </summary>
      <table className="type-num mb-4 w-full text-left text-[0.95rem]">
        <caption className="sr-only">Superfici di {level.label.toLowerCase()}</caption>
        <thead className="sr-only">
          <tr>
            <th scope="col">Ambiente</th>
            <th scope="col">Superficie</th>
          </tr>
        </thead>
        <tbody>
          {[...indoor, ...outdoor].map((r, i) => (
            <tr key={`${r.name}-${i}`} className="border-t border-inchiostro/10">
              <td className="py-2.5">
                {r.name}
                {r.outdoor && <span className="text-ardesia"> · esterno</span>}
              </td>
              <td className="py-2.5 text-right">{formatArea(Math.round(r.w * r.h * 10) / 10)}</td>
            </tr>
          ))}
          {indoor.length > 0 && (
            <tr className="border-t border-inchiostro/25 font-medium">
              <td className="py-2.5">Totale calpestabile</td>
              <td className="py-2.5 text-right">{formatArea(Math.round(total))}</td>
            </tr>
          )}
        </tbody>
      </table>
    </details>
  )
}
