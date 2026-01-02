"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { AdminLayout } from "@/src/components/admin-layout"
import CustomerPageHeader from "@/src/app/admin/customers/_components/customer-page-header"
import { useCustomers } from "@/src/features/user/hooks/useCustomers"
import CustomerTableFilter from "@/src/app/admin/customers/_components/table/customer-table-filter"
import { useCustomersMetrics } from "@/src/features/user/hooks/useCustomersMetrics"
import CustomersMetrics from "./_components/customer-page-metrics"
import { ApiOptions, DEFAULT_API_OPTIONS } from "@/src/lib/helpers/api-query-builder"
import CustomersTable from "./_components/customer-page-table"

export default function CustomersPage() {
  const [searchOptions, setSearchOptions] = useState<ApiOptions>(DEFAULT_API_OPTIONS)
  const { customers, loading: customersLoading, error: customersError, refresh: customersRefresh } = useCustomers(searchOptions);
  const { metrics, loading: metricsLoading, error: metricsError, refresh: metricsRefresh } = useCustomersMetrics();

  const loading = customersLoading || metricsLoading;
  const error = customersError || metricsError;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <CustomerPageHeader />
        <CustomersMetrics metrics={metrics} />

        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>View and manage customer information</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerTableFilter options={searchOptions} setOptions={setSearchOptions} />
            <CustomersTable customers={customers} />
          </CardContent>
        </Card>

      </div>
    </AdminLayout>
  )
}
