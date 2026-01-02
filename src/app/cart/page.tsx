"use client"

import CartItem from "@/src/app/cart/_components/cart-item"
import CartSummary from "@/src/app/cart/_components/cart-summary"
import EmptyCart from "@/src/app/cart/_components/empty-cart"
import CartLoading from "@/src/app/cart/_components/loading"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useAuthContext } from "@/src/features/auth/context/auth-context"
import useAlterCart from "./_hooks/use-alter-cart"

export default function CartPage() {
  const { shoppingCart, loading, updateQuantity, removeItem, clearCart } = useAlterCart()
  const { isAuthenticated, rerouteIfNotAuthenticated } = useAuthContext()
  const router = useRouter()

  const items = shoppingCart?.items || []

  useEffect(() => {
    rerouteIfNotAuthenticated();
  }, [isAuthenticated, router])

  if (loading) { return <CartLoading /> }
  if (items.length === 0) { return <EmptyCart /> }

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
