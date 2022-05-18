import { render, screen, waitFor } from "@testing-library/react"
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from "history"
import { Route } from "./utils/Route"
import { Product } from "../pages"
import { AppThemeProvider, ProductProvider, useProductContext } from "../shared/contexts"
import { TProduct, TProductService } from "../shared/types"

jest.mock('firebase/auth')

const history = createMemoryHistory({ initialEntries: ['/product'] })

const productState: TProduct =  {
  name: 'Conhaque',
  description: '',
  availability: [{
    brand: 'Presidente',
    price: 9.98,
    company: 'Atacadão'
  }]
}

const setup = (create: TProductService, update: TProductService) => {
  render(
    <AppThemeProvider>
      <ProductProvider product={productState}>
        <Route history={history}>
          <Product create={create} update={update} />
        </Route>
      </ProductProvider>
    </AppThemeProvider>
  )
  return screen
}

describe('<Product />', () => {
  it('Create dynamic availability fields', async () => {
    const screen = setup(jest.fn(), jest.fn())
    let fieldsets = screen.getAllByRole('group')
    
    expect(fieldsets.length).toBe(2)

    for (let fieldset of fieldsets) {
      const [ brand, value, company ] = fieldset.querySelectorAll('input')
      await userEvent.type(brand, productState.name)
      await userEvent.type(value, String(productState.availability[0].price))
      await userEvent.type(company, productState.availability[0].company)
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
    history.push('/product/create')

    const screen = setup(jest.fn(), jest.fn())

    const product = screen.getByLabelText('Produto *')
    const brand = screen.getByLabelText('Marca *')
    const value = screen.getByLabelText('Valor *')
    const company = screen.getByLabelText('Empresa *')
    const button = screen.getByRole('button')

    await userEvent.type(product, 'Conhaque')
    await userEvent.type(brand, productState.name)
    await userEvent.type(value, String(productState.availability[0].price))
    await userEvent.type(company, productState.availability[0].company)
    await userEvent.click(button)

    await waitFor(() => expect(button.textContent).toBe('Adicionar'))
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  }) 

  it('Updates product', async () => {
    history.push('/product/update')

    const screen = setup(jest.fn(), jest.fn())

    const description = screen.getByLabelText('Descrição')
    const button = screen.getByRole('button')

    await userEvent.type(description, 'Garrafa de vidro 1L')
    await userEvent.click(button)

    await waitFor(() => expect(button.textContent).toBe('Salvar'))
    await waitFor(() => expect(history.location.pathname).toBe('/'))
  })
})
