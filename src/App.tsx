import { CssBaseline } from '@material-ui/core'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { AppBarProvider, BetaRibbon } from './components'
import { useNamespaces } from './hooks'
import NativeLoader from './NativeLoader'
import { LoadingScreen } from './pages'
import Router from './Router'
import store, { persistor } from './store'
import Theme from './Theme'

function LoadGate() {
  const namespaces = useNamespaces()
  if (!Object.keys(namespaces).length) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <AppBarProvider>
      <Router />
    </AppBarProvider>
  )
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Theme>
            <BetaRibbon />
            <CssBaseline />
            <NativeLoader />
            <LoadGate />
          </Theme>
        </BrowserRouter>
      </PersistGate>
    </StoreProvider>
  )
}
