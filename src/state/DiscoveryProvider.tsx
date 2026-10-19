import { useMemo, useReducer } from 'react'
import type { ReactNode } from 'react'

import type { DiscoveryState } from '@/types/domain'
import {
  DiscoveryContext,
  INITIAL_DISCOVERY_STATE,
  deriveDiscovery,
  discoveryReducer,
} from '@/state/discovery'
import type { DiscoveryContextValue } from '@/state/discovery'

type DiscoveryProviderProps = {
  children: ReactNode
  /** Lets a later phase open the app on a district it was pointed at. */
  initial?: Partial<DiscoveryState>
}

export function DiscoveryProvider({ children, initial }: DiscoveryProviderProps) {
  const [state, dispatch] = useReducer(discoveryReducer, {
    ...INITIAL_DISCOVERY_STATE,
    ...initial,
  })

  const value = useMemo<DiscoveryContextValue>(
    () => ({ ...deriveDiscovery(state), state, dispatch }),
    [state],
  )

  return <DiscoveryContext.Provider value={value}>{children}</DiscoveryContext.Provider>
}
