import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import { Router } from 'react-router-dom'
import { GoBack} from '.'

const history = createMemoryHistory({ initialEntries: ['/'] })

describe('GoBack component', () => {
  beforeEach(() => history.push('/search'))

  it('Go back to previous page', async () => {
    const { container } = render(
      <Router navigator={history} location={history.location}>
        <GoBack />
      </Router>
    )
    const goBack = container.querySelector('button') as HTMLButtonElement
    await userEvent.click(goBack)

    expect(history.location.pathname).toBe('/')
  })
})
