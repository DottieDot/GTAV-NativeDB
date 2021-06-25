
export interface SettingsReducerState {
  theme: 'light' | 'dark' | 'system'
}

const initialState: SettingsReducerState = {
  theme: 'system'
}

export default function settingsReducer(state: SettingsReducerState = initialState, action: any): SettingsReducerState {
  switch(action.type) {
    default:
      return state
  }
}
