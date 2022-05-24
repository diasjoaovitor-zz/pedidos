import { createContext, ReactNode, useContext, useState } from "react"
import { TProduct, TProductPresentation } from "../types"

type TProductContext = {
  productContext: TProduct
  productPresentationContext: TProductPresentation
  setProductContext(product: TProduct): void
  setProductPresentationContext(product: TProductPresentation): void
}

const ProductContext = createContext({} as TProductContext)

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider: React.FC<{children: ReactNode, product: TProduct}> = ({ children, product: productState }) => {
  const [ product, setProduct ] = useState(productState)
  const [ productPresentation, setProductPresentation ] = useState({} as TProductPresentation)

  return (
    <ProductContext.Provider 
      value={{ 
        productContext: product, setProductContext: setProduct, 
        productPresentationContext: productPresentation, setProductPresentationContext: setProductPresentation,
      }}
    >
     {children}
    </ProductContext.Provider>
  )
}
