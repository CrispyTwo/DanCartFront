"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Plus } from "lucide-react"
import { AddProductForm, type ProductFormData } from "./add-product-form"
import { AuthenticationService } from "@/src/lib/services/AuthenticationService"
import { ApiService } from "@/src/lib/services/ApiService"
import { Product } from "@/src/lib/models/Product"

const ProductPageHeader: React.FC = () => {
  const [isAddProductOpen, setIsAddProductOpen] = useState(false)

  const handleAddProduct = async (product: ProductFormData) => {
    console.log("Adding product:", product);
    const token = new AuthenticationService().getToken();
    if (token == null) throw new Error();
    const createdProduct = await new ApiService().post("/products", 1, JSON.stringify(product), token) as Product;
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
