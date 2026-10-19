import { useRef } from 'react'
import { Search, X } from 'lucide-react'

import { projectsInNeighbourhood } from '@/data/projects'
import { NEIGHBOURHOOD_LIST } from '@/data/neighbourhoods'
import { cn } from '@/lib/cn'
import { useDiscovery } from '@/state/discovery'

export function NeighbourhoodSearch() {
  const { state, dispatch, results, isSearching } = useDiscovery()
  const inputRef = useRef<HTMLInputElement>(null)

  function selectFirstResult() {
    const first = results[0]
    if (first !== undefined) {
      dispatch({ type: 'select-neighbourhood', id: first.id, origin: 'search' })
    }
  }

  return (
    <div>
      <div className="relative">
        <label
          htmlFor="neighbourhood-search"
          className="mb-2 block text-eyebrow uppercase text-forest"
        >
          Find a neighbourhood
        </label>
        <Search
          size={17}
          aria-hidden="true"
          className="pointer-events-none absolute bottom-3 left-3.5 text-muted"
        />
        <input
          id="neighbourhood-search"
          ref={inputRef}
          type="text"
          enterKeyHint="search"
          value={state.query}
          placeholder="Try “the cut”, mews, green"
          autoComplete="off"
          onChange={(event) => dispatch({ type: 'query', value: event.target.value })}
          onKeyDown={(event) => {
            if (event.key === 'Enter') {
              selectFirstResult()
            }
            if (event.key === 'Escape') {
              if (state.query === '') {
                event.currentTarget.blur()
              } else {
                dispatch({ type: 'query', value: '' })
              }
            }
          }}
          className="h-12 w-full rounded-control border border-line-strong bg-surface pl-11 pr-11 text-body text-moss shadow-soft transition-colors duration-200 ease-settle placeholder:text-muted/70 focus:border-forest"
        />
        {state.query !== '' && (
          <button
            type="button"
            onClick={() => {
              dispatch({ type: 'query', value: '' })
              inputRef.current?.focus()
            }}
            aria-label="Clear the search"
            className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted transition-colors duration-200 ease-settle hover:bg-sage-mist hover:text-forest-deep"
          >
            <X size={16} aria-hidden="true" />
          </button>
        )}
      </div>

      <p role="status" className="mt-3 text-caption text-muted">
        {isSearching
          ? `${results.length} of ${NEIGHBOURHOOD_LIST.length} sample neighbourhoods match “${state.query.trim()}”.`
          : `${NEIGHBOURHOOD_LIST.length} fictional neighbourhoods on the map. Pick one, or use the map.`}
      </p>

      {results.length === 0 ? (
        <div className="mt-4 rounded-card border border-dashed border-line-strong bg-paper-recess p-dense">
          <p className="text-body text-moss">
            Nothing on this map answers to “{state.query.trim()}”.
          </p>
          <p className="mt-1 text-caption text-muted">
            These are the four neighbourhoods in the round:
          </p>
          <ul className="mt-3 flex flex-wrap gap-2">
            {NEIGHBOURHOOD_LIST.map((entry) => (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() => {
                    dispatch({ type: 'query', value: entry.aliases[0] ?? entry.name })
                    dispatch({ type: 'select-neighbourhood', id: entry.id, origin: 'search' })
                  }}
                  className="cursor-pointer rounded-full border border-line-strong bg-surface px-3 py-1 text-caption text-muted transition-colors duration-200 ease-settle hover:border-forest hover:text-forest-deep"
                >
                  {entry.name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <ul className="mt-4 flex flex-col gap-2">
          {results.map((entry) => {
            const isSelected = entry.id === state.neighbourhoodId
            const count = projectsInNeighbourhood(entry.id).length

            return (
              <li key={entry.id}>
                <button
                  type="button"
                  onClick={() =>
                    dispatch({ type: 'select-neighbourhood', id: entry.id, origin: 'search' })
                  }
                  onPointerDown={(event) => {
                    /* Keep the field focused so the list stays keyboard-driven. */
                    if (event.pointerType === 'mouse') {
                      event.preventDefault()
                    }
                  }}
                  aria-current={isSelected}
                  className={cn(
                    'w-full cursor-pointer rounded-card border p-dense text-left transition-all duration-200 ease-settle',
                    isSelected
                      ? 'border-forest/60 bg-sage-mist shadow-soft'
                      : 'border-line bg-surface hover:-translate-y-0.5 hover:border-sage-deep hover:shadow-soft',
                  )}
                >
                  <span className="flex items-baseline justify-between gap-3">
                    <span className="font-display text-subtitle text-forest-deep">{entry.name}</span>
                    <span className="text-caption whitespace-nowrap text-muted">{count} ideas</span>
                  </span>
                  <span className="mt-1 block text-caption text-muted">{entry.character}</span>
                </button>
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}
