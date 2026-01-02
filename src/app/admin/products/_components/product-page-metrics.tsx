import { Package, AlertTriangle, CheckCircle } from "lucide-react"
import StatCard from "@/src/app/admin/_components/statistical-card";
import { ProductMetrics } from "@/src/features/products/hooks/useProductsMetrics";

type ProductMetricsProps = {
  metrics: ProductMetrics
}

export default function ProductsMetrics({ metrics }: ProductMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard cardTitle="Total Products" count={metrics.total} Icon={Package} iconClassName="h-4 w-4 text-muted-foreground" />
      <StatCard cardTitle="Active Products" count={metrics.active} Icon={CheckCircle} iconClassName="h-4 w-4 text-green-600" />
      <StatCard cardTitle="Low Stock" count={metrics.lowStock} Icon={AlertTriangle} iconClassName="h-4 w-4 text-yellow-600" />
      <StatCard cardTitle="Out of Stock" count={metrics.outOfStock} Icon={AlertTriangle} iconClassName="h-4 w-4 text-red-600" />
    </div>
  )
}