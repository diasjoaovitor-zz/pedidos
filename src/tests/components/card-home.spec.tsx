import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { createMemoryHistory } from "history"
import { Card, HomeCardItem, Layout } from "../../shared/components"
import { ProductProvider } from "../../shared/contexts"
import { productState } from "../../shared/states"
import { Route } from "../mocks"

const history = createMemoryHistory({ initialEntries: ['/'] })

const setup = (items: string[], totalItems: number) => (
  render(
    <ProductProvider product={productState}>
      <Route history={history}>
        <Card title="Empresas" totalItems={totalItems}>
          {items.map((item, index) => <HomeCardItem key={index} item={item} />)}
        </Card>
      </Route>
    </ProductProvider>
  )
)
describe('<Layout />', () => {
  it('Empty card', async () => {
    setup([], 0)
    expect(screen.getByText('Nenhum dado encontrado')).toBeInTheDocument()
  }) 

  it('Items in card', async () => {
    const items = ['item1', 'item2']
    setup(items, items.length)

    const listItem = screen.getAllByRole('listitem')
    expect(listItem).toHaveLength(2)

    const item = screen.getByText('item1')
    fireEvent.click(item)
    waitFor(() => expect(history.location.pathname).toBe('/search'))
  }) 
})