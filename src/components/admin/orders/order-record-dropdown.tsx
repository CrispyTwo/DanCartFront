import React, { useCallback, useState } from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { ApiService } from "@/src/lib/services/ApiService";
import { AuthenticationService } from "@/src/lib/services/AuthenticationService";
import { toast } from "sonner"
type DropdownProps = {
  id: string;
};

const OrderDropdown: React.FC<DropdownProps> = ({ id }) => {
  const [loading, setLoading] = useState<boolean>();
  const handleDelete = useCallback(async () => {
    if (!confirm("Delete this item?")) return;
    setLoading(true);
    try {
      const token = new AuthenticationService().getToken();
      if (token == null) throw new Error();
      const res = await new ApiService().delete(`/salesOrders/${id}`, 1, "", token);
      if (!res.ok) throw new Error(await res.text());
      toast("Deleted successfully");
    } catch (err) {
      toast("Deletion failed");
    } finally {
      setLoading(false);
    }
  }, [id]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem>
          <Eye className="mr-2 h-4 w-4" />
          View
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Edit className="mr-2 h-4 w-4" />
          Update Status
        </DropdownMenuItem>
        <DropdownMenuItem className="text-red-600" onClick={handleDelete}>
          <Trash2 className="mr-2 h-4 w-4" />
          Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default OrderDropdown;
