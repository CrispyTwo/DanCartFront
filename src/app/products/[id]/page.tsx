"use client"

import { useState, use } from "react"
import ProductImages from "@/src/app/products/[id]/_components/images"
import ProductInfo from "@/src/app/products/[id]/_components/info"
import { useProduct } from "@/src/features/products/hooks/useProduct"

interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const { id } = use(params)
  const { product, loading, error } = useProduct(id)
  const [quantity, setQuantity] = useState(1)

  if (loading) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </main>
    )
  }

  if (error || !product) {
    return (
      <main className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-destructive mb-4">Error Loading Product</h1>
          <p className="text-muted-foreground">{error || "Product not found"}</p>
        </div>
      </main>
    )
  }


  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <ProductImages images={product.images} />
          <ProductInfo product={product} quantity={quantity} setQuantity={setQuantity} />
        </div>
      </div>
    </main>
  )
}
