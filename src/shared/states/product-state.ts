import { Product } from "../types/product"

export const productState: Product =  {
  name: '',
  brand: '',
  description: '',
  availability: [{
    price: 0,
    company: ''
  }, {
    price: 0,
    company: ''
  }]
}
