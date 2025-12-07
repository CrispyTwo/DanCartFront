"use client"

import type React from "react"
import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import type { User } from "@/src/lib/models/User"
import ProfileField from "./input"
import { useUpdateMe } from "@/src/hooks/users/useUpdateMe"
import { toast } from "sonner"

interface ProfileFormProps {
  user: User
}

export default function ProfileForm({ user }: ProfileFormProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState(user)
  const { updateMe, loading: isSaving } = useUpdateMe()

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await updateMe(formData)
      toast.success("Profile updated successfully")
      setIsEditing(false)
    } catch (error) {
      console.error("Failed to update profile:", error)
      toast.error("Failed to update profile")
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <ProfileField id="firstName" label="First Name" value={formData.firstName} onChange={handleChange} disabled={!isEditing} />
        <ProfileField id="lastName" label="Last Name" value={formData.lastName} onChange={handleChange} disabled={!isEditing} />
      </div>

      <div>
        <ProfileField id="email" label="Email" value={formData.email} onChange={handleChange} disabled
          p={{ className: "text-sm text-gray-500 mt-1", children: "Email cannot be changed" }} />
      </div>

      <div className="flex gap-3 pt-6">
        {isEditing ? (
          <>
            <Button
              type="button"
              variant="outline"
              onClick={(e) => {
                e.preventDefault()
                setFormData(user)
                setIsEditing(false)
              }}
              className="flex-1 bg-transparent"
            >
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving} className="flex-1">
              {isSaving ? "Saving..." : "Save Changes"}
            </Button>
          </>
        ) : (
          <Button onClick={() => setIsEditing(true)} className="w-full md:w-auto">
            Edit Profile
          </Button>
        )}
      </div>
    </form>
  )
}
