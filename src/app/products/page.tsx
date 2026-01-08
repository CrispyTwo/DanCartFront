"use client"

import { useState, useMemo, useEffect } from "react"
import { ChevronDown } from "lucide-react"
import ProductsFilterSidebar from "@/src/app/products/_components/filter-sidebar"
import ProductsSortDropdown from "@/src/app/products/_components/sort-dropdown"
import { useProducts } from "@/src/features/products/hooks/useProducts"
import { ProductsHeader } from "@/src/app/products/_components/header"
import { ProductsErrorMessage } from "@/src/app/products/_components/error"
import { ProductFiltersDefault, ProductOptions } from "@/src/app/products/_components/types"
import { ProductsGrid } from "@/src/app/products/_components/grid"
import { PaginationControls } from "@/src/components/ui/pagination-controls"
import { ProductsSearch } from "@/src/app/products/_components/search"

export default function ProductsPage() {
  const [filters, setFilters] = useState<ProductOptions>(ProductFiltersDefault)
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false)

  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    setPage(1)
  }, [filters])

  const apiOptions = useMemo(() => ({
    page: page,
    pageSize: pageSize,
    sortBy: filters.sortBy,
    search: filters.search,
    isAiSearch: filters.aiSearch,

    categories: filters.categories,
    priceRange: filters.priceRanges[0],
    inStockOnly: filters.inStockOnly,
  }), [filters, page, pageSize])

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
            <div className="lg:hidden mb-6 space-y-4">
              <div className="flex items-center justify-between">
                <button
                  onClick={() => setMobileFiltersOpen(!mobileFiltersOpen)}
                  className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg"
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${mobileFiltersOpen ? "rotate-180" : ""}`} />
                  Filters
                </button>
                <ProductsSortDropdown sortBy={filters.sortBy} onSortChange={(v) => setFilters((prev) => ({ ...prev, sortBy: v }))} />
              </div>
            </div>

            {mobileFiltersOpen && (
              <div className="lg:hidden mb-6 bg-muted/50 rounded-lg p-4">
                <ProductsFilterSidebar filters={filters} onChange={setFilters} />
              </div>
            )}

            <div className="hidden lg:flex justify-between gap-4 mb-6">
              <ProductsSearch
                value={filters.search}
                isAiSearch={filters.aiSearch}
                onSearchChange={(v) => setFilters((prev) => ({ ...prev, search: v }))}
                onAiSearchChange={(v) => setFilters((prev) => ({ ...prev, aiSearch: v }))}
              />
              <ProductsSortDropdown sortBy={filters.sortBy} onSortChange={(v) => setFilters((prev) => ({ ...prev, sortBy: v }))} />
            </div>

            <ProductsGrid loading={loading} products={products} />

            <div className="mt-8">
              <PaginationControls page={page} pageSize={pageSize} onPageChange={setPage}
                onPageSizeChange={setPageSize} isLastPage={products.length < pageSize} isLoading={loading} />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}