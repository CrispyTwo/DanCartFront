"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { ShoppingCart, Clock, Package, Truck, ChevronDown, ChevronUp } from "lucide-react"
import { AdminLayout } from "@/src/components/admin-layout"
import StatCard from "@/src/components/admin/shared/statistical-card"
import OrderPageHeader from "@/src/components/admin/orders/order-page-header"
import OrderDropdown from "@/src/components/admin/orders/order-record-dropdown"
import OrderStatusBadge from "@/src/components/admin/orders/order-record-status-badge"
import OrderTableFilter from "@/src/components/admin/orders/order-table-filter"
import { useOrders } from "@/src/hooks/orders/useOrders"
import OrderRecordLines from "@/src/components/admin/orders/order-record-lines"
import { useOrdersMetrics } from "@/src/hooks/orders/useOrdersMetrics"

export default function OrdersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(new Set())

  const { orders, loading: ordersLoading, error: ordersError, refresh: ordersRefresh } = useOrders({
    search: searchTerm,
    status: statusFilter,
    page: page,
    pageSize: pageSize,
  });

  const { metrics, loading: metricsLoading, error: metricsError, refresh: metricsRefresh } = useOrdersMetrics();
  
  const loading = ordersLoading || metricsLoading;
  const error = ordersError || metricsError;

  const toggleOrderExpanded = (orderId: string) => {
    const newExpanded = new Set(expandedOrderIds)
    if (newExpanded.has(orderId)) {
      newExpanded.delete(orderId)
    } else {
      newExpanded.add(orderId)
    }
    setExpandedOrderIds(newExpanded)
  }

  return (
    <AdminLayout>
      <div className="space-y-6">
        <OrderPageHeader />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard cardTitle={"Total Orders"} count={metrics.total} Icon={ShoppingCart} iconClassName={"h-4 w-4 text-muted-foreground"}/>
          <StatCard cardTitle={"Pending"} count={metrics.pending} Icon={Clock} iconClassName={"h-4 w-4 text-yellow-600"}/>
          <StatCard cardTitle={"Processing"} count={metrics.inProgress} Icon={Package} iconClassName={"h-4 w-4 text-blue-600"}/>
          <StatCard cardTitle={"Shipped"} count={metrics.shipped} Icon={Truck} iconClassName={"h-4 w-4 text-purple-600"}/>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderTableFilter
              statusFilter={statusFilter}
              setStatusFilter={setStatusFilter}
              searchTerm={searchTerm}
              setSearchTerm={setSearchTerm}
            />
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[50px]"></TableHead>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Total</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <React.Fragment key={order.id}>
                    <TableRow>
                      <TableCell className="text-center">
                        <button
                          onClick={() => toggleOrderExpanded(order.id)}
                          className="inline-flex items-center justify-center hover:bg-muted rounded p-1 transition-colors"
                          aria-label={
                            expandedOrderIds.has(order.id) ? "Collapse order details" : "Expand order details"
                          }
                        >
                          {expandedOrderIds.has(order.id) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                        </button>
                      </TableCell>
                      <TableCell className="font-medium">{order.id}</TableCell>
                      <TableCell>{order.email}</TableCell>
                      <TableCell>{order.name}</TableCell>
                      <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
                      <TableCell>${order.total}</TableCell>
                      <TableCell>
                        <OrderStatusBadge status={order.orderStatus} />
                      </TableCell>
                      <TableCell>
                        <OrderDropdown id={order.id} />
                      </TableCell>
                    </TableRow>
                    {expandedOrderIds.has(order.id) && (
                      <TableRow className="bg-muted/20 hover:bg-muted/20">
                        <TableCell colSpan={8}>
                          <OrderRecordLines items={order.lines} />
                        </TableCell>
                      </TableRow>
                    )}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  )
}
