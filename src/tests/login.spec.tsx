import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "./utils/Route"
import { Login } from "../pages"
import { AppThemeProvider } from "../shared/contexts"

const history = createMemoryHistory({ initialEntries: ['/login'] })

const setup = () => {
  render(
    <AppThemeProvider>
      <Route history={history}>
        <Login />
      </Route>
    </AppThemeProvider>
  )
  return screen
}

describe('<Login />', () => {
  it('Navigation from Login page to Register page', () => {
    const screen = setup()
    const link = screen.getByRole('link')
    link.click()
    expect(history.location.pathname).toBe('/register') 
  }) 

  it('User not found', async () => {
    const screen = setup()
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'not-exists@not-exists.com')
    await userEvent.type(password, 'not-exists')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Esse usuário não existe. Faça seu cadastro.')).toBeInTheDocument())
  }) 

  it('Wrong password', async () => {
    const screen = setup()
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, 'not-exists')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Senha incorreta.')).toBeInTheDocument())
  }) 
})
