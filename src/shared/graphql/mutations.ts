import { gql } from "@apollo/client"

export const MUTATION_CREATE = gql`
  mutation ($product: ProductInput!) {
    create(input: $product) {
      name
    }
  }
`

export const MUTATION_UPDATE = gql`
  mutation ($product: ProductInput!, $id: ID!) {
    update(input: $product, id: $id) {
      name
    }
}
`

export const MUTATION_DESTROY = gql`
  mutation ($id: ID!) {
    destroy(id: $id) {
      name
    }
}
`
