import { useState } from 'react'
import { motion } from 'framer-motion'
import { Minus, Plus } from 'lucide-react'

import { CivicToken } from '@/components/illustrations/CivicToken'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'
import { EASE_BLOOM, EASE_SETTLE } from '@/lib/motion'
import {
  TOKEN_STEP,
  placeBlock,
  placeableTokens,
  tokenStage,
  tokensOn,
  useAllocation,
} from '@/state/allocation'
import type { Project } from '@/types/domain'

type TokenControlsProps = {
  project: Project
  className?: string
}

/**
 * Placing tokens on one idea. Reads and writes the shared allocation state, so
 * the number here is the same number the panel and the review show.
 */
export function TokenControls({ project, className }: TokenControlsProps) {
  const { state, dispatch, budget, remaining, locked, ballot } = useAllocation()
  const [pulse, setPulse] = useState({ key: 0, grew: false })

  const placed = tokensOn(state.tokens, project.id)
  const canPlace = locked ? 0 : placeableTokens(project, placed, remaining)
  const canWithdraw = locked ? 0 : Math.min(TOKEN_STEP, placed)
  const block = placeBlock(project, placed, remaining)
  const stage = tokenStage(placed, project.costTokens)

  const lockNote = `Locked in ballot ${ballot?.reference ?? 'your demo ballot'}`

  /* A control at rest says why in its own label, rather than offering "0 tokens". */
  const withdrawLabel =
    locked
      ? `${lockNote}. Amend the review to take tokens back from ${project.title}`
      : canWithdraw === 0
        ? `No tokens to take back from ${project.title} yet`
        : `Take ${canWithdraw} tokens back from ${project.title}`
  const placeLabel = locked
    ? `${lockNote}. Amend the review to place more tokens on ${project.title}`
    : canPlace === 0
      ? block === 'budget'
        ? `All ${budget} tokens are placed — none left for ${project.title}`
        : `${project.title} already has every token it costs`
      : `Place ${canPlace} more tokens on ${project.title}`

  /* One-shot key: the drawing replays on the press that changed it, then rests. */
  function place() {
    if (canPlace === 0) {
      return
    }
    dispatch({ type: 'add', id: project.id, amount: TOKEN_STEP })
    setPulse((current) => ({ key: current.key + 1, grew: true }))
  }

  function withdraw() {
    if (canWithdraw === 0) {
      return
    }
    dispatch({ type: 'remove', id: project.id, amount: TOKEN_STEP })
    setPulse((current) => ({ key: current.key + 1, grew: false }))
  }

  return (
    <div className={cn('border-t border-line pt-5', className)}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
        <p className="text-eyebrow uppercase text-forest">Your tokens on this idea</p>
        <p className="tabular-nums">
          <span className="font-display text-subtitle text-forest-deep">{placed}</span>
          <span className="text-caption text-muted"> of {project.costTokens}</span>
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-2">
        <Button
          variant="secondary"
          size="md"
          iconOnly
          disabled={canWithdraw === 0}
          onClick={withdraw}
          aria-label={withdrawLabel}
        >
          <Minus size={17} strokeWidth={2.2} />
        </Button>

        <span
          className={cn(
            'relative grid size-11 shrink-0 place-items-center rounded-full transition-colors duration-300 ease-settle',
            placed > 0 ? 'bg-sage text-forest-deep' : 'bg-paper-recess text-muted',
          )}
        >
          {pulse.grew && pulse.key > 0 ? (
            <motion.span
              key={`ring-${pulse.key}`}
              aria-hidden="true"
              initial={{ opacity: 0.7, scale: 0.65 }}
              animate={{ opacity: 0, scale: 1.55 }}
              transition={{ duration: 0.6, ease: EASE_SETTLE }}
              className="absolute inset-0 rounded-full bg-sage-deep"
            />
          ) : null}
          <motion.span
            key={`plant-${pulse.key}`}
            className="grid place-items-center"
            initial={
              pulse.key === 0
                ? false
                : pulse.grew
                  ? { opacity: 0.35, scale: 0.72, y: 2.5 }
                  : { opacity: 0.55 }
            }
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: pulse.grew ? 0.45 : 0.24, ease: EASE_BLOOM }}
          >
            <CivicToken stage={stage} size={22} strokeWidth={1.6} />
          </motion.span>
        </span>

        <Button
          variant="primary"
          size="md"
          iconOnly
          disabled={canPlace === 0}
          onClick={place}
          aria-label={placeLabel}
        >
          <Plus size={17} strokeWidth={2.2} />
        </Button>
      </div>

      {locked ? (
        <p className="mt-2.5 text-caption text-muted">
          {lockNote}. Amend the review to change what is planted here.
        </p>
      ) : block === 'budget' ? (
        <p className="mt-2.5 text-caption text-muted">
          All {budget} tokens are placed. Take some back to move them here.
        </p>
      ) : block === 'cost' ? (
        <p className="mt-2.5 text-caption text-muted">
          This idea already has every token it costs.
        </p>
      ) : remaining < TOKEN_STEP ? (
        <p className="mt-2.5 text-caption text-muted">
          Only {remaining} {remaining === 1 ? 'token' : 'tokens'} left in the round.
        </p>
      ) : null}
    </div>
  )
}
