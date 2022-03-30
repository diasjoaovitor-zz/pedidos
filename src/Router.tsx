import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home, Product, Search } from './pages'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/product/:method" element={<Product />} />
      <Route path="/search" element={<Search />} />
    </Routes>
  </BrowserRouter>
)
