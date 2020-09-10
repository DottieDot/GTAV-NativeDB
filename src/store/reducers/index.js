import { combineReducers } from 'redux'
import natives from './natives'
import namespaces from './namespaces'
import stats from './stats'
import search from './search'
import app from './app'

export default combineReducers({
  natives,
  namespaces,
  stats,
  search,
  app,
})
