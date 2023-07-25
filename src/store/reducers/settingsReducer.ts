import { SetSettings, SET_SETTINGS } from '../actions'
import { Theme, NativeSources, NativeDisplayMode } from '../model'

export type SettingsReducerActions = SetSettings
export interface SettingsReducerState {
  theme                : Theme
  sources              : NativeSources[]
  nativeDisplayMode    : NativeDisplayMode
  nativeTypes          : boolean
  compactVectors       : boolean
  displayVoidReturnType: boolean
  lightTheme           : string
  darkTheme            : string
}

const initialState: SettingsReducerState = {
  theme: 'system',
  sources: [NativeSources.Alloc8or, NativeSources.DottieDot],
  nativeDisplayMode: 'C',
  nativeTypes: true,
  compactVectors: false,
  displayVoidReturnType: true,
  lightTheme: 'Default',
  darkTheme: 'Default'
}

export default function settingsReducer(state: SettingsReducerState = initialState, action: SettingsReducerActions): SettingsReducerState {
  switch(action.type) {
    case SET_SETTINGS:
      return {
        ...state,
        ...action.settings
      }
    default:
      return state
  }
}
