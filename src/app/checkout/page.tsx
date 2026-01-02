"use client"

import { CheckoutForm } from "@/src/features/checkout"

export default function CheckoutPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
        <div className="bg-white rounded-lg shadow p-6">
          <CheckoutForm />
        </div>
      </div>
    </div>
  )
}
