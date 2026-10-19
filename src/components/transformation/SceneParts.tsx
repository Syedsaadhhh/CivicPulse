/**
 * Drawing primitives for the street-transformation scenes. Everything is placed
 * in scene units (a 640 x 400 frame) and anchored at its own top-left corner, so
 * a before state and an after state can share the same coordinates exactly.
 */

const INK = 'var(--color-line-strong)'

export function Bay({
  x,
  y,
  width = 118,
  height = 170,
  shopfront = true,
}: {
  readonly x: number
  readonly y: number
  readonly width?: number
  readonly height?: number
  readonly shopfront?: boolean
}) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={height} fill="var(--color-sage-mist)" stroke={INK} />
      <rect x={x + 20} y={y + 24} width={28} height={34} fill="var(--color-paper)" stroke={INK} />
      <rect x={x + 68} y={y + 24} width={28} height={34} fill="var(--color-paper)" stroke={INK} />
      {shopfront ? (
        <>
          <rect
            x={x + 14}
            y={y + 92}
            width={width - 28}
            height={height - 104}
            fill="var(--color-paper)"
            stroke={INK}
          />
          <rect
            x={x + width - 40}
            y={y + 104}
            width={22}
            height={height - 116}
            fill="var(--color-forest-soft)"
            opacity="0.4"
          />
        </>
      ) : null}
    </g>
  )
}

export function Tree({
  x,
  y,
  scale = 1,
  stem = false,
  crown = 'var(--color-sage)',
}: {
  readonly x: number
  readonly y: number
  readonly scale?: number
  readonly stem?: boolean
  readonly crown?: string
}) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      {stem ? <rect x={-4} y={-6} width={8} height={44} rx={3} fill={INK} /> : null}
      <circle cx={0} cy={-34} r={32} fill={crown} />
      <circle cx={-11} cy={-42} r={17} fill="var(--color-sage-deep)" opacity="0.85" />
    </g>
  )
}

