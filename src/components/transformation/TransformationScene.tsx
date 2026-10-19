import type { ReactElement } from 'react'

import {
  Bay,
  Bench,
  Bed,
  Car,
  PavingTicks,
  Planter,
  PlayBlock,
  Railing,
  ReedClump,
  Shrub,
  Table,
  Tree,
  Tuft,
  Van,
} from '@/components/transformation/SceneParts'
import type { TransformationArchetype } from '@/types/domain'

export type SceneSide = 'before' | 'after'

type SideProps = { readonly side: SceneSide }

const INK = 'var(--color-line-strong)'

function sequence(from: number, to: number, step: number): number[] {
  const values: number[] = []
  for (let value = from; value <= to; value += step) {
    values.push(value)
  }
  return values
}

/** Kerb to kerb: five bays of frontage, a carriageway, and the pavement you stand on. */
function HighStreet({ side }: SideProps) {
  const isBefore = side === 'before'
  return (
    <>
      <rect width={640} height={400} fill="var(--color-paper)" />
      {sequence(6, 486, 120).map((x) => (
        <Bay key={x} x={x} y={30} width={118} height={180} />
      ))}
      <rect y={210} width={640} height={40} fill="var(--color-paper-recess)" />
      <rect y={250} width={640} height={80} fill="var(--color-line)" />
      <rect y={330} width={640} height={70} fill="var(--color-paper-recess)" />
      <path d="M0 250 H640 M0 330 H640" stroke={INK} strokeWidth="1.6" />

      {isBefore ? (
        <>
          {sequence(16, 576, 80).map((x) => (
            <rect key={`dash-${x}`} x={x} y={288} width={44} height={4} rx={2} fill="var(--color-paper)" opacity="0.85" />
          ))}
          {sequence(20, 580, 80).map((x) => (
            <rect key={`bollard-${x}`} x={x} y={336} width={7} height={22} rx={3} fill={INK} />
          ))}
          <Van x={150} y={198} />
          <Car x={380} y={258} />
          {sequence(40, 600, 140).map((x) => (
            <rect key={`shutter-${x}`} x={x + 14} y={122} width={90} height={88} fill={INK} opacity="0.55" />
          ))}
          <Tuft x={214} y={392} />
          <Tuft x={470} y={396} />
        </>
      ) : (
        <>
          <rect y={314} width={640} height={14} fill="var(--color-sage-deep)" opacity="0.6" />
          <path d="M0 321 H640" stroke="var(--color-paper)" strokeWidth="2" strokeDasharray="14 12" opacity="0.8" />
          <rect x={240} y={250} width={160} height={90} rx={5} fill="var(--color-coral)" opacity="0.45" />
          {sequence(256, 384, 16).map((x) => (
            <path key={`brick-${x}`} d={`M${x} 252 V338`} stroke={INK} strokeWidth="1.2" opacity="0.5" />
          ))}
          <rect x={226} y={296} width={14} height={44} rx={4} fill="var(--color-sunshine)" opacity="0.7" />
          <rect x={400} y={296} width={14} height={44} rx={4} fill="var(--color-sunshine)" opacity="0.7" />
          <Bed x={24} y={348} width={112} />
          <Tree x={170} y={346} scale={0.85} />
          <Bench x={268} y={354} />
          <Tree x={404} y={346} scale={0.85} />
          <Planter x={470} y={348} width={130} />
          <Shrub x={196} y={236} scale={0.7} />
          <Shrub x={520} y={238} scale={0.6} />
        </>
      )}
    </>
  )
}

