import { ReactNode, createContext, memo, useCallback, useEffect, useState } from 'react'
import { useGuardedContext } from '../../hooks'

let updateWasReady: ServiceWorkerRegistration | null = null
const updateReadyListeners: Set<((sw: ServiceWorkerRegistration) => void)> = new Set()

export function notifyUpdateReady(sw: ServiceWorkerRegistration) { 
  updateWasReady = sw
  for (const listener of updateReadyListeners) {
    listener(sw)
  }
}

function addListener(listener: (sw: ServiceWorkerRegistration) => void) {
  if (updateWasReady) {
    listener(updateWasReady)
  }

  updateReadyListeners.add(listener)
}

function removeListener(listener: (sw: ServiceWorkerRegistration) => void) {
  updateReadyListeners.delete(listener)
}

export interface AppDataContext {
  state: {
    updateReady: boolean
    serviceWorkerRegistration: ServiceWorkerRegistration | null
  },
  setUpdateReady: (swRegistration: ServiceWorkerRegistration) => void
}

export const appDataContext = createContext<AppDataContext | null>(null)

export function useAppDataContext() {
  return useGuardedContext(appDataContext, 'useAppData', 'AppDataProvider')
}

export interface AppDataProviderProps {
  children: ReactNode
}

export const AppDataProvider = memo(function AppDataProvider({ children }: AppDataProviderProps) {
  const [ state, setState ] = useState<AppDataContext['state']>({
    updateReady:               false,
    serviceWorkerRegistration: null
  })

  const setUpdateReady = useCallback<AppDataContext['setUpdateReady']>((swRegistration) => {
    setState({
      updateReady:               true,
      serviceWorkerRegistration: swRegistration
    })
  }, [ setState ])

  useEffect(() => {
    const listener = (sw: ServiceWorkerRegistration) => {
      setState(state => ({
        ...state,
        updateReady:               true,
        serviceWorkerRegistration: sw
      }))
    }

    addListener(listener)

    return () => {
      removeListener(listener)
    }
  }, [ setState ])

  return (
    <appDataContext.Provider
      value={{
        state,
        setUpdateReady
      }}
    >
      {children}
    </appDataContext.Provider>
  )
})
