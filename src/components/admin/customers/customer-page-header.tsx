"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Download, Plus } from "lucide-react"
import { AddCustomerForm, type Customer } from "./add-customer-form"

const CustomerPageHeader: React.FC = () => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  const handleAddCustomer = (customer: Omit<Customer, "confirmPassword">) => {
    console.log("Adding customer:", customer)
    // TODO: Connect to API endpoint to create customer
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Customers</h1>
          <p className="text-gray-600 mt-1">Manage your customer relationships</p>
        </div>
        <div className="flex space-x-3">
          <Button variant="outline">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
          <Button onClick={() => setIsFormOpen(true)}>
            <Plus className="mr-2 h-4 w-4" />
            Add Customer
          </Button>
        </div>
      </div>
      <AddCustomerForm open={isFormOpen} onOpenChange={setIsFormOpen} onSubmit={handleAddCustomer} />
    </>
  )
}

export default CustomerPageHeader
