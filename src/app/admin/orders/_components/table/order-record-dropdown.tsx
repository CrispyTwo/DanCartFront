import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Edit, Eye, MoreHorizontal, Trash2 } from "lucide-react";
import { useProxy } from "@/src/hooks/use-api";
import { toast } from "sonner"
import { useRouter } from "next/navigation";
type DropdownProps = {
  id: string;
};

const OrderDropdown: React.FC<DropdownProps> = ({ id }) => {
  const api = useProxy();
  const router = useRouter();

  const handleDelete = async () => {
    try {
      await api.delete(`/salesOrders/${id}`, 1, "");
      toast.success("Order deleted successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to delete order:", error);
      toast.error("Failed to delete order");
    }
  };

  const handleUpdateStatus = async () => {
    try {
      await api.post(`/salesOrders/${id}/status`, 1, JSON.stringify(1));
      toast.success("Order status updated successfully");
      router.refresh();
    } catch (error) {
      console.error("Failed to update order status:", error);
      toast.error("Failed to update order status");
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem onClick={handleUpdateStatus}>
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
