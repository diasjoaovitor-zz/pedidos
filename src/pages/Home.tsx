import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Container, IconButton, TextField } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle'
import { Card, Header }from "../shared/components"

import { products as p } from "../shared/repositories/products"

export const Home: React.FC = () => {
  const [ companies, setCompanies ] = useState<string[]>([])
  const [ products, setProducts ] = useState<string[]>([])

  useEffect(() => {
    const companies: string[] = []
    p.forEach(({ availability }) => {
      availability.forEach(({ company }) => {
        companies.push(company)
      })
    })
    const products = p.map(({ name }) => name)
    setCompanies(companies)
    setProducts(products)
  }, [])

  return (
    <>
    <Header title="Pedidos" />  
    <Container sx={{ 
      backgroundColor: 'background.default', 
      textAlign: 'right'
    }}>
      <TextField 
        label="Digite sua busca..." 
        variant="outlined" 
        sx={{
          width: "100%",
          marginTop: 2
        }}
      />
      <Card title="Empresas" items={companies} />
      <Card title="Produtos" items={products} />
      <Link to="product/create" style={{
        position: 'sticky',
        bottom: '16px',
      }}>
        <IconButton sx={{ 
          padding: 0,
          color: 'primary.main'
        }}>
          <AddCircleIcon sx={{
            fontSize: '3rem',
          }} />
        </IconButton>
      </Link>
    </Container>
    </>
  )
}
