import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: 'http://localhost:5001/pedidos-78c30/us-central1/default',
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
