import { combineReducers } from 'redux'
import natives from './natives'
import namespaces from './namespaces'

export default combineReducers({
  natives,
  namespaces
})
