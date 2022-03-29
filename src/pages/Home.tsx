import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout, Card }from "../shared/components"

import { products as p } from "../shared/repositories/products"

export const Home: React.FC = () => {
  const navigate = useNavigate()
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
    <Layout title="Pedidos" handleFocus={() => navigate('/search')}>
      <Card title="Empresas" items={companies} />
      <Card title="Produtos" items={products} />
    </Layout>
  )
}
