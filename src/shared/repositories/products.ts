import { TProduct } from "../types";

export const products: TProduct[] = [
  {
    id: '1',
    name: 'Água Sanitária',
    description: '1L', 
    availability: [{
      brand: 'Teiú',
      price: 2.15,
      company: 'Teiú',
    }, {
      brand: 'Zab',
      price: 1.85,
      company: 'Zab'
    }] 
  },
  {
    id: '2',
    name: 'Achocolatado em Pó',
    description: '1L', 
    availability: [{
      brand: 'Teiú',
      price: 2.15,
      company: 'Teiú',
    }, {
      brand: 'Zab',
      price: 1.85,
      company: 'Zab'
    }] 
  },
  {
    id: '3',
    name: 'Leite Integral',
    description: '1L', 
    availability: [{
      brand: 'Teiú',
      price: 2.15,
      company: 'Teiú',
    }, {
      brand: 'Zab',
      price: 1.85,
      company: 'Zab'
    }] 
  }
]