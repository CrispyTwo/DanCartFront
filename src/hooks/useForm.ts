import { useState } from "react";

export default function useForm<T>(initialState: T) {
  const [formData, setFormData] = useState<T>(initialState)
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return { formData, handleChange }
}