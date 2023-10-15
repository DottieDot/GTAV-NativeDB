import { ReactNode, createContext, memo, useCallback, useState } from 'react'
import { useGuardedContext } from '../../hooks'

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

export const AppDataProvider = memo(({children}: AppDataProviderProps) => {
  const [state, setState] = useState<AppDataContext['state']>({
    updateReady: false,
    serviceWorkerRegistration: null
  })

  const setUpdateReady = useCallback<AppDataContext['setUpdateReady']>((swRegistration) => {
    setState({
      updateReady: true,
      serviceWorkerRegistration: swRegistration
    })
  }, [setState])

  return (
    <appDataContext.Provider value={{
      state,
      setUpdateReady
    }}>
      {children}
    </appDataContext.Provider>
  )
})
