import { BrowserRouter, Route, Routes } from 'react-router-dom'

import About from './pages/About'
import Index from './pages/Index'

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/about" element={<About />} />
        <Route path="/" element={<Index />} />
      </Routes>
    </BrowserRouter>
  )
}
