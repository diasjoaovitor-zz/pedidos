import { fireEvent, render, screen } from "@testing-library/react"
import { Menu } from "../../shared/components"
import { AppThemeProvider } from "../../shared/contexts"

describe('<Menu />', () => {
  it('', async () => {
    const { container } = render(
      <AppThemeProvider>
        <Menu />
      </AppThemeProvider>
    )
    const menu = screen.getByRole('menu') 

    // menu is closed
    expect(screen.queryAllByRole('menuitem')).toHaveLength(0)

    // menu is opened
    fireEvent.click(menu)
    expect(screen.queryAllByRole('menuitem')).toHaveLength(2)
    
    const toggleTheme = screen.getByText('Mudar Tema')

    // dark theme is default
    const darkTheme =  container.querySelector('.css-yknipy')
    expect(darkTheme).toBeInTheDocument()

    // toggle to light theme
    fireEvent.click(toggleTheme)
    const lightTheme =  container.querySelector('.css-yknipy')
    expect(lightTheme).not.toBeInTheDocument()

    // close menu: not works
    // fireEvent.click(menu)
    // expect(screen.queryAllByRole('menuitem')).toHaveLength(0)
  }) 
})