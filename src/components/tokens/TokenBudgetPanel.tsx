import { ArrowRight } from 'lucide-react'

import { CivicToken } from '@/components/illustrations/CivicToken'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import { tokenStage, useAllocation } from '@/state/allocation'

type TokenBudgetPanelProps = {
  className?: string
}

/**
 * The round's budget in one read. Everything here is derived from the shared
 * allocation state, so the panel, the cards and the review can never disagree.
 */
export function TokenBudgetPanel({ className }: TokenBudgetPanelProps) {
  const { budget, placed, remaining, funded, locked, ballot } = useAllocation()
  const percent = (placed / budget) * 100
  const isSpent = remaining === 0

  return (
    <Card
      variant="surface"
      className={cn('flex flex-wrap items-center gap-x-6 gap-y-4 p-dense', className)}
    >
      {/* The mark and the numbers stay on one line; the review link drops below
          them until there is room for all three across. */}
      <div className="flex min-w-56 flex-1 items-center gap-4">
        <span
          aria-hidden="true"
          className={cn(
            'grid size-12 shrink-0 place-items-center rounded-full transition-colors duration-500 ease-settle',
            isSpent ? 'bg-sunshine text-forest-deep' : 'bg-sage-mist text-forest',
          )}
        >
          <CivicToken stage={tokenStage(placed, budget)} size={26} strokeWidth={1.4} />
        </span>

        <div className="min-w-0 max-w-xl flex-1">
          <p role="status" className="flex flex-wrap items-baseline gap-x-2.5">
            <span className="font-display text-title tabular-nums text-forest-deep">
              {remaining}
            </span>
            <span className="text-caption font-semibold text-muted">
              {isSpent ? 'tokens left to place' : 'tokens still to place'}
            </span>
          </p>

          <div
            aria-hidden="true"
            className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-paper-recess"
          >
            <div
              className={cn(
                'h-full rounded-full transition-[width,background-color] duration-500 ease-settle',
                isSpent ? 'bg-sunshine-deep' : 'bg-forest',
              )}
              style={{ width: `${percent}%` }}
            />
          </div>

          <p className="mt-2 text-caption text-muted">
            {placed} of {budget} placed
            {funded.length > 0
              ? ` · ${funded.length} ${funded.length === 1 ? 'idea' : 'ideas'}`
              : ''}
            {locked ? ` · locked in ${ballot?.reference}` : ''}
          </p>
        </div>
      </div>

      <ButtonLink
        href={locked ? '#passport' : '#review'}
        variant="soft"
        size="sm"
        trailingIcon={<ArrowRight size={15} strokeWidth={2.2} />}
      >
        {locked ? 'View your passport' : 'Review allocation'}
      </ButtonLink>
    </Card>
  )
}
