import { CssBaseline } from '@mui/material'
import React from 'react'
import { Provider as StoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { AppBar, OnlineStatusProvider, UpdateDialog } from './components'
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
    <React.Fragment>
      <AppBar />
      <UpdateDialog />
      <Router />
    </React.Fragment>
  )
}

export default function App() {
  return (
    <StoreProvider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <OnlineStatusProvider>
          <BrowserRouter>
            <Theme>
              <CssBaseline />
              <NativeLoader />
              <LoadGate />
            </Theme>
          </BrowserRouter>
        </OnlineStatusProvider>
      </PersistGate>
    </StoreProvider>
  )
}
