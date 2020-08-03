import { SET_NATIVES } from './natives'

export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS'
export const APPEND_SEARCH_RESULTS = 'APPEND_SEARCH_RESULTS'

export default (state = {}, action) => {
  switch (action.type) {
    case SET_NATIVES: {
      return action.namespaces
    }
    case SET_SEARCH_RESULTS: {
      return action.results
    }
    case APPEND_SEARCH_RESULTS: {
      return {
        ...state,
        ...action.results,
      }
    }
    default: {
      return state
    }
  }
}
