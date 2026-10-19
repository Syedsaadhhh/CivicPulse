import { createContext, useContext } from 'react'
import type { Dispatch } from 'react'

import { PROJECTS, projectById } from '@/data/projects'
import { ROUND } from '@/data/round'
import type {
  AllocationAction,
  AllocationState,
  CivicTokenStage,
  ConfirmedBallot,
  Project,
  ProjectId,
} from '@/types/domain'

export const INITIAL_ALLOCATION_STATE: AllocationState = { tokens: {}, ballot: null }

/** One press of the add control. Five is generous enough that a visitor can
 *  place a whole round in a few decisions, small enough to stay thoughtful. */
export const TOKEN_STEP = 5

export function tokensOn(tokens: AllocationState['tokens'], id: ProjectId): number {
  return tokens[id] ?? 0
}

function totalPlaced(tokens: AllocationState['tokens']): number {
  return Object.values(tokens).reduce((total, value) => total + value, 0)
}

function remainingOf(tokens: AllocationState['tokens']): number {
  return ROUND.tokenBudget - totalPlaced(tokens)
}

/**
 * What an add of `amount` can honestly place on one idea: never more than the
 * idea still needs, never more than the round still has, never negative and
 * never a fraction. Zero means the control has nothing left to do.
 */
export function placeableTokens(
  project: Project,
  placed: number,
  remaining: number,
  amount: number = TOKEN_STEP,
): number {
  const room = Math.min(project.costTokens - placed, remaining)
  return Math.max(0, Math.min(Math.floor(amount), room))
}

/** Why the add control is resting, so the card can say it instead of shrugging. */
export type PlaceBlock = 'budget' | 'cost' | null

export function placeBlock(
  project: Project,
  placed: number,
  remaining: number,
): PlaceBlock {
  if (remaining <= 0) {
    return 'budget'
  }
  return project.costTokens - placed <= 0 ? 'cost' : null
}

/** Growth follows the share of this idea's own cost that has been placed. */
export function tokenStage(placed: number, costTokens: number): CivicTokenStage {
  if (placed <= 0) {
    return 'seed'
  }
  const share = placed / costTokens
  if (share < 0.34) {
    return 'sprout'
  }
  return share < 0.67 ? 'leaf' : 'bloom'
}

export function allocationReducer(
  state: AllocationState,
  action: AllocationAction,
): AllocationState {
  /* Once a ballot exists the map is evidence: the cards, the panel and the
     review all read the confirmed numbers until the visitor amends on purpose. */
  const locked = state.ballot !== null

  switch (action.type) {
    case 'add': {
      if (locked) {
        return state
      }
      const project = projectById(action.id)
      const placed = tokensOn(state.tokens, project.id)
      const amount = placeableTokens(project, placed, remainingOf(state.tokens), action.amount)
      if (amount === 0) {
        return state
      }
      return { ...state, tokens: { ...state.tokens, [project.id]: placed + amount } }
    }
    case 'remove': {
      if (locked) {
        return state
      }
      const project = projectById(action.id)
      const placed = tokensOn(state.tokens, project.id)
      const amount = Math.max(0, Math.min(Math.floor(action.amount), placed))
      if (amount === 0) {
        return state
      }
      const tokens = { ...state.tokens }
      const left = placed - amount
      if (left === 0) {
        delete tokens[project.id]
      } else {
        tokens[project.id] = left
      }
      return { ...state, tokens }
    }
    case 'reset': {
      if (locked || Object.keys(state.tokens).length === 0) {
        return state
      }
      return { ...state, tokens: {} }
    }
    case 'confirm': {
      if (locked || totalPlaced(state.tokens) === 0) {
        return state
      }
      return {
        ...state,
        ballot: {
          reference: action.reference,
          confirmedAt: action.confirmedAt,
          tokens: { ...state.tokens },
        },
      }
    }
    case 'amend': {
      return locked ? { ...state, ballot: null } : state
    }
    case 'fresh': {
      if (!locked && Object.keys(state.tokens).length === 0) {
        return state
      }
      return { tokens: {}, ballot: null }
    }
  }
}

export type FundedProject = {
  readonly project: Project
  readonly tokens: number
  /** Percent of the whole round budget, which is what a visitor is weighing. */
  readonly share: number
}

export type AllocationTotals = {
  readonly budget: number
  readonly placed: number
  /** Always `budget - placed`, so the two can never drift apart. */
  readonly remaining: number
  /** Ideas holding tokens, heaviest first. */
  readonly funded: readonly FundedProject[]
  readonly hasTokens: boolean
}

/**
 * Every number the product shows, straight from a token map. The live state and
 * a confirmed ballot both come through here, which is what keeps the passport's
 * totals identical to the review's.
 */
export function deriveTokens(tokens: AllocationState['tokens']): AllocationTotals {
  const placed = totalPlaced(tokens)
  const budget = ROUND.tokenBudget

  const funded: FundedProject[] = []
  for (const project of PROJECTS) {
    const value = tokensOn(tokens, project.id)
    if (value > 0) {
      funded.push({ project, tokens: value, share: (value / budget) * 100 })
    }
  }
  funded.sort((a, b) => b.tokens - a.tokens)

  return {
    budget,
    placed,
    remaining: budget - placed,
    funded,
    hasTokens: funded.length > 0,
  }
}

/** Why the confirm control is resting, so the review can say it out loud. */
export type ConfirmBlock = 'empty' | 'locked' | null

export type AllocationDerived = AllocationTotals & {
  readonly ballot: ConfirmedBallot | null
  /** True while a confirmed ballot holds the token map still. */
  readonly locked: boolean
  readonly confirmBlock: ConfirmBlock
}

export function deriveAllocation(state: AllocationState): AllocationDerived {
  const locked = state.ballot !== null
  const totals = deriveTokens(state.tokens)

  return {
    ...totals,
    ballot: state.ballot,
    locked,
    confirmBlock: locked ? 'locked' : totals.hasTokens ? null : 'empty',
  }
}

export type AllocationContextValue = AllocationDerived & {
  readonly state: AllocationState
  readonly dispatch: Dispatch<AllocationAction>
}

export const AllocationContext = createContext<AllocationContextValue | null>(null)

export function useAllocation(): AllocationContextValue {
  const value = useContext(AllocationContext)
  if (value === null) {
    throw new Error('useAllocation needs an AllocationProvider above it.')
  }
  return value
}
