import { ImageResponse } from 'next/og'

export const alt = 'IMMOBILIA di Francesco Casagrande — Venezia, una casa alla volta'
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/** Immagine di condivisione di default: il marchio sul blu notte del logo. */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'radial-gradient(ellipse at center, #001623 0%, #02000b 100%)',
          color: '#F0F3FA',
        }}
      >
        <svg width="300" height="192" viewBox="-20 -12 547 350" fill="none" stroke="#B4BBC2" strokeWidth="6">
          <path d="M0 325V0L107 107L213 25V150" />
          <path d="M507 325V0L400 107L294 25V150" />
          <path d="M63 110V325" />
          <path d="M444 110V325" />
          <path d="M82 275V191L130 151L178 191V275Z" />
          <path d="M188 275V169L253.5 119L319 169V275Z" />
          <path d="M329 275V191L377 151L425 191V275Z" />
          <rect x="248" y="229" width="11" height="46" fill="#C9AE85" stroke="none" />
        </svg>
        <div style={{ marginTop: 48, fontSize: 64, letterSpacing: 28, paddingLeft: 28 }}>IMMOBILIA</div>
        <div style={{ marginTop: 20, fontSize: 26, letterSpacing: 6, color: '#B4BBC2' }}>Venezia, una casa alla volta</div>
      </div>
    ),
    size,
  )
}
