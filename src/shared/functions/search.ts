import { TProductPresentation } from "../types";

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
