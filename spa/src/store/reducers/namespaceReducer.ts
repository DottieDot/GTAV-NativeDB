import { SetNatives, SET_NATIVES } from '../actions'
import Namespace from '../model/Namespace'

export type NamespaceReducerActions = SetNatives

export type NamespaceReducerState = { [name: string]: Namespace }

export default function namespaceReducer(state: NamespaceReducerState = {}, action: NamespaceReducerActions): NamespaceReducerState {
  switch(action.type) {
    case SET_NATIVES:
      return {
        ...action.namespaces
      }
    default:
      return state
  }
}
