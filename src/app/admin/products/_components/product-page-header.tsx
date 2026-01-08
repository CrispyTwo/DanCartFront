"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Plus } from "lucide-react"
import { Product } from "@/src/types/product.types"
import { AddProductForm, type ProductFormData } from "./add-product-form"
import { useProxy } from "@/src/hooks/use-api"
import { toast } from "sonner"

const ProductPageHeader: React.FC = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)
  const api = useProxy();

  const handleAddProduct = async (product: ProductFormData) => {
    const createdProduct = await api.post("/products", 1, JSON.stringify(product)) as Product;
    if (createdProduct) {
      toast.success("Product created successfuly");
    } else {
      toast.error("Failed to create product");
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Products</h1>
          <p className="text-gray-600 mt-1">Manage your product catalog</p>
        </div>
        <Button onClick={() => setIsAddProductOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </div>
      <AddProductForm open={isAddProductOpen} onOpenChange={setIsAddProductOpen} onSubmit={handleAddProduct} />
    </>
  )
}

export default ProductPageHeader
