import { BeforeAfterSlider } from '@/components/transformation/BeforeAfterSlider'
import { Container } from '@/components/layout/Container'
import { Badge } from '@/components/ui/Badge'
import { ButtonLink } from '@/components/ui/Button'
import { Card } from '@/components/ui/Card'
import { Reveal } from '@/components/ui/Reveal'
import { SectionHeading } from '@/components/ui/SectionHeading'
import { categoryById } from '@/data/categories'
import { cn } from '@/lib/cn'
import { useDiscovery } from '@/state/discovery'

export function TransformationSection() {
  const { state, dispatch, neighbourhood, districtProjects, selectedProject } = useDiscovery()

  /* The comparison follows whatever is picked; a district always has ideas, so
     there is never an empty frame to look at. */
  const subject = selectedProject ?? districtProjects[0]
  if (subject === undefined) {
    return null
  }

  const category = categoryById(subject.category)

  return (
    <section id="transform" aria-labelledby="transform-heading">
      <Container className="py-section">
        <SectionHeading
          eyebrow="Street transformation"
          headingId="transform-heading"
          title="See the street before it happens."
          description="Drag the divider to wipe between today and the proposal. Both halves are drawn from the same section, so kerb lines, walls and trees stay where they really are."
        />

        <Reveal className="mt-10">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-2.5">
            <p className="text-eyebrow uppercase text-forest">Compare</p>
            <div
              role="group"
              aria-label={`Which street to compare in ${neighbourhood.name}`}
              className="flex flex-wrap items-center gap-2"
            >
              {districtProjects.map((project) => {
                const isCurrent = project.id === subject.id
                return (
                  <button
                    key={project.id}
                    type="button"
                    onClick={() => dispatch({ type: 'select-project', id: project.id, origin: 'filter' })}
                    aria-current={isCurrent}
                    className={cn(
                      'min-h-11 max-w-full cursor-pointer rounded-full border px-4 py-1.5 text-caption font-semibold transition-colors duration-200 ease-settle',
                      isCurrent
                        ? 'border-forest bg-forest text-paper'
                        : 'border-line-strong bg-surface text-muted hover:border-forest hover:text-forest-deep',
                    )}
                  >
                    {project.title}
                  </button>
                )
              })}
            </div>
          </div>
          <p className="mt-2.5 text-caption text-muted">
            Ideas in {neighbourhood.name} — pick any card or marker to change this view.
          </p>
        </Reveal>

        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] lg:items-start lg:gap-12">
          <Reveal className="min-w-0">
            <BeforeAfterSlider
              key={subject.id}
              archetype={subject.transformation.archetype}
              annotations={subject.transformation.annotations}
              subject={subject.title}
            />
          </Reveal>

          <Reveal delay={0.08} offset={24} className="flex min-w-0 flex-col gap-6">
            <Card variant="tinted">
              <div className="flex flex-wrap items-center gap-2">
                <Badge tone="sage">{category.label}</Badge>
                <span className="text-caption text-muted">
                  {subject.costTokens} tokens · {subject.timeline}
                </span>
              </div>
              <h3 className="mt-3 font-display text-subtitle text-forest-deep">{subject.title}</h3>
              <p className="mt-2 text-body text-moss">{subject.hook}</p>
              <dl className="mt-5 grid gap-3 border-t border-sage-deep pt-4">
                <div>
                  <dt className="text-body font-semibold text-forest-deep">Today</dt>
                  <dd className="mt-1 text-body text-muted">{subject.transformation.beforeCaption}</dd>
                </div>
                <div>
                  <dt className="text-body font-semibold text-forest-deep">Proposed</dt>
                  <dd className="mt-1 text-body text-muted">{subject.transformation.afterCaption}</dd>
                </div>
              </dl>
            </Card>

            <div>
              <h4 className="font-display text-body font-semibold text-moss">What the change is</h4>
              <ol className="mt-3.5 flex flex-col gap-3">
                {subject.transformation.annotations.map((annotation, index) => (
                  <li key={annotation.label} className="flex gap-3">
                    <span
                      aria-hidden="true"
                      className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-forest/45 bg-surface font-display text-body text-forest-deep"
                    >
                      {index + 1}
                    </span>
                    <p className="text-body text-muted">
                      <span className="font-semibold text-moss">{annotation.label}.</span>{' '}
                      {annotation.detail}
                    </p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="font-display text-body font-semibold text-moss">Expected impact</h4>
                <Badge tone="sunshine">Illustrative estimate</Badge>
              </div>
              <ul className="mt-3.5 flex flex-col gap-2">
                {subject.transformation.readings.map((reading) => (
                  <li
                    key={reading.label}
                    className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 rounded-tile border border-line bg-surface px-3.5 py-3"
                  >
                    <span className="text-body text-muted">{reading.label}</span>
                    <span className="font-display text-subtitle text-forest-deep">{reading.value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <ButtonLink href="#ideas" variant="soft" size="md">
              More ideas in {neighbourhood.name}
            </ButtonLink>
          </Reveal>
        </div>

        <p className="mt-8 max-w-2xl text-caption text-muted">
          These scenes are hand-drawn illustrations of the sample proposals, not photographs,
          surveys or site measurements.
          {state.origin === 'map'
            ? ' The view above followed a marker picked on the map.'
            : ` You are looking at ${subject.title.toLowerCase()} in ${neighbourhood.name}.`}
        </p>
      </Container>
    </section>
  )
}
