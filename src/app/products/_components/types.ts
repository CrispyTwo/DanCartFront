export type ProductOptions = {
  categories: string[]
  priceRanges: string[]
  inStockOnly: boolean
  sortBy: string
  search: string
  aiSearch: boolean
}

export const ProductFiltersDefault: ProductOptions = {
  categories: [],
  priceRanges: [],
  inStockOnly: false,
  sortBy: "",
  search: "",
  aiSearch: false
}