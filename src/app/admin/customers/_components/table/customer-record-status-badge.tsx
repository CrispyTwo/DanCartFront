import { Badge } from "@/src/components/ui/badge";
import { UserCheck, UserX } from "lucide-react";

type CustomerBadgeProps = {
  isActive: boolean;
};

const CustomerStatusBadge: React.FC<CustomerBadgeProps> = ({ isActive }) => {
  switch (isActive) {
    case true:
      return (
        <Badge className="bg-green-100 text-green-800">
          <UserCheck className="mr-1 h-3 w-3" />
          Active
        </Badge>
      );
    case false:
      return (
        <Badge className="bg-gray-100 text-gray-800">
          <UserX className="mr-1 h-3 w-3" />
          Inactive
        </Badge>
      );
    default:
      return <Badge variant="secondary">Unknown</Badge>;
  }
};

export default CustomerStatusBadge;
