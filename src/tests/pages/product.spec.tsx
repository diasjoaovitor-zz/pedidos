import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { MockedProvider } from '@apollo/client/testing'
import { createMemoryHistory } from "history"
import { productMock, queriesMocks, Route } from "../mocks"
import { Product } from "../../pages"
import { AppThemeProvider, ProductProvider } from "../../shared/contexts"

const history = createMemoryHistory({ initialEntries: ['/product/create'] })

const setup = () => (
  render(
    <MockedProvider mocks={queriesMocks}>
      <AppThemeProvider>
          <ProductProvider product={productMock}>
            <Route history={history}>
              <Product />
            </Route>
          </ProductProvider>
     </AppThemeProvider>
    </MockedProvider>
  )
)

const originalWarn = console.warn.bind(console.warn)

describe('<Product />', () => {
  beforeAll(() => {
    console.warn = (msg: any) =>
      !msg.toString().includes('refetchQueries') && originalWarn(msg)
  })
  afterAll(() => {
    console.warn = originalWarn
  })

  it('Create dynamic availability fields', async () => {
    setup()
    let fieldsets = screen.getAllByRole('group')
    
    expect(fieldsets.length).toBe(2)

    for (let fieldset of fieldsets) {
      const [ brand, value, company ] = fieldset.querySelectorAll('input')
      await userEvent.type(brand, productMock.availability[0].brand)
      await userEvent.type(value, String(productMock.availability[0].price))
      await userEvent.type(company, productMock.availability[0].company)
    }
    fieldsets = screen.getAllByRole('group')

    await waitFor(() => expect(fieldsets.length).toBe(3))

    const [ brand, value, company ] = fieldsets[1].querySelectorAll('input')
    await userEvent.clear(brand)
    await userEvent.clear(value)
    await userEvent.clear(company)
    fieldsets = screen.getAllByRole('group')

    await waitFor(() => expect(fieldsets.length).toBe(2))
  }) 

  it('Adds new product', async () => {
    setup()

    const product = screen.getByLabelText('Produto *')
    const brand = screen.getByLabelText('Marca *')
    const value = screen.getByLabelText('Valor *')
    const company = screen.getByLabelText('Empresa *')
    const button = screen.getByRole('button')

    await userEvent.type(product, 'Conhaque')
    await userEvent.type(brand, productMock.availability[0].brand)
    await userEvent.type(value, String(productMock.availability[0].price))
    await userEvent.type(company, productMock.availability[0].company)
    await userEvent.click(button)

    await waitFor(() => expect(button.textContent).toBe('Adicionar'))
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  }) 

  it('Updates product', async () => {
    history.push('/product/update')

    setup()

    const description = screen.getByLabelText('Descrição')
    const button = screen.getByRole('button')

    await userEvent.clear(description)
    await userEvent.type(description, 'Garrafa de vidro 1L')
    await userEvent.click(button)

    await waitFor(() => expect(button.textContent).toBe('Salvar'))
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})