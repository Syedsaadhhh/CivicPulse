import { motion } from 'framer-motion'
import type { Variants } from 'framer-motion'

import { cn } from '@/lib/cn'
import { EASE_BLOOM } from '@/lib/motion'

const PETAL_ANGLES = [0, 72, 144, 216, 288] as const

const BLOOM_VARIANTS: Variants = {
  bloom: { rotate: 24, scale: 1.05 },
}

export type BrandMarkProps = {
  size?: number
  className?: string
  /**
   * When false the mark waits for a parent motion component to send the
   * `bloom` variant (e.g. the navbar link), so the whole brand reacts as one.
   */
  interactive?: boolean
}

/**
 * Five-petal bloom on a soft tile. Decorative — the wordmark or link label
 * carries the accessible name.
 */
export function BrandMark({ size = 36, className, interactive = false }: BrandMarkProps) {
  return (
    <motion.svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      variants={BLOOM_VARIANTS}
      whileHover={interactive ? 'bloom' : undefined}
      transition={{ duration: 0.45, ease: EASE_BLOOM }}
      className={cn('shrink-0', className)}
    >
      <rect width="32" height="32" rx="9.5" fill="var(--color-sage-mist)" />
      <g fill="var(--color-forest)">
        {PETAL_ANGLES.map((angle) => (
          <ellipse
            key={angle}
            cx="16"
            cy="10.3"
            rx="3.35"
            ry="5.05"
            transform={`rotate(${angle} 16 16)`}
          />
        ))}
      </g>
      <circle cx="16" cy="16" r="3.05" fill="var(--color-sunshine)" />
    </motion.svg>
  )
}
