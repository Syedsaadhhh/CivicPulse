import { useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'

import {
  AllocationContext,
  INITIAL_ALLOCATION_STATE,
  allocationReducer,
  deriveAllocation,
} from '@/state/allocation'
import type { AllocationContextValue } from '@/state/allocation'

type AllocationProviderProps = {
  children: ReactNode
}

/**
 * The one place token counts live. Cards, the budget panel and the review
 * section all read this, so no surface can show a different total.
 */
export function AllocationProvider({ children }: AllocationProviderProps) {
  const [state, dispatch] = useReducer(allocationReducer, INITIAL_ALLOCATION_STATE)

  const value = useMemo<AllocationContextValue>(
    () => ({ ...deriveAllocation(state), state, dispatch }),
    [state],
  )

  return <AllocationContext.Provider value={value}>{children}</AllocationContext.Provider>
}
