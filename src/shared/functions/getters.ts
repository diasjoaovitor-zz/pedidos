import { FormEvent } from "react"
import { QueryHomeData, QuerySearchData, TProductPresentation } from "../types"

type THomeData = {
  companies: string[] | []
  products: string[] | []
}

export const getHomeData = (data: QueryHomeData): THomeData => {
  const companies: string[] = []
  const products: string[] = []
  data.products.forEach(product => {
    products.push(product.name)
    product.availability.forEach(({ company }) => {
      companies.push(company)
    })
  })
  return { companies, products }
}

type TSearchData = {
  products: TProductPresentation[]
}

export const getSearchData = (data: QuerySearchData): TSearchData => {
  const products: TProductPresentation[] = []
  data.products.forEach(product => {
    const data = {
      id: product.id as string,
      name: product.name,
      description: product.description
    }
    product.availability.forEach(({ company, price, brand, av_id }) => {
      products.push({
        ...data,
        brand, 
        company,
        price,
        av_id: av_id as string
      })
    })
  })
  return { products }
}

export const getCompanies = (products: TProductPresentation[]): string[] => (
  products.map(({ company }) => company)
)

export const getElementValues = (e: FormEvent<HTMLFormElement>, elements: string[]): string[] => (
  elements.map(elementName => {
    const element = e.currentTarget.elements.namedItem(elementName) as HTMLInputElement | null
    return element ? element.value : ''
  })
)
