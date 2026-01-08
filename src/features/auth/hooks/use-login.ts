"use client"

import { useCallback, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuthContext } from "@/src/features/auth/context/auth-context"
import { LoginRequest } from "@/src/types/auth.types"

type UseLoginOptions = {
  redirectTo?: string
  onSuccess?: (res: string) => void
}

export function useLogin(options?: UseLoginOptions) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string>("")

  const { login } = useAuthContext()

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
        await login(loginRequest);
        if (options?.redirectTo) router.push(options.redirectTo);
        else router.push("/");
      } catch (err: any) {
        const message = err?.message || err?.response?.message || "Network error. Please try again."
        setError(message)
        throw err
      } finally {
        setIsLoading(false)
      }
    }, [options, router]
  )

  return { handleLogin, isLoading, error }
}

export default useLogin
