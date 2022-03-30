import { createContext, useContext, useState } from "react"
import { TProduct, TProductPresentation } from "../types"

interface IProduct {
  productContext: TProduct
  productPresentationContext: TProductPresentation
  setProductContext(product: TProduct): void
  setProductPresentationContext(product: TProductPresentation): void
}

const ProductContext = createContext({} as IProduct)

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider: React.FC = ({ children }) => {
  const [ product, setProduct ] = useState<TProduct>({} as TProduct)
  const [ productPresentation, setProductPresentation ] = useState<TProductPresentation>({} as TProductPresentation)

  return (
    <ProductContext.Provider 
      value={{ 
        productContext: product, setProductContext: setProduct, 
        productPresentationContext: productPresentation, setProductPresentationContext: setProductPresentation 
      }}
    >
     {children}
    </ProductContext.Provider>
  )
}