/** A lane seen across: rooftops behind, the ground in front, and the change on it. */
function GreenWay({ side }: SideProps) {
  const isBefore = side === 'before'
  return (
    <>
      <rect width={640} height={400} fill="var(--color-paper)" />
      <rect y={54} width={640} height={96} fill="var(--color-paper-recess)" />
      {sequence(24, 600, 62).map((x) => (
        <rect key={`roof-${x}`} x={x} y={40} width={15} height={16} fill="var(--color-paper-recess)" />
      ))}
      {sequence(10, 600, 50).map((x) => (
        <rect key={`win-${x}`} x={x} y={86} width={22} height={26} rx={2} fill="var(--color-paper)" opacity="0.9" />
      ))}
      <rect y={150} width={640} height={11} fill="var(--color-sage-deep)" opacity="0.85" />
      <rect y={161} width={640} height={239} fill="var(--color-sage)" />

      {isBefore ? (
        <>
          <rect x={56} y={206} width={528} height={110} rx={6} fill="var(--color-line)" />
          {sequence(188, 452, 132).map((x) => (
            <path key={`bay-${x}`} d={`M${x} 206 V316`} stroke="var(--color-paper)" strokeWidth="3" opacity="0.8" />
          ))}
          <Car x={72} y={232} />
          <Car x={204} y={232} tone="var(--color-sunshine)" />
          <Car x={336} y={232} tone="var(--color-forest-soft)" />
          <ellipse cx={300} cy={360} rx={120} ry={16} fill="var(--color-paper-recess)" opacity="0.8" />
          <ellipse cx={520} cy={372} rx={70} ry={12} fill="var(--color-paper-recess)" opacity="0.7" />
          <Railing x={20} y={330} width={600} posts={9} />
        </>
      ) : (
        <>
          <path
            d="M10 384 C 180 336, 380 356, 630 302"
            stroke="var(--color-paper)"
            strokeWidth={30}
            fill="none"
            strokeLinecap="round"
          />
          <path
            d="M10 384 C 180 336, 380 356, 630 302"
            stroke={INK}
            strokeWidth={1}
            strokeDasharray="10 14"
            fill="none"
            opacity="0.5"
          />
          <Tree x={120} y={330} scale={0.9} stem />
          <Tree x={300} y={298} scale={0.78} stem />
          <Tree x={520} y={344} scale={0.95} stem />
          <Tuft x={60} y={376} />
          <Tuft x={150} y={366} />
          <Tuft x={402} y={382} />
          <Tuft x={596} y={360} />
          <rect x={426} y={244} width={9} height={66} rx={4} fill={INK} />
          <path d="M430 250 C 402 286, 392 300, 386 312" stroke="var(--color-sunshine-deep)" strokeWidth="4" fill="none" strokeLinecap="round" />
          <Bench x={180} y={360} />
        </>
      )}
    </>
  )
}

/** Section across the cut: walls beyond, water between, the path you are on. */
function WaterFront({ side }: SideProps) {
  const isBefore = side === 'before'
  return (
    <>
      <rect width={640} height={400} fill="var(--color-paper)" />
      <rect y={36} width={640} height={114} fill="var(--color-paper-recess)" />
      {sequence(14, 590, 54).map((x) => (
        <g key={`wh-${x}`}>
          <rect x={x} y={62} width={26} height={30} fill="var(--color-paper)" />
          <rect x={x} y={106} width={26} height={30} fill="var(--color-paper)" />
        </g>
      ))}
      <rect y={150} width={640} height={26} fill="var(--color-line)" />
      <rect y={176} width={640} height={130} fill="var(--color-water)" />
      <path d="M0 214 C 60 208, 120 220, 200 214 M240 246 C 320 240, 380 252, 470 244 M500 200 C 550 196, 590 206, 634 200" stroke="var(--color-water-deep)" strokeWidth="2.5" fill="none" opacity="0.8" />
      <rect y={306} width={640} height={94} fill="var(--color-paper-recess)" />

      {isBefore ? (
        <>
          {sequence(6, 620, 16).map((x) => (
            <rect key={`pile-${x}`} x={x} y={298} width={7} height={20} rx={2} fill={INK} opacity="0.9" />
          ))}
          <Railing x={10} y={272} width={620} posts={13} />
          <rect y={330} width={640} height={40} fill="var(--color-line)" opacity="0.7" />
          <Tuft x={96} y={330} />
          <Tuft x={330} y={326} />
          <Tuft x={544} y={332} />
          <PavingTicks x={0} y={372} width={640} step={54} />
        </>
      ) : (
        <>
          <Railing x={10} y={272} width={150} posts={4} />
          <Railing x={480} y={272} width={150} posts={4} />
          <rect x={216} y={284} width={118} height={12} rx={3} fill="var(--color-paper-recess)" stroke={INK} strokeWidth="1.2" />
          <rect x={224} y={296} width={102} height={12} rx={3} fill="var(--color-line)" stroke={INK} strokeWidth="1.2" />
          <rect x={232} y={308} width={86} height={12} rx={3} fill="var(--color-water-deep)" stroke={INK} strokeWidth="1.2" />
          <ReedClump x={396} y={308} />
          <ReedClump x={452} y={304} />
          <ReedClump x={120} y={306} />
          <ReedClump x={172} y={310} />
          <Bench x={460} y={334} />
          <PavingTicks x={0} y={372} width={640} step={54} />
        </>
      )}
    </>
  )
}

