"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Plus } from "lucide-react"
import { ApiService } from "@/src/lib/helpers/api-service"
import { Product } from "@/src/types/product.types"
import { AuthenticationService } from "@/src/lib/api/auth-service"
import { AddProductForm, type ProductFormData } from "./add-product-form"

const ProductPageHeader: React.FC = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const handleAddProduct = async (product: ProductFormData) => {
    console.log("Adding product:", product);
    const token = new AuthenticationService().getToken();
    if (token == null) throw new Error();
    const createdProduct = await new ApiService().post("/products", 1, JSON.stringify(product)) as Product;
    console.log("Product created successfuly", createdProduct);
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
