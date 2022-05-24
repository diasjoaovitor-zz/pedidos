export type QueryHomeData = {
  products: {
    name: string
    availability: {
      company: string
    }[]
  }[]
}

export type QuerySearchData = {
  products: {
    description: string
    id: string
    name: string
    availability: {
      brand: string
      company: string
      price: number
    }[]
  }[]
}
