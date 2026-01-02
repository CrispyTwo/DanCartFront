import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Order } from "@/src/types/order.types"
import React from "react"
import { useState } from "react"
import OrderStatusBadge from "./table/order-record-status-badge"
import OrderDropdown from "./table/order-record-dropdown"
import OrderRecordLines from "./table/order-record-lines"
import OrderRecordExpandBadge from "./table/order-record-expand-badge"

export default function OrderPageTable({ orders }: { orders: Order[] }) {
  const [expandedOrderIds, setExpandedOrderIds] = useState<Set<string>>(new Set())

  return (
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
          <>
            <TableRow>
              <TableCell className="text-center"><OrderRecordExpandBadge expandedOrderIds={expandedOrderIds} setExpandedOrderIds={setExpandedOrderIds} orderId={order.id} /></TableCell>
              <TableCell className="font-medium">{order.id}</TableCell>
              <TableCell>{order.email}</TableCell>
              <TableCell>{order.name}</TableCell>
              <TableCell>{new Date(order.orderDate).toLocaleDateString()}</TableCell>
              <TableCell>${order.total}</TableCell>
              <TableCell><OrderStatusBadge status={order.orderStatus} /></TableCell>
              <TableCell><OrderDropdown id={order.id} /></TableCell>
            </TableRow>
            {expandedOrderIds.has(order.id) && (
              <TableRow className="bg-muted/20 hover:bg-muted/20">
                <TableCell colSpan={8}>
                  <OrderRecordLines items={order.lines} />
                </TableCell>
              </TableRow>
            )}
          </>
        ))}
      </TableBody>
    </Table>
  )
}