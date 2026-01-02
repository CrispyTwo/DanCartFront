import { ChevronDown, ChevronUp } from "lucide-react"

type OrderRecordExpandBadgeProps = {
  expandedOrderIds: Set<string>
  setExpandedOrderIds: React.Dispatch<React.SetStateAction<Set<string>>>
  orderId: string
}

export default function OrderRecordExpandBadge({ expandedOrderIds, setExpandedOrderIds, orderId }: OrderRecordExpandBadgeProps) {
  const toggleOrderExpanded = () => {
    const newExpanded = new Set(expandedOrderIds)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrderIds(newExpanded)
  }

  return (
    <button
      onClick={() => toggleOrderExpanded()}
      className="inline-flex items-center justify-center hover:bg-muted rounded p-1 transition-colors"
      aria-label={
        expandedOrderIds.has(orderId) ? "Collapse order details" : "Expand order details"
      }
    >
      {expandedOrderIds.has(orderId) ? (
        <ChevronUp className="h-4 w-4" />
      ) : (
        <ChevronDown className="h-4 w-4" />
      )}
    </button>
  )
}