import { useState } from "react"
import { useQuery } from "@apollo/client"
import { useAuthContext } from "../contexts"
import { getHomeData } from "../functions"
import { QUERY_HOME } from "../graphql"
import { QueryHomeData } from "../types"
import { getErrorMessage } from "../validation"

export const useHome = () => {
  const { user } = useAuthContext()

  const [ companies, setCompanies ] = useState<string[]>([])
  const [ products, setProducts ] = useState<string[]>([])
  const [ message, setMessage ] = useState('')
  const [ loader, setLoader ] = useState(true)

  useQuery<QueryHomeData>(
    QUERY_HOME, 
    { 
      variables: { ref: user?.uid },
      onError: (error) => {
        const message = getErrorMessage('generic')
        setMessage(message)
        setLoader(false)
        throw error
      },
      onCompleted: (data) => {
        const { products, companies } = getHomeData(data)
        setProducts(products)
        setCompanies(companies)
        setLoader(false)
      }
    }
  )

  return {
    companies,
    products,
    message, setMessage,
    loader
  }
}