import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

import { Home, Product } from './pages'

const App: React.FC = () => (
  <AppThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:method" element={<Product />} />
      </Routes>
    </BrowserRouter>
  </AppThemeProvider>
)

export default App
