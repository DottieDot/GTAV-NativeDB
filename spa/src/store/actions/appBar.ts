import { AppBarSettings } from "../../components"

export const REGISTER_APP_BAR_SETTINGS = 'REGISTER_APP_BAR_SETTINGS'
export const REMOVE_APP_BAR_SETTINGS = 'REMOVE_APP_BAR_SETTINGS'

export interface RegisterAppBarSettings {
  type: typeof REGISTER_APP_BAR_SETTINGS
  id: string
  settings: AppBarSettings
}


export interface RemoveAppBarSettings {
  type: typeof REMOVE_APP_BAR_SETTINGS
  id: string
}

export function registerAppBarSettings(id: string, settings: AppBarSettings): RegisterAppBarSettings {
  return {
    type: REGISTER_APP_BAR_SETTINGS,
    id, settings
  }
}

export function removeAppBarSettings(id: string): RemoveAppBarSettings {
  return {
    type: REMOVE_APP_BAR_SETTINGS,
    id
  }
}