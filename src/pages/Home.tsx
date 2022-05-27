import { Layout, Card, Loader, Header, Menu, HomeCardItem, NotificationModal } from "../shared/components"
import { useHome } from "../shared/hooks"

export const Home: React.FC = () => {
  const { 
    companies,
    products,
    message, setMessage,
    loader } = useHome()

  return (
    <>
    <Header title="Pedidos">
      <Menu />
    </Header>
    <Layout>
      <Card title="Empresas" totalItems={companies.length}>
        {companies.map((company, i) => <HomeCardItem key={i} item={company} />)}
      </Card>
      <Card title="Produtos" totalItems={products.length}>
        {products.map((product, i) => <HomeCardItem key={i} item={product} />)}
      </Card>
    </Layout>
    <NotificationModal message={message} handleClose={() => setMessage('')}/>
    <Loader open={loader} />
    </>
  )
}
