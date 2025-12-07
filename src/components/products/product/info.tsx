"use client"

import { Button } from "@/src/components/ui/button"
import { useState } from "react"
import type { Product } from "@/src/lib/models/Product"
import { useAddToCart } from "@/src/hooks/cart/useAddToCart"
import { toast } from "sonner"

interface ProductInfoProps {
  product: Product;
  quantity: number;
  setQuantity: (quantity: number) => void;
}

export default function ProductInfo({ product, quantity, setQuantity }: ProductInfoProps) {
  const discount = Math.round(((product.price - product.price) / product.price) * 100)
  const colors = product.colors.split(',').map(c => c.trim()).filter(c => c.length > 0)
  const [selectedColor, setSelectedColor] = useState(colors[0] || "")
  const { addToCart } = useAddToCart()

  const handleAddToCart = async () => {
    const success = await addToCart(product.id, quantity)
    if (success) {
      toast.success("Added to cart", {
        description: `${quantity}x ${product.name} added to your cart.`
      })
      setQuantity(1)
    } else {
      toast.error("Error", {
        description: "Failed to add items to cart."
      })
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
      </div>

      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
        {discount > 0 && (
          <>
            <span className="text-lg text-muted-foreground line-through">${product.price.toFixed(2)}</span>
            <span className="text-sm font-semibold text-destructive">Save {discount}%</span>
          </>
        )}
      </div>

      <p className="text-foreground leading-relaxed">{product.description}</p>

      {colors.length > 0 && (
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Color: {selectedColor}</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${selectedColor === color
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground hover:bg-muted/80"
                  }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>
      )}

      <div>
        <label className="text-sm font-medium text-foreground mb-3 block">Quantity</label>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
            className="px-3 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80"
          >
            −
          </button>
          <span className="w-8 text-center font-medium text-foreground">{quantity}</span>
          <button
            onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
            className="px-3 py-2 rounded-md bg-muted text-foreground hover:bg-muted/80"
          >
            +
          </button>
          <span className="text-sm text-muted-foreground ml-2">({product.stock} in stock)</span>
        </div>
      </div>

      <div className="flex gap-3">
        <Button className="flex-1" disabled={product.stock === 0} onClick={handleAddToCart}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button variant="outline">Wishlist</Button>
      </div>

      {product.stock > 0 && product.stock <= 5 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-900">Only {product.stock} left in stock - order soon!</p>
        </div>
      )}
    </div>
  )
}
