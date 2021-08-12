import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appReducer from './appReducer'
import namespaceReducer from './namespaceReducer'
import nativeReducer from './nativeReducer'
import settingsReducer from './settingsReducer'
import statsReducer from './statsReducer'

const persistConfig = (key: string) => ({
  key,
  storage
})

const rootReducer = combineReducers({
  app       : appReducer,
  natives   : persistReducer(persistConfig('Natives'), nativeReducer),
  namespaces: persistReducer(persistConfig('Namespaces'), namespaceReducer),
  stats     : persistReducer(persistConfig('Stats'), statsReducer),
  settings  : persistReducer(persistConfig('Settings'), settingsReducer)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

export * from './appReducer'
export * from './namespaceReducer'
export * from './nativeReducer'
export * from './settingsReducer'

