export type TAvailability = {
  brand: string
  price: number
  company: string
}

export type TProduct = {
  id?: string
  ref?: string
  name: string
  description: string 
  availability: TAvailability[]
}

export type TProductPresentation = {
  id: string
  name: string
  description: string 
  brand: string
  price: number
  company: string
}
