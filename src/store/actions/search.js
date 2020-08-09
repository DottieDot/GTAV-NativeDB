import { SET_SEARCH_RESULTS } from '../reducers/search'

export const search = (input) => 
  (dispatch, getState) => {
    const lower   = input.toLowerCase()
    const results = {}
    const natives = Object.values(getState().natives)

    const nsSeperator = lower.indexOf('::')
    const nsSearch = (nsSeperator !== -1) ? lower.split('::')[0] : null
    const search = (nsSeperator !== -1) ? lower.substr(nsSeperator + 2) : lower

    console.log(nsSearch, search)

    natives.forEach(({ name, comment, namespace, hash, jhash, build }) => {
      if ((
          (name.toLowerCase().indexOf(search) !== -1) ||
          (comment.toLowerCase().indexOf(search) !== -1) ||
          (hash.toLowerCase().indexOf(search) !== -1) || 
          (jhash && (jhash.toLowerCase().indexOf(search) !== -1)) ||
          (`b${build}` === search)
        ) && (
          (nsSearch === namespace.toLowerCase()) || (!nsSearch)
        )
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
