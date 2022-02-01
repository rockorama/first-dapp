import { Route, Routes } from 'react-router-dom'

import About from './pages/About'
import Index from './pages/Index'

export default function Router() {
  return (
    <Routes>
      <Route path="/about" element={<About />} />
      <Route path="/" element={<Index />} />
    </Routes>
  )
}
