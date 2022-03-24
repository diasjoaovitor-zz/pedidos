import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AppThemeProvider } from './shared/contexts/ThemeContext'

import { Home } from './pages'

const App: React.FC = () => (
  <AppThemeProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  </AppThemeProvider>
)

export default App
