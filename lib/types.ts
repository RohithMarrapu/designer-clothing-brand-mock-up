export type Category = 'dresses' | 'outerwear' | 'tops' | 'bottoms' | 'accessories'
export type Gender = 'men' | 'women' | 'unisex'

export interface Product {
  id: string
  name: string
  description: string
  price: number
  images: string[]
  categories: Category[]
  gender: Gender
  featured?: boolean
  new?: boolean
}

export interface FilterOptions {
  categories: Category[]
  priceRange: [number, number]
  genders: Gender[]
}