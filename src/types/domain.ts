/**
 * CivicPulse domain model.
 *
 * All neighbourhoods, projects and transformations in this build are fictional
 * sample data written for the Hyperbloom concept; see `ROUND` in
 * src/data/round.ts for the notice shown beside them.
 */

export type NeighbourhoodId = 'marigold-mews' | 'ferngate-green' | 'alder-row' | 'sycamore-cut'

export type CategoryId = 'greening' | 'mobility' | 'water' | 'community' | 'play'

export type ProjectId = string

/** A point in neighbourhood-map viewBox units (0 0 800 600). */
export type MapPoint = {
  readonly x: number
  readonly y: number
}

/** A rectangle in neighbourhood-map viewBox units. */
export type MapBox = {
  readonly x: number
  readonly y: number
  readonly width: number
  readonly height: number
}

/** A point in street-transformation scene units (0 0 640 400). */
export type ScenePoint = {
  readonly x: number
  readonly y: number
}

export type CategoryMotif = 'tree' | 'cycle' | 'water' | 'gathering' | 'swing'

/** How far an idea has grown in the token drawing, from a seed in the ground to
 *  a young canopy. Driven by the share of the idea's own cost that is placed. */
export type CivicTokenStage = 'seed' | 'sprout' | 'leaf' | 'bloom'

export type Category = {
  readonly id: CategoryId
  readonly label: string
  readonly motif: CategoryMotif
  readonly blurb: string
}

export type Neighbourhood = {
  readonly id: NeighbourhoodId
  readonly name: string
  /** Lower-case terms that should still find this neighbourhood. */
  readonly aliases: readonly string[]
  /** One line for search results and map labels. */
  readonly character: string
  /** Two sentences for the selected-neighbourhood heading. */
  readonly story: string
  readonly box: MapBox
  readonly labelAt: MapPoint
}

/** A number paired with what it measures. Always an illustrative estimate. */
export type ImpactEstimate = {
  readonly label: string
  readonly value: string
}

export type TransformationArchetype = 'highstreet' | 'greenway' | 'waterfront' | 'courtyard'

export type SceneAnnotation = {
  readonly label: string
  readonly detail: string
  readonly at: ScenePoint
}

export type Transformation = {
  readonly archetype: TransformationArchetype
  readonly beforeCaption: string
  readonly afterCaption: string
  /** Pins revealed on the after side of the divider. */
  readonly annotations: readonly SceneAnnotation[]
  readonly readings: readonly ImpactEstimate[]
}

export type Project = {
  readonly id: ProjectId
  readonly neighbourhoodId: NeighbourhoodId
  readonly category: CategoryId
  readonly title: string
  /** The one line a reader remembers. */
  readonly hook: string
  readonly problem: string
  readonly proposal: string
  readonly costTokens: number
  readonly timeline: string
  readonly impacts: readonly ImpactEstimate[]
  readonly marker: MapPoint
  readonly transformation: Transformation
}

export type SelectionOrigin = 'map' | 'card' | 'search' | 'filter'

export type DiscoveryState = {
  readonly query: string
  readonly neighbourhoodId: NeighbourhoodId
  readonly projectId: ProjectId | null
  readonly category: CategoryId | 'all'
  /** Where the last selection came from, so the other surface can follow it. */
  readonly origin: SelectionOrigin
}

export type DiscoveryAction =
  | { readonly type: 'query'; readonly value: string }
  | {
      readonly type: 'select-neighbourhood'
      readonly id: NeighbourhoodId
      readonly origin: SelectionOrigin
    }
  | { readonly type: 'select-project'; readonly id: ProjectId; readonly origin: SelectionOrigin }
  | { readonly type: 'clear-project' }
  | { readonly type: 'filter-category'; readonly value: CategoryId | 'all' }

/**
 * The allocation as it stood at the press of the confirm button. Only the
 * token map is kept: every total, share and summary on the passport is derived
 * from it, so a receipt can never disagree with what was confirmed.
 */
export type ConfirmedBallot = {
  readonly reference: string
  /** ISO timestamp read from the browser clock when the visitor confirmed. */
  readonly confirmedAt: string
  readonly tokens: Record<ProjectId, number>
}

/**
 * Tokens placed against each project id. An idea with no entry has nothing
 * placed, so the review list and the empty state both read the same shape.
 * A confirmed ballot locks the map until the visitor amends it.
 */
export type AllocationState = {
  readonly tokens: Record<ProjectId, number>
  readonly ballot: ConfirmedBallot | null
}

/**
 * `amount` is a request, not a promise: the reducer clamps it to what the idea
 * still needs and to what the round still has, so no caller can overspend.
 * `confirm` carries the reference and the clock reading because a reducer has
 * no business inventing either; every other action is ignored once a ballot
 * exists, so a submitted snapshot cannot drift.
 */
export type AllocationAction =
  | { readonly type: 'add'; readonly id: ProjectId; readonly amount: number }
  | { readonly type: 'remove'; readonly id: ProjectId; readonly amount: number }
  | { readonly type: 'reset' }
  | { readonly type: 'confirm'; readonly reference: string; readonly confirmedAt: string }
  | { readonly type: 'amend' }
  | { readonly type: 'fresh' }
