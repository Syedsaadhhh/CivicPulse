import { ArrowRight, Sprout } from 'lucide-react'

import { CivicToken } from '@/components/illustrations/CivicToken'
import { Container } from '@/components/layout/Container'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { neighbourhoodById } from '@/data/neighbourhoods'
import { ballotReference } from '@/lib/passport'
import { TOKEN_STEP, useAllocation } from '@/state/allocation'

export function AllocationReviewSection() {
  const {
    budget,
    placed,
    remaining,
    funded,
    hasTokens,
    ballot,
    locked,
    confirmBlock,
    dispatch,
  } = useAllocation()

  /* The reference and the clock are read here, outside the reducer, so a
     confirmed ballot is a frozen copy of this exact moment. */
  function confirm() {
    if (confirmBlock !== null) {
      return
    }
    dispatch({ type: 'confirm', reference: ballotReference(), confirmedAt: new Date().toISOString() })
    window.location.hash = '#passport'
  }

  return (
    <section id="review" aria-labelledby="review-heading" className="border-y border-line bg-paper-recess">
      <Container className="py-section">
        <SectionHeading
          eyebrow="Allocation review"
          headingId="review-heading"
          title={
            <>
              Where your <em className="text-forest italic">tokens have landed</em>
            </>
          }
          description={
            locked
              ? `Confirmed as ballot ${ballot?.reference}. The map is held still so the passport below cannot disagree with it.`
              : 'A read-out of this round, taken straight from the numbers on the cards above. Confirm it when you are done, and the passport below keeps the record.'
          }
        />

        <dl className="mt-12 grid gap-4 sm:grid-cols-3">
          <Card variant="surface" className="p-dense">
            <dt className="text-eyebrow uppercase text-forest">Tokens in the round</dt>
            <dd className="mt-2.5 font-display text-title tabular-nums text-moss">{budget}</dd>
          </Card>
          <Card variant="surface" className="p-dense">
            <dt className="text-eyebrow uppercase text-forest">Placed</dt>
            <dd className="mt-2.5 font-display text-title tabular-nums text-moss">{placed}</dd>
          </Card>
          <Card variant="tinted" className="p-dense">
            <dt className="text-eyebrow uppercase text-forest">Still to place</dt>
            <dd className="mt-2.5 font-display text-title tabular-nums text-forest-deep">
              {remaining}
            </dd>
          </Card>
        </dl>

        {hasTokens ? (
          <Reveal offset={16}>
            <ul className="mt-10 flex flex-col gap-3">
              {funded.map(({ project, tokens, share }) => (
                <li key={project.id}>
                  <Card variant="surface" className="p-dense">
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                      <h3 className="font-display text-body text-moss">{project.title}</h3>
                      <p className="text-caption text-muted">
                        {neighbourhoodById(project.neighbourhoodId).name}
                      </p>
                      <p className="ml-auto flex items-baseline gap-2">
                        <span className="font-display text-subtitle tabular-nums text-forest-deep">
                          {tokens}
                        </span>
                        <span className="text-caption tabular-nums text-muted">
                          {Math.round(share)}% of the round
                        </span>
                      </p>
                    </div>
                    <div
                      aria-hidden="true"
                      className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-paper-recess"
                    >
                      <div
                        className="h-full rounded-full bg-forest transition-[width] duration-500 ease-settle"
                        style={{ width: `${share}%` }}
                      />
                    </div>
                  </Card>
                </li>
              ))}
            </ul>
          </Reveal>
        ) : (
          <Card variant="tinted" className="mt-10 flex flex-wrap items-start gap-x-5 gap-y-4">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-forest"
            >
              <CivicToken stage="seed" size={26} strokeWidth={1.4} />
            </span>
            <div className="min-w-64 flex-1">
              <h3 className="font-display text-subtitle text-moss">Nothing placed yet</h3>
              <p className="mt-2 text-body text-muted">
                Open any idea in the section above and press plus to put {TOKEN_STEP} tokens on it,
                or minus to take them back. You do not have to spend the whole {budget} — leaving
                tokens unplaced is an answer too.
              </p>
            </div>
          </Card>
        )}

        <div className="mt-10 flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-3">
            {locked ? (
              <>
                <ButtonLink
                  href="#passport"
                  variant="primary"
                  size="md"
                  trailingIcon={<ArrowRight size={16} strokeWidth={2.2} />}
                >
                  Open the passport
                </ButtonLink>
                <Button
                  variant="secondary"
                  size="md"
                  onClick={() => {
                    dispatch({ type: 'amend' })
                    window.location.hash = '#ideas'
                  }}
                >
                  Amend this allocation
                </Button>
                <Button variant="ghost" size="md" onClick={() => dispatch({ type: 'fresh' })}>
                  Start a fresh demo round
                </Button>
              </>
            ) : (
              <>
                <Button
                  variant="primary"
                  size="md"
                  disabled={confirmBlock !== null}
                  onClick={confirm}
                  leadingIcon={<Sprout size={16} strokeWidth={2} />}
                >
                  Confirm demo ballot
                </Button>
                <ButtonLink
                  href="#ideas"
                  variant="secondary"
                  size="md"
                  trailingIcon={<ArrowRight size={16} strokeWidth={2.2} />}
                >
                  {hasTokens ? 'Back to the ideas' : 'Start placing tokens'}
                </ButtonLink>
                {hasTokens ? (
                  <Button variant="ghost" size="md" onClick={() => dispatch({ type: 'reset' })}>
                    Take all {placed} tokens back
                  </Button>
                ) : null}
              </>
            )}

            <p className="ml-auto max-w-sm text-caption text-muted">
              Demonstration only. Confirming issues a passport inside this browser and nothing else:
              no council receives it, no vote is counted, no record is kept anywhere else.
            </p>
          </div>

          <p role="status" className="text-caption text-muted">
            {locked ? (
              <>
                Ballot {ballot?.reference} is confirmed, so the cards are held still.{' '}
                {remaining === 0
                  ? `All ${budget} tokens were placed.`
                  : `${remaining} of ${budget} were left unplaced.`}
              </>
            ) : confirmBlock === 'empty' ? (
              'A ballot needs at least one token in the ground. Place a few, then confirm.'
            ) : remaining > 0 ? (
              <>
                Confirming now would leave {remaining} {remaining === 1 ? 'token' : 'tokens'}{' '}
                unplaced, with {placed} on {funded.length}{' '}
                {funded.length === 1 ? 'idea' : 'ideas'}. Spending the whole {budget} is not
                required.
              </>
            ) : (
              `All ${budget} tokens are placed on ${funded.length} ${funded.length === 1 ? 'idea' : 'ideas'}.`
            )}
          </p>
        </div>
      </Container>
    </section>
  )
}
