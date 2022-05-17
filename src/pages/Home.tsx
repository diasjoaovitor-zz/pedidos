import { Toolbar } from "@mui/material"
import { useEffect, useState } from "react"
import { Layout, Card, Loader, Header, ToggleTheme, Menu, NotificationModal }from "../shared/components"
import { useAuthContext, useProductContext } from "../shared/contexts"
import { getCompanies, getProductNames } from "../shared/functions"
import { useLogout } from "../shared/hooks"
import { read } from "../shared/services/firestore"
import { TLogoutService } from "../shared/types"

type Props = {
  logout: TLogoutService
}

export const Home: React.FC<Props> = ({ logout }) => {
  const { loader: l, message, setMessage, handleLogout } = useLogout(logout)

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
          alert('Algo deu errado')
        } finally {
          setLoader(false)
        }
      })()
    }
  }, [updateData, user, productsContext, setProductsContext, setUpdateData])

  return (
    <Layout 
      header={
        <Header title="Pedidos">
          <Toolbar sx={{ padding: 0 }}>
            <ToggleTheme />
            <Menu handleLogout={handleLogout} />
          </Toolbar>
        </Header>
      }
    >
      <Card title="Empresas" items={companies} />
      <Card title="Produtos" items={productNames} />
      <NotificationModal message={message} handleClose={() => setMessage('')} />
      {loader || l && <Loader />}
    </Layout>
  )
}
