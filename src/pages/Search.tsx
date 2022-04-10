import { ChangeEvent, FormEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Divider, ListItem, Typography } from "@mui/material"
import { Card, Chip, Layout, ProductModal } from "../shared/components"
import { getCompanies, getElementValues, getProductsPresentation } from "../shared/functions"
import { useProductContext } from "../shared/contexts"
import { search } from "../shared/functions/search"

export const Search: React.FC = () => {
  const navigate = useNavigate()
  const { state: chip } = useLocation()
  const { 
    setProductContext, 
    productsContext,
    productPresentationContext, setProductPresentationContext 
  } = useProductContext()
  const [ productsPresentation, setProductsPresentation ] = useState(getProductsPresentation(productsContext))
  const [ productPresentation, setProductPresentation ] = useState(productPresentationContext)
  const [ products, setProducts ] = useState(productsContext)
  const [ companies, setCompanies ] = useState<string[]>(getCompanies(productsContext))
  const [ chips, setChips ] = useState<string[]>(chip ? [chip as string] : [])
  const [ modal, setModal ] = useState(Object.keys(productPresentationContext).length !== 0)

  useEffect(() => {
    setProductsPresentation(
      search(chips, getProductsPresentation(productsContext))
    )
  }, [chips])

  const handleDynamicSearch = (e: ChangeEvent<HTMLInputElement>): void => {
    setProductsPresentation(
      search([e.currentTarget.value], getProductsPresentation(productsContext))
    )
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

  const navigateToUpdate = (id: string): void => {
    setProductPresentationContext(productPresentation)
    setProductContext(products.filter(product => product.id === id)[0])
    navigate('/product/update')
  }

  return (
    <Layout title="Pesquisa" autoFocus={true} handleChange={handleDynamicSearch}>
      <Chip 
        chips={chips} 
        handleSubmit={addChip}
        handleDelete={removeChip} 
      />
      <Card title="Empresas" items={companies} />
      <Card title="Produtos">
        {productsPresentation.length > 0 ? productsPresentation.map((product, i) => (
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
                {product.price}
              </Typography>
            </ListItem>
            <Divider />
          </div>
        )): <ListItem>Nenhum produto encontrado</ListItem>}
      </Card>
      {modal && productPresentation && 
        <ProductModal 
          product={productPresentation} 
          handleUpdate={navigateToUpdate} 
          closeModal={() => setModal(false)} 
        />
      }
    </Layout>
  )
}
  