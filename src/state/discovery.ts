import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'

import { DEFAULT_NEIGHBOURHOOD_ID, NEIGHBOURHOOD_LIST, neighbourhoodById } from '@/data/neighbourhoods'
import { PROJECTS, projectById } from '@/data/projects'
import type {
  CategoryId,
  DiscoveryAction,
  DiscoveryState,
  Neighbourhood,
  Project,
} from '@/types/domain'

export const INITIAL_DISCOVERY_STATE: DiscoveryState = {
  query: '',
  neighbourhoodId: DEFAULT_NEIGHBOURHOOD_ID,
  projectId: null,
  category: 'all',
  origin: 'search',
}

export function normalise(value: string): string {
  return value.trim().toLocaleLowerCase().replace(/\s+/g, ' ')
}

/** A district is found by its name or by one of its predefined aliases. */
export function matchesNeighbourhood(neighbourhood: Neighbourhood, needle: string): boolean {
  const haystack = [neighbourhood.name, ...neighbourhood.aliases].map(normalise)
  return haystack.some((entry) => entry.includes(needle))
}

function categoryAllows(category: CategoryId | 'all', project: Project): boolean {
  return category === 'all' || project.category === category
}

export function discoveryReducer(state: DiscoveryState, action: DiscoveryAction): DiscoveryState {
  switch (action.type) {
    case 'query': {
      return { ...state, query: action.value }
    }
    case 'select-neighbourhood': {
      return {
        ...state,
        neighbourhoodId: action.id,
        projectId: null,
        origin: action.origin,
      }
    }
    case 'select-project': {
      const project = projectById(action.id)
      /* An open filter that excludes the thing just picked would hide its own
         card, so picking an idea widens the list back out. */
      return {
        ...state,
        neighbourhoodId: project.neighbourhoodId,
        projectId: project.id,
        category: categoryAllows(state.category, project) ? state.category : 'all',
        origin: action.origin,
      }
    }
    case 'clear-project': {
      return { ...state, projectId: null }
    }
    case 'filter-category': {
      const selected = state.projectId === null ? null : projectById(state.projectId)
      const keepSelected = selected !== null && categoryAllows(action.value, selected)
      return {
        ...state,
        category: action.value,
        projectId: keepSelected ? state.projectId : null,
      }
    }
  }
}

export type DiscoveryDerived = {
  readonly neighbourhood: Neighbourhood
  /** Every idea in the focused district, whatever the filter says. */
  readonly districtProjects: readonly Project[]
  /** The ideas shown as cards for the focused district. */
  readonly visibleProjects: readonly Project[]
  /** Filtered ideas in the other districts, used by the empty state. */
  readonly elsewhereProjects: readonly Project[]
  readonly selectedProject: Project | null
  readonly results: readonly Neighbourhood[]
  readonly isSearching: boolean
}

export function deriveDiscovery(state: DiscoveryState): DiscoveryDerived {
  const neighbourhood = neighbourhoodById(state.neighbourhoodId)
  const districtProjects = PROJECTS.filter(
    (project) => project.neighbourhoodId === state.neighbourhoodId,
  )
  const elsewhereProjects = PROJECTS.filter(
    (project) =>
      project.neighbourhoodId !== state.neighbourhoodId &&
      categoryAllows(state.category, project),
  )
  const needle = normalise(state.query)

  return {
    neighbourhood,
    districtProjects,
    visibleProjects: districtProjects.filter((project) => categoryAllows(state.category, project)),
    elsewhereProjects,
    selectedProject:
      state.projectId === null ? null : projectById(state.projectId),
    results:
      needle === '' ? NEIGHBOURHOOD_LIST : NEIGHBOURHOOD_LIST.filter((entry) => matchesNeighbourhood(entry, needle)),
    isSearching: needle !== '',
  }
}

export type DiscoveryContextValue = DiscoveryDerived & {
  readonly state: DiscoveryState
  readonly dispatch: Dispatch<DiscoveryAction>
}

export const DiscoveryContext = createContext<DiscoveryContextValue | null>(null)

export function useDiscovery(): DiscoveryContextValue {
  const value = useContext(DiscoveryContext)
  if (value === null) {
    throw new Error('useDiscovery needs a DiscoveryProvider above it.')
  }
  return value
}
