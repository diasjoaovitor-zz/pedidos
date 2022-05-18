import { FormEvent, useEffect, useState, KeyboardEvent } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { Divider, ListItem, Typography } from "@mui/material"
import { Card, Chip, Header, Layout, ProductModal } from "../shared/components"
import { getCompanies, getElementValues, getProductsPresentation } from "../shared/functions"
import { useProductContext } from "../shared/contexts"
import { search } from "../shared/functions/search"
import { TProductPresentation } from "../shared/types"
import { GoBack } from "../shared/components/GoBack"

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
  const [ companies, setCompanies ] = useState<string[]>(getCompanies(productsContext))
  const [ chips, setChips ] = useState<string[]>(chip ? [chip as string] : [])
  const [ modal, setModal ] = useState(Object.keys(productPresentationContext).length !== 0)

  useEffect(() => {
    const presentation = getProductsPresentation(productsContext)
    setCompanies(
      search(chips, presentation).map(({ company }) => company)
    )
    setProductsPresentation(
      search(chips, presentation)
    )
  }, [chips])

  const handleDynamicSearch = (value: string): void => {
    const presentation = getProductsPresentation(productsContext)
    setCompanies(
      search([value], presentation).map(({ company }) => company)
    )
    setProductsPresentation(
      search([value], presentation)
    )
  }

  const handleKey = (e: KeyboardEvent<HTMLInputElement>): void => {
    if(e.key === 'Enter') {
      handleDynamicSearch(e.currentTarget.querySelector('input')!.value)
    }
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
    setProductContext(productsContext.filter(product => product.id === id)[0])
    navigate('/product/update')
  }

  return (
    <Layout 
      autoFocus={true} 
      handleChange={e => handleDynamicSearch(e.currentTarget.value)} 
      handleKey={handleKey}
      header={
        <Header title="Pesquisa">
          <GoBack />
        </Header>
      }
    >
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
          closeModal={() => {
            setProductPresentationContext({} as TProductPresentation)
            setModal(false)
          }} 
        />
      }
    </Layout>
  )
}
  