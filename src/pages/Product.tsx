import { Header, Loader, NotificationModal } from "../shared/components"
import { TCreateProductService, TUpdateProductService } from "../shared/types"
import { GoBack } from "../shared/components/GoBack"
import { ProductForm } from "../shared/components/ProductForm"
import { useProduct } from "../shared/hooks"
import { ProductFieldset } from "../shared/components/ProductFieldset"

type Props = {
  create: TCreateProductService
  update: TUpdateProductService
}

export const Product: React.FC<Props> = ({ create, update }) => {
  const { 
    state,
    product,
    availability,
    loader,
    message, setMessage,
    handleChange, handleSubmit
  } = useProduct(create, update)

  return (
    <>
    <Header title={state.title}>
      <GoBack />
    </Header>
    <ProductForm 
      name={product.name} description={product.description} buttonTitle={state.buttonTitle} 
      handleSubmit={handleSubmit}
    >
      {availability.map((availability, i) => {
        const required = i === 0
        return (
          <ProductFieldset 
            key={i} availability={availability} required={required} 
            handleChange={e => handleChange(e, i)}
          />
        )
      })}
    </ProductForm>
    <NotificationModal message={message} handleClose={() => setMessage('')} />
    {loader && <Loader />}
    </>
  )
}