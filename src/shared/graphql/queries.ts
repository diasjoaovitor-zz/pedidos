import { gql, useQuery } from "@apollo/client"
import { QueryHomeData, QuerySearchData } from "../types"

const QUERY_HOME = gql`
  query {
    products {
      availability {
        company
      }
      name
    }
  }
`

export const useQueryHome = () => useQuery<QueryHomeData>(QUERY_HOME)

const QUERY_SEARCH = gql`
  query {
  products {
    description
    id
    name
    availability {
      brand
      company
      price
    }
  }
}
`

export const useQuerySearch = () => useQuery<QuerySearchData>(QUERY_SEARCH)
