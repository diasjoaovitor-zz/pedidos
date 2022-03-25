import { Container, TextField } from "@mui/material"
import React, { useEffect, useState } from "react"
import { Card, Header }from "../shared/components"

import { products } from "../shared/repositories/products"

export const Home: React.FC = () => {
  const [ companies, setCompanies ] = useState<string[]>([])

  useEffect(() => {
    const companies: string[] = []
    products.forEach(({ availability }) => {
      availability.forEach(({ company }) => {
        companies.push(company)
      })
    })
    setCompanies(companies)
  }, [])
  return (
    <>
    <Header title="Pedidos" />  
    <Container>
    <TextField 
      label="Digite sua busca..." 
      variant="outlined" 
      sx={{
        width: "100%",
        marginY: 2
      }}
    />
      <Card title="Empresas" items={companies} />
    </Container>
    </>
  )
}
