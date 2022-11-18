import { SetNatives, SET_NATIVES } from '../actions'
import { TypeDefinition } from '../model'

export type TypesReducerActions = SetNatives

export type TypesReducerState = { [name: string]: TypeDefinition }

export default function typesReducer(state: TypesReducerState = {}, action: TypesReducerActions): TypesReducerState {
  switch (action.type) {
    case SET_NATIVES:
      return {
        ...action.types
      }
    default:
      return state
  }
}
