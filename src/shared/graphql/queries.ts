import { gql } from "@apollo/client"

export const QUERY_HOME = gql`
  query ($ref: String!) {
    products(ref: $ref) {
      availability {
        company
      }
      name
    }
  }
`

export const QUERY_SEARCH = gql`
  query ($ref: String!) {
    products(ref: $ref) {
      description
      id
      name
      ref
      availability {
        av_id
        brand
        company
        price
      }
    }
}
`
