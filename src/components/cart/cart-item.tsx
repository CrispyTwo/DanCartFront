import { Minus, Plus, Trash2 } from "lucide-react"
import { useState, useEffect, useCallback } from "react"
import type { CartItem as CartItemType } from "@/src/lib/models/ShoppingCart"

interface CartItemProps {
    item: CartItemType
    onUpdateQuantity: (id: number, quantity: number) => void
    onRemove: (id: number) => void
}

export default function CartItem({ item, onUpdateQuantity, onRemove }: CartItemProps) {
    const [quantity, setQuantity] = useState(item.quantity)

    // Sync state with prop if it changes externally (e.g. after API refresh)
    useEffect(() => {
        setQuantity(item.quantity)
    }, [item.quantity])

    // Handle debounced API call
    useEffect(() => {
        // Only trigger if local state differs from prop (user interaction)
        if (quantity !== item.quantity) {
            const timer = setTimeout(() => {
                onUpdateQuantity(item.product.id, quantity)
            }, 500) // 500ms debounce

            return () => clearTimeout(timer)
        }
    }, [quantity, item.quantity, item.product.id, onUpdateQuantity])

    const handleIncrement = () => {
        setQuantity(prev => prev + 1)
    }

    const handleDecrement = () => {
        if (quantity > 1) {
            setQuantity(prev => prev - 1)
        } else {
            onRemove(item.product.id)
        }
    }

    return (
        <div className="flex gap-4 p-4 bg-card border border-border rounded-lg">
            <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
                <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.product.name}
                    className="w-full h-full object-cover"
                />
            </div>

            <div className="flex-1">
                <div className="flex justify-between items-start mb-4">
                    <div>
                        <h3 className="font-semibold text-foreground text-lg">{item.product.name}</h3>
                        <p className="text-2xl font-bold text-primary mt-2">${item.product.price.toFixed(2)}</p>
                    </div>
                    <div className="text-left">
                        <div className="flex items-center gap-2 mb-2 justify-end">
                            <button
                                onClick={handleDecrement}
                                className="p-1 rounded hover:bg-muted transition"
                                aria-label="Decrease quantity"
                            >
                                <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-semibold text-foreground">{quantity}</span>
                            <button
                                onClick={handleIncrement}
                                className="p-1 rounded hover:bg-muted transition"
                                aria-label="Increase quantity"
                            >
                                <Plus className="w-4 h-4" />
                            </button>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                            Subtotal: ${(item.product.price * quantity).toFixed(2)}
                        </p>
                    </div>
                </div>
            </div>

            <button
                onClick={() => onRemove(item.product.id)}
                className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                aria-label="Remove from cart"
            >
                <Trash2 className="w-5 h-5" />
            </button>
        </div>
    )
}
