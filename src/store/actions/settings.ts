import { NativeDisplayMode, NativeSources, Theme } from '../model'

export interface SetSettingsSettings {
  theme?: Theme
  sources?: NativeSources[]
  nativeDisplayMode?: NativeDisplayMode
  displayVoidReturnType?: boolean
}

export const SET_SETTINGS = 'SET_SETTINGS'
export interface SetSettings {
  type: typeof SET_SETTINGS,
  settings: SetSettingsSettings
}

export function setSettings(settings: SetSettingsSettings): SetSettings {
  return {
    type: SET_SETTINGS,
    settings
  }
}
