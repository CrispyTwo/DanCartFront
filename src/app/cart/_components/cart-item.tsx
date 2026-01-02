import { Minus, Plus, Trash2 } from "lucide-react"
import type { CartItem as CartItemType } from "@/src/types/cart.types"

interface CartItemProps {
  item: CartItemType
  onUpdateQuantity: (item: CartItemType, quantity: number) => void
  onRemove: (item: CartItemType) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 bg-card border border-border rounded-lg">
      <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
        <img
          src={item.product.images[0] || "/placeholder.svg"}
          alt={item.product.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="flex-1">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-foreground text-lg">{item.product.name}</h3>
            <div className="flex gap-2 text-sm text-muted-foreground mt-1">
              <span>Color: {item.color}</span>
              <span className="border-l pl-2">Size: {item.size}</span>
            </div>
            <p className="text-2xl font-bold text-primary mt-2">${item.product.price.toFixed(2)}</p>
          </div>
          <div className="text-left">
            <div className="flex items-center gap-2 mb-2 justify-end">
              <button
                onClick={() => onUpdateQuantity(item, item.quantity - 1)}
                className="p-1 rounded hover:bg-muted transition"
                aria-label="Decrease quantity"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
              <button
                onClick={() => onUpdateQuantity(item, item.quantity + 1)}
                className="p-1 rounded hover:bg-muted transition"
                aria-label="Increase quantity"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              Subtotal: ${(item.product.price * item.quantity).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={() => onRemove(item)}
        className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
        aria-label="Remove from cart"
      >
        <Trash2 className="w-5 h-5" />
      </button>
    </div>
  )
}
