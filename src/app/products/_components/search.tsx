"use client"

import { Input } from "@/src/components/ui/input"
import { useDebounce } from "@/src/hooks/use-debounce"
import { Search, Sparkles } from "lucide-react"
import { useEffect, useState } from "react"

interface ProductsSearchProps {
  value: string
  isAiSearch: boolean
  onSearchChange: (value: string) => void
  onAiSearchChange: (value: boolean) => void
}

export function ProductsSearch({ value, isAiSearch, onSearchChange, onAiSearchChange }: ProductsSearchProps) {
  const [searchTerm, setSearchTerm] = useState(value || "")
  const debouncedSearchTerm = useDebounce(searchTerm, 500)

  useEffect(() => {
    if (debouncedSearchTerm !== value) {
      onSearchChange(debouncedSearchTerm)
    }
  }, [debouncedSearchTerm, onSearchChange, value])

  return (
    <div className="relative w-full max-w-sm">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="pl-8 pr-10"
      />
      <button
        onClick={() => onAiSearchChange(!isAiSearch)}
        className={`absolute right-2 top-2.5 h-4 w-4 transition-colors ${isAiSearch ? "text-purple-500" : "text-muted-foreground hover:text-foreground"
          }`}
        type="button"
        title="Ask AI"
      >
        <Sparkles className="h-4 w-4" />
      </button>
    </div>
  )
}
