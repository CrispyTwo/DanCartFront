import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Customer } from "@/src/types/user.types"
import CustomerDropdown from "./table/customer-record-dropdown"
import CustomerStatusBadge from "./table/customer-record-status-badge"
import CustomerInfo from "./table/customer-record-info"

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  return (
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
          <TableRow key={customer.email}>
            <TableCell><CustomerInfo customer={customer} /></TableCell>
            <TableCell>{new Date(customer.createdAt).toLocaleDateString()}</TableCell>
            <TableCell>{customer.ordersCount}</TableCell>
            <TableCell>${customer.totalSpent.toFixed(2)}</TableCell>
            <TableCell>${(customer.totalSpent / Math.max(customer.ordersCount, 1)).toFixed(2)}</TableCell>
            <TableCell><CustomerStatusBadge isActive={customer.isActive} /></TableCell>
            <TableCell><CustomerDropdown /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}