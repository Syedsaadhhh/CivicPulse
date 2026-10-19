import { cn } from '@/lib/cn'
import type { NeighbourhoodId } from '@/types/domain'

type MapDecorProps = {
  readonly focusedId: NeighbourhoodId
}

/** Places a glyph from `<defs>` at map coordinates, optionally scaled. */
function Glyph({
  href,
  x,
  y,
  scale = 1,
  rotate = 0,
}: {
  readonly href: string
  readonly x: number
  readonly y: number
  readonly scale?: number
  readonly rotate?: number
}) {
  return <use href={href} transform={`translate(${x} ${y}) rotate(${rotate}) scale(${scale})`} />
}

function range(from: number, to: number, step: number): number[] {
  const values: number[] = []
  for (let value = from; value <= to; value += step) {
    values.push(value)
  }
  return values
}

const CANAL = 'M 316 520 L 764 330'
const CANAL_SOUTH_BANK = 'M 321 531 L 769 341'
const TOWPATH = 'M 331 490 L 731 321'

/** Existing canopy around the edge of the green. */
const GREEN_CANOPY: readonly (readonly [number, number])[] = [
  [392, 50], [430, 36], [480, 32], [540, 34], [600, 36],
  [738, 138], [722, 184], [642, 206], [562, 212], [482, 206], [414, 186],
]

/**
 * The whole illustrated plan view. It carries no text and no controls: names,
 * hit areas and markers are HTML, laid out in the same coordinate system by
 * `src/lib/map-geometry.ts`, so the art and the interaction cannot drift apart.
 */
