import nativeReducer from './nativeReducer'
import namespaceReducer from './namespaceReducer'
import { combineReducers } from 'redux'
import statsReducer from './statsReducer'
import storage from 'redux-persist/lib/storage'
import { persistReducer } from 'redux-persist'
import settingsReducer from './settingsReducer'

const settingsPersistConfig = {
  key: 'Settings',
  storage: storage
}

const rootReducer = combineReducers({
  natives   : nativeReducer,
  namespaces: namespaceReducer,
  stats     : statsReducer,
  settings  : persistReducer(settingsPersistConfig, settingsReducer)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

export * from './namespaceReducer'
export * from './nativeReducer'
export * from './settingsReducer'
