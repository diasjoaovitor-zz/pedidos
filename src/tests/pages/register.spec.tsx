import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "../mocks"
import { Register } from "../../pages"
import { AppThemeProvider } from "../../shared/contexts"
import { TAuthService } from "../../shared/types"

jest.mock('firebase/auth')

const history = createMemoryHistory({ initialEntries: ['/register'] })

const setup = (register: TAuthService) => {
  render(
    <AppThemeProvider>
      <Route history={history}>
        <Register register={register} />
      </Route>
    </AppThemeProvider>
  )
  return screen
}

describe('<Register />', () => {
  it('Navigation from Register page to Login page', () => {
    const screen = setup(jest.fn())
    const link = screen.getByRole('link')
    link.click()
    expect(history.location.pathname).toBe('/login') 
  }) 

  it('Different passwords', async () => {
    const screen = setup(jest.fn())
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
    const register = jest.fn()
    const error = 
    register.mockImplementation(() => {
      throw { code: 'auth/email-already-in-use' }
    })
    const screen = setup(register)
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const passwordConfirm = screen.getByLabelText('Repita sua senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '123456')
    await userEvent.type(passwordConfirm, '123456')
    await userEvent.click(button)

    await waitFor(() => expect(screen.queryByText('Esse usuário já existe!')).toBeInTheDocument())
  }) 

  it('Invalid email', async () => {
    const register = jest.fn()
    register.mockImplementation(() => {
      throw { code: 'auth/invalid-email' }
    })
    const screen = setup(register)
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

  it('Correct Register', async () => {
    const screen = setup(jest.fn())
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const passwordConfirm = screen.getByLabelText('Repita sua senha *')
    const button = screen.getByRole('button')

    await userEvent.type(email, 'teste@teste.com')
    await userEvent.type(password, '123456')
    await userEvent.type(passwordConfirm, '123456')
    await userEvent.click(button)

    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})
