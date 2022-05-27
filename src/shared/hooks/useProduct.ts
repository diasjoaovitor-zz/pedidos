import { ChangeEvent, FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { makeUniqueId } from "@apollo/client/utilities"
import { useMutation } from "@apollo/client"
import { MUTATION_CREATE, MUTATION_UPDATE, QUERY_HOME, QUERY_SEARCH } from "../graphql"
import { TAvailability, TProduct } from "../types"
import { useAuthContext, useProductContext } from "../contexts"
import { allFieldsAreFilled, getElementValues, removeEmptyFields, removeExcessAvailabilityFields } from "../functions"
import { getErrorMessage } from "../validation"

export const useProduct = () => {
  const { productContext } = useProductContext()

  const [ create ] = useMutation(MUTATION_CREATE)
  const [ update ] = useMutation(MUTATION_UPDATE)

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const method = pathname.split('/')[2]
  const state = method === 'create' ? {
    title: 'Adicionar',
    buttonTitle: 'Adicionar',
    submit: async (product: TProduct) => {
      await create({ 
        variables: { product },
        refetchQueries: [QUERY_HOME, QUERY_SEARCH] 
      })
    }
  } : {
    title: 'Editar',
    buttonTitle: 'Salvar',
    submit: async (product: TProduct) => {
      await update({ 
        variables: { product, id: productContext.id },
        refetchQueries: [QUERY_HOME, QUERY_SEARCH] 
      })
    }
  }

  const product = { ...productContext, availability: [
    ...productContext.availability, { brand: '', price: 0, company: '' }
  ]}

  const [ availability, setAvailability ] = useState(product.availability)
  const [ message, setMessage ] = useState('')
  const [ loader, setLoader ] = useState(false)

  const setAvailabilityFields = (availability: TAvailability[], allFieldsAreFilled: boolean): void => {
    if(!allFieldsAreFilled) {
      availability = removeExcessAvailabilityFields(availability)
      setAvailability(availability)
    } else {
      setAvailability([ ...availability, {
        brand: '',
        price: 0,
        company: ''
      }])
    }
  }

  const handleChange = (e: ChangeEvent<HTMLInputElement>, index: number): void => {
    const av = [ ...availability ]
    const { name, value } = e.target
    av[index] = { ...av[index], [ name ]: name !== 'price' ? value : Number(value) }
    setAvailabilityFields(av, allFieldsAreFilled(av))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const [ name, description, ] = getElementValues(e, ['name', 'description'])
    const product = { 
      ref: user?.uid, 
      name, 
      description, 
      availability: removeEmptyFields(availability)
        // remove __typename key
        .map(({ brand, price, company, av_id }) => ( 
          { brand, price, company, av_id: av_id || makeUniqueId("availability") }
        ))
    }
    setLoader(true)
    try {
      await state.submit(product)
      navigate('/')
    } catch (error) {
      const message = getErrorMessage('generic')
      setMessage(message)
      setLoader(false)
      throw error
    }
  }

  return { 
    state,
    product,
    availability,
    loader,
    message, setMessage,
    handleChange, handleSubmit
  }
}