import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppBar } from './components'
import NativeLoader from './NativeLoader'
import Router from './Router'
import store from './store'
import Theme from './Theme'


export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Theme>
          <CssBaseline />
          <NativeLoader />
          <AppBar />
          <Router />
        </Theme>
      </BrowserRouter>
    </StoreProvider>
  )
}
