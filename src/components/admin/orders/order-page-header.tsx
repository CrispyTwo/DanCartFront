import { Button } from "@/src/components/ui/button";
import { Download, RefreshCw } from "lucide-react";

const OrderPageHeader: React.FC = () => (
  <div className="flex items-center justify-between">
    <div>
      <h1 className="text-3xl font-bold text-gray-900">Orders</h1>
      <p className="text-gray-600 mt-1">Manage customer orders and fulfillment</p>
    </div>
    <div className="flex space-x-3">
      <Button variant="outline">
        <Download className="mr-2 h-4 w-4" />
        Export
      </Button>
      <Button variant="outline">
        <RefreshCw className="mr-2 h-4 w-4" />
        Sync
      </Button>
    </div>
  </div>
);

export default OrderPageHeader;
