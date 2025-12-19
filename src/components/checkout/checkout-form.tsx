"use client"

import { Button } from "@/src/components/ui/button"
import CheckoutInput from "./input"
import useForm from "@/src/hooks/useForm"
import { useCheckout } from "@/src/hooks/checkout/useCheckout"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export type CheckoutFormData = {
    phone: string,
    street: string,
    city: string,
    country: string,
    region: string,
    email: string,
    name: string
}

const defaultFormData: CheckoutFormData = { phone: "", street: "", city: "", country: "", region: "", email: "", name: "" }

export default function CheckoutForm() {
    const { formData, handleChange } = useForm(defaultFormData)
    const { handleCheckout, clientSecret, isSubmitting, error } = useCheckout(formData)
    const router = useRouter()

    useEffect(() => {
        if (clientSecret) {
            router.push(`/stripe?clientSecret=${clientSecret}`)
        }
    }, [clientSecret, router])

    return (
        <form onSubmit={handleCheckout} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <CheckoutInput id="name" name="name" label="Full Name" value={formData.name} onChange={handleChange} required />
                <CheckoutInput id="email" name="email" label="Email" type="email" value={formData.email} onChange={handleChange} required />
                <CheckoutInput id="phone" name="phone" label="Phone" type="tel" value={formData.phone} onChange={handleChange} required />
                <CheckoutInput id="street" name="street" label="Street Address" value={formData.street} onChange={handleChange} required />
                <CheckoutInput id="city" name="city" label="City" value={formData.city} onChange={handleChange} required />
                <CheckoutInput id="region" name="region" label="Region/State" value={formData.region} onChange={handleChange} required />
                <CheckoutInput id="country" name="country" label="Country" value={formData.country} onChange={handleChange} required />
            </div>

            <div className="pt-6">
                <Button type="submit" className="w-full md:w-auto" disabled={isSubmitting}>
                    {isSubmitting ? "Processing..." : "Place Order"}
                </Button>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
        </form>
    )
}
