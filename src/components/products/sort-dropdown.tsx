"use client"

import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface SortDropdownProps {
  sortBy: string
  onSortChange: (sortBy: string) => void
}

export default function ProductsSortDropdown({ sortBy, onSortChange }: SortDropdownProps) {
  const [open, setOpen] = useState(false)

  const config = [
    { value: "", label: "Featured" },
    { value: "price", label: "Price: Low to High" },
    { value: "price:desc", label: "Price: High to Low" },
    { value: "updatedAt:desc", label: "Newest" },
  ]

  const selectedLabel = config.find((o) => o.value === sortBy)?.label || "Sort By"

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition text-sm font-medium"
      >
        {selectedLabel}
        <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>

      {open && (
        <div className="absolute right-0 mt-2 bg-card border border-border rounded-lg shadow-lg z-10 min-w-48">
          {config.map((option) => (
            <button
              key={option.value}
              onClick={() => {
                onSortChange(option.value)
                setOpen(false)
              }}
              className={`w-full text-left px-4 py-3 hover:bg-muted transition ${
                sortBy === option.value ? "bg-muted text-primary" : "text-foreground"
              } first:rounded-t-lg last:rounded-b-lg`}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}
