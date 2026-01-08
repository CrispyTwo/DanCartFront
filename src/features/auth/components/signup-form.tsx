"use client"

import { useState } from "react"
import { Button } from "@/src/components/ui/button"
import { Input } from "@/src/components/ui/input"
import { Label } from "@/src/components/ui/label"
import { Checkbox } from "@/src/components/ui/checkbox"
import { ArrowRight } from "lucide-react"
import PasswordInput from "./password-input"
import AuthError from "./error"
import useRegister from "../hooks/use-register"

export function SignupForm() {
  const [agreedToTerms, setAgreedToTerms] = useState(false)
  const { handleRegister, isLoading, error } = useRegister({ redirectTo: "/products" })

  return (
    <form onSubmit={handleRegister} className="space-y-4">
      <AuthError error={error} />
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="firstName">First Name</Label>
          <Input id="firstName" name="firstName" placeholder="John" required />
        </div>
        <div className="space-y-2">
          <Label htmlFor="lastName">Last Name</Label>
          <Input id="lastName" name="lastName" placeholder="Doe" required />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupEmail">Email</Label>
        <Input id="signupEmail" name="signupEmail" type="email" placeholder="john@example.com" required />
      </div>
      <div className="space-y-2">
        <Label htmlFor="signupPassword">Password</Label>
        <PasswordInput name="signupPassword" placeholder="Enter your password" />
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <PasswordInput name="confirmPassword" placeholder="Confirm your password" />
      </div>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="terms"
          checked={agreedToTerms}
          onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
        />
        <Label htmlFor="terms" className="text-sm">
          I agree to the{" "}
          <Button variant="link" className="px-0 h-auto text-sm">
            Terms of Service
          </Button>
        </Label>
      </div>
      <Button className="w-full" type="submit" disabled={!agreedToTerms || isLoading}>
        {isLoading ? "Creating Account..." : "Create Account"}
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </form>
  )
}
