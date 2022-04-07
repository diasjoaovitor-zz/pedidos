import { TAvailability } from "../types"

export const allFieldsAreFilled = (availability: TAvailability): boolean => {
  const emptyFields = availability.filter(({ brand, price, company }) => {
    return !(brand && price > 0 && company)
  })
  return emptyFields.length !== 0 ? false : true
}

export const removeExcessAvailabilityFields = (availability: TAvailability): TAvailability => {
  return availability.length > 2 ? [ ...availability.filter(({ brand, price, company }) => {
    return brand || price > 0 || company
  }), {
    brand: '',
    price: 0,
    company: ''
  } ]: availability
}

export const removeEmptyFields = (availability: TAvailability): TAvailability => {
  return availability.filter(({ brand, price, company }) => (
    brand && price > 0 && company
  ))
}
