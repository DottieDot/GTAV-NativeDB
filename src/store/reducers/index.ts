import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import appBarReducer from './appBarReducer'
import appReducer from './appReducer'
import namespaceReducer from './namespaceReducer'
import nativeReducer from './nativeReducer'
import settingsReducer from './settingsReducer'
import statsReducer from './statsReducer'
import typesReducer from './typesReducer'
import constsReducer from './constsReducer'
import themesReducer from './themesReducer'

const settingsPersistConfig = {
  key: 'Settings',
  storage: storage
}

const themesPersistConfig = {
  key: 'Themes',
  storage: storage
}

const rootReducer = combineReducers({
  app       : appReducer,
  natives   : nativeReducer,
  namespaces: namespaceReducer,
  types     : typesReducer,
  constants : constsReducer,
  stats     : statsReducer,
  appBar    : appBarReducer,
  settings  : persistReducer(settingsPersistConfig, settingsReducer),
  themes    : persistReducer(themesPersistConfig, themesReducer)
})

export type RootState = ReturnType<typeof rootReducer>

export default rootReducer

export * from './appReducer'
export * from './namespaceReducer'
export * from './nativeReducer'
export * from './settingsReducer'
export * from './typesReducer'
