import { Input } from "@/src/components/ui/input"
import { useState } from "react"

type PasswordProps = {
  name: string,
  placeholder: string
}

export default function PasswordInput({ name, placeholder }: PasswordProps) {
  const [showPassword, setShowPassword] = useState(false)
  return (
    <div className="relative">
      <Input
        id={name}
        name={name}
        type={showPassword ? "text" : "password"}
        placeholder={placeholder}
        required
        minLength={8}
      />
    </div>
  )
}