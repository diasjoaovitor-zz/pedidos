import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "./utils/Route"
import { AppThemeProvider, ProductProvider } from "../shared/contexts"
import { Card, Layout } from "../shared/components"

jest.mock('firebase/auth')

const history = createMemoryHistory({ initialEntries: ['/'] })

const setup = () => {
  render(
    <Route history={history}>
      <AppThemeProvider>
        <ProductProvider>
          <Layout header="header">
            <Card items={['Teiú']} title="Empresas" />
          </Layout>
        </ProductProvider>
      </AppThemeProvider>
    </Route>
  )
  return screen
}

describe('<Layout />', () => {
  it('Navigate to Search page', async () => {
    const screen = setup()
    const search = screen.getByRole('searchbox')
    await userEvent.click(search)

    await waitFor(() => expect(history.location.pathname).toBe('/search'))
  })

  it('Navigate to Product page', async () => {
    const screen = setup()
    const add = screen.getByRole('insertion')
    await userEvent.click(add)

    await waitFor(() => expect(history.location.pathname).toBe('/product/create'))
  })
})
