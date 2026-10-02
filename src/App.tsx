import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminIndex } from './pages/AdminIndex'
import { DemoPage } from './pages/DemoPage'
import { OwnerPage } from './pages/OwnerPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<AdminIndex />} />
        <Route path="/demo/:clientSlug" element={<DemoPage />} />
        <Route path="/demo/:clientSlug/owner" element={<OwnerPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
