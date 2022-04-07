import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './shared/contexts'
import { Login, Home, Product, Search, Register } from './pages'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/product/:method" element={<PrivateRoute />}>
        <Route path="/product/:method" element={<Product />} />
      </Route>
      <Route path="/search" element={<PrivateRoute />}>
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
