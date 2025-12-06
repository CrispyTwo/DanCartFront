"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import ProfileForm from "@/src/components/profile-form"
import type { Customer } from "@/src/lib/models/Customer"

export default function ProfilePage() {
  const [isEditing, setIsEditing] = useState(false)
  const [user, setUser] = useState<Customer>({
    id: 0,
    firstName: "",
    lastName: "",
    email: "",
    createdAt: "",
    ordersCount: 0,
    totalSpent: 0,
    averageOrder: 0,
    isActive: true,
  })

  // TODO: Replace with API call to fetch user profile
  // const fetchUserProfile = async () => {
  //   const response = await fetch('/api/user/profile');
  //   const data = await response.json();
  //   setUser(data);
  // }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600 mb-8">Manage your personal information and delivery address</p>

            {isEditing ? (
              <ProfileForm user={user} onCancel={() => setIsEditing(false)} onSave={() => setIsEditing(false)} />
            ) : (
              <div className="space-y-6">
                <div className="border-b pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                      <p className="text-gray-900 py-2">{user.firstName}</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                      <p className="text-gray-900 py-2">{user.lastName}</p>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                    <p className="text-gray-900 py-2">{user.email}</p>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Delivery Address</label>
                  <p className="text-gray-900 py-2">{user.deliveryAddress}</p>
                </div>

                <Button onClick={() => setIsEditing(true)} className="w-full md:w-auto">
                  Edit Profile
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