export function MapDecor({ focusedId }: MapDecorProps) {
  return (
    <svg
      viewBox="0 0 800 600"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
      focusable="false"
    >
      <defs>
        <g id="cp-house">
          <rect x="0" y="7" width="20" height="11" rx="1.5" fill="var(--color-paper)" stroke="var(--color-line-strong)" strokeWidth="1" />
          <path d="M0 7 L10 0 L20 7 Z" fill="var(--color-sage-deep)" />
          <rect x="8" y="12" width="4" height="6" rx="1" fill="var(--color-forest-soft)" opacity="0.5" />
        </g>
        <g id="cp-tree">
          <circle cx="8" cy="8" r="7.5" fill="var(--color-sage)" />
          <circle cx="6" cy="6" r="4.4" fill="var(--color-sage-deep)" opacity="0.9" />
        </g>
        <g id="cp-standard">
          <circle cx="7" cy="7" r="6.4" fill="var(--color-sage-deep)" opacity="0.7" />
          <circle cx="7" cy="7" r="1.7" fill="var(--color-forest-soft)" />
        </g>
        <g id="cp-gap">
          <circle cx="7" cy="7" r="6.4" fill="none" stroke="var(--color-line-strong)" strokeWidth="1.4" strokeDasharray="3 4" />
        </g>
        <g id="cp-van">
          <rect x="0" y="1" width="15" height="7" rx="2" fill="var(--color-line-strong)" />
          <rect x="10" y="2.4" width="3.4" height="4" rx="1" fill="var(--color-paper)" opacity="0.7" />
        </g>
        <g id="cp-table">
          <rect x="0" y="0" width="16" height="6" rx="3" fill="var(--color-sunshine)" opacity="0.92" />
        </g>
        <g id="cp-reed">
          <path
            d="M0 12 C2 8 2 5 1 1 M5 12 C6 7 6 4 8 1 M9 12 C9 8 10 5 12 2"
            stroke="var(--color-forest-soft)"
            strokeWidth="1.4"
            strokeLinecap="round"
            fill="none"
          />
        </g>
      </defs>

      {/* Ground: the space between the districts is the street. */}
      <rect x="0" y="0" width="800" height="600" fill="var(--color-paper-recess)" />

      {/* District plates */}
      <g>
        <rect x="36" y="36" width="300" height="214" rx="20" fill="var(--color-paper)" stroke="var(--color-line)" />
        <rect x="376" y="36" width="388" height="214" rx="20" fill="var(--color-paper)" stroke="var(--color-line)" />
        <rect x="36" y="290" width="240" height="274" rx="20" fill="var(--color-paper)" stroke="var(--color-line)" />
        <rect x="316" y="290" width="448" height="274" rx="20" fill="var(--color-paper)" stroke="var(--color-line)" />
      </g>

      {/* Streets */}
      <g>
        <rect x="0" y="253" width="800" height="34" fill="var(--color-line)" />
        <rect x="0" y="256" width="800" height="7" fill="var(--color-sage-deep)" opacity="0.55" />
        <path d="M0 276 H800" stroke="var(--color-line-strong)" strokeWidth="2.5" strokeDasharray="16 16" opacity="0.8" />
        <rect x="341" y="0" width="30" height="253" fill="var(--color-line)" />
        <path d="M356 8 V246" stroke="var(--color-line-strong)" strokeWidth="2" strokeDasharray="12 14" opacity="0.8" />
        <rect x="281" y="287" width="30" height="313" fill="var(--color-line)" />
        <path d="M296 294 V592" stroke="var(--color-line-strong)" strokeWidth="2" strokeDasharray="12 14" opacity="0.8" />
      </g>

      {/* The cut */}
      <g>
        <path d={CANAL} stroke="var(--color-sage-mist)" strokeWidth="44" strokeLinecap="round" />
        <path d={CANAL} stroke="var(--color-water)" strokeWidth="24" strokeLinecap="round" />
        <path d={CANAL_SOUTH_BANK} stroke="var(--color-line-strong)" strokeWidth="7" strokeDasharray="3 6" opacity="0.75" />
        <path d={CANAL} stroke="var(--color-water-deep)" strokeWidth="1.4" strokeDasharray="10 12" opacity="0.7" />
        <path d={TOWPATH} stroke="var(--color-paper)" strokeWidth="9" strokeLinecap="round" />
        <path d={TOWPATH} stroke="var(--color-line-strong)" strokeWidth="1" strokeDasharray="7 9" opacity="0.8" />
        <path d="M 735 319 L 766 305" stroke="var(--color-line-strong)" strokeWidth="7" strokeDasharray="5 6" opacity="0.5" />
      </g>

      {/* Marigold Mews — frontage, back stores, a yard kept empty */}
      <g className={cn('transition-opacity duration-500 ease-settle', focusedId === 'marigold-mews' ? 'opacity-100' : 'opacity-70')}>
        {range(58, 298, 24).map((x) => (
          <Glyph key={`mw-house-${x}`} href="#cp-house" x={x} y={54} />
        ))}
        <path d="M48 80 H326" stroke="var(--color-line)" strokeWidth="6" />
        <g>
          <rect x="58" y="98" width="36" height="20" rx="2" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
          <rect x="104" y="98" width="36" height="20" rx="2" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
          <rect x="150" y="98" width="36" height="20" rx="2" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
          <rect x="236" y="98" width="44" height="20" rx="2" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
          {range(62, 88, 8).map((x) => (
            <Glyph key={`mw-pot-${x}`} href="#cp-tree" x={x} y={120} scale={0.42} />
          ))}
        </g>
        <path d="M46 146 H330" stroke="var(--color-line)" strokeWidth="15" strokeLinecap="round" />
        <rect x="100" y="166" width="152" height="70" rx="10" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" strokeDasharray="8 7" />
        <Glyph href="#cp-van" x={118} y={196} />
        <Glyph href="#cp-van" x={146} y={196} />
        <Glyph href="#cp-van" x={174} y={196} />
        <rect x="212" y="192" width="24" height="14" rx="3" fill="var(--color-line-strong)" opacity="0.7" />
        <Glyph href="#cp-tree" x={288} y={186} scale={1.1} />
        <Glyph href="#cp-tree" x={306} y={212} />
        {range(246, 300, 18).map((x) => (
          <circle key={`mw-bed-${x}`} cx={x} cy={90} r="3.4" fill="var(--color-sage-deep)" />
        ))}
      </g>

      {/* Ferngate Green — canopy at the edges, worn ground in the middle */}
      <g className={cn('transition-opacity duration-500 ease-settle', focusedId === 'ferngate-green' ? 'opacity-100' : 'opacity-70')}>
        <path
          d="M 430 66 C 512 40, 636 44, 704 80 C 750 106, 744 172, 692 198 C 622 230, 484 228, 432 198 C 392 176, 392 92, 430 66 Z"
          fill="var(--color-sage)"
          opacity="0.6"
        />
        <path d="M 418 186 C 500 150, 596 138, 726 118" stroke="var(--color-paper)" strokeWidth="5" strokeDasharray="12 10" fill="none" opacity="0.9" />
        <path d="M 470 210 C 548 186, 612 192, 706 168" stroke="var(--color-paper)" strokeWidth="4" strokeDasharray="10 10" fill="none" opacity="0.8" />
        {GREEN_CANOPY.map(([x, y]) => (
          <Glyph key={`fg-tree-${x}-${y}`} href="#cp-tree" x={x} y={y} scale={1.15} />
        ))}
        {range(452, 506, 27).map((x) =>
          range(96, 150, 27).map((y) => (
            <Glyph key={`fg-std-${x}-${y}`} href="#cp-standard" x={x} y={y} scale={0.85} />
          )),
        )}
        <rect x="636" y="44" width="112" height="78" rx="10" fill="var(--color-sage-mist)" stroke="var(--color-line-strong)" strokeDasharray="7 6" opacity="0.85" />
        <ellipse cx="670" cy="76" rx="19" ry="8" fill="var(--color-sage-deep)" opacity="0.75" />
        <ellipse cx="714" cy="102" rx="21" ry="9" fill="var(--color-sage-deep)" opacity="0.6" />
        <path d="M636 122 H748" stroke="var(--color-line-strong)" strokeWidth="2.5" strokeDasharray="4 5" />
        <Glyph href="#cp-table" x={556} y={176} />
        <Glyph href="#cp-table" x={590} y={170} />
        <Glyph href="#cp-table" x={624} y={180} />
        {range(688, 736, 20).map((x) => (
          <rect key={`fg-car-${x}`} x={x} y={214} width="11" height="6" rx="2" fill="var(--color-line-strong)" />
        ))}
      </g>

      {/* Alder Row — one terrace, one lane, a row of trees that gives up */}
      <g className={cn('transition-opacity duration-500 ease-settle', focusedId === 'alder-row' ? 'opacity-100' : 'opacity-70')}>
        <rect x="40" y="318" width="28" height="234" rx="3" fill="var(--color-paper)" stroke="var(--color-line-strong)" />
        {range(340, 530, 22).map((y) => (
          <g key={`ar-plot-${y}`}>
            <path d={`M40 ${y} H68`} stroke="var(--color-line-strong)" strokeWidth="1" opacity="0.7" />
            <rect x="63" y={y + 8} width="4" height="7" rx="1" fill="var(--color-forest-soft)" opacity="0.45" />
          </g>
        ))}
        <rect x="101" y="292" width="34" height="266" fill="var(--color-line)" />
        <path d="M118 296 V558" stroke="var(--color-line-strong)" strokeWidth="2" strokeDasharray="10 12" opacity="0.7" />
        {range(320, 424, 26).map((y) => (
          <Glyph key={`ar-alder-${y}`} href="#cp-tree" x={80} y={y} scale={1.05} />
        ))}
        {range(450, 528, 26).map((y) => (
          <Glyph key={`ar-gap-${y}`} href="#cp-gap" x={81} y={y} />
        ))}
        <path d="M142 300 V556" stroke="var(--color-water-deep)" strokeWidth="3" strokeDasharray="9 7" opacity="0.85" />
        {range(440, 460, 10).map((y) => (
          <rect key={`ar-zebra-${y}`} x="103" y={y} width="30" height="5" rx="1" fill="var(--color-paper)" opacity="0.95" />
        ))}
        <rect x="100" y="540" width="40" height="18" rx="6" fill="var(--color-paper)" stroke="var(--color-line-strong)" />
        <rect x="168" y="316" width="100" height="38" rx="4" fill="var(--color-paper)" stroke="var(--color-line-strong)" />
        {range(190, 250, 20).map((x) => (
          <path key={`ar-block-${x}`} d={`M${x} 316 V354`} stroke="var(--color-line-strong)" strokeWidth="1" opacity="0.7" />
        ))}
        <rect x="168" y="360" width="100" height="22" rx="6" fill="var(--color-sage-mist)" />
        <rect x="162" y="470" width="102" height="80" rx="12" fill="var(--color-sage-mist)" stroke="var(--color-line-strong)" strokeDasharray="8 7" />
        <path d="M176 530 H248" stroke="var(--color-sunshine-deep)" strokeWidth="4" strokeLinecap="round" />
        <rect x="186" y="490" width="14" height="10" rx="2" fill="var(--color-sunshine)" opacity="0.8" />
        <rect x="212" y="498" width="12" height="9" rx="2" fill="var(--color-sunshine)" opacity="0.6" />
        <path d="M254 480 V522" stroke="var(--color-forest-soft)" strokeWidth="3" strokeLinecap="round" />
      </g>

      {/* Sycamore Cut — units at the top, a bank that nobody can reach */}
      <g className={cn('transition-opacity duration-500 ease-settle', focusedId === 'sycamore-cut' ? 'opacity-100' : 'opacity-70')}>
        <rect x="334" y="300" width="56" height="32" rx="3" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
        <rect x="398" y="300" width="62" height="26" rx="3" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
        <rect x="334" y="338" width="48" height="26" rx="3" fill="var(--color-paper-recess)" stroke="var(--color-line-strong)" />
        {range(340, 384, 11).map((x) => (
          <path key={`sc-ridge-${x}`} d={`M${x} 300 V332`} stroke="var(--color-line-strong)" strokeWidth="1" opacity="0.6" />
        ))}
        <Glyph href="#cp-tree" x={398} y={432} scale={1.1} />
        <Glyph href="#cp-tree" x={456} y={406} />
        <Glyph href="#cp-reed" x={420} y={484} />
        <Glyph href="#cp-reed" x={440} y={478} scale={1.1} />
        <Glyph href="#cp-reed" x={512} y={446} />
        <Glyph href="#cp-reed" x={612} y={394} />
        <Glyph href="#cp-reed" x={664} y={378} scale={0.9} />
        <g transform="translate(566 412) rotate(-23)">
          {[-10, -3, 4, 11].map((offset) => (
            <rect key={`sc-step-${offset}`} x={-9} y={offset} width="18" height="3.4" rx="1" fill="var(--color-line-strong)" />
          ))}
        </g>
        <g transform="translate(691 337) rotate(-23)">
          <path d="M0 -13 V13" stroke="var(--color-forest-soft)" strokeWidth="2.5" />
          <path d="M-7 -11 L7 11 M-7 11 L7 -11" stroke="var(--color-forest-soft)" strokeWidth="1.6" opacity="0.8" />
          <circle cx="0" cy="-13" r="2.4" fill="var(--color-forest)" />
          <circle cx="0" cy="13" r="2.4" fill="var(--color-forest)" />
        </g>
        <rect x="620" y="470" width="86" height="34" rx="6" fill="var(--color-sage-mist)" />
        <Glyph href="#cp-tree" x={722} y={470} />
        <Glyph href="#cp-tree" x={736} y={500} scale={0.9} />
      </g>

      {/* Orientation, as part of the drawing rather than a control */}
      <g transform="translate(770 570)">
        <circle cx="0" cy="0" r="13" fill="var(--color-paper)" stroke="var(--color-line)" />
        <path d="M0 -9 L3.4 2 L0 0.4 L-3.4 2 Z" fill="var(--color-forest-soft)" />
        <path d="M0 4 V9" stroke="var(--color-line-strong)" strokeWidth="1.4" />
      </g>
    </svg>
  )
}
