"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react"
import { PaymentSuccess, PaymentFailure } from "@/src/features/checkout"
import { useProxy } from "@/src/hooks/use-api"

export default function CheckoutConfirmPage() {
  const searchParams = useSearchParams()

  const api = useProxy()
  const redirectStatus = searchParams.get("redirect_status")
  const paymentIntent = searchParams.get("payment_intent")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const confirmPayment = async () => {
      if (!paymentIntent || !redirectStatus) {
        setIsLoading(false)
        return
      }

      try {
        await api.post('/checkout/webhook', 1, JSON.stringify({ paymentIntent, status: redirectStatus }))
      } catch (error) {
        console.error("Failed to confirm payment:", error)
      } finally {
        setIsLoading(false)
      }
    }

    confirmPayment()
  }, [api, paymentIntent, redirectStatus])

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-gray-200 border-t-black rounded-full animate-spin mb-4"></div>
        <h1 className="text-xl text-gray-600">Verifying payment...</h1>
      </div>
    )
  }

  const isSuccess = redirectStatus === 'succeeded'

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {isSuccess ? (
          <PaymentSuccess paymentIntent={paymentIntent} />
        ) : (
          <PaymentFailure />
        )}
      </div>
    </div>
  )
}
