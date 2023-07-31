import { ReactNode, createContext, memo, useCallback, useState } from 'react'
import { AppBarSettings } from '../../components'
import _ from 'lodash'

export interface AppBarSettingsContext {
  settings: { [id: string]: AppBarSettings }
  registerAppBarSettings: (id: string, settings: AppBarSettings) => void
  removeAppBarSettings: (id: string) => void
}

export const appBarSettingsContext = createContext<AppBarSettingsContext | null>(null)

export interface AppBarSettingsProviderProps {
  children: ReactNode
}

export const AppBarSettingsProvider = memo(({ children }: AppBarSettingsProviderProps) => {
  const [settings, setSettings] = useState<AppBarSettingsContext['settings']>({})

  const registerAppBarSettings = useCallback<AppBarSettingsContext['registerAppBarSettings']>((id, settings ) => {
    setSettings(s => ({
      ...s,
      [id]: settings
    }))
  }, [setSettings])

  const removeAppBarSettings = useCallback<AppBarSettingsContext['removeAppBarSettings']>((id) => {
    setSettings(s => _.omit(s, id))
  }, [setSettings])

  return (
    <appBarSettingsContext.Provider value={{
      settings,
      registerAppBarSettings,
      removeAppBarSettings
    }}>
      {children}
    </appBarSettingsContext.Provider>
  )
})
