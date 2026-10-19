import { ArrowRight, Sprout } from 'lucide-react'

import { CivicToken } from '@/components/illustrations/CivicToken'
import { Container } from '@/components/layout/Container'
import { TransformationScene } from '@/components/transformation/TransformationScene'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Reveal } from '@/components/ui/Reveal'
import { neighbourhoodById } from '@/data/neighbourhoods'
import { projectById } from '@/data/projects'
import { ROUND } from '@/data/round'
import { SCENE_ASPECT } from '@/lib/scene-geometry'
import type { ProjectId } from '@/types/domain'

/** The sample idea the landing screen illustrates. */
const FEATURED_PROJECT_ID: ProjectId = 'sycamore-reeds'

export function HeroSection() {
  const featured = projectById(FEATURED_PROJECT_ID)
  const district = neighbourhoodById(featured.neighbourhoodId)

  return (
    <section
      id="overview"
      aria-labelledby="hero-heading"
      className="relative isolate overflow-hidden"
    >
      <div aria-hidden="true" className="bloom-wash pointer-events-none absolute inset-0 -z-10" />

      <Container className="py-section">
        {/* grid-cols-1 keeps the narrow single column inside the gutter: without
            it the un-sized scene SVG falls back to its 300px default and pushes
            the whole column past the page edge. */}
        <div className="grid grid-cols-1 items-center gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)] lg:gap-16">
          <div className="max-w-xl">
            <Reveal>
              <Badge tone="sage" icon={<Sprout size={14} strokeWidth={2.2} />}>
                Participatory budgeting
              </Badge>
            </Reveal>

            <Reveal delay={0.06}>
              <h1 id="hero-heading" className="mt-6 font-display text-hero">
                Your neighbourhood.
                <br />
                <em className="text-forest italic">Your say.</em>
              </h1>
            </Reveal>

            <Reveal delay={0.12}>
              <p className="mt-6 text-lead text-muted">
                CivicPulse puts the neighbourhood improvement plan in residents&rsquo; hands.
                Explore the proposals shaping your streets, understand what each one really
                changes, then decide where your tokens go.
              </p>
            </Reveal>

            <Reveal delay={0.18}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <ButtonLink
                  href="#discover"
                  variant="primary"
                  size="lg"
                  className="max-[360px]:h-auto max-[360px]:w-full max-[360px]:py-3 max-[360px]:whitespace-normal"
                  trailingIcon={<ArrowRight size={17} strokeWidth={2.2} />}
                >
                  Explore the neighbourhood
                </ButtonLink>
                <ButtonLink
                  href="#how-it-works"
                  variant="secondary"
                  size="lg"
                  className="max-[360px]:w-full"
                >
                  How it works
                </ButtonLink>
              </div>
            </Reveal>

            <Reveal delay={0.24}>
              <p className="mt-8 flex flex-wrap items-center gap-x-3 gap-y-2 text-caption text-muted">
                <span className="inline-flex items-center gap-1.5 font-semibold text-moss">
                  <CivicToken stage="leaf" size={17} strokeWidth={1.7} className="text-forest" />
                  {ROUND.tokenBudget} Civic Tokens
                </span>
                <span aria-hidden="true" className="text-line-strong">
                  &bull;
                </span>
                <span>one round</span>
                <span aria-hidden="true" className="text-line-strong">
                  &bull;
                </span>
                <span>nothing is submitted or counted</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.2} offset={26}>
            <figure className="m-0">
              <div className="rounded-panel border border-line bg-surface p-dense shadow-lifted">
                <div
                  className="overflow-hidden rounded-tile border border-line bg-paper"
                  style={{ aspectRatio: SCENE_ASPECT }}
                >
                  <TransformationScene
                    archetype={featured.transformation.archetype}
                    side="after"
                    className="size-full"
                  />
                </div>
                <figcaption className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2">
                  <Badge tone="outline">Sample proposal</Badge>
                  <span className="min-w-0">
                    <span className="block font-display text-body text-moss">{featured.title}</span>
                    <span className="block text-caption text-muted">
                      {district.name} · hand-drawn illustration of the proposed view
                    </span>
                  </span>
                </figcaption>
              </div>
              <p className="mt-4 max-w-md text-caption text-muted">
                {ROUND.dataNotice} Nothing here is a street survey, a site photograph or a live
                community figure.
              </p>
            </figure>
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
