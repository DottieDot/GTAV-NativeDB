import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import NativeLoader from './NativeLoader'
import store from './store'
import Theme from './Theme'


export default function App() {
  return (
    <StoreProvider store={store}>
      <Theme>
        <CssBaseline />
        <NativeLoader />
      </Theme>
    </StoreProvider>
  )
}
