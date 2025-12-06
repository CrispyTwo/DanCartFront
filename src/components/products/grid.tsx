"use client"

import { Product } from "@/src/lib/models/Product"
import ProductCard from "../ui/product-card"

interface ProductsGridProps {
  loading: boolean;
  products: Product[];
}

export function ProductsGrid({ loading, products }: ProductsGridProps) {
  if (loading) return <div className="text-center py-16">Loading...</div>
  if (products.length === 0) return <div className="text-center py-16">No products match.</div>
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  )
}