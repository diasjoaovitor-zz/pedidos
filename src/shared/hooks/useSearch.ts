import { FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useProductContext } from "../contexts"
import { getCompanies, getElementValues, search } from "../functions"
import { destroy } from "../services/firebase"
import { QuerySearchData, TProductPresentation } from "../types"

export const useSearch = () => {
  const navigate = useNavigate()

  const { state: chip } = useLocation()
  const { productPresentationContext, setProductContext, setProductPresentationContext } = useProductContext()

  const [ data, setData ] = useState<QuerySearchData>()
  const [ chips, setChips ] = useState<string[]>(chip ? [chip as string] : [])
  const [ product, setProduct ] = useState<TProductPresentation | undefined>(productPresentationContext)
  const [ products, setProducts ] = useState<TProductPresentation[]>([])
  const [ filteredCompanies, setFilteredCompanies ] = useState<string[]>([])
  const [ filteredProducts, setFilteredProducts ] = useState<TProductPresentation[]>([])
  const [ modal, setModal ] = useState(Object.keys(productPresentationContext).length !== 0)
  const [ loader, setLoader ] = useState(true)
  const [ message, setMessage ] = useState('')

  const addChip = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const chps = getElementValues(e, ['chip'])
    setChips([ ...chips, ...chps ])
    e.currentTarget.reset()
  }

  const removeChip = (index: number): void => {
    setChips(chips.filter((_, i) => i !== index))
  }

  const handleSearch = (params: string[]): void => {
    const filteredProducts = search(params, products)
    setFilteredProducts(filteredProducts)
    setFilteredCompanies(getCompanies(filteredProducts))
  }

  const handleUpdate = () => {
    if(product && data) {
      setProductPresentationContext(product)
      setProductContext(data.products.filter(p => p.id === product.id)[0])
      navigate('/product/update')
    }
  }

  const handleDelete = async () => {
    try {
      product && await destroy(product.id)
    } catch (error: unknown) {
      setLoader(false)
      setMessage('Algo deu errado!')
    } finally {
      setProduct(undefined)
    }
  }

  return { 
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
   }
}