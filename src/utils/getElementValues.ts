import { FormEvent } from "react"

export const getElementValues = (e: FormEvent<HTMLFormElement>, elements: string[]): string[] => (
  elements.map(element => (
    (e.currentTarget.elements.namedItem(element) as HTMLInputElement).value
  )) 
)
