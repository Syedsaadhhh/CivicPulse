import { useEffect, useRef } from 'react'

import { CategoryFilters } from '@/components/projects/CategoryFilters'
import { ProjectCard } from '@/components/projects/ProjectCard'
import { Container } from '@/components/layout/Container'
import { TokenBudgetPanel } from '@/components/tokens/TokenBudgetPanel'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { categoryById } from '@/data/categories'
import { neighbourhoodById } from '@/data/neighbourhoods'
import { ROUND } from '@/data/round'
import { useDiscovery } from '@/state/discovery'

export function ProjectSection() {
  const { state, dispatch, neighbourhood, districtProjects, visibleProjects, elsewhereProjects, selectedProject } =
    useDiscovery()
  const selectedCardRef = useRef<HTMLLIElement | null>(null)

  /* Picking a marker scrolls its card into view, so the map can drive the list. */
  useEffect(() => {
    if (state.origin !== 'map' || selectedProject === null) {
      return
    }
    selectedCardRef.current?.scrollIntoView({ block: 'center' })
  }, [selectedProject, state.origin])

  const filterLabel = state.category === 'all' ? null : categoryById(state.category).label

  return (
    <section id="ideas" aria-labelledby="ideas-heading" className="relative isolate">
      <div aria-hidden="true" className="bloom-wash pointer-events-none absolute inset-0 -z-10" />

      <Container className="py-section">
        <SectionHeading
          eyebrow="Project exploration"
          headingId="ideas-heading"
          title="Ideas, told as stories about streets."
          description="Each card is one proposal from the sample round: what the street is like now, what it would become, and what it would cost in tokens."
        />

        <Reveal offset={16}>
          <TokenBudgetPanel className="mt-10" />
        </Reveal>

        <div className="mt-8 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <CategoryFilters />
          <p role="status" className="text-caption text-muted">
            {visibleProjects.length} of {districtProjects.length} ideas in {neighbourhood.name}
            {filterLabel === null ? '' : ` match ${filterLabel}`}
          </p>
        </div>

        {visibleProjects.length > 0 ? (
          <ul className="mt-8 grid items-start gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {visibleProjects.map((project, index) => (
              <li
                key={project.id}
                ref={selectedProject?.id === project.id ? selectedCardRef : null}
                className="min-w-0"
              >
                <Reveal delay={index * 0.05} offset={20} className="h-full">
                  <ProjectCard
                    project={project}
                    districtName={neighbourhood.name}
                    isSelected={selectedProject?.id === project.id}
                    onSelect={() =>
                      dispatch({ type: 'select-project', id: project.id, origin: 'card' })
                    }
                  />
                </Reveal>
              </li>
            ))}
          </ul>
        ) : (
          <Card variant="outlined" className="mt-8">
            <p className="font-display text-subtitle text-moss">
              No {filterLabel === null ? 'matching' : filterLabel.toLocaleLowerCase()} ideas in{' '}
              {neighbourhood.name} yet.
            </p>
            <p className="mt-2 text-body text-muted">
              The filter is still on, and {elsewhereProjects.length} ideas elsewhere on the map
              answer to it.
            </p>
            <ul className="mt-5 flex flex-col gap-2">
              {elsewhereProjects.map((project) => (
                <li key={project.id}>
                  <button
                    type="button"
                    onClick={() =>
                      dispatch({ type: 'select-project', id: project.id, origin: 'filter' })
                    }
                    className="flex w-full cursor-pointer items-baseline justify-between gap-4 rounded-card border border-line bg-surface px-4 py-3 text-left transition-colors duration-200 ease-settle hover:border-sage-deep hover:bg-sage-mist"
                  >
                    <span className="font-display text-body text-moss">{project.title}</span>
                    <span className="text-caption whitespace-nowrap text-muted">
                      {neighbourhoodById(project.neighbourhoodId).name} · {project.costTokens} tokens
                    </span>
                  </button>
                </li>
              ))}
            </ul>
            <Button
              variant="soft"
              size="sm"
              className="mt-5"
              onClick={() => dispatch({ type: 'filter-category', value: 'all' })}
            >
              Show everything in {neighbourhood.name}
            </Button>
          </Card>
        )}

        <Card variant="tinted" className="mt-10 flex flex-wrap items-center gap-x-4 gap-y-2">
          <Badge tone="outline">Sample round</Badge>
          <p className="text-caption text-muted">
            Nothing here commits anything. Tokens placed on a card are a sample decision about the
            fictional {ROUND.name}, and they only change the numbers on this screen. Confirming the
            review issues a Community Impact Passport in this browser — a demo keepsake, not an
            official ballot.
          </p>
        </Card>
      </Container>
    </section>
  )
}
