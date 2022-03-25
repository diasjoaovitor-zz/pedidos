export type Product = {
  id?: string
  ref?: string
  name: string
  description: string 
  availability: {
    brand: string
    price: number
    company: string
  }[]
}