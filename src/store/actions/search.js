import { SET_SEARCH_RESULTS } from '../reducers/search'

export const search = (input) => 
  (dispatch, getState) => {
    const lower   = input.toLowerCase()
    const results = {}
    const natives = Object.values(getState().natives)

    natives.forEach(({ name, comment, namespace, hash, jhash, build }) => {
      if (
        (name.toLowerCase().indexOf(lower) !== -1) ||
        (comment.toLowerCase().indexOf(lower) !== -1) ||
        (hash.toLowerCase().indexOf(lower) !== -1) || 
        (jhash && (jhash.toLowerCase().indexOf(lower) !== -1) ||
        (`b${build}` === lower))
      ) {
        if (!results[namespace]) {
          results[namespace] = {
            name: namespace,
            natives: [],
          }
        }

        results[namespace].natives.push(hash)
      }
    })

    dispatch({
      type: SET_SEARCH_RESULTS,
      results,
    })
  }
