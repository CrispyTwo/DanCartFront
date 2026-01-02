import StatCard from "@/src/app/admin/_components/statistical-card";
import { OrdersMetrics as OrdersMetricsType } from "@/src/features/orders/hooks/use-orders-metrics";
import { ShoppingCart, Clock, Package, Truck } from "lucide-react";

type OrdersMetricsProps = {
  metrics: OrdersMetricsType
}

export default function OrdersMetrics({ metrics }: OrdersMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard cardTitle={"Total Orders"} count={metrics.total} Icon={ShoppingCart} iconClassName={"h-4 w-4 text-muted-foreground"} />
      <StatCard cardTitle={"Pending"} count={metrics.pending} Icon={Clock} iconClassName={"h-4 w-4 text-yellow-600"} />
      <StatCard cardTitle={"Processing"} count={metrics.inProgress} Icon={Package} iconClassName={"h-4 w-4 text-blue-600"} />
      <StatCard cardTitle={"Shipped"} count={metrics.shipped} Icon={Truck} iconClassName={"h-4 w-4 text-purple-600"} />
    </div>
  )
}