import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "../mocks"
import { Login } from "../../pages"
import { AppThemeProvider } from "../../shared/contexts"
import { TAuthService } from "../../shared/types"

jest.mock('firebase/auth')

const history = createMemoryHistory({ initialEntries: ['/login'] })

const setup = (login: TAuthService) => {
  render(
    <AppThemeProvider>
      <Route history={history}>
        <Login login={login} />
      </Route>
    </AppThemeProvider>
  )
  return screen
}

describe('<Login />', () => {
  it('Navigation from Login page to Register page', () => {
    const screen = setup(jest.fn())
    const link = screen.getByRole('link')
    link.click()
    expect(history.location.pathname).toBe('/register') 
  }) 

  it('User not found', async () => {
    const login = jest.fn()
    login.mockImplementation(() => {
      throw { code: 'auth/user-not-found' }
    })
    const screen = setup(login)
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'not-exists@not-exists.com')
    await userEvent.type(password, 'not-exists')
    await userEvent.click(button)

    await waitFor(() => {
      expect(screen.queryByText('Esse usuário não existe. Faça seu cadastro.')).toBeInTheDocument()
    })
  }) 

  it('Wrong password', async () => {
    const login = jest.fn()
    login.mockImplementation(() => {
      throw { code: 'auth/wrong-password' }
    })
    const screen = setup(login)
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, 'not-exists')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Senha incorreta.')).toBeInTheDocument())
  }) 

  it('Correct Login', async () => {
    const screen = setup(jest.fn())
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '123456')
    await userEvent.click(button)

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})