import { motion } from 'framer-motion'
import type { ReactNode } from 'react'

import { entranceTransition } from '@/lib/motion'

export type RevealProps = {
  children: ReactNode
  className?: string
  /** Seconds. Used to stagger sibling reveals. */
  delay?: number
  /** Vertical travel in pixels before settling. */
  offset?: number
}

/**
 * Entrances once on scroll. `MotionConfig reducedMotion="user"` in App makes
 * framer-motion drop the translation for visitors who ask for less motion.
 */
export function Reveal({ children, className, delay = 0, offset = 18 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: offset }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={entranceTransition(delay)}
    >
      {children}
    </motion.div>
  )
}
