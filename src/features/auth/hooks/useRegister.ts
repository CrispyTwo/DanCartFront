"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/src/features/auth/context/auth-context"
import { RegisterRequest } from "@/src/types/auth.types"

type UseRegisterOptions = {
  redirectTo?: string
  onSuccess?: (res: string) => void
}

export function useRegister(options?: UseRegisterOptions) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const mounted = useRef(true)

  const { register } = useAuthContext()
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const handleRegister = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")

      const formData = new FormData(e.currentTarget as HTMLFormElement)

      const registerRequest: RegisterRequest = {
        firstName: formData.get("firstName") as string,
        lastName: formData.get("lastName") as string,
        email: formData.get("signupEmail") as string,
        password: formData.get("signupPassword") as string,
        confirmPassword: formData.get("confirmPassword") as string
      }

      try {
        const token = await register(registerRequest)

        options?.onSuccess?.(token)
        if (options?.redirectTo) router.push(options.redirectTo)

        return token
      } catch (err: any) {
        const message = err?.message || err?.response?.message || "Network error. Please try again."
        if (mounted.current) setError(message)
        throw err
      } finally {
        if (mounted.current) setIsLoading(false)
      }
    }, [options, router]
  )

  return { handleRegister, isLoading, error, setError }
}

export default useRegister
