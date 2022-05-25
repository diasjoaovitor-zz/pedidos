import { Divider, ListItem } from "@mui/material"
import { useEffect } from "react"
import { Card, Chip, Header, Layout, Loader, NotificationModal, ProductModal, SearchCardItem } from "../shared/components"
import { GoBack } from "../shared/components/GoBack"
import { getCompanies, getSearchData } from "../shared/functions"
import { useQuerySearch } from "../shared/graphql"
import { useSearch } from "../shared/hooks"
import { TProductPresentation } from "../shared/types"

export const Search: React.FC = () => {
  const { data } = useQuerySearch()
  const { 
    chips,
    setData,
    setProductPresentationContext,
    products, setProducts, 
    filteredProducts, setFilteredProducts,
    filteredCompanies, setFilteredCompanies,
    product, setProduct,
    addChip, removeChip,
    handleSearch, handleUpdate, handleDelete,
    modal, setModal,
    message, setMessage,
    loader, setLoader
  } = useSearch()

  useEffect(() => {
    if(data) {
      const { products } = getSearchData(data)
      const companies = getCompanies(products)
      setData(data)
      setProducts(products)
      setFilteredProducts(products)
      setFilteredCompanies(companies)
      setLoader(false)
    }
  }, [data])

  useEffect(() => {
    handleSearch(chips)
  }, [chips, products])

  return (
    <>
    <Header title="Pesquisa">
      <GoBack handleClick={() => setProductPresentationContext({} as TProductPresentation)} />
    </Header>
    <Layout 
      autoFocus={true} 
      handleChange={e => handleSearch([e.currentTarget.value])} 
    >
      <Chip 
        chips={chips} 
        handleSubmit={addChip}
        handleDelete={removeChip} 
      />
      <Card title="Empresas">
        {filteredCompanies.map((company, i) => (
          <div key={i}>
            <ListItem>{company}</ListItem>
            <Divider />
          </div>
        ))}
      </Card>
      <Card title="Produtos">
        {filteredProducts.map(product => (
          <SearchCardItem 
            key={product.id} product={product} 
            handleClick={() => {
              setProduct(product)
              setModal(true)
            }} 
          />
        ))}
      </Card>
    </Layout>
    {modal && <ProductModal 
      product={product} 
      handleClose={() => setProduct(undefined)}
      handleUpdate={handleUpdate} 
      handleDelete={handleDelete} 
    />}
    <NotificationModal message={message} handleClose={() => setMessage('')} />
    {loader && <Loader />}
    </>
  )
}
  