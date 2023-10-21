import { Routes, Route, Navigate } from 'react-router-dom'
import { GenerateCodePage, Hashing, NativesPage } from './pages'
import { AppBar } from './components'
import { Game, SelectedGameProvider } from './context'


function GameNdb({ base, game }: { base: string, game: Game }) {
  return (
    <SelectedGameProvider game={game}>
      <AppBar />

      <Routes>
        <Route 
          element={<NativesPage />} 
          path="/natives/:native"
        />

        <Route 
          element={<NativesPage />}
          path="/natives"
        />

        <Route 
          element={<GenerateCodePage />}
          path="/generate-code/:language"
        />

        <Route element={<Navigate to="../generate-code/cpp" replace />} path="/generate-code" />
        <Route element={<Navigate to="../generate-code" replace />} path="/generate-header" />
        <Route element={<Navigate to={`${base}/natives`} replace />} path="*" />
      </Routes>
    </SelectedGameProvider>
  )
}

export default function Router() {
  return (
    <Routes>
      <Route element={<GameNdb base="/gta5" game={Game.GrandTheftAuto5} />} path="/gta5/*" />
      <Route element={<GameNdb base="/rdr3" game={Game.RedDeadRedemption2} />} path="/rdr3/*" />
      <Route element={<Hashing />} path="/hash" />
      <Route element={<Navigate to="../gta5/natives" replace />} path="*" />
    </Routes>
  )
}
