import { ArrowRight, Compass, ListChecks } from 'lucide-react'
import type { ReactNode } from 'react'

import { CivicToken } from '@/components/illustrations/CivicToken'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { Reveal } from '@/components/ui/Reveal'
import { ROUND } from '@/data/round'

type Step = {
  readonly number: string
  readonly title: string
  readonly body: string
  readonly icon: ReactNode
}

const STEPS: readonly Step[] = [
  {
    number: '01',
    title: 'Explore the proposals',
    body: 'Every neighbourhood idea, explained in plain language: what changes on the street, who it helps and how long it takes to grow.',
    icon: <Compass size={20} strokeWidth={1.9} aria-hidden="true" />,
  },
  {
    number: '02',
    title: 'Place your Civic Tokens',
    body: `Split ${ROUND.tokenBudget} tokens across the projects that matter to you. Five at a time, five back when you change your mind, and the budget panel keeps the balance honest.`,
    icon: <CivicToken stage="sprout" size={20} strokeWidth={1.9} />,
  },
  {
    number: '03',
    title: 'Confirm and keep the passport',
    body: 'See each idea you touched, its share of the round and the balance you left unplaced. Confirm it and a Community Impact Passport is written down — a demo keepsake you can download.',
    icon: <ListChecks size={20} strokeWidth={1.9} aria-hidden="true" />,
  },
]

export function HowItWorksSection() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="border-y border-line bg-surface"
    >
      <Container className="py-section">
        <SectionHeading
          headingId="how-it-works-heading"
          eyebrow="How it works"
          title={
            <>
              Three steps, <em className="text-forest italic">one quiet decision</em>
            </>
          }
          description="The whole round is one unhurried sitting. No accounts to argue with, no leaderboard, no noise."
        />

        <ol className="mt-14 grid gap-6 md:grid-cols-3">
          {STEPS.map((step, index) => (
            <li key={step.number}>
              <Reveal delay={index * 0.08} className="h-full">
                <Card variant="interactive" fullHeight>
                  <CardHeader>
                    <span className="grid size-11 place-items-center rounded-full bg-sage-mist text-forest">
                      {step.icon}
                    </span>
                    <Badge tone="neutral">{step.number}</Badge>
                  </CardHeader>
                  <CardTitle className="mt-6">{step.title}</CardTitle>
                  <CardDescription>{step.body}</CardDescription>
                </Card>
              </Reveal>
            </li>
          ))}
        </ol>

        <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3">
          <p className="max-w-2xl text-caption text-muted">
            All three steps work on this screen: the plan, the idea cards and the street
            comparison, the token controls at the foot of every card, the review that adds up what
            you placed, and the passport it issues once you confirm. Confirming stays inside the
            demo — there is no civic backend in this build.
          </p>
          <ButtonLink
            href="#review"
            variant="soft"
            size="md"
            className="ml-auto"
            trailingIcon={<ArrowRight size={16} strokeWidth={2.2} />}
          >
            Review your tokens
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}
