"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"
import { AuthenticationService } from "@/src/lib/services/AuthenticationService"

export interface UserProfile {
  id: string
  email: string
  firstName: string
  lastName: string
  deliveryAddress: string
}

interface UserContextType {
  user: UserProfile | null
  isLoading: boolean
  updateUser: (user: UserProfile) => void
  logout: () => void
  isAuthenticated: boolean
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export function UserProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const authService = new AuthenticationService()

  // Load user data on mount
  useEffect(() => {
    const initializeUser = () => {
      if (authService.isAuthenticated()) {
        const userId = authService.getUserId()
        const email = authService.getEmail()

        // Load user profile from localStorage
        const savedProfile = localStorage.getItem("userProfile")
        if (savedProfile) {
          try {
            setUser(JSON.parse(savedProfile))
          } catch (error) {
            console.error("Failed to load user profile:", error)
          }
        } else if (userId && email) {
          // Create default profile if not saved
          const defaultProfile: UserProfile = {
            id: userId,
            email: email,
            firstName: "John",
            lastName: "Doe",
            deliveryAddress: "123 Main Street, New York, NY 10001",
          }
          setUser(defaultProfile)
          localStorage.setItem("userProfile", JSON.stringify(defaultProfile))
        }
      }
      setIsLoading(false)
    }

    initializeUser()
  }, [])

  const updateUser = (updatedUser: UserProfile) => {
    setUser(updatedUser)
    localStorage.setItem("userProfile", JSON.stringify(updatedUser))
  }

  const logout = () => {
    authService.logout()
    setUser(null)
    localStorage.removeItem("userProfile")
  }

  const isAuthenticated = authService.isAuthenticated()

  return (
    <UserContext.Provider value={{ user, isLoading, updateUser, logout, isAuthenticated }}>
      {children}
    </UserContext.Provider>
  )
}

export function useUser() {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
