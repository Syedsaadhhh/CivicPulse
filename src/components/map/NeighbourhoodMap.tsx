import { useState } from 'react'

import { CategoryMotif } from '@/components/illustrations/CategoryMotif'
import { MapMarker } from '@/components/map/MapMarker'
import type { MarkerTone } from '@/components/map/MapMarker'
import { MapDecor } from '@/components/map/MapDecor'
import { CATEGORY_LIST, categoryById } from '@/data/categories'
import { NEIGHBOURHOOD_LIST, neighbourhoodById } from '@/data/neighbourhoods'
import { PROJECTS } from '@/data/projects'
import { ROUND } from '@/data/round'
import { cn } from '@/lib/cn'
import { boxStyle, pointStyle, radiusStyle } from '@/lib/map-geometry'
import { useDiscovery } from '@/state/discovery'
import type { CategoryId, NeighbourhoodId, Project, ProjectId } from '@/types/domain'

type ToneContext = {
  readonly selectedId: ProjectId | null
  readonly neighbourhoodId: NeighbourhoodId
  readonly category: CategoryId | 'all'
}

function markerToneFor(project: Project, context: ToneContext): MarkerTone {
  if (project.id === context.selectedId) {
    return 'selected'
  }
  if (context.category !== 'all' && project.category !== context.category) {
    return 'filtered'
  }
  return project.neighbourhoodId === context.neighbourhoodId ? 'focused' : 'elsewhere'
}

export function NeighbourhoodMap() {
  const { state, dispatch, neighbourhood, selectedProject } = useDiscovery()
  const [hoveredId, setHoveredId] = useState<NeighbourhoodId | null>(null)

  const context: ToneContext = {
    selectedId: selectedProject?.id ?? null,
    neighbourhoodId: neighbourhood.id,
    category: state.category,
  }

  return (
    <figure className="m-0">
      <div
        role="group"
        aria-label="Illustrated neighbourhood map"
        className="relative aspect-[4/3] w-full overflow-hidden rounded-panel border border-line bg-paper-recess shadow-soft"
      >
        <MapDecor focusedId={neighbourhood.id} />

        {NEIGHBOURHOOD_LIST.map((entry) => {
          const isFocused = entry.id === neighbourhood.id
          const count = PROJECTS.filter((project) => project.neighbourhoodId === entry.id).length

          return (
            <button
              key={entry.id}
              type="button"
              onClick={() => dispatch({ type: 'select-neighbourhood', id: entry.id, origin: 'map' })}
              onPointerEnter={() => setHoveredId(entry.id)}
              onPointerLeave={() => setHoveredId(null)}
              onFocus={() => setHoveredId(entry.id)}
              onBlur={() => setHoveredId(null)}
              aria-current={isFocused}
              aria-label={`${entry.name} — ${entry.character} ${count} ideas in this round.`}
              style={{ ...boxStyle(entry.box), ...radiusStyle(entry.box) }}
              className={cn(
                'absolute cursor-pointer border-2 transition-colors duration-300 ease-settle',
                isFocused
                  ? 'border-forest/70 bg-sage/45'
                  : entry.id === hoveredId
                    ? 'border-sage-deep bg-sage/25'
                    : 'border-transparent hover:border-line-strong hover:bg-sage/15',
              )}
            />
          )
        })}

        {NEIGHBOURHOOD_LIST.map((entry) => (
          <span
            key={`label-${entry.id}`}
            aria-hidden="true"
            style={pointStyle(entry.labelAt)}
            className={cn(
              'pointer-events-none absolute -translate-y-1/2 rounded-full border px-2 py-px font-display text-caption leading-tight transition-colors duration-300 ease-settle',
              /* On a phone-width plan the pills are wider than the plates they
                 name, so they only appear from sm upwards. The district buttons
                 still carry every name for assistive tech. */
              'hidden sm:inline-block',
              entry.id === neighbourhood.id
                ? 'border-forest/35 bg-surface/95 text-forest-deep shadow-soft'
                : 'border-line bg-paper/85 text-muted',
            )}
          >
            {entry.name}
          </span>
        ))}

        {PROJECTS.map((project) => (
          <MapMarker
            key={project.id}
            project={project}
            category={categoryById(project.category)}
            districtName={neighbourhoodById(project.neighbourhoodId).name}
            tone={markerToneFor(project, context)}
            onSelect={() => {
              dispatch(
                selectedProject?.id === project.id
                  ? { type: 'clear-project' }
                  : { type: 'select-project', id: project.id, origin: 'map' },
              )
            }}
          />
        ))}
      </div>

      <figcaption className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <ul className="flex flex-wrap items-center gap-x-4 gap-y-2 text-caption text-muted">
          {CATEGORY_LIST.map((category) => (
            <li key={category.id} className="inline-flex items-center gap-1.5">
              <span className="flex h-6 w-6 items-center justify-center rounded-full border border-line-strong bg-paper text-forest">
                <CategoryMotif motif={category.motif} size={13} strokeWidth={1.7} />
              </span>
              {category.label}
            </li>
          ))}
        </ul>
        <p className="max-w-sm text-caption text-muted">
          {ROUND.mapNotice} {ROUND.dataNotice}
        </p>
      </figcaption>
    </figure>
  )
}
