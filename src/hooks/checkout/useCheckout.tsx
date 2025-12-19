import { useState } from "react";
import { toast } from "sonner";
import { useApi } from "../useApi";
import { CheckoutFormData } from "@/src/components/checkout/checkout-form";

type CheckoutResponse = {
    clientSecret: string
}
export function useCheckout(formData: CheckoutFormData) {
    const [clientSecret, setClientSecret] = useState<string | null>(null)
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
    const [error, setError] = useState<string | null>(null);
    const api = useApi();

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault()
        setIsSubmitting(true)

        try {
            const secret = await api.post("/checkout/initiate", 1, JSON.stringify(formData)) as CheckoutResponse
            setClientSecret(secret.clientSecret)
        } catch (error) {
            console.error("Checkout failed:", error)
            toast.error("Failed to checkout")
            setError(error as string)
        } finally {
            setIsSubmitting(false)
        }
    }

    return { handleCheckout, clientSecret, isSubmitting, error };
}
