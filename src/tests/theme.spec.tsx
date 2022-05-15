import { render } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { AppThemeProvider } from '../shared/contexts'
import { ToggleTheme } from "../shared/components"

const setup = () => {
  return render(
    <AppThemeProvider>
      <ToggleTheme />
    </AppThemeProvider>
  )
}
describe('<Toggle Theme />', () => {
  it('Dark theme is default', async () => {
    const { container } = setup()
    const theme =  container.querySelector('.css-yknipy')

    expect(theme).toBeInTheDocument()
  })

  it('Toggle to light theme', async () => {
    const screen = setup()
    const button = screen.getByRole('button')
    await userEvent.click(button)
    const theme =  screen.container.querySelector('.css-yknipy')

    expect(theme).not.toBeInTheDocument()
  })
})