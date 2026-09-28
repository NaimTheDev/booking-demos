import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AdminIndex } from './pages/AdminIndex'
import { DemoPage } from './pages/DemoPage'

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <Routes>
        <Route path="/" element={<AdminIndex />} />
        <Route path="/demo/:clientSlug" element={<DemoPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
