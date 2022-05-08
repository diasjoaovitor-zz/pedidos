import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { Login } from "../pages"
import { history, Route } from "./utils/Route"

const setup = () => {
  render(
    <Route>
      <Login />
    </Route>
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

    userEvent.type(email, 'not-exists@not-exists.com')
    userEvent.type(password, 'not-exists')
    userEvent.click(button)
    
    await waitFor(() => screen.queryByText('Esse usuário não existe. Faça seu cadastro.'))
  }) 

  it('Wrong password', async () => {
    const screen = setup()
    const email = screen.getByLabelText('Email *')
    const password = screen.getByLabelText('Senha *')
    const button = screen.getByRole('button')

    userEvent.type(email, 'test@test.com')
    userEvent.type(password, 'not-exists')
    userEvent.click(button)
    
    await waitFor(() => screen.queryByText('Senha incorreta.'))
  }) 
})
