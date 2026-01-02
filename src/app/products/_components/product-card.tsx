"use client"

import { ShoppingCart } from "lucide-react"
import Link from "next/link"
import { Product } from "@/src/types/product.types"
import { useAddToCart } from "@/src/features/cart/hooks/use-add-to-cart"

import { toast } from "sonner"

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const { addToCart, isLoading } = useAddToCart()

  const handleAddToCart = async () => {
    const success = await addToCart(product.id)
    if (success) {
      toast.success("Added to cart", {
        description: `${product.name} has been added to your cart.`,
      })
    } else {
      toast.error("Error", {
        description: "Failed to add to cart. Please try again.",
      })
    }
  }

  const inStock = product.stock > 0;
  return (
    <Link href={`/products/${product.id}`}>
      <div className="group cursor-pointer">
        <div className="relative mb-4 overflow-hidden rounded-lg bg-muted aspect-square">
          <img
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {!inStock && (
            <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
        </div>

        <div className="space-y-2">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">{product.category}</p>
          <h3 className="text-lg font-medium text-foreground group-hover:text-primary transition">{product.name}</h3>

          <div className="flex items-center justify-between pt-2">
            <span className="text-2xl font-serif text-foreground">${product.price}</span>
            <button
              onClick={(e) => {
                e.preventDefault()
                handleAddToCart()
              }}
              disabled={!inStock || isLoading}
              className={`p-2 rounded-lg transition ${inStock
                ? "bg-muted text-foreground hover:bg-primary hover:text-primary-foreground"
                : "bg-muted text-muted-foreground cursor-not-allowed opacity-50"
                }`}
            >
              <ShoppingCart className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </Link>
  )
}
