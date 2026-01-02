import React from "react";
import { Avatar, AvatarFallback } from "@/src/components/ui/avatar"
import { Customer } from "@/src/types/user.types";

const CustomerInfo: React.FC<{ customer: Customer }> = ({ customer }) => {
  return (
    <div className="flex items-center space-x-3">
      <Avatar className="h-8 w-8">
        <AvatarFallback>{customer.firstName[0] + customer.lastName[0]}</AvatarFallback>
      </Avatar>
      <div>
        <div className="font-medium">{`${customer.firstName} ${customer.lastName}`}</div>
        <div className="text-sm text-gray-600">{customer.email}</div>
      </div>
    </div>
  );
};

export default CustomerInfo;
