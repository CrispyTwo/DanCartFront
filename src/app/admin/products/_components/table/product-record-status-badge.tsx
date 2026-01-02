import { Badge } from "@/src/components/ui/badge";
import { AlertTriangle, CheckCircle } from "lucide-react";

type ProductBadgeProps = {
  stock: number;
  lowStockThreshold: number;
};

const ProductStatusBadge: React.FC<ProductBadgeProps> = ({ stock, lowStockThreshold }) => {
  if (stock <= 0) {
    return (
      <Badge className="bg-red-100 text-red-800">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Out of Stock
      </Badge>
    )
  }
  if (stock <= lowStockThreshold) {
    return (
      <Badge className="bg-yellow-100 text-yellow-800">
        <AlertTriangle className="mr-1 h-3 w-3" />
        Low Stock
      </Badge>
    )
  }

  return (
    <Badge className="bg-green-100 text-green-800">
      <CheckCircle className="mr-1 h-3 w-3" />
      Active
    </Badge>
  )
};

export default ProductStatusBadge;
