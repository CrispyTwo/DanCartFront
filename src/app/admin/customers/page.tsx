"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Users, Search, Filter, DollarSign, UserCheck } from "lucide-react"
import { AdminLayout } from "@/src/components/admin-layout"
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import StatCard from "@/src/components/admin/shared/statistical-card"
import CustomerDropdown from "@/src/components/admin/customers/customer-record-dropdown"
import CustomerStatusBadge from "@/src/components/admin/customers/customer-record-status-badge"
import CustomerPageHeader from "@/src/components/admin/customers/customer-page-header"
import { useCustomers } from "@/src/hooks/users/useCustomers"
import CustomerTableFilter from "@/src/components/admin/customers/customer-table-filter"
import { useCustomersMetrics } from "@/src/hooks/users/useCustomersMetrics"

export default function CustomersPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [page, setPage] = useState(1)
  const [pageSize, setPageSize] = useState(10)

  const { customers, loading: customersLoading, error: customersError, refresh: customersRefresh } = useCustomers({
    search: searchTerm,
    status: statusFilter,
    page: page,
    pageSize: pageSize,
  });

  const { metrics, loading: metricsLoading, error: metricsError, refresh: metricsRefresh } = useCustomersMetrics();

  const loading = customersLoading || metricsLoading;
  const error = customersError || metricsError;

  return (
    <AdminLayout>
      <div className="space-y-6">
        <CustomerPageHeader/>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard cardTitle="Total Customers" count={metrics.total} Icon={Users} iconClassName="h-4 w-4 text-muted-foreground" />
          <StatCard cardTitle="Active Customers" count={metrics.active} Icon={UserCheck} iconClassName="h-4 w-4 text-green-600" />
          <StatCard cardTitle="Average Order Value" count={metrics.avgOrderValue} Icon={DollarSign} iconClassName="h-4 w-4 text-blue-600" />
          <StatCard cardTitle="New This Month" count={metrics.new} Icon={Users} iconClassName="h-4 w-4 text-purple-600" />
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Customer Directory</CardTitle>
            <CardDescription>View and manage customer information</CardDescription>
          </CardHeader>
          <CardContent>
            <CustomerTableFilter statusFilter={statusFilter} setStatusFilter={setStatusFilter} searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead>Join Date</TableHead>
                  <TableHead>Orders</TableHead>
                  <TableHead>Total Spent</TableHead>
                  <TableHead>Avg. Order</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-[50px]"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {customers.map((customer) => (
                  <TableRow key={customer.id}>
                    <TableCell>
                      <div className="flex items-center space-x-3">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>{customer.firstName[0] + customer.lastName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="font-medium">{`${customer.firstName} ${customer.lastName}`}</div>
                          <div className="text-sm text-gray-600">{customer.email}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
                    <TableCell>{customer.ordersCount}</TableCell>
                    <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
                    <TableCell>${(customer.totalSpent / Math.max(customer.ordersCount, 1)).toFixed(2)}</TableCell>
                    <TableCell><CustomerStatusBadge isActive={customer.isActive}/></TableCell>
                    <TableCell><CustomerDropdown/></TableCell>
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
