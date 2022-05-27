import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { ReactNode } from "react"
import { Layout } from "../../shared/components"
import { ProductProvider } from "../../shared/contexts"
import { productState } from "../../shared/states"
import { Route } from "../mocks"

const history = createMemoryHistory({ initialEntries: ['/'] })

const setup = (children: ReactNode) => (
  render(
    <ProductProvider product={productState}>
      <Route history={history}>
        {children}
      </Route>
    </ProductProvider>
  )
)

describe('<Layout />', () => {
  it('Home Layout', async () => {
    setup(<Layout>Layout</Layout>)

    const searchbox = screen.getByRole('searchbox') 
    fireEvent.click(searchbox)
    waitFor(() => expect(history.location.pathname).toBe('/search'))

    const addButton = screen.getByRole('insertion') 
    fireEvent.click(addButton)
    waitFor(() => expect(history.location.pathname).toBe('/product/create'))
  }) 

  it('Search Layout', async () => {
    let inputValue = ''
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      inputValue = e.currentTarget.value
    }
    setup(
      <Layout autoFocus={true} handleChange={handleChange}>
        Layout
      </Layout>)

    const searchbox = screen.getByRole('searchbox') 
    await userEvent.type(searchbox, 'teste')
    expect(inputValue).toBe('teste')
  }) 
})