import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { PrivateRoute } from './shared/contexts'
import { Login, Home, Product, Search, Register } from './pages'
import { login, register, create, update } from './shared/services/firebase'

export const Router: React.FC = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login login={login} />} />
      <Route path="/register" element={<Register register={register} />} />
      <Route path="/" element={<PrivateRoute />}>
        <Route path="/" element={<Home />} />
      </Route>
      <Route path="/product/:method" element={<PrivateRoute />}>
        <Route path="/product/:method" element={<Product create={create} update={update} />} />
      </Route>
      <Route path="/search" element={<PrivateRoute />}>
        <Route path="/search" element={<Search />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
