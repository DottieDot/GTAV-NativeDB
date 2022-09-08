import { NativeSources, Theme } from '../model'

export const SET_THEME = 'SET_THEME'
export const SET_SOURCES = 'SET_SOURCES'

export interface SetTheme {
  type : typeof SET_THEME
  theme: Theme
}

export interface SetSources {
  type   : typeof SET_SOURCES
  sources: NativeSources[]
}

export function setTheme(theme: Theme): SetTheme {
  return {
    type: SET_THEME,
    theme
  }
}

export function setSources(sources: NativeSources[]): SetSources {
  return {
    type: SET_SOURCES,
    sources
  }
}