/** Looking into the yard: walls on three sides, and whatever is standing in it. */
function Courtyard({ side }: SideProps) {
  const isBefore = side === 'before'
  return (
    <>
      <rect width={640} height={400} fill="var(--color-paper)" />
      <rect x={120} y={26} width={400} height={186} fill="var(--color-sage-mist)" stroke={INK} />
      {sequence(150, 442, 74).map((x) => (
        <rect key={`cw-${x}`} x={x} y={56} width={30} height={38} fill="var(--color-paper)" stroke={INK} strokeWidth="1.2" />
      ))}
      <rect x={286} y={138} width={60} height={74} rx={4} fill="var(--color-forest-soft)" opacity="0.4" />
      <rect y={50} width={118} height={126} fill="var(--color-paper-recess)" stroke={INK} />
      <rect x={522} y={66} width={118} height={178} fill="var(--color-paper-recess)" stroke={INK} />
      <rect y={244} width={640} height={156} fill="var(--color-paper-recess)" />
      <path d="M0 244 H640" stroke={INK} strokeWidth="1.6" />

      {isBefore ? (
        <>
          <Van x={40} y={266} />
          <Van x={196} y={258} />
          <Van x={352} y={268} />
          <path d="M492 300 L504 264 H584 L596 300 Z" fill={INK} opacity="0.85" />
          <path d="M498 282 H590" stroke="var(--color-paper)" strokeWidth="3" opacity="0.7" />
          {sequence(30, 600, 66).map((x) => (
            <rect key={`cbollard-${x}`} x={x} y={352} width={7} height={22} rx={3} fill={INK} opacity="0.8" />
          ))}
          <Tuft x={150} y={392} />
        </>
      ) : (
        <>
          <rect x={54} y={252} width={188} height={62} rx={10} fill="var(--color-paper)" stroke={INK} strokeWidth="1.2" />
          <path d="M78 274 q 18 -14 34 2 q 14 14 32 2" stroke="var(--color-coral)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M132 296 q 22 -12 44 4" stroke="var(--color-forest-soft)" strokeWidth="3" fill="none" strokeLinecap="round" />
          <PlayBlock x={262} y={292} />
          <PlayBlock x={306} y={318} size={26} tone="var(--color-sage-deep)" />
          <PlayBlock x={204} y={330} size={34} tone="var(--color-coral)" />
          <rect x={150} y={318} width={250} height={20} rx={10} fill="var(--color-sunshine-deep)" />
          <Table x={428} y={262} />
          <Bed x={300} y={366} width={130} />
          <Bed x={24} y={368} width={110} />
          <Tree x={584} y={330} scale={0.8} />
          <Shrub x={472} y={352} />
        </>
      )}
    </>
  )
}

const ARCHETYPES: Record<TransformationArchetype, (props: SideProps) => ReactElement> = {
  highstreet: HighStreet,
  greenway: GreenWay,
  waterfront: WaterFront,
  courtyard: Courtyard,
}

/**
 * The light laid over each half. The existing street is washed cool and flat,
 * the proposal is lit warm, so the two read apart at a glance while the
 * drawing underneath stays one scene in one 640 x 400 frame.
 */
const SIDE_WASH: Record<SceneSide, { readonly fill: string; readonly opacity: string }> = {
  before: { fill: 'var(--color-line-strong)', opacity: '0.3' },
  after: { fill: 'var(--color-sunshine)', opacity: '0.12' },
}

export type TransformationSceneProps = {
  archetype: TransformationArchetype
  side: SceneSide
  className?: string
}

/**
 * One frame of the comparison. Before and after are drawn in the same 640 x 400
 * scene, so the two halves of the slider line up street for street.
 */
export function TransformationScene({ archetype, side, className }: TransformationSceneProps) {
  const Scene = ARCHETYPES[archetype]
  const wash = SIDE_WASH[side]

  return (
    <svg
      viewBox="0 0 640 400"
      className={className}
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
      focusable="false"
    >
      <Scene side={side} />
      <rect width={640} height={400} fill={wash.fill} opacity={wash.opacity} />
    </svg>
  )
}
