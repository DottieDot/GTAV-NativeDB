import { CustomTheme, CustomThemeColors } from '../model'

export const SET_THEME = 'SET_THEME'
export const REMOVE_THEME = 'REMOVE_THEME'
export const PATCH_THEME = 'PATCH_THEME'

export interface SetTheme {
  type: typeof SET_THEME,
  theme: CustomTheme,
}

export interface RemoveTheme {
  type: typeof REMOVE_THEME,
  themeId: string
}

export interface PatchTheme {
  type: typeof PATCH_THEME,
  themeId: string
  theme: Partial<Omit<CustomTheme, 'id' | 'colors'>> & { colors?: Partial<CustomThemeColors> }
}

export function setTheme(theme: CustomTheme): SetTheme {
  return {
    type: SET_THEME,
    theme
  }
}

export function removeTheme(theme: string): RemoveTheme {
  return {
    type: REMOVE_THEME,
    themeId: theme
  }
}

export function patchTheme(themeId: string, theme: PatchTheme['theme']) {
  return {
    type: PATCH_THEME,
    themeId,
    theme
  }
}
