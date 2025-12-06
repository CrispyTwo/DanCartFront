"use client"

import { Button } from "@/src/components/ui/button"
import { Trash2, Plus, Minus } from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"
import type { Product } from "@/src/lib/models/Product"

interface CartItem extends Product {
  quantity: number
  image?: string
}

interface CartSummary {
  subtotal: number
  shipping: number
  tax: number
  total: number
}

export default function CartPage() {
  const [items, setItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [summary, setSummary] = useState<CartSummary | null>(null)

  useEffect(() => {
    setLoading(false)
    // TODO: Fetch cart items and summary from API
  }, [])

  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeItem(itemId)
      return
    }
    // TODO: Replace with API call
    setItems(items.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item)))
  }

  const removeItem = (itemId: number) => {
    // TODO: Replace with API call
    setItems(items.filter((item) => item.id !== itemId))
  }

  const clearCart = () => {
    // TODO: Replace with API call
    setItems([])
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-foreground">Loading...</p>
      </div>
    )
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col items-center justify-center py-16">
            <h1 className="text-3xl font-bold text-foreground mb-4">Your Cart is Empty</h1>
            <p className="text-muted-foreground mb-8">Add items to your cart to get started</p>
            <Link href="/products">
              <Button className="px-8">Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-4 bg-card border border-border rounded-lg">
                  {/* Product Image */}
                  <div className="flex-shrink-0 w-24 h-24 bg-muted rounded-md overflow-hidden">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Product Details and Price */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <h3 className="font-semibold text-foreground text-lg">{item.name}</h3>
                        <p className="text-2xl font-bold text-primary mt-2">${item.price.toFixed(2)}</p>
                      </div>
                      <div className="text-left">
                        <div className="flex items-center gap-2 mb-2 justify-end">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded hover:bg-muted transition"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="w-8 text-center font-semibold text-foreground">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded hover:bg-muted transition"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                        <p className="text-sm text-muted-foreground font-medium">
                          Subtotal: ${(item.price * item.quantity).toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Remove Button */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="text-destructive hover:bg-destructive/10 p-2 rounded transition"
                    aria-label="Remove from cart"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
              <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6 pb-6 border-b border-border">
                {summary ? (
                  <>
                    <div className="flex justify-between text-foreground">
                      <span>Subtotal:</span>
                      <span>${summary.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Shipping:</span>
                      <span className={summary.shipping === 0 ? "text-green-600 font-medium" : ""}>
                        {summary.shipping === 0 ? "Free" : `$${summary.shipping.toFixed(2)}`}
                      </span>
                    </div>
                    <div className="flex justify-between text-foreground">
                      <span>Tax:</span>
                      <span>${summary.tax.toFixed(2)}</span>
                    </div>
                  </>
                ) : (
                  <p className="text-muted-foreground text-sm">Loading summary...</p>
                )}
              </div>

              <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-foreground text-lg">Total:</span>
                <span className="font-bold text-primary text-2xl">
                  {summary ? `$${summary.total.toFixed(2)}` : "-"}
                </span>
              </div>

              <div className="space-y-3">
                <Button className="w-full" size="lg">
                  Proceed to Checkout
                </Button>
                <Link href="/products" className="block">
                  <Button variant="outline" className="w-full bg-transparent">
                    Continue Shopping
                  </Button>
                </Link>
              </div>

              <button
                onClick={clearCart}
                className="w-full mt-4 text-sm text-destructive hover:text-destructive/80 transition"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
