import { RegisterAppBarSettings, REGISTER_APP_BAR_SETTINGS, RemoveAppBarSettings, REMOVE_APP_BAR_SETTINGS } from '../actions'
import { AppBarSettings } from '../../components'

export type AppBarReducerActions = RegisterAppBarSettings | RemoveAppBarSettings

export type AppBarReducerState = { [id: string]: AppBarSettings }

const initialState: AppBarReducerState = {}

export default function appBarReducer(state: AppBarReducerState = initialState, action: AppBarReducerActions): AppBarReducerState {
  switch (action.type) {
    case REGISTER_APP_BAR_SETTINGS:
      return {
        ...state,
        [action.id]: action.settings
      }
    case REMOVE_APP_BAR_SETTINGS:
      return Object.keys(state).reduce<AppBarReducerState>((accumulator, id) => {
        if (id !== action.id) {
          accumulator[id] = state[id]
        }
        return accumulator
      }, {})
    default:
      return state
  }
}
