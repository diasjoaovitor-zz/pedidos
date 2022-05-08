import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "./utils/Route"
import { Register } from "../pages"
import { AppThemeProvider } from "../shared/contexts"

const history = createMemoryHistory({ initialEntries: ['/register'] })

const setup = () => {
  render(
    <AppThemeProvider>
      <Route history={history}>
        <Register />
      </Route>
    </AppThemeProvider>
  )
  return screen
}

describe('<Register />', () => {
  it('Navigation from Register page to Login page', () => {
    const screen = setup()
    const link = screen.getByRole('link')
    link.click()
    expect(history.location.pathname).toBe('/login') 
  }) 

  it('Different passwords', async () => {
    const screen = setup()
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const passwordConfirm = screen.getByLabelText('Repita sua senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '123456')
    await userEvent.type(passwordConfirm, '1234567')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('As senhas não conferem!')).toBeInTheDocument())
  })

  it('Email already in use', async () => {
    const screen = setup()
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const passwordConfirm = screen.getByLabelText('Repita sua senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '123456')
    await userEvent.type(passwordConfirm, '123456')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Esse usuário não existe!')).toBeInTheDocument())
  }) 

  it('Invalid email', async () => {
    const screen = setup()
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const passwordConfirm = screen.getByLabelText('Repita sua senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste')
    await userEvent.type(password, '123456')
    await userEvent.type(passwordConfirm, '123456')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Email inválido!')).toBeInTheDocument())
  }) 
})
