export const SET_NATIVES = 'SET_NATIVES'

export default (state = {}, action) => {
  switch(action.type) {
    case SET_NATIVES: {
      return action.natives
    }
    default: {
      return state
    }
  }
}
