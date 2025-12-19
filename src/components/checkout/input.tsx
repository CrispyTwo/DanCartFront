import React from "react"

interface CheckoutInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string
}

export default function CheckoutInput({ label, id, className, ...props }: CheckoutInputProps) {
    return (
        <div>
            <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-2">
                {label}
            </label>
            <input
                id={id}
                className={`w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none ${className || ""}`}
                {...props}
            />
        </div>
    )
}
