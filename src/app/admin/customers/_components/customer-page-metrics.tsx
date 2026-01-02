import StatCard from "@/src/app/admin/_components/statistical-card";
import { CustomersMetrics as CustomersMetricsType } from "@/src/features/user/hooks/useCustomersMetrics";
import { Users, DollarSign, UserCheck } from "lucide-react"

type CustomersMetricsProps = {
  metrics: CustomersMetricsType
}

export default function CustomersMetrics({ metrics }: CustomersMetricsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <StatCard cardTitle="Total Customers" count={metrics.total} Icon={Users} iconClassName="h-4 w-4 text-muted-foreground" />
      <StatCard cardTitle="Active Customers" count={metrics.active} Icon={UserCheck} iconClassName="h-4 w-4 text-green-600" />
      <StatCard cardTitle="Average Order Value" count={metrics.avgOrderValue} Icon={DollarSign} iconClassName="h-4 w-4 text-blue-600" />
      <StatCard cardTitle="New This Month" count={metrics.new} Icon={Users} iconClassName="h-4 w-4 text-purple-600" />
    </div>
  )
}