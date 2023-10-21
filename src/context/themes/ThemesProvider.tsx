import { ReactNode, createContext, memo, useCallback } from 'react'
import { Theme, ThemeColors } from './model'
import useLocalStorageState from 'use-local-storage-state'
import _ from 'lodash'
import { useGuardedContext } from '../../hooks'

export type ThemePatch = Partial<Omit<Theme, 'id' | 'colors'>> & { colors?: Partial<ThemeColors> };

export interface ThemesContext {
  themes: { [id: string]: Theme }
  addTheme: (theme: Theme) => void
  patchTheme: (id: string, theme: ThemePatch) => void
  removeTheme: (id: string) => void
}

export const themesContext = createContext<ThemesContext | null>(null)

export function useThemesContext() {
  return useGuardedContext(themesContext, 'useThemes', 'ThemesProvider')
}

export interface ThemesProviderProps {
  children: ReactNode
}

export const ThemesProvider = memo(function ThemesProvider({ children }: ThemesProviderProps) {
  const [ themes, setThemes ] = useLocalStorageState<ThemesContext['themes']>('ThemesProvider-0', { defaultValue: {}})

  const addTheme = useCallback<ThemesContext['addTheme']>((theme) => {
    setThemes(themes => ({
      ...themes,
      [theme.id]: theme
    }))
  }, [ setThemes ])

  const patchTheme = useCallback<ThemesContext['patchTheme']>((id, theme) => {
    setThemes(themes => ({
      ...themes,
      [id]: {
        ...themes[id],
        ...theme,
        colors: {
          ...themes[id].colors,
          ...theme.colors
        }
      }
    }))
  }, [ setThemes ])

  const removeTheme = useCallback<ThemesContext['removeTheme']>((id) => { 
    setThemes(themes => _.omit(themes, id))
  }, [ setThemes ])

  return (
    <themesContext.Provider
      value={{
        themes,
        addTheme,
        removeTheme,
        patchTheme
      }}
    >
      {children}
    </themesContext.Provider>
  )
})
