"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AdminLayout } from "@/src/components/admin-layout"
import { useProducts } from "@/src/features/products/hooks/useProducts"
import ProductPageHeader from "@/src/app/admin/products/_components/product-page-header"
import { useProductsMetrics } from "@/src/features/products/hooks/useProductsMetrics"
import ProductsMetrics from "./_components/product-page-metrics"
import { ApiOptions, DEFAULT_API_OPTIONS } from "@/src/lib/helpers/api-query-builder"
import ProductTableFilter from "./_components/table/product-table-filter"
import ProductsTable from "./_components/product-page-table"

export default function ProductsPage() {
  const [searchOptions, setSearchOptions] = useState<ApiOptions>(DEFAULT_API_OPTIONS)
  const { products, loading: productsLoading, error: productsError, refresh: productsRefresh } = useProducts(searchOptions);
  const { metrics, loading: metricsLoading, error: metricsError, refresh: metricsRefresh } = useProductsMetrics();

  const loading = productsLoading || metricsLoading;
  const error = productsError || metricsError;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <ProductPageHeader />
        <ProductsMetrics metrics={metrics} />

        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>View and manage all your products</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTableFilter options={searchOptions} setOptions={setSearchOptions} />
            <ProductsTable products={products} />
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
