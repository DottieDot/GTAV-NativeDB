import { AppBar, CssBaseline } from '@mui/material'
import { BrowserRouter } from 'react-router-dom'
import { AppContent, AppRibbon, OnlineStatusProvider, UpdateDialog } from './components'
import { useNamespaces } from './hooks'
import NativeLoader from './NativeLoader'
import { LoadingScreen, NativesPage } from './pages'
import Router from './Router'
import Theme from './Theme'
import { AppBarSettingsProvider, AppDataProvider, Game, NativeDataProvider, SelectedGameProvider, SettingsProvider, ThemesProvider } from './context'
import { AppFrame } from './components/AppFrame'

function LoadGate() {
  const namespaces = useNamespaces()
  if (!Object.keys(namespaces).length) {
    return (
      <LoadingScreen />
    )
  }

  return (
    <AppRibbon>
      <UpdateDialog />
      <Router />
    </AppRibbon>
  )
}

export default function App() {
  return (
    <AppDataProvider>
      <ThemesProvider>
        <SettingsProvider>
          <NativeDataProvider>
            <OnlineStatusProvider>
              <SelectedGameProvider game={Game.GrandTheftAuto5}>
                <AppBarSettingsProvider>
                  <BrowserRouter>
                    <Theme>
                      <CssBaseline />
                      <NativeLoader />

                      {/* <LoadGate /> */}
                      
                      <AppFrame>
                        <AppContent>
                          <Router />
                        </AppContent>
                      </AppFrame>
                    </Theme>
                  </BrowserRouter>
                </AppBarSettingsProvider>
              </SelectedGameProvider>
            </OnlineStatusProvider>
          </NativeDataProvider>
        </SettingsProvider>
      </ThemesProvider>
    </AppDataProvider>
  )
}
