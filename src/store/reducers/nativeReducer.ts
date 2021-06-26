import { Native } from '../model'
import { SetNatives, SET_NATIVES } from '../actions'

export type NativeReducerActions = SetNatives

export type NativeReducerState = { [hash: string]: Native }

export default function nativeReducer(state: NativeReducerState = {}, action: NativeReducerActions): NativeReducerState {
  switch(action.type) {
    case SET_NATIVES:
      return {
        ...action.natives
      }
    default:
      return state
  }
}
