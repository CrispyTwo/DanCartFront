"use client"

import { useState, useMemo } from "react"
import { ChevronDown } from "lucide-react"
import ProductsFilterSidebar from "@/src/app/products/_components/filter-sidebar"
import ProductsSortDropdown from "@/src/app/products/_components/sort-dropdown"
import { useProducts } from "@/src/features/products/hooks/useProducts"
import { ProductsHeader } from "@/src/app/products/_components/header"
import { ProductsErrorMessage } from "@/src/app/products/_components/error"
import { ProductFiltersDefault, ProductOptions } from "@/src/app/products/_components/types"
import { ProductsGrid } from "@/src/app/products/_components/grid"


export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductOptions>(ProductFiltersDefault)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const apiOptions = useMemo(() => ({
    page: 1,
    pageSize: 25,
    sortBy: filters.sortBy,

    categories: filters.categories,
    priceRange: filters.priceRanges[0],
    inStock: filters.inStockOnly ? "true" : undefined,
  }), [filters])

  const { products, loading, error } = useProducts(apiOptions)

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <ProductsHeader loading={loading} count={products.length} />
        {error && <ProductsErrorMessage />}

        <div className="flex gap-8">
          <div className="hidden lg:block w-64 flex-shrink-0">
            <ProductsFilterSidebar filters={filters} onChange={setFilters} />
          </div>

          <div className="flex-1">
            <div className="lg:hidden mb-6 flex items-center justify-between">
              <button
                onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg"
              >
                <ChevronDown className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                Filters
              </button>
              <ProductsSortDropdown sortBy={filters.sortBy} onSortChange={(v) => setFilters((prev) => ({ ...prev, sortBy: v }))} />
            </div>

            {mobileFiltersOpen && (
              <div className="lg:hidden mb-6 bg-muted/50 rounded-lg p-4">
                <ProductsFilterSidebar filters={filters} onChange={setFilters} />
              </div>
            )}

            <div className="hidden lg:flex justify-end mb-6">
              <ProductsSortDropdown sortBy={filters.sortBy} onSortChange={(v) => setFilters((prev) => ({ ...prev, sortBy: v }))} />
            </div>

            <ProductsGrid loading={loading} products={products} />
          </div>
        </div>
      </div>
    </div>
  )
}