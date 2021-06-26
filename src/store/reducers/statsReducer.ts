import { SetNatives, SET_NATIVES } from '../actions'
import { NativeStats } from '../model'

export type StatsReducerActions = SetNatives

export type StatsReducerState = NativeStats

const initialState: StatsReducerState = {
  namespaces: 0,
  natives   : 0,
  comments  : 0,
  knownNames: {
    total    : 0,
    confirmed: 0
  }
}

export default function statsReducer(state: StatsReducerState = initialState, action: StatsReducerActions): StatsReducerState {
  switch(action.type) {
    case SET_NATIVES:
      return {
        ...action.stats
      }
    default:
      return state
  }
}
