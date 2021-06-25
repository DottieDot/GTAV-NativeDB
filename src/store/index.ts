import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import persistStore from 'redux-persist/es/persistStore'
import rootReducer from './reducers'

const store = createStore(
  rootReducer,
  composeWithDevTools()
)

export default store

export const persistor = persistStore(store)

export * from './model'
export * from './actions'
export * from './reducers'
