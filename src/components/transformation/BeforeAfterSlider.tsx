import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent, KeyboardEvent as ReactKeyboardEvent } from 'react'
import { RotateCcw } from 'lucide-react'

import { TransformationScene } from '@/components/transformation/TransformationScene'
import type { SceneSide } from '@/components/transformation/TransformationScene'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { SCENE_ASPECT, scenePointStyle } from '@/lib/scene-geometry'
import type { SceneAnnotation, TransformationArchetype } from '@/types/domain'

const INITIAL_REVEAL = 50
const STEP = 2
const BIG_STEP = 10

function clamp(value: number): number {
  return Math.min(100, Math.max(0, Math.round(value)))
}

type BeforeAfterSliderProps = {
  archetype: TransformationArchetype
  annotations: readonly SceneAnnotation[]
  /** Names the pair for assistive tech, e.g. "Open the mews yard". */
  subject: string
}

export function BeforeAfterSlider({ archetype, annotations, subject }: BeforeAfterSliderProps) {
  const [reveal, setReveal] = useState(INITIAL_REVEAL)
  const [isDragging, setIsDragging] = useState(false)
  const frameRef = useRef<HTMLDivElement>(null)

  function moveToSide(side: SceneSide) {
    setReveal(side === 'before' ? 0 : 100)
  }

  function revealAtClientX(clientX: number) {
    const frame = frameRef.current
    if (frame === null) {
      return
    }
    const bounds = frame.getBoundingClientRect()
    setReveal(clamp(((clientX - bounds.left) / bounds.width) * 100))
  }

  function handlePointerDown(event: ReactPointerEvent<HTMLDivElement>) {
    if (event.pointerType === 'mouse' && event.button !== 0) {
      return
    }
    event.currentTarget.setPointerCapture(event.pointerId)
    setIsDragging(true)
    revealAtClientX(event.clientX)
  }

  function handleKeyDown(event: ReactKeyboardEvent<HTMLDivElement>) {
    const nudge: Record<string, number> = {
      ArrowRight: STEP,
      ArrowUp: STEP,
      ArrowLeft: -STEP,
      ArrowDown: -STEP,
      PageUp: BIG_STEP,
      PageDown: -BIG_STEP,
    }
    const delta = nudge[event.key]

    if (event.key === 'Home') {
      event.preventDefault()
      setReveal(0)
    } else if (event.key === 'End') {
      event.preventDefault()
      setReveal(100)
    } else if (delta !== undefined) {
      event.preventDefault()
      const size = event.shiftKey ? BIG_STEP * Math.sign(delta) : delta
      setReveal((current) => clamp(current + size))
    }
  }

  return (
    <div>
      <div
        ref={frameRef}
        onPointerDown={handlePointerDown}
        onPointerMove={(event) => {
          if (isDragging) {
            revealAtClientX(event.clientX)
          }
        }}
        onPointerUp={() => setIsDragging(false)}
        onPointerCancel={() => setIsDragging(false)}
        onLostPointerCapture={() => setIsDragging(false)}
        style={{ aspectRatio: SCENE_ASPECT }}
        role="group"
        aria-label={`Before and after: ${subject}. Drag the divider, or use the slider underneath.`}
        className={cn(
          'relative w-full touch-pan-y select-none overflow-hidden rounded-panel border border-line bg-paper shadow-lifted',
          isDragging ? 'cursor-grabbing' : 'cursor-ew-resize',
        )}
      >
        <TransformationScene
          archetype={archetype}
          side="before"
          className="absolute inset-0 h-full w-full"
        />

        <div
          aria-hidden="true"
          className={cn(
            'absolute inset-0',
            !isDragging && 'transition-[clip-path] duration-300 ease-settle motion-reduce:transition-none',
          )}
          style={{ clipPath: `inset(0 0 0 ${reveal}%)` }}
        >
          <TransformationScene
            archetype={archetype}
            side="after"
            className="absolute inset-0 h-full w-full"
          />
          {annotations.map((annotation, index) => (
            <span
              key={annotation.label}
              style={scenePointStyle(annotation.at)}
              className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-forest/45 bg-surface font-display text-caption text-forest-deep shadow-soft sm:h-7 sm:w-7 sm:text-body"
            >
              {index + 1}
            </span>
          ))}
        </div>

        <Badge tone="outline" size="md" className="pointer-events-none absolute left-3 top-3 bg-surface/90">
          Today
        </Badge>
        <Badge tone="forest" size="md" className="pointer-events-none absolute right-3 top-3">
          Proposed
        </Badge>

        <div
          className={cn(
            'absolute inset-y-0 w-px',
            !isDragging && 'transition-[left] duration-300 ease-settle motion-reduce:transition-none',
          )}
          style={{ left: `${reveal}%` }}
        >
          <div
            aria-hidden="true"
            className="absolute inset-y-0 left-0 w-10 bg-linear-to-r from-sunshine/35 to-transparent"
          />
          <div aria-hidden="true" className="absolute inset-y-0 left-0 w-px bg-forest" />
          <div
            role="slider"
            tabIndex={0}
            aria-label="Reveal the proposed view"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={reveal}
            aria-valuetext={`${reveal}% of the proposed view showing`}
            onKeyDown={handleKeyDown}
            onPointerDown={(event) => {
              event.currentTarget.focus()
            }}
            className="absolute left-1/2 top-1/2 flex h-12 w-12 -translate-x-1/2 -translate-y-1/2 cursor-ew-resize touch-none items-center justify-center rounded-full border border-forest/30 bg-surface text-forest shadow-lifted"
          >
            <svg width="22" height="14" viewBox="0 0 22 14" fill="none" aria-hidden="true">
              <path d="M7 2 2 7l5 5M15 2l5 5-5 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-3">
        <div className="flex min-w-64 flex-1 items-center gap-3">
          <label htmlFor="reveal-range" className="text-caption font-semibold uppercase tracking-wide whitespace-nowrap text-forest">
            Reveal
          </label>
          <input
            id="reveal-range"
            type="range"
            min={0}
            max={100}
            step={1}
            value={reveal}
            onChange={(event) => setReveal(clamp(Number(event.target.value)))}
            className="h-1.5 w-full cursor-pointer accent-forest"
          />
          <span className="w-11 text-right text-caption tabular-nums text-muted">{reveal}%</span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="soft" size="md" onClick={() => moveToSide('before')}>
            Show today
          </Button>
          <Button variant="soft" size="md" onClick={() => moveToSide('after')}>
            Show proposed
          </Button>
          <Button
            variant="ghost"
            size="md"
            disabled={reveal === INITIAL_REVEAL}
            onClick={() => setReveal(INITIAL_REVEAL)}
            leadingIcon={<RotateCcw size={16} strokeWidth={2.2} />}
          >
            Reset
          </Button>
        </div>
      </div>
    </div>
  )
}
