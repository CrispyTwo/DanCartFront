import { ChevronDown } from "lucide-react"
import { useState } from "react"

interface FilterGroupProps {
  title: string
  options: { label: string; value: string }[]
  selectedValues: string[]
  onChange: (values: string[]) => void
  defaultOpen?: boolean
}

export function FilterGroup({ title, options, selectedValues, onChange, defaultOpen = true }: FilterGroupProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen)

  const toggleValue = (value: string) => {
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value]
    onChange(newValues)
  }

  return (
    <div className="border-b border-border pb-6 last:border-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center justify-between w-full mb-4 text-foreground font-semibold hover:text-primary transition group"
      >
        {title}
        <ChevronDown 
          className={`w-4 h-4 transition-transform duration-200 ${isOpen ? "rotate-180" : ""} group-hover:text-primary`} 
        />
      </button>
      
      {isOpen && (
        <div className="space-y-3">
          {options.map((option) => (
            <label key={option.value} className="flex items-center gap-3 cursor-pointer group/label">
              <input
                type="checkbox"
                checked={selectedValues.includes(option.value)}
                onChange={() => toggleValue(option.value)}
                className="w-4 h-4 rounded border-border accent-primary focus:ring-1 focus:ring-primary"
              />
              <span className="text-sm text-muted-foreground group-hover/label:text-foreground transition">
                {option.label}
              </span>
            </label>
          ))}
        </div>
      )}
    </div>
  )
}