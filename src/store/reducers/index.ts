import nativeReducer from './nativeReducer'
import namespaceReducer from './namespaceReducer'
import { combineReducers } from 'redux'
import statsReducer from './statsReducer'

const rootReducer = combineReducers({
  natives   : nativeReducer,
  namespaces: namespaceReducer,
  stats     : statsReducer
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

export * from './namespaceReducer'
export * from './nativeReducer'
