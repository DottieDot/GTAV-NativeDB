import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import store from './store'

export default function App() {
  return (
    <StoreProvider store={store}>
      
    </StoreProvider>
  )
}
