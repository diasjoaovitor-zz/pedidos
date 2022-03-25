import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

import { Home, Product, Search } from './pages'

const App: React.FC = () => (
  <AppThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:method" element={<Product />} />
        <Route path="/search" element={<Search />} />
      </Routes>
    </BrowserRouter>
  </AppThemeProvider>
)

export default App
