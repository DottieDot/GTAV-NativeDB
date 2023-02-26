import { SettingsReducerState } from '../reducers'


export const SET_SETTINGS = 'SET_SETTINGS'
export interface SetSettings {
  type: typeof SET_SETTINGS,
  settings: Partial<SettingsReducerState>
}

export function setSettings(settings: SetSettings['settings']): SetSettings {
  return {
    type: SET_SETTINGS,
    settings
  }
}
