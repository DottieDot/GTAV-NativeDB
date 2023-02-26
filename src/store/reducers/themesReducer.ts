import _ from 'lodash'
import { PatchTheme, PATCH_THEME, RemoveTheme, REMOVE_THEME, SetTheme, SET_THEME } from '../actions'
import { CustomTheme } from '../model'

export type ThemesReducerActions = SetTheme | RemoveTheme | PatchTheme

export interface ThemesReducerState {
  themes: { [id: string]: CustomTheme }
}

const initialState: ThemesReducerState = {
  themes: {}
}

export default function themesReducer(state: ThemesReducerState = initialState, action: ThemesReducerActions): ThemesReducerState {
  switch (action.type) {
    case SET_THEME:
      return {
        ...state,
        themes: {
          ...state.themes,
          [action.theme.id]: action.theme
        }
      }
    case REMOVE_THEME:
      return {
        ...state,
        themes: _.omit(state.themes, [action.themeId])
      }
    case PATCH_THEME:
      return {
        ...state,
        themes: {
          ...state.themes,
          [action.themeId]: {
            ...state.themes[action.themeId],
            ...action.theme,
            colors: {
              ...state.themes[action.themeId].colors,
              ...action.theme.colors
            }
          }
        }
      }
    default:
      return state
  }
}
