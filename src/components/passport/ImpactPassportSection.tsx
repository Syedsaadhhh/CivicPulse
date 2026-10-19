import { useState } from 'react'
import type { Dispatch } from 'react'
import { Check, Download, Printer, Sheet } from 'lucide-react'

import { CivicToken } from '@/components/illustrations/CivicToken'
import { ImpactPassportSheet } from '@/components/passport/ImpactPassportSheet'
import { Container } from '@/components/layout/Container'
import { Button, ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { ROUND } from '@/data/round'
import { cn } from '@/lib/cn'
import {
  buildPassportView,
  copyReceipt,
  downloadReceipt,
  receiptFileName,
  receiptJson,
  receiptText,
} from '@/lib/passport'
import { useAllocation } from '@/state/allocation'
import type { AllocationAction, ConfirmedBallot } from '@/types/domain'
import type { FileResult } from '@/lib/passport'

/** Whatever the last save or copy reported, shown in a live region. */
type Status = FileResult

/**
 * The action column is a single narrow stack on a 320 screen, where the longest
 * labels no longer fit on one line. The variant prefix is what outranks the
 * `whitespace-nowrap`/`h-11` Button already carries.
 */
const WRAP_SMALL = 'max-[400px]:h-auto max-[400px]:py-2.5 max-[400px]:whitespace-normal'

/**
 * The keepsake a visitor leaves with. Reads only the confirmed snapshot, so
 * what is on the sheet is exactly what was pressed at the review.
 */
export function ImpactPassportSection() {
  const { ballot, placed, remaining, funded, dispatch } = useAllocation()
  const [status, setStatus] = useState<Status | null>(null)

  if (ballot === null) {
    return (
      <section
        id="passport"
        aria-labelledby="passport-heading"
        className="border-y border-line bg-paper"
      >
        <Container className="py-section">
          <SectionHeading
            eyebrow="Community Impact Passport"
            headingId="passport-heading"
            title={
              <>
                Not issued <em className="text-forest italic">yet</em>
              </>
            }
            description="Confirm the allocation in the review above and this screen becomes a passport: the neighbourhoods you touched, the tokens each idea holds, the balance you left unplaced, and a receipt you can keep."
          />

          <Card variant="tinted" className="mt-10 flex flex-wrap items-start gap-x-5 gap-y-4">
            <span
              aria-hidden="true"
              className="grid size-12 shrink-0 place-items-center rounded-full bg-surface text-forest"
            >
              <CivicToken stage={placed === 0 ? 'seed' : 'sprout'} size={26} strokeWidth={1.4} />
            </span>
            <div className="min-w-64 flex-1">
              <h3 className="font-display text-subtitle text-moss">
                {placed === 0
                  ? `No tokens in the ground yet`
                  : `${placed} of ${ROUND.tokenBudget} tokens are waiting to be confirmed`}
              </h3>
              <p className="mt-2 text-body text-muted">
                {placed === 0 ? (
                  <>
                    Place a few tokens on the ideas above first. The passport is only worth keeping
                    if it records a real decision.
                  </>
                ) : (
                  <>
                    {funded.length} {funded.length === 1 ? 'idea' : 'ideas'} funded, {remaining}{' '}
                    {remaining === 1 ? 'token' : 'tokens'} unplaced. Nothing is written down until
                    you confirm it — and confirming stays inside this demo.
                  </>
                )}
              </p>
              <div className="mt-5">
                <ButtonLink href="#review" variant="primary" size="md">
                  {placed === 0 ? 'Go and place tokens' : 'Review and confirm'}
                </ButtonLink>
              </div>
            </div>
          </Card>
        </Container>
      </section>
    )
  }

  return (
    <ConfirmedPassport
      ballot={ballot}
      dispatch={dispatch}
      status={status}
      setStatus={setStatus}
    />
  )
}

type ConfirmedPassportProps = {
  readonly ballot: ConfirmedBallot
  readonly dispatch: Dispatch<AllocationAction>
  readonly status: Status | null
  readonly setStatus: (status: Status | null) => void
}

function ConfirmedPassport({ ballot, dispatch, status, setStatus }: ConfirmedPassportProps) {
  const view = buildPassportView(ballot)
  const text = receiptText(view)

  function save(extension: 'txt' | 'json') {
    const body = extension === 'txt' ? text : receiptJson(view)
    const mime = extension === 'txt' ? 'text/plain' : 'application/json'
    const fileName = receiptFileName(view, extension)
    setStatus(downloadReceipt(fileName, body, mime))
  }

  async function copy() {
    setStatus(await copyReceipt(text))
  }

  return (
    <section
      id="passport"
      aria-labelledby="passport-heading"
      className="border-y border-line bg-paper"
    >
      <Container className="py-section">
        <SectionHeading
          eyebrow="Community Impact Passport"
          headingId="passport-heading"
          title={
            <>
              Your planting, <em className="text-forest italic">written down</em>
            </>
          }
          description="Issued the moment the demo ballot was confirmed. It carries the token map exactly as you left it — the reference below is what the receipt is filed under."
        />

        <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)] lg:items-start lg:gap-10">
          <Reveal className="min-w-0">
            <ImpactPassportSheet view={view} />
          </Reveal>

          <Reveal delay={0.08} offset={24} className="min-w-0">
            {/* data-print keeps the whole action column off the printed sheet. */}
            <div className="flex flex-col gap-5" data-print="hide">
            <Card variant="surface" className="p-dense">
              <h3 className="font-display text-body text-moss">Keep it</h3>
              <p className="mt-2 text-caption text-muted">
                Written by your browser, from the numbers on this screen. No upload, no account, no
                server.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button
                  variant="primary"
                  size="md"
                  className={WRAP_SMALL}
                  leadingIcon={<Download size={16} strokeWidth={2.2} />}
                  onClick={() => save('txt')}
                >
                  Download receipt (.txt)
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className={WRAP_SMALL}
                  leadingIcon={<Sheet size={16} strokeWidth={2.2} />}
                  onClick={() => save('json')}
                >
                  Download data (.json)
                </Button>
                <Button
                  variant="secondary"
                  size="md"
                  className={WRAP_SMALL}
                  leadingIcon={<Check size={16} strokeWidth={2.2} />}
                  onClick={() => {
                    void copy()
                  }}
                >
                  Copy ballot summary
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className={WRAP_SMALL}
                  leadingIcon={<Printer size={16} strokeWidth={2.2} />}
                  onClick={() => window.print()}
                >
                  Print this passport
                </Button>
              </div>

              <p
                role="status"
                aria-live="polite"
                className={cn(
                  'mt-4 min-h-10 text-caption',
                  status === null
                    ? 'text-muted'
                    : status.ok
                      ? 'text-forest-deep'
                      : 'text-coral-deep',
                )}
              >
                {status === null
                  ? 'Nothing has been saved yet this session.'
                  : status.message}
              </p>
            </Card>

            <Card variant="tinted" className="p-dense">
              <h3 className="font-display text-body text-forest-deep">Change your mind</h3>
              <p className="mt-2 text-caption text-muted">
                A confirmed ballot locks the token map so the passport cannot drift. Choose
                deliberately which way to continue.
              </p>
              <div className="mt-4 flex flex-col gap-2.5">
                <Button
                  variant="secondary"
                  size="md"
                  className={WRAP_SMALL}
                  onClick={() => {
                    setStatus(null)
                    dispatch({ type: 'amend' })
                    window.location.hash = '#review'
                  }}
                >
                  Amend this allocation
                </Button>
                <Button
                  variant="ghost"
                  size="md"
                  className={WRAP_SMALL}
                  onClick={() => {
                    setStatus(null)
                    dispatch({ type: 'fresh' })
                    window.location.hash = '#overview'
                  }}
                >
                  Start a fresh demo round
                </Button>
              </div>
              <p className="mt-4 text-caption text-muted">
                Amending reopens the cards with your tokens where you left them, and asks you to
                confirm again for a new reference. A fresh round clears every placement.
              </p>
            </Card>

            <ButtonLink href="#review" variant="soft" size="md">
              Back to the review
            </ButtonLink>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
