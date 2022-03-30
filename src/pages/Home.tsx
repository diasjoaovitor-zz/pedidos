import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout, Card }from "../shared/components"
import { useProductContext } from "../shared/contexts"

import { products as p } from "../shared/repositories/products"
import { TProduct, TProductPresentation } from "../shared/types"

export const Home: React.FC = () => {
  const { setProductContext, setProductPresentationContext } = useProductContext()
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
    setProductContext({} as TProduct)
    setProductPresentationContext({} as TProductPresentation)
  }, [])

  return (
    <Layout title="Pedidos" handleFocus={() => navigate('/search')}>
      <Card title="Empresas" items={companies} />
      <Card title="Produtos" items={products} />
    </Layout>
  )
}
