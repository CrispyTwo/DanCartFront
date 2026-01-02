import { Input } from "@/src/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/src/components/ui/select"
import { ApiOptions } from "@/src/lib/helpers/api-query-builder";
import { Filter, Search } from "lucide-react";

type FilterProps = {
  options: ApiOptions;
  setOptions: React.Dispatch<React.SetStateAction<ApiOptions>>
};

const CustomerTableFilter: React.FC<FilterProps> = ({ options, setOptions }) => {
  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
        <Input
          placeholder="Search customers..."
          value={options.search}
          onChange={(e) => setOptions({ ...options, search: e.target.value })}
          className="pl-10"
        />
      </div>
      <Select value={options.status} onValueChange={(value) => setOptions({ ...options, status: value })}>
        <SelectTrigger className="w-48">
          <Filter className="mr-2 h-4 w-4" />
          <SelectValue placeholder="Filter by status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Customers</SelectItem>
          <SelectItem value="active">Active</SelectItem>
          <SelectItem value="inactive">Inactive</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CustomerTableFilter;
