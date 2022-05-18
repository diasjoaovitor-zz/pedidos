import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "./utils/Route"
import { GoBack } from "../shared/components/GoBack"

jest.mock('firebase/auth')

const history = createMemoryHistory({ initialEntries: ['/', '/search', '/product'] })

const setup = () => {
  render(
    <Route history={history}>
      <GoBack />
    </Route>
  )
  return screen
}

describe('<GoBack />', () => {
  it('Go back to previous page', async () => {
    const screen = setup()
    const goBack = screen.getByRole('link')

    await userEvent.click(goBack)
    await waitFor(() => expect(history.location.pathname).toBe('/search'))

    await userEvent.click(goBack)
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})
