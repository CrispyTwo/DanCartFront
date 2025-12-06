import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { Filter, Search } from "lucide-react";

type FilterProps = {
  statusFilter: string;
  setStatusFilter: React.Dispatch<React.SetStateAction<string>>
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>
};

const OrderTableFilter: React.FC<FilterProps> = ({ statusFilter, setStatusFilter, searchTerm, setSearchTerm }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
        <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
            placeholder="Search orders..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
        />
        </div>
        <Select value={statusFilter} onValueChange={setStatusFilter}>
        <SelectTrigger className="w-48">
            <Filter className="mr-2 h-4 w-4" />
            <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
            <SelectItem value="all">All Orders</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="fulfilled">Fulfilled</SelectItem>
        </SelectContent>
        </Select>
    </div>
  );
};

export default OrderTableFilter;
