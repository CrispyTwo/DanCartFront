"use client"

import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { ArrowRight } from "lucide-react"
import useLogin from "../../hooks/auth/useLogin"
import PasswordInput from "./password-input"
import AuthError from "./error"

export default function LoginForm() {
    const { handleLogin, isLoading, error } = useLogin({ redirectTo: "/products" })

    return (
        <form onSubmit={handleLogin} className="space-y-4">
            <AuthError error={error} />
            <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="Enter your email" required />
            </div>
            <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <PasswordInput name="password" placeholder="Enter your password" />
                <div className="flex items-center justify-between">
                    <Button variant="link" className="px-0 text-sm" type="button">
                        Forgot password?
                    </Button>
                </div>
            </div>
            <Button className="w-full" type="submit" disabled={isLoading}>
                {isLoading ? "Logging in..." : "Log In"}
                <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
        </form>
    )
}
