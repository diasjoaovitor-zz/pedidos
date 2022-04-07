import { TProduct, TProductPresentation } from "../types"

export const getProductNames = (products: TProduct[]): string[] => {
  const names = products.map(({ name }) => name).filter(name => name)
  return names
}

export const getCompanies = (products: TProduct[]): string[] => {
  const companies: string[] = []
  products.forEach(({ availability }) => {
    availability.forEach(({ company }) => {
      company && companies.push(company)
    })
  })
  return companies
}

export const getProductsPresentation = (products: TProduct[]): TProductPresentation[] | [] => {
  const presentation: TProductPresentation[] = []
  products.forEach((product, i) => {
    const trueValues = Object.entries(product)
    if(trueValues.length === 5) {
        const basicData = {
          id: product.id as string,
          name: product.name,
          description: product.description
        }
        product.availability.forEach(({ brand, price, company }) => {
          presentation.push({ ...basicData, brand, price, company })
        })
      }
    })
  return presentation
}
