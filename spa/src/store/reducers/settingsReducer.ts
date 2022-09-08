import { SetSources, SetTheme, SET_SOURCES, SET_THEME } from '../actions'
import { Theme, NativeSources } from '../model'

export type SettingsReducerActions = SetTheme | SetSources

export interface SettingsReducerState {
  theme  : Theme
  sources: NativeSources[]
}

const initialState: SettingsReducerState = {
  theme: 'system',
  sources: [NativeSources.Alloc8or]
}

export default function settingsReducer(state: SettingsReducerState = initialState, action: SettingsReducerActions): SettingsReducerState {
  switch(action.type) {
    case SET_THEME:
      return {
        ...state,
        theme: action.theme
      }
    case SET_SOURCES:
      return {
        ...state,
        sources: action.sources
      }
    default:
      return state
  }
}
