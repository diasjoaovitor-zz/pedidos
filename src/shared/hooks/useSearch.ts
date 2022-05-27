import { useMutation, useQuery } from "@apollo/client"
import { FormEvent, useEffect, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { useAuthContext, useProductContext } from "../contexts"
import { chipAlreadyExists, findProductToUpdate, getCompanies, getElementValues, getSearchData, removeTypename, search } from "../functions"
import { MUTATION_DESTROY, MUTATION_UPDATE, QUERY_HOME, QUERY_SEARCH } from "../graphql"
import { QuerySearchData, TProduct, TProductPresentation } from "../types"
import { getErrorMessage } from "../validation"

export const useSearch = () => {
  const [ update ] = useMutation(MUTATION_UPDATE)
  const [ destroy ] = useMutation(MUTATION_DESTROY)

  const { user } = useAuthContext()
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

  useQuery<QuerySearchData>(
    QUERY_SEARCH, 
    { 
      variables: { ref: user?.uid },
      onError: (error) => {
        const message = getErrorMessage('generic')
        setMessage(message)
        setLoader(false)
        throw error
      },
      onCompleted: data => {
        const { products } = getSearchData(data)
        const companies = getCompanies(products)
        setData(data)
        setProducts(products)
        setFilteredProducts(products)
        setFilteredCompanies(companies)
        setLoader(false)
      }
    }
  )

  useEffect(() => {
    handleSearch(chips)
  }, [chips, products])


  const addChip = (e: FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const chip = getElementValues(e, ['chip'])[0]
    !chipAlreadyExists(chips, chip) && setChips([ ...chips, chip ])
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
    const message = getErrorMessage('generic')

    if(!data || !product) return setMessage(message)

    const p = data.products.find(({ id }) => id === product?.id)
    setLoader(true)
    try {
      if(p?.availability.length === 1) {
        await destroy({ 
          variables: { id: p?.id },
          refetchQueries: [QUERY_HOME, QUERY_SEARCH] 
         })
      } else {
        const updated = removeTypename(findProductToUpdate(data.products, product.av_id)) as TProduct
        const a = {
          ...updated,
          availability: updated.availability.map(({ brand, company, price, av_id }) => ({
            brand, company, price, av_id
          }))
        }

        await update({ 
          variables: { id: p?.id, product: a},
          refetchQueries: [QUERY_HOME, QUERY_SEARCH] 
        })
      }
      setModal(false)
    } catch (error) {
      setMessage(message)
      throw error
    } finally {
      setLoader(false)
    }
  }

  return { 
    chips, setChips,
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