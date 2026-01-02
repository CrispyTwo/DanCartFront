import { FilterGroup } from "./filter-group"
import { ProductOptions } from "./types"

interface FilterSidebarProps {
  filters: ProductOptions
  onChange: (newFilters: ProductOptions) => void
}

export default function ProductsFilterSidebar({ filters, onChange }: FilterSidebarProps) {
  const update = <K extends keyof ProductOptions>(key: K, value: ProductOptions[K]) => {
    onChange({
      ...filters,
      [key]: value,
    })
  }

  const config = {
    categories: ["Food", "Pants", "Jackets"],
    priceRanges: [
      { label: "Under $50", min: 0, max: 50 },
      { label: "$50+", min: 50, max: 100 }
    ]
  }

  return (
    <div className="space-y-6">
      <FilterGroup
        title="Categories"
        options={config.categories.map(c => ({ label: c, value: c }))}
        selectedValues={filters.categories}
        onChange={(newVal) => update("categories", newVal)}
      />

      <FilterGroup
        title="Price Range"
        options={config.priceRanges.map(r => ({ label: r.label, value: `${r.min}-${r.max}` }))}
        selectedValues={filters.priceRanges}
        onChange={(newVal) => update("priceRanges", newVal)}
      />

      <div className="pt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={filters.inStockOnly}
            onChange={(e) => update("inStockOnly", e.target.checked)}
            className="w-4 h-4 rounded border-border accent-primary"
          />
          <span className="text-sm font-medium">In Stock Only</span>
        </label>
      </div>
    </div>
  )
}