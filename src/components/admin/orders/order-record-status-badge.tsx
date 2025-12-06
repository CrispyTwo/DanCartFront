import { Badge } from "@/src/components/ui/badge";
import { AlertTriangle, CheckCircle, Clock, Package, Truck } from "lucide-react";

type OrderBadgeProps = {
  status: number;
};

const OrderStatusBadge: React.FC<OrderBadgeProps> = ({ status }) => {
  switch (status) {
      case 0:
        return (
          <Badge className="bg-yellow-100 text-yellow-800">
            <Clock className="mr-1 h-3 w-3" />
            Pending
          </Badge>
        )
      case 1:
        return (
          <Badge className="bg-blue-100 text-blue-800">
            <Package className="mr-1 h-3 w-3" />
            Processing
          </Badge>
        )
      case 2:
        return (
          <Badge className="bg-purple-100 text-purple-800">
            <Truck className="mr-1 h-3 w-3" />
            Shipped
          </Badge>
        )
      case 3:
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="mr-1 h-3 w-3" />
            Delivered
          </Badge>
        )
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
};

export default OrderStatusBadge;
