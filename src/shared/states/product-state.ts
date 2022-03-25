import { Product } from "../types/product"

export const productState: Product =  {
  name: '',
  description: '',
  availability: [{
    brand: '',
    price: 0,
    company: ''
  }, {
    brand: '',
    price: 0,
    company: ''
  }]
}
