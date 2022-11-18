import { SetNatives, SET_NATIVES } from '../actions'
import { ConstDefinition } from '../model'

export type ConstsReducerActions = SetNatives

export type ConstsReducerState = { [name: string]: ConstDefinition }

export default function constsReducer(state: ConstsReducerState = {}, action: ConstsReducerActions): ConstsReducerState {
  switch (action.type) {
    case SET_NATIVES:
      return {
        ...action.consts
      }
    default:
      return state
  }
}
