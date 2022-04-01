import { FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Divider, List, ListItem, Typography } from "@mui/material"
import { Card, Chip, Layout, ProductModal } from "../shared/components"
import { TProductPresentation } from "../shared/types"
import { products as p } from "../shared/repositories/products"
import { getElementValues } from "../shared/functions"
import { useProductContext } from "../shared/contexts"

export const Search: React.FC = () => {
  const { 
    productContext, setProductContext, 
    productPresentationContext, setProductPresentationContext 
  } = useProductContext()
  const { state: chip } = useLocation()
  const navigate = useNavigate()
  const [ productPresentation, setProductPresentation ] = useState(productPresentationContext)
  const [ products, setProducts ] = useState(p)
  const [ companies, setCompanies ] = useState<string[]>([])
  const [ chips, setChips ] = useState<string[]>(chip ? [chip as string] : [])
  const [ modal, setModal ] = useState(Object.keys(productPresentationContext).length !== 0)

  const formatProductsPresentation = (): TProductPresentation[] => {
    let presentation: any = []
    products.forEach((product, i) => {
      presentation[i] = {
        id: product?.id,
        name: product.name,
        description: product.description
      }
      product.availability.forEach(({ brand, price, company }) => {
        presentation[i] = { ...presentation[i], brand, price, company }
      })
    })
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

  const handleUpdate = (id: string): void => {
    if(id) {
      setProductPresentationContext(productPresentation)
      setProductContext(products.filter(product => product.id === id)[0])
      navigate('/product/update')
    } else {
      alert('Ops')
    }
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
                    setProductPresentation(product)
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
      {modal && productPresentation && 
        <ProductModal 
          product={productPresentation} 
          handleUpdate={handleUpdate} 
          closeModal={() => setModal(false)} 
        />
      }
    </Layout>
  )
}
  