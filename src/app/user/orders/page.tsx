"use client"

import { useOrders } from "@/src/features/orders/hooks/use-orders"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Card, CardContent, CardHeader, CardTitle } from "@/src/components/ui/card"
import { Badge } from "@/src/components/ui/badge"
import { Loader2 } from "lucide-react"

export default function OrdersPage() {
  const { orders, loading, error } = useOrders()

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="p-4 text-center text-destructive bg-destructive/10 rounded-lg">
          <p className="font-semibold">Error loading orders</p>
          <p className="text-sm opacity-90">{error}</p>
        </div>
      </div>
    )
  }

  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0: return <Badge variant="secondary" className="bg-yellow-100 text-yellow-800 hover:bg-yellow-100">Pending</Badge>
      case 1: return <Badge variant="default" className="bg-blue-100 text-blue-800 hover:bg-blue-100">Processing</Badge>
      case 2: return <Badge variant="default" className="bg-purple-100 text-purple-800 hover:bg-purple-100">Shipped</Badge>
      case 3: return <Badge variant="outline" className="text-green-600 border-green-600 bg-green-50">Delivered</Badge>
      default: return <Badge variant="outline">Unknown</Badge>
    }
  }

  return (
    <div className="container mx-auto py-10 px-4 max-w-5xl">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl font-bold">My Orders</CardTitle>
        </CardHeader>
        <CardContent>
          {orders.length === 0 ? (
            <div className="text-center py-10 text-muted-foreground">
              You have no orders yet.
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order #</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Total</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell className="font-medium">{order.id.slice(0, 8)}...</TableCell>
                    <TableCell>
                      {new Date(order.orderDate).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{getStatusBadge(order.orderStatus)}</TableCell>
                    <TableCell className="text-right font-medium">
                      ${order.total.toFixed(2)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
