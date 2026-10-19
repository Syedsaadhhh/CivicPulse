import { SlidersHorizontal } from 'lucide-react'

import { CategoryMotif } from '@/components/illustrations/CategoryMotif'
import { ALL_CATEGORIES, categoryById } from '@/data/categories'
import { PROJECTS } from '@/data/projects'
import { cn } from '@/lib/cn'
import { useDiscovery } from '@/state/discovery'

export function CategoryFilters() {
  const { state, dispatch } = useDiscovery()

  const blurb =
    state.category === 'all'
      ? 'Everything in the round, whatever each idea grows into.'
      : categoryById(state.category).blurb

  return (
    <div role="group" aria-label="Filter ideas by category">
      <ul className="flex flex-wrap items-center gap-2">
        {ALL_CATEGORIES.map((value) => {
          const isActive = state.category === value
          const label = value === 'all' ? 'Everything' : categoryById(value).label
          const count =
            value === 'all'
              ? PROJECTS.length
              : PROJECTS.filter((project) => project.category === value).length

          return (
            <li key={value}>
              <button
                type="button"
                aria-pressed={isActive}
                onClick={() =>
                  dispatch({
                    type: 'filter-category',
                    value: isActive && value !== 'all' ? 'all' : value,
                  })
                }
                className={cn(
                  'inline-flex cursor-pointer items-center gap-2 rounded-full border px-3.5 py-1.5 text-caption transition-colors duration-200 ease-settle',
                  isActive
                    ? 'border-forest bg-forest text-paper'
                    : 'border-line-strong bg-surface text-muted hover:border-forest hover:text-forest-deep',
                )}
              >
                {value === 'all' ? (
                  <SlidersHorizontal size={14} aria-hidden="true" strokeWidth={2.1} />
                ) : (
                  <CategoryMotif motif={categoryById(value).motif} size={15} strokeWidth={1.7} />
                )}
                {label}
                <span className={cn('tabular-nums', isActive ? 'text-paper/80' : 'text-muted/80')}>
                  {count}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <p className="mt-3 text-caption text-muted">{blurb}</p>
    </div>
  )
}
