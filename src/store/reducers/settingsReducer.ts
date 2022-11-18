import { SetSources, SetSpecialSource, SetTheme, SET_SOURCES, SET_SPECIAL_SOURCE, SET_THEME } from '../actions'
import { Theme, NativeSources } from '../model'

export type SettingsReducerActions = SetTheme | SetSources | SetSpecialSource

export interface SettingsReducerState {
  theme            : Theme
  sources          : NativeSources[]
  specialDataSource: string
}

const initialState: SettingsReducerState = {
  theme: 'system',
  sources: [NativeSources.Alloc8or],
  specialDataSource: ''
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
    case SET_SPECIAL_SOURCE:
      return {
        ...state,
        specialDataSource: action.source
      }
    default:
      return state
  }
}
