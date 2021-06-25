import { CssBaseline } from '@material-ui/core'
import React, { Fragment } from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { AppBar } from './components'
import useNamespaces from './hooks/useNamespaces'
import NativeLoader from './NativeLoader'
import Router from './Router'
import store from './store'
import Theme from './Theme'

function LoadGate() {
  const namespaces = useNamespaces()
  if (!Object.keys(namespaces).length) {
    return (
      <h1>Loading {Object.keys(namespaces).length}</h1>
    )
  }

  return (
    <Fragment>
      <AppBar />
      <Router />
    </Fragment>
  )
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <BrowserRouter>
        <Theme>
          <CssBaseline />
          <NativeLoader />
          <LoadGate />
        </Theme>
      </BrowserRouter>
    </StoreProvider>
  )
}
