import { Routes, Route, Navigate } from 'react-router-dom'
import { GenerateCodePage, NativesPage } from './pages'

export default function Router() {
  return (
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
      <Route path="/generate-code" element={<Navigate to="/generate-code/cpp" replace />} />
      <Route path="/generate-header" element={<Navigate to="/generate-code" replace />} />
      <Route path="*" element={<Navigate to="/natives" replace />} />
    </Routes>
  )
}
