import { TProduct } from "./product"

export type QueryHomeData = {
  products: {
    name: string
    availability: {
      company: string
    }[]
  }[]
}

export type QuerySearchData = {
  products: TProduct[]
}
