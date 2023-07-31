import { Routes, Route, Navigate } from 'react-router-dom'
import { GenerateCodePage, Hashing, NativesPage } from './pages'
import { AppBar } from './components'
import { Game, SelectedGameProvider } from './context'


function GameNdb({ game }: { game: Game }) {
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
      </Routes>
    </SelectedGameProvider>
  )
}

export default function Router() {
  return (
    <Routes>
      <Route path="/gta5/*" element={<GameNdb game={Game.GrandTheftAuto5} />} />
      <Route path="/rdr3/*" element={<GameNdb game={Game.RedDeadRedemption2} />} />
      <Route path="/hash" element={<Hashing />} />
    </Routes>
  )
}
