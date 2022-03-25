export type Product = {
  id?: string
  ref?: string
  name: string
  brand: string
  description: string 
  availability: {
    price: number
    company: string
  }[]
}