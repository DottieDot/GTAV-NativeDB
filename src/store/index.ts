import { createStore } from 'redux'
import rootReducer from './reducers'

const store = createStore(rootReducer)

export default store

export * from './model'
export * from './actions'
export * from './reducers'
