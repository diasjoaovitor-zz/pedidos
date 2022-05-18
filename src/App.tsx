import { Router } from './Router'
import { ProductProvider, AppThemeProvider, AuthProvider } from './shared/contexts'
import { productState } from './shared/states'

const App: React.FC = () => (
  <AppThemeProvider>
    <AuthProvider>
      <ProductProvider product={productState}>
        <Router />
      </ProductProvider>
    </AuthProvider>
  </AppThemeProvider>
)

export default App
