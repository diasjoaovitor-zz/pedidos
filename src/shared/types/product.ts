import { TAvailability } from "./availability"

export type TProduct = {
  id?: string
  ref?: string
  name: string
  description: string 
  availability: TAvailability
}
