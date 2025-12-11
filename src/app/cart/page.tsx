"use client"

import { useCart } from "@/src/hooks/cart/useCart"
import CartItem from "@/src/components/cart/cart-item"
import CartSummary from "@/src/components/cart/cart-summary"
import EmptyCart from "@/src/components/cart/empty-cart"
import CartLoading from "@/src/components/cart/loading"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthContext } from "@/src/context/AuthContext"

export default function CartPage() {
  const { shoppingCart, loading, updateQuantity, removeItem, clearCart } = useCart()
  const { isAuthenticated } = useAuthContext()
  const router = useRouter()

  const items = shoppingCart?.items || []

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/auth")
    }
  }, [isAuthenticated, router])

  { loading && <CartLoading /> }
  { items.length == 0 && <EmptyCart /> }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-6 py-12">
        <h1 className="text-3xl font-bold text-foreground mb-8">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={item.product.id}
                  item={item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          <div className="lg:col-span-1">
            <CartSummary cart={shoppingCart} onClearCart={clearCart} />
          </div>
        </div>
      </div>
    </div>
  )
}
