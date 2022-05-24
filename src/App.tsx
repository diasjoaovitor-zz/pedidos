import { ApolloProvider } from '@apollo/client'
import { Router } from './Router'
import { ProductProvider, AppThemeProvider, AuthProvider } from './shared/contexts'
import { client } from './shared/environment'
import { productState } from './shared/states'

const App: React.FC = () => (
  <AppThemeProvider>
    <AuthProvider>
      <ApolloProvider client={client}>
        <ProductProvider product={productState}>
          <Router />
        </ProductProvider>
      </ApolloProvider>
    </AuthProvider>
  </AppThemeProvider>
)

export default App
