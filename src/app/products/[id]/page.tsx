"use client"

import ProductImages from "@/src/components/products/product/images"
import ProductInfo from "@/src/components/products/product/info"
import { useState } from "react"

const MOCK_PRODUCT = {
  id: "1",
  name: "Premium Wireless Headphones",
  price: 299.99,
  originalPrice: 399.99,
  rating: 4.5,
  reviews: 128,
  description:
    "Experience crystal-clear audio with our premium wireless headphones. Featuring active noise cancellation, 30-hour battery life, and premium comfort for all-day wear.",
  features: [
    "Active Noise Cancellation",
    "30-hour battery life",
    "Premium comfort design",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone",
    "Foldable design",
  ],
  images: [
    "/placeholder.svg?key=j5xcu",
    "/placeholder.svg?key=2aayp",
    "/placeholder.svg?key=cr8fa",
    "/placeholder.svg?key=9y2vs",
  ],
  stock: 15,
  color: "Space Gray",
  colors: ["Space Gray", "Silver", "Gold"],
  inStock: true,
}

export default function ProductPage({ params }: { params: { id: string } }) {
  const [quantity, setQuantity] = useState(1)

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProductImages images={MOCK_PRODUCT.images} />
          <ProductInfo product={MOCK_PRODUCT} quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
    </main>
  )
}
