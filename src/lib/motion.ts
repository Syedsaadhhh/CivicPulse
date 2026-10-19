import type { Transition } from 'framer-motion'

export type Easing = [number, number, number, number]

/** Mirrors `--ease-settle` in src/styles/tokens.css. */
export const EASE_SETTLE: Easing = [0.22, 0.61, 0.36, 1]

/** Mirrors `--ease-bloom` in src/styles/tokens.css. */
export const EASE_BLOOM: Easing = [0.16, 1, 0.3, 1]

export const ENTRANCE_DURATION = 0.6

export const entranceTransition = (delay = 0): Transition => ({
  duration: ENTRANCE_DURATION,
  ease: EASE_SETTLE,
  delay,
})