export function Shrub({ x, y, scale = 1 }: { readonly x: number; readonly y: number; readonly scale?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${scale})`}>
      <ellipse cx={0} cy={-9} rx={17} ry={12} fill="var(--color-sage-deep)" />
      <ellipse cx={-6} cy={-13} rx={9} ry={7} fill="var(--color-sage)" />
    </g>
  )
}

export function Tuft({ x, y }: { readonly x: number; readonly y: number }) {
  return (
    <path
      d={`M${x} ${y} c 3 -8 4 -12 3 -17 M${x + 7} ${y} c 2 -9 2 -13 6 -18 M${x + 14} ${y} c 1 -7 3 -11 7 -14`}
      stroke="var(--color-forest-soft)"
      strokeWidth="2.2"
      strokeLinecap="round"
      fill="none"
      opacity="0.75"
    />
  )
}

export function Car({
  x,
  y,
  tone = 'var(--color-coral)',
}: {
  readonly x: number
  readonly y: number
  readonly tone?: string
}) {
  return (
    <g>
      <rect x={x} y={y + 10} width={78} height={22} rx={8} fill={tone} />
      <rect x={x + 16} y={y} width={44} height={18} rx={7} fill={tone} stroke={INK} strokeWidth={0} />
      <rect x={x + 21} y={y + 4} width={15} height={11} rx={3} fill="var(--color-paper)" opacity="0.8" />
      <rect x={x + 40} y={y + 4} width={15} height={11} rx={3} fill="var(--color-paper)" opacity="0.8" />
      <circle cx={x + 18} cy={y + 32} r={6} fill="var(--color-muted)" />
      <circle cx={x + 60} cy={y + 32} r={6} fill="var(--color-muted)" />
    </g>
  )
}

export function Van({ x, y }: { readonly x: number; readonly y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={104} height={40} rx={7} fill="var(--color-paper)" stroke={INK} strokeWidth={1.4} />
      <rect x={x + 70} y={y + 8} width={24} height={16} rx={4} fill="var(--color-sage)" />
      <circle cx={x + 24} cy={y + 42} r={7} fill="var(--color-muted)" />
      <circle cx={x + 82} cy={y + 42} r={7} fill="var(--color-muted)" />
    </g>
  )
}

export function Bench({ x, y }: { readonly x: number; readonly y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={86} height={9} rx={4} fill="var(--color-sunshine-deep)" />
      <rect x={x} y={y + 14} width={86} height={7} rx={3} fill="var(--color-sunshine-deep)" opacity="0.85" />
      <rect x={x + 6} y={y + 21} width={7} height={16} rx={2} fill={INK} />
      <rect x={x + 73} y={y + 21} width={7} height={16} rx={2} fill={INK} />
    </g>
  )
}

export function Table({ x, y }: { readonly x: number; readonly y: number }) {
  return (
    <g>
      <rect x={x} y={y} width={112} height={12} rx={6} fill="var(--color-sunshine-deep)" />
      <rect x={x + 12} y={y + 12} width={8} height={26} rx={3} fill={INK} />
      <rect x={x + 92} y={y + 12} width={8} height={26} rx={3} fill={INK} />
      <rect x={x - 16} y={y + 16} width={18} height={7} rx={3} fill={INK} opacity="0.7" />
      <rect x={x + 110} y={y + 16} width={18} height={7} rx={3} fill={INK} opacity="0.7" />
    </g>
  )
}

export function Planter({ x, y, width = 120 }: { readonly x: number; readonly y: number; readonly width?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={26} rx={9} fill="var(--color-paper)" stroke={INK} strokeWidth={1.4} />
      <rect x={x + 5} y={y + 5} width={width - 10} height={12} rx={6} fill="var(--color-sage-deep)" opacity="0.7" />
      <Shrub x={x + 26} y={y + 8} scale={0.7} />
      <Shrub x={x + width - 30} y={y + 8} scale={0.6} />
    </g>
  )
}

export function Bed({ x, y, width = 130 }: { readonly x: number; readonly y: number; readonly width?: number }) {
  return (
    <g>
      <rect x={x} y={y} width={width} height={30} rx={12} fill="var(--color-sage)" />
      <Tuft x={x + 18} y={y + 26} />
      <Tuft x={x + 52} y={y + 28} />
      <Tuft x={x + 90} y={y + 26} />
    </g>
  )
}

export function Railing({
  x,
  y,
  width,
  posts = 6,
  tone = INK,
}: {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly posts?: number
  readonly tone?: string
}) {
  const step = width / posts
  return (
    <g>
      <rect x={x} y={y} width={width} height={5} rx={2} fill={tone} />
      <rect x={x} y={y + 16} width={width} height={4} rx={2} fill={tone} opacity="0.8" />
      {Array.from({ length: posts + 1 }, (_entry, index) => (
        <rect key={index} x={x + index * step - 2} y={y} width={4.5} height={34} rx={2} fill={tone} />
      ))}
    </g>
  )
}

export function ReedClump({ x, y }: { readonly x: number; readonly y: number }) {
  return (
    <path
      d={`M${x} ${y} c 6 -18 6 -30 2 -44 M${x + 12} ${y} c 6 -20 6 -32 14 -46 M${x + 24} ${y} c 4 -16 8 -26 18 -34 M${x - 10} ${y} c 4 -14 4 -22 0 -32`}
      stroke="var(--color-forest-soft)"
      strokeWidth="3"
      strokeLinecap="round"
      fill="none"
    />
  )
}

export function PlayBlock({
  x,
  y,
  size = 30,
  tone = 'var(--color-sunshine)',
}: {
  readonly x: number
  readonly y: number
  readonly size?: number
  readonly tone?: string
}) {
  return (
    <g>
      <rect x={x} y={y} width={size} height={size} rx={4} fill={tone} stroke={INK} strokeWidth={1.2} />
      <path d={`M${x} ${y} L${x + size * 0.42} ${y - size * 0.28} L${x + size * 1.42} ${y - size * 0.28} L${x + size} ${y}`} fill={tone} opacity="0.7" />
    </g>
  )
}

export function PavingTicks({ x, y, width, step = 46 }: { readonly x: number; readonly y: number; readonly width: number; readonly step?: number }) {
  const ticks: number[] = []
  for (let offset = step; offset < width; offset += step) {
    ticks.push(offset)
  }
  return (
    <g opacity="0.55">
      {ticks.map((offset) => (
        <path key={offset} d={`M${x + offset} ${y} v 18`} stroke={INK} strokeWidth="1.4" />
      ))}
    </g>
  )
}
