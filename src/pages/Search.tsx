import { FormEvent, SyntheticEvent, useState } from "react"
import { useLocation } from "react-router-dom"
import { Card, Chip, Layout, ProductModal } from "../shared/components"
import { TProduct, TProductPresentation } from "../shared/types"
import { products as p } from "../shared/repositories/products"
import { Divider, List, ListItem, Typography } from "@mui/material"
import { getElementValues } from "../utils"
import { productPresentation } from "../shared/repositories/product-presentation"

export const Search: React.FC = () => {
  const { state: chip } = useLocation()

  const [ product, setProduct ] = useState<TProductPresentation>(productPresentation)
  const [ products, setProducts ] = useState<TProduct[]>(p)
  const [ companies, setCompanies ] = useState<string[]>([])
  const [ chips, setChips ] = useState<string[]>(chip ? [chip as string] : [])
  const [ modal, setModal ] = useState<boolean>(true)

  const formatProductsPresentation = (): TProductPresentation[] => {
    let presentation: any = []
    products.forEach((product, i) => {
      presentation[i] = {
        name: product.name,
        description: product.description
      }

      product.availability.forEach(({ brand, price, company }) => {
        presentation[i] = { ...presentation[i], brand, price, company }
      })
    })
    console.log(presentation)
    return presentation
  }

  const addChip = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const chps = getElementValues(e, ['chip'])
    setChips([ ...chips, ...chps ])
    e.currentTarget.reset()
  }

  const removeChip = (index: number): void => {
    setChips(chips.filter((_, i) => i !== index))
  }
  
  return (
    <Layout title="Pesquisa" autoFocus={true}>
      <Chip 
        chips={chips} 
        handleSubmit={addChip}
        handleDelete={removeChip} 
      />
      {companies.length > 0 && <Card title="Empresas" items={companies} />}
      {products.length >= 0 && 
        <Card title="Produtos">
          <List>
            {formatProductsPresentation().map((product, i) => (
              <div key={i}>
                <ListItem 
                  sx={{ 
                    justifyContent: 'space-between', 
                    paddingX: 0, 
                    cursor: 'pointer' 
                  }}
                  onClick={() => {
                    setProduct(product)
                    setModal(true)
                  }}
                >
                  <div>
                    <Typography variant="inherit" component="h3">
                      {product.name}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {product.brand} - {product.description}
                    </Typography>
                    <Typography variant="subtitle2" component="p">
                      Vendido por: {product.company}
                    </Typography>
                  </div>
                  <Typography variant="h5" component="strong" fontWeight="bold" textAlign="right">
                    R$ 1,85
                  </Typography>
                </ListItem>
                <Divider />
              </div>
            ))}
          </List>
        </Card>
      }
      {modal && product && <ProductModal product={product} closeModal={() => setModal(false)} />}
    </Layout>
  )
}
  