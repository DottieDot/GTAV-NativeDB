import { SET_NATIVES } from "./natives"

const defaultState = {
  namespaces: 0,
  natives   : 0,
  comments  : 0,
  knownNames: { 
    total: 0, 
    confirmed: 0, 
  }
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case SET_NATIVES: {
      return {
        ...state,
        namespaces: Object.keys(action.namespaces).length,
        natives   : Object.keys(action.natives).length,
        comments  : Object.values(action.natives).reduce((accumulator, native) => {
          accumulator += !!native.comment
          return accumulator
        }, 0),
        knownNames: Object.values(action.natives).reduce((accumulator, native) => {
          accumulator.total += native.name.substr(0, 2) !== '_0'
          accumulator.confirmed += native.name[0] !== '_'
          return accumulator
        }, { total: 0, confirmed: 0 })
      }
    }
    default: {
      return state
    }
  }
}
