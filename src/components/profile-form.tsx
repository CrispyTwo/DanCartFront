"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import type { Customer } from "@/src/lib/models/Customer"

interface ProfileFormProps {
  user: Customer
  onCancel: () => void
  onSave: () => void
}

export default function ProfileForm({ user, onCancel, onSave }: ProfileFormProps) {
  const [formData, setFormData] = useState(user)
  const [isSaving, setIsSaving] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSaving(true)
    try {
      // TODO: Replace with API call to update user profile
      // const response = await fetch('/api/user/profile', {
      //   method: 'PUT',
      //   body: JSON.stringify(formData),
      // });
      // const data = await response.json();
      onSave()
    } catch (error) {
      console.error("Failed to update profile:", error)
    } finally {
      setIsSaving(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-2">
            First Name
          </label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
        <div>
          <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-2">
            Last Name
          </label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
            required
          />
        </div>
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          disabled
        />
        <p className="text-sm text-gray-500 mt-1">Email cannot be changed</p>
      </div>

      <div>
        <label htmlFor="deliveryAddress" className="block text-sm font-medium text-gray-700 mb-2">
          Delivery Address
        </label>
        <textarea
          id="deliveryAddress"
          name="deliveryAddress"
          value={formData.deliveryAddress}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
          required
        />
      </div>

      <div className="flex gap-3 pt-6">
        <Button type="button" variant="outline" onClick={onCancel} className="flex-1 bg-transparent">
          Cancel
        </Button>
        <Button type="submit" disabled={isSaving} className="flex-1">
          {isSaving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </form>
  )
}
