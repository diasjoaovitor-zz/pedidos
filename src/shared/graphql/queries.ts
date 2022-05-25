import { gql, useQuery } from "@apollo/client"
import { QueryHomeData, QuerySearchData } from "../types"

const QUERY_HOME = gql`
  query ($ref: String!) {
    products(ref: $ref) {
      availability {
        company
      }
      name
    }
  }
`

export const useQueryHome = (ref: string) => {
  return useQuery<QueryHomeData>(QUERY_HOME, { variables: { ref } })
}

const QUERY_SEARCH = gql`
  query ($ref: String!) {
    products(ref: $ref) {
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

export const useQuerySearch = (ref: string) => {
  return useQuery<QuerySearchData>(QUERY_SEARCH, { variables: { ref } })
}
