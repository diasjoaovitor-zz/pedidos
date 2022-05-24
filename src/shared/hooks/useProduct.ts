import { ChangeEvent, FormEvent, useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import { TAvailability, TProduct, TProductService } from "../types"
import { useAuthContext, useProductContext } from "../contexts"
import { allFieldsAreFilled, getElementValues, removeEmptyFields, removeExcessAvailabilityFields } from "../functions"

export const useProduct = (create: TProductService, update: TProductService) => {
  const { productContext } = useProductContext()

  const { user } = useAuthContext()
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const method = pathname.split('/')[2]
  const state = method === 'create' ? {
    title: 'Adicionar',
    buttonTitle: 'Adicionar',
    submit: async (product: TProduct) => create(product)
  } : {
    title: 'Editar',
    buttonTitle: 'Salvar',
    submit: async (product: TProduct) => update(product)
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
    av[index] = { ...av[index], [ e.target.name ]: e.target.value }
    setAvailabilityFields(av, allFieldsAreFilled(av))
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault()
    const [ name, description, ] = getElementValues(e, ['name', 'description'])
    const data = { 
      ref: user?.uid, 
      name, 
      description, 
      availability: removeEmptyFields(availability) 
    }
    setLoader(true)
    try {
      await state.submit(data)
      navigate('/')
    } catch (error) {
      setLoader(false)
      setMessage('Erro ao submeter formulário')
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