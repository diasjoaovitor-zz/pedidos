import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "../mocks"
import { GoBack } from "../../shared/components"

const history = createMemoryHistory({ initialEntries: ['/', '/search', '/product'] })

describe('<GoBack />', () => {
  it('Go back to previous page', async () => {
    render(
      <Route history={history}>
        <GoBack />
      </Route>
    )

    const goBack = screen.getByRole('link')

    await userEvent.click(goBack)
    await waitFor(() => expect(history.location.pathname).toBe('/search'))

    await userEvent.click(goBack)
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})