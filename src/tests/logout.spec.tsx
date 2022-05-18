import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "./utils/Route"
import { Home } from "../pages"
import { TLogoutService } from "../shared/types"
import { AppThemeProvider, ProductProvider } from "../shared/contexts"
import { productState } from "../shared/states"

jest.mock('firebase/auth')

const history = createMemoryHistory({ initialEntries: ['/'] })

const setup = (logout: TLogoutService) => {
  render(
    <Route history={history}>
      <AppThemeProvider>
        <ProductProvider product={productState}>
          <Home logout={logout} />
        </ProductProvider>
      </AppThemeProvider>
    </Route>
  )
  return screen
}

describe('<Home />', () => {
  it('Logout failed', async () => {
    const logout = jest.fn()
    logout.mockImplementation(() => {
      throw { code: 'abc' }
    })
    const screen = setup(logout)
    const menu = screen.getByRole('navigation')
    await userEvent.click(menu)
    const logoutButton = screen.getByText('Logout')
    await userEvent.click(logoutButton)

    await waitFor(() => expect(screen.queryByText('Algo deu errado!')).toBeInTheDocument())
  })
})