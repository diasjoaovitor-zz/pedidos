import { useProduct } from "../shared/hooks"
import { GoBack, Header, Loader, NotificationModal, ProductFieldset, ProductForm } from "../shared/components"

export const Product: React.FC = () => {
  const { 
    state,
    product,
    availability,
    loader,
    message, setMessage,
    handleChange, handleSubmit
  } = useProduct()

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
    <Loader open={loader} />
    </>
  )
}