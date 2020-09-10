
export const SET_SELECTED_NATIVE = 'SET_SELECTED_NATIVE'

const defaultState = {
  selectedNative: '0x4EDE34FBADD967A6',
}

export default (state = defaultState, action) => {
  switch(action.type) {
    case SET_SELECTED_NATIVE:
      return {
        ...state,
        selectedNative: action.native,
      }
    default:
      return state
  }
}
