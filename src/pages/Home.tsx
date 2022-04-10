import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { Layout, Card, Loader }from "../shared/components"
import { useAuthContext, useProductContext } from "../shared/contexts"
import { getCompanies, getProductNames } from "../shared/functions"
import { read } from "../shared/services/firestore"

export const Home: React.FC = () => {
  const navigate = useNavigate()
  const { user } = useAuthContext()
  const { updateData, setUpdateData, productsContext, setProductsContext } = useProductContext()
  const [ productNames, setProductNames ] = useState<string[]>(getProductNames(productsContext))
  const [ companies, setCompanies ] = useState<string[]>(getCompanies(productsContext))
  const [ loader, setLoader ] = useState(false)

  useEffect(() => {
    if(updateData) {
      (async () => {
        setLoader(true)
        try {
          const products = await read(user!.uid)
          const companies = getCompanies(products)
          setCompanies(companies)
          setProductNames(getProductNames(products))
          setProductsContext(products)
          setUpdateData(false)
        } catch (error: any) {
          console.log(error.code)
          alert('Algo deu errado')
        } finally {
          setLoader(false)
        }
      })()
    }
  }, [])

  return (
    <Layout title="Pedidos" handleFocus={() => navigate('/search')}>
      <Card title="Empresas" items={companies} />
      <Card title="Produtos" items={productNames} />
      {loader && <Loader />}
    </Layout>
  )
}
