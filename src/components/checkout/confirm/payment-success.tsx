"use client"

import { Button } from "@/src/components/ui/button"
import { useRouter } from "next/navigation"

interface PaymentSuccessProps {
    paymentIntent: string | null
}

export default function PaymentSuccess({ paymentIntent }: PaymentSuccessProps) {
    const router = useRouter()

    return (
        <div className="space-y-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
            </div>

            <h1 className="text-3xl font-bold text-gray-900">Payment Successful!</h1>
            <p className="text-gray-600">
                Thank you for your purchase. Your payment has been processed successfully.
            </p>

            {paymentIntent && (
                <div className="bg-gray-50 p-4 rounded-md text-sm text-gray-500 break-all">
                    Reference: {paymentIntent}
                </div>
            )}

            <div className="pt-4 space-y-3">
                <Button
                    onClick={() => router.push('/products')}
                    className="w-full bg-black hover:bg-gray-800 text-white"
                >
                    Continue Shopping
                </Button>
                <Button
                    variant="outline"
                    onClick={() => router.push('/profile/orders')}
                    className="w-full"
                >
                    View Order History
                </Button>
            </div>
        </div>
    )
}
