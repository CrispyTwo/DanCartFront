"use client"

import { useCallback, useEffect, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { LoginRequest } from "../../lib/models/Authentication"
import { AuthenticationService } from "../../lib/services/AuthenticationService"

type UseLoginOptions = {
  redirectTo?: string
  onSuccess?: (res: string) => void
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")
  const mounted = useRef(true)

  const authService = new AuthenticationService()
  useEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  const handleLogin = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      setIsLoading(true)
      setError("")

      const formData = new FormData(e.currentTarget as HTMLFormElement)
      const loginRequest: LoginRequest = {
        email: formData.get("email") as string,
        password: formData.get("password") as string,
      }

      try {
        const token = await authService.login(loginRequest)

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

  return { handleLogin, isLoading, error, setError }
}

export default useLogin
