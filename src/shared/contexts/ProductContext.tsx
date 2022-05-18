import { createContext, ReactNode, useContext, useState } from "react"
import { TProduct, TProductPresentation } from "../types"

type TProductContext = {
  updateData: boolean
  productContext: TProduct
  productsContext: TProduct[]
  productPresentationContext: TProductPresentation
  setUpdateData(condition: boolean): void
  setProductContext(product: TProduct): void
  setProductsContext(products: TProduct[]): void
  setProductPresentationContext(product: TProductPresentation): void
}

const ProductContext = createContext({} as TProductContext)

export const useProductContext = () => useContext(ProductContext)

export const ProductProvider: React.FC<{children: ReactNode, product: TProduct}> = ({ children, product: productState }) => {
  const [ updateData, setUpdateData ] = useState(true)
  const [ product, setProduct ] = useState(productState)
  const [ products, setProducts ] = useState([productState])
  const [ productPresentation, setProductPresentation ] = useState({} as TProductPresentation)

  return (
    <ProductContext.Provider 
      value={{ 
        updateData, setUpdateData,
        productContext: product, setProductContext: setProduct, 
        productPresentationContext: productPresentation, setProductPresentationContext: setProductPresentation,
        productsContext: products, setProductsContext: setProducts, 
      }}
    >
     {children}
    </ProductContext.Provider>
  )
}
