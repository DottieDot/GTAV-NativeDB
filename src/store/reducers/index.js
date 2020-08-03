import { combineReducers } from 'redux'
import natives from './natives'
import namespaces from './namespaces'
import stats from './stats'

export default combineReducers({
  natives,
  namespaces,
  stats,
})
