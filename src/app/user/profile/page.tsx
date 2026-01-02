"use client"

import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { useMe } from "@/src/features/user/hooks/useMe"
import ProfileForm from "./_components/profile-form"

export default function ProfilePage() {
  const router = useRouter()
  const { me, loading, error } = useMe()

  useEffect(() => {
    if (!loading && me === undefined) {
      router.push("/auth")
    }
  }, [loading, me, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-600">Loading profile...</p>
      </div>
    )
  }

  if (me === undefined) return null

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">My Profile</h1>
            <p className="text-gray-600 mb-8">Manage your personal information</p>
            <ProfileForm user={me} />
          </div>
        </div>
      </div>
    </div>
  )
}
