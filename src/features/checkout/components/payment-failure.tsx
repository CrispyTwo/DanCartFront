"use client"

import { Button } from "@/src/components/ui/button"
import { useRouter } from "next/navigation"

export function PaymentFailure() {
  const router = useRouter()

  return (
    <div className="space-y-6">
      <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto">
        <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">Payment Failed</h1>
      <p className="text-gray-600">
        Something went wrong with your payment. Please try again or contact support.
      </p>

      <div className="pt-4 space-y-3">
        <Button
          onClick={() => router.push('/products')}
          className="w-full bg-black hover:bg-gray-800 text-white"
        >
          Continue Shopping
        </Button>
        <Button
          onClick={() => router.push('/checkout')}
          className="w-full"
        >
          Return to Checkout
        </Button>
      </div>
    </div>
  )
}
