import { SetUpdateReady, SET_UPDATE_READY } from '../actions'

export type AppReducerActions = SetUpdateReady

export interface AppReducerState {
  updateReady              : boolean
  serviceWorkerRegistration: ServiceWorkerRegistration | null
}

const initialState: AppReducerState = {
  updateReady              : false,
  serviceWorkerRegistration: null
}

export default function appReducer(state: AppReducerState = initialState, action: AppReducerActions): AppReducerState {
  switch(action.type) {
    case SET_UPDATE_READY:
      return {
        ...state,
        serviceWorkerRegistration: action.swRegistration,
        updateReady: true
      }
    default:
      return state
  }
}
