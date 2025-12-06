import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/src/components/ui/dropdown-menu";
import { Button } from "@/src/components/ui/button";
import { Eye, Mail, MoreHorizontal } from "lucide-react";

type DropdownProps = {
};

const CustomerDropdown: React.FC<DropdownProps> = ({}) => {
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
            View Profile
            </DropdownMenuItem>
            <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default CustomerDropdown;
