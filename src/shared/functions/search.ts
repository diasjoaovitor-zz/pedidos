import { TProduct, TProductPresentation } from "../types"

export const search = (params: string[], products: TProductPresentation[]): TProductPresentation[] | [] => {
  if(params.length > 0) {
    let filtered: TProductPresentation[] | [] = []
    params.forEach(param => {
      const result = products.filter(({ name, description, brand, company }) => (
        name.includes(param) || description.includes(param) || brand.includes(param) || company.includes(param)
      ))
      if(result.length > 0)
        filtered = [ ...filtered, ...result ] as TProductPresentation[]
    }) 
    return filtered
  }
  return products  
} 

export const findProductToUpdate = (products: TProduct[], id: string): TProduct => {
  const product = products.map(p => ({ 
      ...p, 
      availability: p.availability.filter(({ av_id }) => av_id !== id)
    })
  )
  return product[0]
}

export const chipAlreadyExists = (chips: string[], chip: string): boolean => {
  return chips.includes(chip)
}