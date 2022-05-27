import { ApolloClient, InMemoryCache } from "@apollo/client"

export const client = new ApolloClient({
  uri: process.env.REACT_APP_CLOUD_fUNCTIONS_URL,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          products: {
            merge(_, incoming) {
              return incoming
            }
          }
        }
      }
    }
  })
})
