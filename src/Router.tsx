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
          path="/natives/:native" 
          element={<NativesPage />}
        />
        <Route 
          path="/natives"
          element={<NativesPage />}
        />
        <Route 
          path="/generate-code/:language"
          element={<GenerateCodePage />}
        />
        <Route path="/generate-code" element={<Navigate to="../generate-code/cpp" replace />} />
        <Route path="/generate-header" element={<Navigate to="../generate-code" replace />} />
        <Route path="*" element={<Navigate to={`${base}/natives`} replace />} />
      </Routes>
    </SelectedGameProvider>
  )
}

export default function Router() {
  return (
    <Routes>
      <Route path="/gta5/*" element={<GameNdb base="/gta5" game={Game.GrandTheftAuto5} />} />
      <Route path="/rdr3/*" element={<GameNdb base="/rdr3" game={Game.RedDeadRedemption2} />} />
      <Route path="/hash" element={<Hashing />} />
      <Route path="*" element={<Navigate to="../gta5/natives" replace />} />
    </Routes>
  )
}
