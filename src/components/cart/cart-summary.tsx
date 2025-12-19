import Link from "next/link"
import { Button } from "@/src/components/ui/button"
import type { ShoppingCart } from "@/src/lib/models/ShoppingCart"

interface CartSummaryProps {
    cart: ShoppingCart | null
    onClearCart: () => void
}

export default function CartSummary({ cart, onClearCart }: CartSummaryProps) {
    return (
        <div className="sticky top-20 bg-card border border-border rounded-lg p-6">
            <h2 className="text-xl font-bold text-foreground mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6 pb-6 border-b border-border">
                {cart ? (
                    <>
                        <div className="flex justify-between text-foreground">
                            <span>Subtotal:</span>
                            <span>${cart.total.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between text-foreground">
                            <span>Shipping:</span>
                            <span className="text-green-600 font-medium">Free</span>
                        </div>
                        <div className="flex justify-between text-foreground">
                            <span>Tax:</span>
                            <span>$0.00</span>
                        </div>
                    </>
                ) : (
                    <p className="text-muted-foreground text-sm">Loading summary...</p>
                )}
            </div>

            <div className="flex justify-between items-center mb-6">
                <span className="font-bold text-foreground text-lg">Total:</span>
                <span className="font-bold text-primary text-2xl">
                    {cart ? `$${cart.total.toFixed(2)}` : "-"}
                </span>
            </div>

            <div className="space-y-3">
                <Link href="/checkout" className="block w-full">
                    <Button className="w-full" size="lg">
                        Proceed to Checkout
                    </Button>
                </Link>
                <Link href="/products" className="block">
                    <Button variant="outline" className="w-full bg-transparent">
                        Continue Shopping
                    </Button>
                </Link>
            </div>

            <button
                onClick={onClearCart}
                className="w-full mt-4 text-sm text-destructive hover:text-destructive/80 transition"
            >
                Clear Cart
            </button>
        </div>
    )
}
