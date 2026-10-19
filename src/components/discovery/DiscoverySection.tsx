import { ArrowRight } from 'lucide-react'

import { NeighbourhoodSearch } from '@/components/discovery/NeighbourhoodSearch'
import { Container } from '@/components/layout/Container'
import { NeighbourhoodMap } from '@/components/map/NeighbourhoodMap'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { projectsInNeighbourhood } from '@/data/projects'
import { useAllocation } from '@/state/allocation'
import { useDiscovery } from '@/state/discovery'

function SelectedDistrict() {
  const { neighbourhood } = useDiscovery()
  const { funded } = useAllocation()
  const ideas = projectsInNeighbourhood(neighbourhood.id)
  const tokens = ideas.reduce((total, idea) => total + idea.costTokens, 0)
  const placedHere = funded.reduce(
    (total, entry) =>
      entry.project.neighbourhoodId === neighbourhood.id ? total + entry.tokens : total,
    0,
  )

  return (
    <Card variant="tinted">
      <CardHeader>
        <div>
          <Badge tone="outline">Fictional sample district</Badge>
          <CardTitle className="mt-3 text-title" aria-live="polite">
            {neighbourhood.name}
          </CardTitle>
        </div>
      </CardHeader>
      <CardDescription className="text-subtitle text-forest-deep">
        {neighbourhood.character}
      </CardDescription>
      <p className="mt-3 text-body text-muted">{neighbourhood.story}</p>
      <p className="mt-5 border-t border-sage-deep pt-4 text-caption text-muted">
        {ideas.length} ideas here · {tokens} tokens if every one of them were funded
        {placedHere === 0 ? '' : ` · ${placedHere} of your tokens placed here`}
      </p>
      <ButtonLink
        href="#ideas"
        variant="secondary"
        size="md"
        className="mt-4"
        trailingIcon={<ArrowRight size={16} strokeWidth={2.2} />}
      >
        Read these ideas
      </ButtonLink>
    </Card>
  )
}

export function DiscoverySection() {
  return (
    <section id="discover" aria-labelledby="discover-heading">
      <Container className="py-section">
        <SectionHeading
          eyebrow="Neighbourhood discovery"
          headingId="discover-heading"
          title="Four neighbourhoods, one round."
          description="Pick a district on the plan or by name. The map, the list and the ideas underneath all follow the same selection."
        />

        <div className="mt-12 grid items-start gap-10 lg:grid-cols-[minmax(0,0.82fr)_minmax(0,1.18fr)] lg:gap-14">
          <Reveal className="flex min-w-0 flex-col gap-8">
            <NeighbourhoodSearch />
            <SelectedDistrict />
          </Reveal>

          <Reveal delay={0.08} offset={26} className="min-w-0 lg:sticky lg:top-24">
            <NeighbourhoodMap />
          </Reveal>
        </div>
      </Container>
    </section>
  )
}
