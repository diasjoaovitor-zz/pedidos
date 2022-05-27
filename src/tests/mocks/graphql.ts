import { MockedResponse } from "@apollo/client/testing"
import { MUTATION_CREATE, MUTATION_UPDATE } from "../../shared/graphql"
import { productMock } from "./product"

const mockedResponseCreate: MockedResponse = {
  request: {
    query: MUTATION_CREATE,
    variables: {
      product: productMock
    }
  },
  result: { data: { create: productMock } }
}

const mockedResponseUpdate: MockedResponse = {
  request: {
    query: MUTATION_UPDATE,
    variables: {
      product: { ...productMock, description: 'Garrafa de vidro 1L' }
    }
  },
  result: { data: { update: productMock } }
}

export const queriesMocks = [
  mockedResponseCreate, mockedResponseUpdate
]
