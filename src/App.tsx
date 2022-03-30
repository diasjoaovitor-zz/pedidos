import { Router } from './Router'
import { ProductProvider, AppThemeProvider } from './shared/contexts'

const App: React.FC = () => (
  <AppThemeProvider>
    <ProductProvider>
      <Router />
    </ProductProvider>
  </AppThemeProvider>
)

export default App
