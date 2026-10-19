import type { ReactElement } from 'react'

import type { CivicTokenStage } from '@/types/domain'

type CivicTokenProps = {
  stage: CivicTokenStage
  size?: number
  className?: string
  strokeWidth?: number
}

const GROUND = <path d="M7.2 17h5.6" />

/**
 * One civic token, drawn as a plant at four stages of growth. Same 20 x 20
 * stroke vocabulary as the category motifs and the brand mark — deliberately a
 * seed and a sprout, not a coin.
 */
const STAGES: Record<CivicTokenStage, ReactElement> = {
  seed: (
    <>
      {GROUND}
      <ellipse
        cx="10"
        cy="14.3"
        rx="2.1"
        ry="2.6"
        transform="rotate(-16 10 14.3)"
      />
    </>
  ),
  sprout: (
    <>
      {GROUND}
      <path d="M10 17v-4.2" />
      <ellipse
        cx="12.4"
        cy="11.9"
        rx="1.35"
        ry="2.3"
        transform="rotate(36 12.4 11.9)"
      />
    </>
  ),
  leaf: (
    <>
      {GROUND}
      <path d="M10 17v-6.5" />
      <ellipse cx="7.7" cy="12.7" rx="1.4" ry="2.2" transform="rotate(-36 7.7 12.7)" />
      <ellipse cx="12.3" cy="10.1" rx="1.4" ry="2.2" transform="rotate(36 12.3 10.1)" />
    </>
  ),
  bloom: (
    <>
      {GROUND}
      <path d="M10 17v-5.4" />
      <circle cx="10" cy="8.1" r="3.5" />
    </>
  ),
}

export function CivicToken({
  stage,
  size = 20,
  className,
  strokeWidth = 1.5,
}: CivicTokenProps) {
  return (
    <svg
      viewBox="0 0 20 20"
      width={size}
      height={size}
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
    >
      {STAGES[stage]}
    </svg>
  )
}
