import { Router } from './Router'
import { ProductProvider, AppThemeProvider, AuthProvider } from './shared/contexts'

const App: React.FC = () => (
  <AppThemeProvider>
    <AuthProvider>
      <ProductProvider>
        <Router />
      </ProductProvider>
    </AuthProvider>
  </AppThemeProvider>
)

export default App
