import { ReactNode, createContext, memo, useCallback } from 'react'
import { NativeSources, Settings } from './model'
import useLocalStorageState from 'use-local-storage-state'

export interface SettingsContext {
  settings: Settings
  patchSettings: (settings: Partial<Settings>) => void
}

export const settingsContext = createContext<SettingsContext | null>(null)

export interface SettingsProviderProps {
  children: ReactNode
}

export const SettingsProvider = memo(({ children }: SettingsProviderProps) => {
  const [settings, setSettings] = useLocalStorageState<Settings>('SettingsProvider-0', {
    defaultValue: {
      theme: 'system',
      sources: [NativeSources.Alloc8or, NativeSources.DottieDot],
      nativeDisplayMode: 'C',
      nativeTypes: true,
      compactVectors: false,
      displayVoidReturnType: true,
      lightTheme: 'Default',
      darkTheme: 'Default'
    }
  })

  const patchSettings = useCallback<SettingsContext['patchSettings']>((patch) => {
    setSettings(settings => ({
      ...settings,
      ...patch
    }))
  }, [setSettings])

  return (
    <settingsContext.Provider value={{
      settings, 
      patchSettings 
    }}>
      {children}
    </settingsContext.Provider>
  )
})
