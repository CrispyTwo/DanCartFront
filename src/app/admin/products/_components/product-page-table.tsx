import TableRecordImage from "@/src/app/admin/_components/table-record-image"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/src/components/ui/table"
import { Product } from "@/src/types/product.types"
import ProductStatusBadge from "./table/product-record-status-badge"
import ProductDropdown from "./table/product-record-dropdown"

export default function ProductsTable({ products }: { products: Product[] }) {
  return (
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
            <TableCell><TableRecordImage image={"/placeholder.svg"} name={product.name} /></TableCell>
            <TableCell className="font-medium">{product.name}</TableCell>
            <TableCell className="text-gray-600">{product.id}</TableCell>
            <TableCell>${product.price}</TableCell>
            <TableCell>{product.stock}</TableCell>
            <TableCell><ProductStatusBadge stock={product.stock} lowStockThreshold={product.lowStockThreshold} /></TableCell>
            <TableCell><ProductDropdown id={product.id} /></TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}