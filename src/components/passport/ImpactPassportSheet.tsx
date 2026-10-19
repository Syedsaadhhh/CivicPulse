import { CivicToken } from '@/components/illustrations/CivicToken'
import { BrandMark } from '@/components/brand/BrandMark'
import { Badge } from '@/components/ui/Badge'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/cn'
import { ROUND } from '@/data/round'
import { DEMO_NOTICE, type PassportView } from '@/lib/passport'

/** Forest first, then the restrained accents — one tint per funded idea. */
const SEGMENT_TINTS = ['bg-forest', 'bg-sage-deep', 'bg-sunshine', 'bg-coral', 'bg-sage'] as const

/** The planting: a drawn plant per funded idea, scaled by its share of the round. */
function plantSize(share: number): number {
  return Math.round(44 + Math.min(share, 100) * 0.44)
}

export type ImpactPassportSheetProps = {
  view: PassportView
}

export function ImpactPassportSheet({ view }: ImpactPassportSheetProps) {
  const { rows, remaining, budget, placed } = view

  return (
    <Card variant="surface" data-passport-sheet="" className="overflow-hidden p-0">
      <div className="border-b border-line bg-sage-mist px-dense py-dense">
        <div className="flex flex-wrap items-center justify-between gap-x-4 gap-y-2">
          <span className="flex items-center gap-2.5">
            <BrandMark size={30} />
            <span className="text-eyebrow uppercase tracking-[0.14em] text-forest">
              Community Impact Passport
            </span>
          </span>
          <p className="text-caption tabular-nums text-muted">
            Demo ballot <span className="font-semibold text-forest-deep">{view.reference}</span>
          </p>
        </div>

        <h3 className="mt-6 font-display text-title text-forest-deep">{view.title}</h3>
        <p className="mt-2 text-body text-moss">
          {view.standfirst} · confirmed {view.confirmedAtLabel}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <Badge tone="outline">{ROUND.name}</Badge>
          {view.neighbourhoods.map((group) => (
            <Badge key={String(group.id)} tone="sage">
              {group.name} · {group.tokens}
            </Badge>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-dense px-dense py-dense">
        {/* One plant per idea. Sizes and counts both come from the ballot. */}
        <ul className="flex flex-wrap items-end gap-x-3 gap-y-4">
          {rows.map((row) => {
            const size = plantSize(row.share)
            return (
              <li key={row.id} className="grid justify-items-center gap-1.5">
                <span
                  aria-hidden="true"
                  className="grid place-items-center rounded-full border border-sage-deep bg-paper text-forest-deep"
                  style={{ width: `${size}px`, height: `${size}px` }}
                >
                  <CivicToken stage={row.stage} size={Math.round(size * 0.62)} strokeWidth={1.4} />
                </span>
                <span className="font-display text-caption tabular-nums text-forest-deep">
                  {row.tokens}
                </span>
                <span className="sr-only">
                  {row.title} in {row.neighbourhood} holds {row.tokens} tokens.
                </span>
              </li>
            )
          })}
          {remaining > 0 ? (
            <li className="grid justify-items-center gap-1.5">
              <span
                aria-hidden="true"
                className="grid size-11 place-items-center rounded-full border border-dashed border-line-strong bg-paper-recess text-muted"
              >
                <CivicToken stage="seed" size={20} strokeWidth={1.4} />
              </span>
              <span className="font-display text-caption tabular-nums text-muted">
                {remaining}
              </span>
              <span className="sr-only">
                {remaining} tokens were left unplaced.
              </span>
            </li>
          ) : null}
        </ul>

        {/* Percentage distribution of the whole budget, then the same numbers in words. */}
        <div>
          <div
            aria-hidden="true"
            className="flex h-2.5 w-full overflow-hidden rounded-full bg-paper-recess"
          >
            {rows.map((row, index) => (
              <div
                key={row.id}
                className={cn(SEGMENT_TINTS[index % SEGMENT_TINTS.length])}
                style={{ width: `${row.share}%` }}
              />
            ))}
            {remaining > 0 ? (
              <div className="bg-paper" style={{ width: `${view.unusedShare}%` }} />
            ) : null}
          </div>
          <p className="mt-2 text-caption text-muted">
            {placed} of {budget} placed — {rows.length === 1 ? 'one idea' : `${rows.length} ideas`}{' '}
            carrying {Math.round(100 - view.unusedShare)}% of the round
            {remaining > 0 ? `, ${remaining} unplaced` : ', nothing held back'}.
          </p>
        </div>

        <ol className="flex flex-col gap-2.5">
          {rows.map((row, index) => (
            <li key={row.id}>
              <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 border-t border-line pt-2.5">
                <span
                  aria-hidden="true"
                  className={cn(
                    'size-2.5 shrink-0 self-center rounded-full',
                    SEGMENT_TINTS[index % SEGMENT_TINTS.length],
                  )}
                />
                <h4 className="font-display text-body text-moss">{row.title}</h4>
                <p className="text-caption text-muted">
                  {row.category} · {row.neighbourhood}
                </p>
                <p className="ml-auto flex items-baseline gap-2 tabular-nums">
                  <span className="font-display text-subtitle text-forest-deep">{row.tokens}</span>
                  <span className="text-caption text-muted">
                    of {row.costTokens} · {Math.round(row.share)}%
                  </span>
                </p>
              </div>
              <p className="mt-1 text-caption text-muted">{row.hook}</p>
            </li>
          ))}
        </ol>

        <dl className="grid gap-3 border-t border-line pt-4 sm:grid-cols-3">
          <div>
            <dt className="text-eyebrow uppercase text-forest">Allocated</dt>
            <dd className="mt-1 font-display text-subtitle tabular-nums text-forest-deep">
              {placed} tokens
            </dd>
          </div>
          <div>
            <dt className="text-eyebrow uppercase text-forest">Unused</dt>
            <dd className="mt-1 font-display text-subtitle tabular-nums text-moss">
              {remaining} tokens
            </dd>
          </div>
          <div>
            <dt className="text-eyebrow uppercase text-forest">Ideas touched</dt>
            <dd className="mt-1 font-display text-subtitle tabular-nums text-moss">
              {rows.length} in {view.neighbourhoods.length}
            </dd>
          </div>
        </dl>

        <div>
          <h4 className="text-eyebrow uppercase text-forest">What this planting says</h4>
          <ul className="mt-3 flex flex-col gap-2.5">
            {view.summary.map((sentence) => (
              <li key={sentence} className="text-body text-moss">
                {sentence}
              </li>
            ))}
          </ul>
        </div>

        {view.highlights.length > 0 ? (
          <div>
            <h4 className="text-eyebrow uppercase text-forest">Named on these ideas</h4>
            <ul className="mt-3 flex flex-col gap-2">
              {view.highlights.map((highlight) => (
                <li
                  key={`${highlight.idea}-${highlight.label}`}
                  className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-tile border border-line bg-paper px-3.5 py-2.5"
                >
                  <span className="text-caption text-muted">
                    {highlight.label} · {highlight.idea}
                  </span>
                  <span className="font-display text-body text-forest-deep">
                    {highlight.value}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-2 text-caption text-muted">
              Sample figures quoted from the proposals themselves — illustrative estimates, not
              survey results.
            </p>
          </div>
        ) : null}

        {/* Stacks below sm: on a 320 screen the seed mark and the notice cannot
            share a line without the longest word being clipped by the sheet. */}
        <Card
          variant="tinted"
          className="flex flex-col gap-3 p-dense break-words sm:flex-row sm:items-start sm:gap-x-4"
        >
          <span
            aria-hidden="true"
            className="grid size-10 shrink-0 place-items-center rounded-full bg-surface text-forest"
          >
            <CivicToken stage="seed" size={22} strokeWidth={1.5} />
          </span>
          <div className="min-w-0 flex-1 sm:min-w-56">
            <p className="font-display text-body text-forest-deep">Demonstration, not a ballot</p>
            <p className="mt-1.5 text-caption text-muted">{DEMO_NOTICE}</p>
            <p className="mt-1.5 text-caption text-muted">{ROUND.dataNotice}</p>
          </div>
        </Card>
      </div>
    </Card>
  )
}
