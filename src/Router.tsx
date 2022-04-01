import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './shared/contexts'
import { Auth, Home, Product, Search } from './pages'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/auth" element={<Auth />} />
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
