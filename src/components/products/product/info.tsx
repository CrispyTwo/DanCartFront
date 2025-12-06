"use client"

import { Button } from "@/src/components/ui/button"
import { useState } from "react"
import type { Product } from "@/src/lib/models/Product"

interface ProductInfoProps {
  product: Product & {
    originalPrice?: number
    description?: string
    color?: string
    colors?: string[]
  }
  quantity: number
  setQuantity: (quantity: number) => void
}

export default function ProductInfo({ product, quantity, setQuantity }: ProductInfoProps) {
  const [selectedColor, setSelectedColor] = useState(product.color || "")

  const originalPrice = product.originalPrice || product.price
  const discount =
    originalPrice > product.price ? Math.round(((originalPrice - product.price) / originalPrice) * 100) : 0
  const description = product.description || ""
  const colors = product.colors || []

  const handleAddToCart = async () => {
    // TODO: Replace with API call
    console.log("Add to cart:", {
      productId: product.id,
      quantity,
      color: selectedColor,
    })
    setQuantity(1)
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Product Name */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">{product.name}</h1>
      </div>

      {/* Price */}
      <div className="flex items-baseline gap-2">
        <span className="text-3xl font-bold text-foreground">${product.price.toFixed(2)}</span>
        {originalPrice > product.price && (
          <>
            <span className="text-lg text-muted-foreground line-through">${originalPrice.toFixed(2)}</span>
            <span className="text-sm font-semibold text-destructive">Save {discount}%</span>
          </>
        )}
      </div>

      {/* Description */}
      <p className="text-foreground leading-relaxed">{description}</p>

      {/* Color Selection */}
      {colors.length > 0 && (
        <div>
          <label className="text-sm font-medium text-foreground mb-3 block">Color: {selectedColor}</label>
          <div className="flex gap-2">
            {colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                  selectedColor === color
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

      {/* Quantity Selector */}
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

      {/* Add to Cart Button */}
      <div className="flex gap-3">
        <Button className="flex-1" disabled={product.stock === 0} onClick={handleAddToCart}>
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </Button>
        <Button variant="outline">Wishlist</Button>
      </div>

      {/* Stock Status */}
      {product.stock > 0 && product.stock <= 5 && (
        <div className="p-3 bg-amber-50 border border-amber-200 rounded-md">
          <p className="text-sm text-amber-900">Only {product.stock} left in stock - order soon!</p>
        </div>
      )}
    </div>
  )
}
