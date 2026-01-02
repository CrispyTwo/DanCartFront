export type ProductOptions = {
  categories: string[]
  priceRanges: string[]
  inStockOnly: boolean
  sortBy: string
}

export const ProductFiltersDefault: ProductOptions = {
  categories: [],
  priceRanges: [],
  inStockOnly: false,
  sortBy: ""
}