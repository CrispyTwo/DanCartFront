import { Button } from "@/src/components/ui/button"
import Link from "next/link"

export default function EmptyCart() {
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
