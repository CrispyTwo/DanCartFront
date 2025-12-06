"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Package, AlertTriangle, CheckCircle } from "lucide-react"
import { AdminLayout } from "@/src/components/admin-layout"
import StatCard from "@/src/components/admin/shared/statistical-card"
import { useProducts } from "@/src/hooks/products/useProducts"
import ProductStatusBadge from "@/src/components/admin/products/product-record-status-badge"
import ProductDropdown from "@/src/components/admin/products/product-record-dropdown"
import ProductPageHeader from "@/src/components/admin/products/product-page-header"
import ProductTableFilter from "@/src/components/admin/products/product-table-filter"
import TableRecordImage from "@/src/components/admin/shared/table-record-image"
import { useProductsMetrics } from "@/src/hooks/products/useProductsMetrics"

export default function ProductsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { products, loading: productsLoading, error: productsError, refresh: productsRefresh } = useProducts({
    search: searchTerm,
    status: statusFilter,
    page: page,
    pageSize: pageSize,
  });

  const { metrics, loading: metricsLoading, error: metricsError, refresh: metricsRefresh } = useProductsMetrics();
    
  const loading = productsLoading || metricsLoading;
  const error = productsError || metricsError;
    
  return (
    <AdminLayout>
      <div className="space-y-6">
        <ProductPageHeader/>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard cardTitle="Total Products" count={metrics.total} Icon={Package} iconClassName="h-4 w-4 text-muted-foreground"/>
          <StatCard cardTitle="Active Products" count={metrics.active} Icon={CheckCircle} iconClassName="h-4 w-4 text-green-600"/>
          <StatCard cardTitle="Low Stock" count={metrics.lowStock} Icon={AlertTriangle} iconClassName="h-4 w-4 text-yellow-600"/>
          <StatCard cardTitle="Out of Stock" count={metrics.outOfStock} Icon={AlertTriangle} iconClassName="h-4 w-4 text-red-600"/>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Catalog</CardTitle>
            <CardDescription>View and manage all your products</CardDescription>
          </CardHeader>
          <CardContent>
            <ProductTableFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[80px]">Image</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>SKU</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Stock</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell><TableRecordImage image={"/placeholder.svg"} name={product.name}/></TableCell>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="text-gray-600">{product.id}</TableCell>
                    <TableCell>${product.price}</TableCell>
                    <TableCell>{product.stock}</TableCell>
                    <TableCell><ProductStatusBadge stock={product.stock} lowStockThreshold={product.lowStockThreshold}/></TableCell>
                    <TableCell><ProductDropdown/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
