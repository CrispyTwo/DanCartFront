"use client"

import { loadStripe } from '@stripe/stripe-js';
import { Elements, PaymentElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from "@/src/components/ui/button"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "");

const PaymentForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const [message, setMessage] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        setIsLoading(true);

        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: { return_url: `${window.location.origin}/checkout/confirm` },
        });

        if (error) {
            setMessage(error.message ?? "An unexpected error occurred.");
        }
        else {
            setMessage("Payment successful!");
        }

        setIsLoading(false);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <PaymentElement />
            <Button disabled={isLoading || !stripe || !elements} className="w-full">
                {isLoading ? "Processing..." : "Pay Now"}
            </Button>
            {message && <div className="text-red-500 text-sm mt-2">{message}</div>}
        </form>
    );
};

export default function StripePage() {
    const searchParams = useSearchParams();
    const clientSecret = searchParams.get("clientSecret");

    if (!clientSecret) {
        return <div className="flex items-center justify-center min-h-screen text-red-500">Invalid Payment Session</div>
    }

    const options = {
        clientSecret,
        appearance: {
            theme: 'stripe' as const,
        },
    };

    return (
        <div className="max-w-md mx-auto p-6 mt-10 shadow-lg rounded-lg bg-white">
            <h1 className="text-2xl font-bold mb-6 text-center">Complete Payment</h1>
            <Elements options={options} stripe={stripePromise}>
                <PaymentForm />
            </Elements>
        </div>
    );
}