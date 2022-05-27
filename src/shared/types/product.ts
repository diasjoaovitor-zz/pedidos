export type TAvailability = {
  av_id?: string
  brand: string
  price: number
  company: string
  __typename?: string
}

export type TProduct = {
  id?: string
  ref?: string
  name: string
  description: string 
  availability: TAvailability[]
  __typename?: string
}

export type TProductPresentation = {
  id: string
  av_id: string
  name: string
  description: string 
  brand: string
  price: number
  company: string
}
