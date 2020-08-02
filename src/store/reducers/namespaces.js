import { SET_NATIVES } from "./natives";

export default (state = {}, action) => {
  switch (action.type) {
    case SET_NATIVES: {
      return action.namespaces
    }
    default: {
      return state
    }
  }
}
