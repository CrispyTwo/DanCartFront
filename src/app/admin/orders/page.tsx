"use client"

import React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AdminLayout } from "@/src/components/admin-layout"
import { useOrders } from "@/src/features/orders/hooks/use-orders"
import { useOrdersMetrics } from "@/src/features/orders/hooks/use-orders-metrics"
import OrdersMetrics from "./_components/order-page-metrics"
import OrderPageHeader from "./_components/order-page-header"
import OrderTableFilter from "./_components/table/order-table-filter"
import { ApiOptions, DEFAULT_API_OPTIONS } from "@/src/lib/helpers/api-query-builder"
import OrderPageTable from "./_components/order-page-table"

export default function OrdersPage() {
  const [searchOptions, setSearchOptions] = useState<ApiOptions>(DEFAULT_API_OPTIONS)
  const { orders, loading: ordersLoading, error: ordersError, refresh: ordersRefresh } = useOrders(searchOptions)
  const { metrics, loading: metricsLoading, error: metricsError, refresh: metricsRefresh } = useOrdersMetrics();

  const loading = ordersLoading || metricsLoading;
  const error = ordersError || metricsError;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <OrderPageHeader />
        <OrdersMetrics metrics={metrics} />

        <Card>
          <CardHeader>
            <CardTitle>Order Management</CardTitle>
            <CardDescription>View and manage customer orders</CardDescription>
          </CardHeader>
          <CardContent>
            <OrderTableFilter options={searchOptions} setOptions={setSearchOptions} />
            <OrderPageTable orders={orders} />
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  )
}
