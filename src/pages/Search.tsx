import { useState } from "react"
import { useLocation } from "react-router-dom"
import { Card, Layout } from "../shared/components"
import { Product } from "../shared/types/product"
import { products as p } from "../shared/repositories/products"
import { Divider, List, ListItem, Typography } from "@mui/material"

type ProductsPresentation = {
  name: string
  description: string 
  brand: string
  price: number
  company: string
}[]

export const Search: React.FC = () => {
  const { state: sectionTitle } = useLocation()

  const [ products, setProducts ] = useState<Product[]>(p)
  const [ companies, setCompanies ] = useState<string[]>([])

  const formatProductsPresentation = (): ProductsPresentation => {
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
    return presentation
  }

  return (
    <Layout title="Pesquisa">
      {companies.length > 0 && <Card title="Empresas" items={companies} />}
      {products.length >= 0 && 
        <Card title="Produtos">
          <List>
            {formatProductsPresentation().map(({ name, description, brand, price, company }, i) => (
              <div key={i}>
                <ListItem sx={{ justifyContent: 'space-between', paddingX: 0, cursor: 'pointer' }}>
                  <div>
                    <Typography variant="inherit" component="h3">
                      {name}
                    </Typography>
                    <Typography variant="subtitle1" component="p">
                      {brand} - {description}
                    </Typography>
                    <Typography variant="subtitle2" component="p">
                      Vendido por: {company}
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
    </Layout>
  )
}
  