import type { ReactElement } from 'react'

import type { CategoryMotif as MotifName } from '@/types/domain'

type CategoryMotifProps = {
  motif: MotifName
  size?: number
  className?: string
  strokeWidth?: number
}

const PATHS: Record<MotifName, ReactElement> = {
  tree: (
    <>
      <circle cx="10" cy="7.4" r="5.1" />
      <path d="M10 12.5v4.7" />
      <path d="M7.3 16.2h5.4" />
    </>
  ),
  cycle: (
    <>
      <circle cx="5.2" cy="13.4" r="3.4" />
      <circle cx="14.8" cy="13.4" r="3.4" />
      <path d="M5.2 13.4 8.6 7.4h3.1l3.1 6" />
      <path d="M8.6 7.4h4.2" />
    </>
  ),
  water: (
    <>
      <path d="M2.6 8.6c2.4-2.2 4-2.2 6.4 0s4 2.2 6.4 0" />
      <path d="M2.6 13.2c2.4-2.2 4-2.2 6.4 0s4 2.2 6.4 0" />
    </>
  ),
  gathering: (
    <>
      <path d="M2.8 9.6h14.4" />
      <path d="M5.4 9.6v5.2M14.6 9.6v5.2" />
      <circle cx="6.6" cy="5.4" r="2.1" />
      <circle cx="13.4" cy="5.4" r="2.1" />
    </>
  ),
  swing: (
    <>
      <path d="M3.2 16.6 7.4 4.2h5.2l4.2 12.4" />
      <path d="M7.4 4.2v4.4M12.6 4.2v4.4" />
      <path d="M7.4 8.6h5.2" />
    </>
  ),
}

/** One drawing vocabulary, used by the map pins and the project cards alike. */
export function CategoryMotif({ motif, size = 18, className, strokeWidth = 1.5 }: CategoryMotifProps) {
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
      {PATHS[motif]}
    </svg>
  )
}
