/**
 * Icone a linea disegnate per IMMOBILIA: tratto sottile, angoli netti,
 * stessa grammatica delle linee del logo. Nessuna libreria esterna.
 */

const paths = {
  'arrow-right': 'M3 12h17M15 7l5 5-5 5',
  'arrow-left': 'M21 12H4M9 7l-5 5 5 5',
  'arrow-up-right': 'M7 17 17 7M8 7h9v9',
  'chevron-down': 'M6 9l6 6 6-6',
  'chevron-left': 'M15 5l-7 7 7 7',
  'chevron-right': 'M9 5l7 7-7 7',
  close: 'M5 5l14 14M19 5 5 19',
  menu: 'M3 9h18M3 15h18',
  plus: 'M12 4v16M4 12h16',
  minus: 'M4 12h16',
  check: 'M4 12.5l5 5L20 6.5',
  bookmark: 'M6 3.5h12v17l-6-4.5-6 4.5z',
  compare: 'M3.5 5.5h7v13h-7zM13.5 5.5h7v13h-7z',
  phone: 'M5 3.5h3.5l1.5 4.5-2.2 1.4a11 11 0 0 0 6.8 6.8l1.4-2.2 4.5 1.5V19a1.5 1.5 0 0 1-1.5 1.5A16.5 16.5 0 0 1 3.5 5 1.5 1.5 0 0 1 5 3.5z',
  mail: 'M3 5.5h18v13H3zM3 6l9 7 9-7',
  chat: 'M4 4.5h16v11H10l-4.5 4v-4H4z',
  pin: 'M12 21s-6.5-6.2-6.5-11.2a6.5 6.5 0 0 1 13 0C18.5 14.8 12 21 12 21zM12 12.3a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5z',
  clock: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM12 7.5V12l3 2',
  calendar: 'M4 6h16v14H4zM4 10h16M8 3.5V7M16 3.5V7',
  video: 'M3.5 6.5h12v11h-12zM15.5 10.5l5-3v9l-5-3',
  expand: 'M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5',
  camera: 'M3.5 7.5h4l1.5-2h6l1.5 2h4v11h-17zM12 16a3.2 3.2 0 1 0 0-6.4 3.2 3.2 0 0 0 0 6.4z',
  plan: 'M3.5 3.5h17v17h-17zM3.5 11h7v9.5M10.5 3.5V8M14 11h6.5M14 11v3',
  sliders: 'M4 7h9M17 7h3M4 17h3M11 17h9M15 5v4M9 15v4',
  grid: 'M3.5 3.5h7v7h-7zM13.5 3.5h7v7h-7zM3.5 13.5h7v7h-7zM13.5 13.5h7v7h-7z',
  rows: 'M3.5 4.5h17v6h-17zM3.5 13.5h17v6h-17z',
  // Venezia
  acqua: 'M2.5 14c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 1.5-.8 3-1.2M2.5 18.5c2 0 2-1.5 4-1.5s2 1.5 4 1.5 2-1.5 4-1.5 2 1.5 4 1.5 1.5-.8 3-1.2M12 3v7M9.5 5.5h5',
  accesso: 'M3.5 20.5h4v-4h4v-4h4v-4h5',
  lavori: 'M4 20.5l8.5-8.5M14 4.5l5.5 5.5-3 3-5.5-5.5zM12.5 6l-1.5-1.5',
  vincoli: 'M4 20.5h16M5.5 20.5v-10M9.8 20.5v-10M14.2 20.5v-10M18.5 20.5v-10M3.5 10.5h17L12 4z',
  costi: 'M12 20.5a8.5 8.5 0 1 0 0-17 8.5 8.5 0 0 0 0 17zM15 8.5a3.8 3.8 0 1 0 0 7M7.5 11h5M7.5 13.5h5',
  impianti: 'M13 3.5 6 13.5h5.5l-1 7 7-10h-5.5z',
  vaporetto: 'M3 15.5h18l-2.5 4h-13zM6 15.5v-5h11v5M9 10.5V7.5h5v3M3 21c1.5 0 1.5-.8 3-.8',
  altana: 'M3 12 12 5l9 7M5.5 10.5v10M18.5 10.5v10M8 3.5h8M9 3.5V6M15 3.5V6',
  porta: 'M7 20.5V4.5h10v16M4 20.5h16M14.5 12.5v1',
} as const

export type IconName = keyof typeof paths

export function Icon({
  name,
  className = 'size-5',
  strokeWidth = 1.25,
  title,
}: {
  name: IconName
  className?: string
  strokeWidth?: number
  title?: string
}) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="square"
      strokeLinejoin="miter"
      className={className}
      aria-hidden={title ? undefined : true}
      role={title ? 'img' : undefined}
      aria-label={title}
      focusable="false"
    >
      <path d={paths[name]} />
    </svg>
  )
}
