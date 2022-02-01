import { Route, Routes } from 'react-router-dom'

import Greeter from './pages/Greeter'
import Index from './pages/Index'

export default function Router() {
  return (
    <Routes>
      <Route path="/greeter" element={<Greeter />} />
      <Route path="/" element={<Index />} />
    </Routes>
  )
}
